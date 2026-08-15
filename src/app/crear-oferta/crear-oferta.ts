import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  idCategoria: number = 1;
  categorias: any[] = [];
  idEmpleador: number = 0;
  mensaje: string = '';
  error: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const idUsuario = localStorage.getItem('id');
    if (!idUsuario) {
      this.router.navigate(['/login']);
      return;
    }
    // Obtener el idEmpleador
    this.http.get<any>(`http://localhost:8081/api/empleadores/usuario/${idUsuario}`).subscribe({
      next: (empleador) => {
        this.idEmpleador = empleador.id;
      },
      error: (err) => {
        console.error('Error al obtener empleador:', err);
      }
    });
    // Cargar categorías
    this.http.get<any[]>('http://localhost:8081/api/categorias').subscribe({
      next: (data) => {
        this.categorias = data;
        if (data.length > 0) {
          this.idCategoria = data[0].id;
        }
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }

  guardarOferta() {
    this.error = '';
    this.mensaje = '';
    const body = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      ubicacion: this.ubicacion,
      duracion: this.duracion,
      requisitos: this.requisitos
    };
    this.http.post(`http://localhost:8081/api/ofertas/empleador/${this.idEmpleador}/categoria/${this.idCategoria}`, body).subscribe({
      next: () => {
        this.mensaje = '¡Oferta publicada exitosamente!';
        setTimeout(() => {
          this.router.navigate(['/dashboard-empleador']);
        }, 1500);
      },
      error: (err) => {
        this.error = 'Error al publicar la oferta. Intenta de nuevo.';
        console.error('Error:', err);
      }
    });
  }

  volver() {
    this.router.navigate(['/dashboard-empleador']);
  }
}
