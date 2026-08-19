import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api-url';

export interface Empleador {
  id: number;
  razonSocial?: string;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class EmpleadoresService {
  constructor(private http: HttpClient) {}

  obtenerPorUsuario(idUsuario: number | string): Observable<Empleador> {
    return this.http.get<Empleador>(`${API_URL}/empleadores/usuario/${idUsuario}`);
  }

  crear(idUsuario: number | string, datos: any): Observable<Empleador> {
    return this.http.post<Empleador>(`${API_URL}/empleadores/usuario/${idUsuario}`, datos);
  }
}
