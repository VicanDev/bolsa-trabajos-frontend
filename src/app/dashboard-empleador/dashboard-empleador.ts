import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { OfertasService, OfertaStats } from '../core/services/ofertas.service';
import { PostulacionesService, PostulanteDato } from '../core/services/postulaciones.service';
import { CategoriasService, Categoria } from '../core/services/categorias.service';
import { NotificationService } from '../core/services/notification.service';

type Orden = 'recientes' | 'postulados' | 'pendientes' | 'aceptados' | 'rechazados';

interface FormEdicionOferta {
  titulo: string;
  descripcion: string;
  ubicacion: string;
  duracion: string;
  requisitos: string;
  idCategoria: number;
}

interface OfertaGestion extends OfertaStats {
  editando?: boolean;
  guardandoEdicion?: boolean;
  formEdicion?: FormEdicionOferta;

  mostrandoPostulantes?: boolean;
  cargandoPostulantes?: boolean;
  postulantesCargados?: boolean;
  postulantes?: (PostulanteDato & { procesando?: boolean })[];
}

@Component({
  selector: 'app-dashboard-empleador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-empleador.html',
  styleUrl: './dashboard-empleador.css'
})
export class DashboardEmpleador implements OnInit {
  ofertas: OfertaGestion[] = [];
  categorias: Categoria[] = [];
  nombreUsuario: string = '';
  cargando: boolean = true;

  busqueda: string = '';
  orden: Orden = 'recientes';

  constructor(
    private auth: AuthService,
    private ofertasService: OfertasService,
    private postulacionesService: PostulacionesService,
    private categoriasService: CategoriasService,
    private notifications: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.nombreUsuario = this.auth.getNombre() || '';
    if (!this.auth.getId()) {
      this.router.navigate(['/login']);
      return;
    }

    this.categoriasService.listar().subscribe({
      next: (data) => (this.categorias = data)
    });

    this.cargarOfertas();
  }

  cargarOfertas() {
    this.cargando = true;
    this.ofertasService.obtenerEstadisticas().subscribe({
      next: (data) => {
        this.ofertas = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  get ofertasFiltradas(): OfertaGestion[] {
    const termino = this.busqueda.trim().toLowerCase();
    const lista = termino
      ? this.ofertas.filter((o) => (o.titulo || '').toLowerCase().includes(termino))
      : [...this.ofertas];

    switch (this.orden) {
      case 'postulados':
        return lista.sort((a, b) => b.totalPostulaciones - a.totalPostulaciones);
      case 'pendientes':
        return lista.sort((a, b) => b.pendientes - a.pendientes);
      case 'aceptados':
        return lista.sort((a, b) => b.aceptados - a.aceptados);
      case 'rechazados':
        return lista.sort((a, b) => b.rechazados - a.rechazados);
      default:
        return lista.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
    }
  }

  // ---------- Postulantes ----------

  togglePostulantes(oferta: OfertaGestion) {
    oferta.mostrandoPostulantes = !oferta.mostrandoPostulantes;
    if (oferta.mostrandoPostulantes) {
      oferta.editando = false;
      if (!oferta.postulantesCargados) {
        this.cargarPostulantes(oferta);
      }
    }
  }

  cargarPostulantes(oferta: OfertaGestion) {
    oferta.cargandoPostulantes = true;
    this.postulacionesService.listarPorOferta(oferta.id).subscribe({
      next: (lista) => {
        oferta.postulantes = lista;
        oferta.postulantesCargados = true;
        oferta.cargandoPostulantes = false;
      },
      error: () => {
        oferta.cargandoPostulantes = false;
      }
    });
  }

  cambiarEstado(oferta: OfertaGestion, postulacion: PostulanteDato & { procesando?: boolean }, nuevoEstado: 'ACEPTADO' | 'RECHAZADO') {
    if (postulacion.estado === nuevoEstado || postulacion.procesando) return;

    postulacion.procesando = true;
    this.postulacionesService.actualizarEstado(postulacion.idPostulacion, nuevoEstado).subscribe({
      next: (actualizada) => {
        const anterior = postulacion.estado;
        postulacion.estado = actualizada.estado;
        postulacion.procesando = false;

        if (anterior === 'PENDIENTE') oferta.pendientes = Math.max(0, oferta.pendientes - 1);
        if (anterior === 'ACEPTADO') oferta.aceptados = Math.max(0, oferta.aceptados - 1);
        if (anterior === 'RECHAZADO') oferta.rechazados = Math.max(0, oferta.rechazados - 1);

        if (postulacion.estado === 'ACEPTADO') oferta.aceptados += 1;
        if (postulacion.estado === 'RECHAZADO') oferta.rechazados += 1;

        this.notifications.success(
          nuevoEstado === 'ACEPTADO' ? 'Postulante aceptado.' : 'Postulante rechazado.'
        );
      },
      error: () => {
        postulacion.procesando = false;
      }
    });
  }

  // ---------- Edición de oferta ----------

  toggleEditar(oferta: OfertaGestion) {
    oferta.editando = !oferta.editando;
    if (oferta.editando) {
      oferta.mostrandoPostulantes = false;
      oferta.formEdicion = {
        titulo: oferta.titulo,
        descripcion: oferta.descripcion || '',
        ubicacion: oferta.ubicacion || '',
        duracion: oferta.duracion || '',
        requisitos: oferta.requisitos || '',
        idCategoria: oferta.idCategoria
      };
    }
  }

  cancelarEdicion(oferta: OfertaGestion) {
    oferta.editando = false;
  }

  guardarEdicion(oferta: OfertaGestion) {
    const form = oferta.formEdicion;
    if (!form || !form.titulo.trim() || !form.idCategoria) return;

    oferta.guardandoEdicion = true;
    this.ofertasService.actualizar(oferta.id, form).subscribe({
      next: (actualizada) => {
        oferta.titulo = actualizada.titulo;
        oferta.descripcion = actualizada.descripcion;
        oferta.ubicacion = actualizada.ubicacion;
        oferta.duracion = actualizada.duracion;
        oferta.requisitos = actualizada.requisitos;
        oferta.idCategoria = actualizada['categoria']?.id ?? form.idCategoria;
        oferta.categoria = actualizada['categoria']?.nombre ?? oferta.categoria;

        oferta.guardandoEdicion = false;
        oferta.editando = false;
        this.notifications.success('Oferta actualizada correctamente.');
      },
      error: () => {
        oferta.guardandoEdicion = false;
      }
    });
  }

  // ---------- Otros ----------

  eliminarOferta(id: number) {
    if (!confirm('¿Estás seguro de que deseas eliminar esta oferta?')) return;

    this.ofertasService.eliminar(id).subscribe({
      next: () => {
        this.ofertas = this.ofertas.filter((o) => o.id !== id);
      }
    });
  }

  crearOferta() {
    this.router.navigate(['/crear-oferta']);
  }

  cerrarSesion() {
    this.auth.logout();
  }
}
