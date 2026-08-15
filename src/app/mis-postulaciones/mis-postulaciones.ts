import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-postulaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-postulaciones.html',
  styleUrl: './mis-postulaciones.css'
})
export class MisPostulaciones implements OnInit {
  postulaciones: any[] = [];
  nombreUsuario: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('nombre') || '';
    const idUsuario = localStorage.getItem('id');
    if (!idUsuario) {
      this.router.navigate(['/login']);
      return;
    }
    // Obtener el idPostulante a partir del idUsuario
    this.http.get<any>(`http://localhost:8081/api/postulantes/usuario/${idUsuario}`).subscribe({
      next: (postulante) => {
        // Cargar postulaciones
        this.http.get<any[]>(`http://localhost:8081/api/postulaciones/postulante/${postulante.id}`).subscribe({
          next: (data) => {
            this.postulaciones = data;
          },
          error: (err) => {
            console.error('Error al cargar postulaciones:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener postulante:', err);
      }
    });
  }

  volver() {
    this.router.navigate(['/dashboard']);
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
