import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { OfertasService, Oferta } from '../core/services/ofertas.service';
import { PostulantesService } from '../core/services/postulantes.service';
import { PostulacionesService } from '../core/services/postulaciones.service';

@Component({
  selector: 'app-detalle-oferta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-oferta.html',
  styleUrl: './detalle-oferta.css'
})
export class DetalleOferta implements OnInit {
  oferta: Oferta | null = null;
  idOferta: number = 0;
  mensaje: string = '';
  cargando: boolean = true;
  postulando: boolean = false;

  constructor(
    private auth: AuthService,
    private ofertasService: OfertasService,
    private postulantesService: PostulantesService,
    private postulacionesService: PostulacionesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.idOferta = Number(this.route.snapshot.paramMap.get('id'));
    this.ofertasService.obtener(this.idOferta).subscribe({
      next: (data) => {
        this.oferta = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  volver() {
    this.router.navigate(['/dashboard']);
  }

  postular() {
    const idUsuario = this.auth.getId();
    if (!idUsuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.postulando = true;
    this.postulantesService.obtenerPorUsuario(idUsuario).subscribe({
      next: (postulante) => {
        this.postulacionesService.postular(this.idOferta, postulante.id).subscribe({
          next: () => {
            this.postulando = false;
            this.mensaje = '¡Felicidades! Has postulado a esta oferta con éxito.';
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 2000);
          },
          error: () => {
            this.postulando = false;
          }
        });
      },
      error: () => {
        this.postulando = false;
      }
    });
  }
}
