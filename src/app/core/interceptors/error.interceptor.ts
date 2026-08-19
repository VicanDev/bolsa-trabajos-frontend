import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifications = inject(NotificationService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const esLogin = req.url.includes('/auth/login');
      const mensaje = extraerMensaje(error, esLogin);

      notifications.error(mensaje);

      if ((error.status === 401 || error.status === 403) && !esLogin) {
        localStorage.clear();
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};

function extraerMensaje(error: HttpErrorResponse, esLogin: boolean): string {
  const body = error.error;

  if (body) {
    if (typeof body === 'string' && body.trim().length > 0) return body;
    if (body.detalles && typeof body.detalles === 'object') {
      const detalles = Object.values(body.detalles).join(' ');
      if (detalles) return detalles;
    }
    if (body.mensaje) return body.mensaje;
    if (body.message) return body.message;
    if (body.error) return body.error;
  }

  if (error.status === 0) return 'No se pudo conectar con el servidor. Verifica tu conexión.';
  if (error.status === 401 && esLogin) return 'Correo o contraseña incorrectos.';
  if (error.status === 401 || error.status === 403) return 'Tu sesión expiró o no tienes permisos. Inicia sesión nuevamente.';
  if (error.status === 400) return 'Solicitud inválida. Revisa los datos ingresados.';
  if (error.status === 404) return 'Recurso no encontrado.';
  if (error.status >= 500) return 'Error interno del servidor. Intenta más tarde.';

  return 'Ocurrió un error inesperado.';
}
