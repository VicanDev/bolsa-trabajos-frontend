import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api-url';

export interface Oferta {
  id: number;
  titulo: string;
  descripcion?: string;
  ubicacion?: string;
  duracion?: string;
  requisitos?: string;
  estado?: string;
  fechaPublicacion?: string;
  empleador?: { razonSocial?: string; [key: string]: any };
  [key: string]: any;
}

export interface OfertaStats {
  id: number;
  titulo: string;
  descripcion?: string;
  ubicacion?: string;
  duracion?: string;
  requisitos?: string;
  estado?: string;
  fechaPublicacion?: string;
  idCategoria: number;
  categoria?: string;
  totalPostulaciones: number;
  pendientes: number;
  aceptados: number;
  rechazados: number;
}

@Injectable({ providedIn: 'root' })
export class OfertasService {
  constructor(private http: HttpClient) {}

  listar(): Observable<Oferta[]> {
    return this.http.get<Oferta[]>(`${API_URL}/ofertas`);
  }

  obtener(id: number): Observable<Oferta> {
    return this.http.get<Oferta>(`${API_URL}/ofertas/${id}`);
  }

  listarPorEmpleador(idEmpleador: number): Observable<Oferta[]> {
    return this.http.get<Oferta[]>(`${API_URL}/ofertas/empleador/${idEmpleador}`);
  }

  obtenerEstadisticas(): Observable<OfertaStats[]> {
    return this.http.get<OfertaStats[]>(`${API_URL}/ofertas/stats`);
  }

  crear(idEmpleador: number, idCategoria: number, datos: any): Observable<Oferta> {
    return this.http.post<Oferta>(`${API_URL}/ofertas/empleador/${idEmpleador}/categoria/${idCategoria}`, datos);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/ofertas/${id}`);
  }

  actualizar(id: number, datos: any): Observable<Oferta> {
    return this.http.put<Oferta>(`${API_URL}/ofertas/${id}`, datos);
  }
}
