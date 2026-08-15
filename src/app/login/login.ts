import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html'
})
export class Login {
  correo: string = '';
  clave: string = '';
  mensaje: string = '';

  constructor(private http: HttpClient, private router: Router) {} 

  iniciarSesion() {
    const url = 'http://localhost:8081/api/auth/login'; 
    const body = { correo: this.correo, password: this.clave };

    this.http.post(url, body).subscribe({
      next: (respuesta: any) => {
        // Guardar la sesión en localStorage
        localStorage.setItem('id', respuesta.id);
        localStorage.setItem('nombre', respuesta.nombre);
        localStorage.setItem('rol', respuesta.rol);

        // Navegar según el rol
        if (respuesta.rol === 'EMPLEADOR') {
          this.router.navigate(['/dashboard-empleador']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.mensaje = 'Error de conexión o credenciales incorrectas.';
        console.error("Error detallado: ", err);
      }
    });
  }
}