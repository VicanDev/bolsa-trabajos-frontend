import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  correo: string = '';
  clave: string = '';
  cargando: boolean = false;

  constructor(private auth: AuthService) {}

  iniciarSesion() {
    if (!this.correo || !this.clave) return;

    this.cargando = true;
    this.auth.login(this.correo, this.clave).subscribe({
      next: () => {
        this.cargando = false;
        this.auth.redirigirSegunRol();
      },
      error: () => {
        this.cargando = false;
      }
    });
  }
}
