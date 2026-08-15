import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-oferta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-oferta.html'
})
export class DetalleOferta implements OnInit {
  oferta: any = null;
  idOferta: number = 0;
  mensaje: string = '';
  error: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.idOferta = Number(this.route.snapshot.paramMap.get('id'));
    // Cargar datos reales de la oferta
    this.http.get<any>(`http://localhost:8081/api/ofertas/${this.idOferta}`).subscribe({
      next: (data) => {
        this.oferta = data;
      },
      error: (err) => {
        console.error('Error al cargar oferta:', err);
        this.error = 'No se pudo cargar la oferta.';
      }
    });
  }

  volver() {
    this.router.navigate(['/dashboard']);
  }

  postular() {
    const idUsuario = localStorage.getItem('id');
    if (!idUsuario) {
      this.error = 'Debes iniciar sesión para postular.';
      return;
    }

    // Primero obtener el idPostulante real
    this.http.get<any>(`http://localhost:8081/api/postulantes/usuario/${idUsuario}`).subscribe({
      next: (postulante) => {
        // Luego crear la postulación
        this.http.post(`http://localhost:8081/api/postulaciones/oferta/${this.idOferta}/postulante/${postulante.id}`, {}).subscribe({
          next: () => {
            this.mensaje = '¡Felicidades! Has postulado a esta oferta con éxito.';
            this.error = '';
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 2000);
          },
          error: (err) => {
            this.error = 'Error al postular. Es posible que ya hayas postulado a esta oferta.';
            console.error('Error al postular:', err);
          }
        });
      },
      error: (err) => {
        this.error = 'Error al obtener tu perfil de postulante. Verifica que tu perfil esté completo.';
        console.error('Error al obtener postulante:', err);
      }
    });
  }
}