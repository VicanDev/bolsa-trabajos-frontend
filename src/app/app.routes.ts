import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Registro } from './registro/registro';
import { DashboardPostulante } from './dashboard-postulante/dashboard-postulante';
import { DetalleOferta } from './detalle-oferta/detalle-oferta';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'dashboard', component: DashboardPostulante },
  { path: 'oferta/:id', component: DetalleOferta }
];