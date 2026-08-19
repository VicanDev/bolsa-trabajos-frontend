import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { PostulacionesService, Postulacion } from '../core/services/postulaciones.service';

@Component({
  selector: 'app-mis-postulaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-postulaciones.html',
  styleUrl: './mis-postulaciones.css'
})
export class MisPostulaciones implements OnInit {
  postulaciones: Postulacion[] = [];
  nombreUsuario: string = '';
  cargando: boolean = true;

  constructor(
    private auth: AuthService,
    private postulacionesService: PostulacionesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.nombreUsuario = this.auth.getNombre() || '';
    this.postulacionesService.misPostulaciones().subscribe({
      next: (data) => {
        this.postulaciones = data;
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

  cerrarSesion() {
    this.auth.logout();
  }
}
