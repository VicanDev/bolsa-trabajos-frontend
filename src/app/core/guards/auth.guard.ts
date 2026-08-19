import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) return true;

  router.navigate(['/login']);
  return false;
};

export const empleadorGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn() && auth.getRol() === 'EMPLEADOR') return true;

  router.navigate(auth.isLoggedIn() ? ['/dashboard'] : ['/login']);
  return false;
};

export const postulanteGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn() && auth.getRol() === 'POSTULANTE') return true;

  router.navigate(auth.isLoggedIn() ? ['/dashboard-empleador'] : ['/login']);
  return false;
};

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) return true;

  router.navigate(auth.getRol() === 'EMPLEADOR' ? ['/dashboard-empleador'] : ['/dashboard']);
  return false;
};
