import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { API_URL } from '../api-url';

export type Rol = 'EMPLEADOR' | 'POSTULANTE';

export interface LoginResponse {
  token: string;
  rol: Rol;
  id: number;
  nombre: string;
  correo: string;
  mensaje: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(correo: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${API_URL}/auth/login`, { correo, password })
      .pipe(tap((respuesta) => this.guardarSesion(respuesta)));
  }

  private guardarSesion(respuesta: LoginResponse): void {
    localStorage.setItem('token', respuesta.token);
    localStorage.setItem('rol', respuesta.rol);
    localStorage.setItem('id', String(respuesta.id));
    localStorage.setItem('nombre', respuesta.nombre);
    localStorage.setItem('correo', respuesta.correo);
  }

  redirigirSegunRol(): void {
    this.router.navigate([this.getRol() === 'EMPLEADOR' ? '/dashboard-empleador' : '/dashboard']);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRol(): Rol | null {
    return localStorage.getItem('rol') as Rol | null;
  }

  getId(): string | null {
    return localStorage.getItem('id');
  }

  getNombre(): string | null {
    return localStorage.getItem('nombre');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
