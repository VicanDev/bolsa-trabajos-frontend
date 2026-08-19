import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { OfertasService, Oferta } from '../core/services/ofertas.service';
import { PostulacionesService } from '../core/services/postulaciones.service';
import { PostulantesService } from '../core/services/postulantes.service';
import { NotificationService } from '../core/services/notification.service';

interface OfertaConEstado extends Oferta {
  estadoPostulacion?: string;
}

interface PerfilForm {
  cvUrl: string;
  habilidades: string;
  disponibilidad: string;
}

@Component({
  selector: 'app-dashboard-postulante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-postulante.html',
  styleUrl: './dashboard-postulante.css'
})
export class DashboardPostulante implements OnInit {
  ofertas: OfertaConEstado[] = [];
  nombreUsuario: string = '';
  cargando: boolean = true;

  idPostulante: number = 0;
  mostrarPerfil: boolean = false;
  cargandoPerfil: boolean = false;
  guardandoPerfil: boolean = false;
  perfil: PerfilForm = { cvUrl: '', habilidades: '', disponibilidad: '' };

  constructor(
    private auth: AuthService,
    private ofertasService: OfertasService,
    private postulacionesService: PostulacionesService,
    private postulantesService: PostulantesService,
    private notifications: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.nombreUsuario = this.auth.getNombre() || '';
    this.cargarOfertas();
  }

  cargarOfertas() {
    this.cargando = true;
    forkJoin({
      ofertas: this.ofertasService.listar(),
      postulaciones: this.postulacionesService.misPostulaciones()
    }).subscribe({
      next: ({ ofertas, postulaciones }) => {
        const estadosPorOferta = new Map<number, string>();
        postulaciones.forEach((p) => {
          const idOferta = p.oferta?.id;
          if (idOferta) estadosPorOferta.set(idOferta, p.estado || 'PENDIENTE');
        });

        this.ofertas = ofertas.map((o) => ({ ...o, estadoPostulacion: estadosPorOferta.get(o.id) }));
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  verDetalle(id: number) {
    this.router.navigate(['/oferta', id]);
  }

  verMisPostulaciones() {
    this.router.navigate(['/mis-postulaciones']);
  }

  // ---------- Mi Perfil ----------

  abrirPerfil() {
    this.mostrarPerfil = true;
    const idUsuario = this.auth.getId();
    if (!idUsuario) return;

    this.cargandoPerfil = true;
    this.postulantesService.obtenerPorUsuario(idUsuario).subscribe({
      next: (data) => {
        this.idPostulante = data.id;
        this.perfil = {
          cvUrl: data.cvUrl || '',
          habilidades: data.habilidades || '',
          disponibilidad: data.disponibilidad || ''
        };
        this.cargandoPerfil = false;
      },
      error: () => {
        this.cargandoPerfil = false;
      }
    });
  }

  cerrarPerfil() {
    this.mostrarPerfil = false;
  }

  guardarPerfil() {
    if (!this.idPostulante) return;

    this.guardandoPerfil = true;
    this.postulantesService.actualizar(this.idPostulante, this.perfil).subscribe({
      next: () => {
        this.guardandoPerfil = false;
        this.mostrarPerfil = false;
        this.notifications.success('Perfil actualizado correctamente.');
      },
      error: () => {
        this.guardandoPerfil = false;
      }
    });
  }

  cerrarSesion() {
    this.auth.logout();
  }
}
