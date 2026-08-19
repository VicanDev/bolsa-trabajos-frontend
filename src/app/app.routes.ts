import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Registro } from './registro/registro';
import { DashboardPostulante } from './dashboard-postulante/dashboard-postulante';
import { DetalleOferta } from './detalle-oferta/detalle-oferta';
import { DashboardEmpleador } from './dashboard-empleador/dashboard-empleador';
import { CrearOferta } from './crear-oferta/crear-oferta';
import { MisPostulaciones } from './mis-postulaciones/mis-postulaciones';
import { authGuard, empleadorGuard, postulanteGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: 'registro', component: Registro, canActivate: [guestGuard] },
  { path: 'dashboard', component: DashboardPostulante, canActivate: [postulanteGuard] },
  { path: 'oferta/:id', component: DetalleOferta, canActivate: [authGuard] },
  { path: 'dashboard-empleador', component: DashboardEmpleador, canActivate: [empleadorGuard] },
  { path: 'crear-oferta', component: CrearOferta, canActivate: [empleadorGuard] },
  { path: 'mis-postulaciones', component: MisPostulaciones, canActivate: [postulanteGuard] },
  { path: '**', redirectTo: 'login' }
];