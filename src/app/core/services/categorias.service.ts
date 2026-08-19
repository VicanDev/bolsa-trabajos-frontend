import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api-url';

export interface Categoria {
  id: number;
  nombre: string;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class CategoriasService {
  constructor(private http: HttpClient) {}

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${API_URL}/categorias`);
  }
}
