import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-postulante',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-postulante.html'
})
export class DashboardPostulante {
  ofertas = [
    { id: 1, titulo: 'Desarrollador Frontend (Angular)', empresa: 'Tech Solutions', ubicacion: 'Remoto', salario: 'S/ 3,500' },
    { id: 2, titulo: 'Analista de Base de Datos', empresa: 'DataCorp Perú', ubicacion: 'Lima', salario: 'S/ 4,200' },
    { id: 3, titulo: 'Soporte Técnico', empresa: 'HelpDesk SA', ubicacion: 'Arequipa', salario: 'S/ 1,500' }
  ];

  constructor(private router: Router) {}

  verDetalle(id: number) {
    this.router.navigate(['/oferta', id]);
  }

  cerrarSesion() {
    this.router.navigate(['/login']);
  }
}