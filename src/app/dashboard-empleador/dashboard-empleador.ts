import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-empleador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-empleador.html',
  styleUrl: './dashboard-empleador.css'
})
export class DashboardEmpleador implements OnInit {
  ofertas: any[] = [];
  nombreUsuario: string = '';
  idEmpleador: number = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('nombre') || '';
    const idUsuario = localStorage.getItem('id');
    if (!idUsuario) {
      this.router.navigate(['/login']);
      return;
    }
    // Obtener el idEmpleador a partir del idUsuario
    this.http.get<any>(`http://localhost:8081/api/empleadores/usuario/${idUsuario}`).subscribe({
      next: (empleador) => {
        this.idEmpleador = empleador.id;
        this.cargarOfertas();
      },
      error: (err) => {
        console.error('Error al obtener empleador:', err);
      }
    });
  }

  cargarOfertas() {
    this.http.get<any[]>(`http://localhost:8081/api/ofertas/empleador/${this.idEmpleador}`).subscribe({
      next: (data) => {
        this.ofertas = data;
      },
      error: (err) => {
        console.error('Error al cargar ofertas:', err);
      }
    });
  }

  eliminarOferta(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta oferta?')) {
      this.http.delete(`http://localhost:8081/api/ofertas/${id}`).subscribe({
        next: () => {
          this.ofertas = this.ofertas.filter(o => o.id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar oferta:', err);
        }
      });
    }
  }

  crearOferta() {
    this.router.navigate(['/crear-oferta']);
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
