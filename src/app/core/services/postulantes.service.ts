import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api-url';

export interface Postulante {
  id: number;
  cvUrl?: string;
  habilidades?: string;
  disponibilidad?: string;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class PostulantesService {
  constructor(private http: HttpClient) {}

  obtenerPorUsuario(idUsuario: number | string): Observable<Postulante> {
    return this.http.get<Postulante>(`${API_URL}/postulantes/usuario/${idUsuario}`);
  }

  crear(idUsuario: number | string, datos: any): Observable<Postulante> {
    return this.http.post<Postulante>(`${API_URL}/postulantes/usuario/${idUsuario}`, datos);
  }

  actualizar(id: number | string, datos: any): Observable<Postulante> {
    return this.http.put<Postulante>(`${API_URL}/postulantes/${id}`, datos);
  }
}
