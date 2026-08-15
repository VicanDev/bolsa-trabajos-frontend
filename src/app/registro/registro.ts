import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html'
})
export class Registro {
  nombre: string = '';
  correo: string = '';
  password: string = '';
  rol: string = '';
  mensaje: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  registrar() {
    const url = 'http://localhost:8081/api/usuarios';
    const body = { 
      nombre: this.nombre, 
      correo: this.correo, 
      password: this.password,
      rol: this.rol
    };

    this.http.post(url, body).subscribe({
      next: (respuesta: any) => {
        this.mensaje = '¡Registro exitoso! Redirigiendo...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.mensaje = 'Error al registrar usuario.';
        console.error(err);
      }
    });
  }
}