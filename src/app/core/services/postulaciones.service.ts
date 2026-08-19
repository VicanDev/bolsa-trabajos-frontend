import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api-url';

export interface Postulacion {
  id: number;
  estado?: string;
  fechaPostulacion?: string;
  oferta?: any;
  postulante?: { id: number; usuario?: { nombre?: string; [key: string]: any }; cvUrl?: string; [key: string]: any };
  [key: string]: any;
}

export interface PostulanteDato {
  idPostulacion: number;
  nombre?: string;
  correo?: string;
  habilidades?: string;
  disponibilidad?: string;
  cvUrl?: string;
  estado?: string;
}

@Injectable({ providedIn: 'root' })
export class PostulacionesService {
  constructor(private http: HttpClient) {}

  misPostulaciones(): Observable<Postulacion[]> {
    return this.http.get<Postulacion[]>(`${API_URL}/postulaciones/mis-postulaciones`);
  }

  postular(idOferta: number, idPostulante: number): Observable<Postulacion> {
    return this.http.post<Postulacion>(`${API_URL}/postulaciones/oferta/${idOferta}/postulante/${idPostulante}`, {});
  }

  listarPorOferta(idOferta: number): Observable<PostulanteDato[]> {
    return this.http.get<PostulanteDato[]>(`${API_URL}/postulaciones/oferta/${idOferta}`);
  }

  actualizarEstado(id: number, estado: string): Observable<Postulacion> {
    return this.http.put<Postulacion>(`${API_URL}/postulaciones/${id}/estado`, { estado });
  }
}
