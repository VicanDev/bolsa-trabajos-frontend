import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { API_URL } from '../core/api-url';
import { EmpleadoresService } from '../core/services/empleadores.service';
import { PostulantesService } from '../core/services/postulantes.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  nombre: string = '';
  correo: string = '';
  password: string = '';
  rol: string = 'POSTULANTE';
  razonSocial: string = '';
  ruc: string = '';
  descripcionEmpresa: string = '';
  mensaje: string = '';
  cargando: boolean = false;

  constructor(
    private http: HttpClient,
    private empleadoresService: EmpleadoresService,
    private postulantesService: PostulantesService,
    private router: Router
  ) {}

  registrar() {
    if (!this.nombre || !this.correo || !this.password || !this.rol) return;
    if (this.rol === 'EMPLEADOR' && (!this.razonSocial || !this.ruc)) return;

    const body = {
      nombre: this.nombre,
      correo: this.correo,
      password: this.password,
      rol: this.rol
    };

    this.cargando = true;
    this.http.post<{ id: number }>(`${API_URL}/usuarios`, body).subscribe({
      next: (usuario) => this.crearPerfil(usuario.id),
      error: () => {
        this.cargando = false;
      }
    });
  }

  private crearPerfil(idUsuario: number) {
    if (this.rol === 'EMPLEADOR') {
      this.empleadoresService
        .crear(idUsuario, {
          razonSocial: this.razonSocial,
          ruc: this.ruc,
          descripcion: this.descripcionEmpresa || null
        })
        .subscribe({
          next: () => this.finalizarRegistro(),
          error: () => {
            this.cargando = false;
          }
        });
    } else {
      this.postulantesService.crear(idUsuario, {}).subscribe({
        next: () => this.finalizarRegistro(),
        error: () => {
          this.cargando = false;
        }
      });
    }
  }

  private finalizarRegistro() {
    this.cargando = false;
    this.mensaje = '¡Registro exitoso! Redirigiendo...';
    setTimeout(() => this.router.navigate(['/login']), 2000);
  }
}
