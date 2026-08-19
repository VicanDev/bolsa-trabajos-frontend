import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { EmpleadoresService } from '../core/services/empleadores.service';
import { CategoriasService, Categoria } from '../core/services/categorias.service';
import { OfertasService } from '../core/services/ofertas.service';

@Component({
  selector: 'app-crear-oferta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-oferta.html',
  styleUrl: './crear-oferta.css'
})
export class CrearOferta implements OnInit {
  titulo: string = '';
  descripcion: string = '';
  ubicacion: string = '';
  duracion: string = '';
  requisitos: string = '';
  idCategoria: number = 0;
  categorias: Categoria[] = [];
  idEmpleador: number = 0;
  mensaje: string = '';
  guardando: boolean = false;

  constructor(
    private auth: AuthService,
    private empleadoresService: EmpleadoresService,
    private categoriasService: CategoriasService,
    private ofertasService: OfertasService,
    private router: Router
  ) {}

  ngOnInit() {
    const idUsuario = this.auth.getId();
    if (!idUsuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.empleadoresService.obtenerPorUsuario(idUsuario).subscribe({
      next: (empleador) => {
        this.idEmpleador = empleador.id;
      }
    });

    this.categoriasService.listar().subscribe({
      next: (data) => {
        this.categorias = data;
        if (data.length > 0) {
          this.idCategoria = data[0].id;
        }
      }
    });
  }

  guardarOferta() {
    if (!this.titulo || !this.idEmpleador || !this.idCategoria) return;

    this.mensaje = '';
    const body = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      ubicacion: this.ubicacion,
      duracion: this.duracion,
      requisitos: this.requisitos
    };

    this.guardando = true;
    this.ofertasService.crear(this.idEmpleador, this.idCategoria, body).subscribe({
      next: () => {
        this.guardando = false;
        this.mensaje = '¡Oferta publicada exitosamente!';
        setTimeout(() => {
          this.router.navigate(['/dashboard-empleador']);
        }, 1500);
      },
      error: () => {
        this.guardando = false;
      }
    });
  }

  volver() {
    this.router.navigate(['/dashboard-empleador']);
  }
}
