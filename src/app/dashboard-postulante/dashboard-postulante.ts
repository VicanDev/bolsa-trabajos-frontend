import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-postulante',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-postulante.html'
})
export class DashboardPostulante implements OnInit {
  ofertas: any[] = [];
  nombreUsuario: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('nombre') || '';
    this.http.get<any[]>('http://localhost:8081/api/ofertas').subscribe({
      next: (data) => {
        this.ofertas = data;
      },
      error: (err) => {
        console.error('Error al cargar ofertas:', err);
      }
    });
  }

  verDetalle(id: number) {
    this.router.navigate(['/oferta', id]);
  }

  verMisPostulaciones() {
    this.router.navigate(['/mis-postulaciones']);
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}