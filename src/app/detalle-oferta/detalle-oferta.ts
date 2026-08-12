import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-oferta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-oferta.html'
})
export class DetalleOferta {
  constructor(private router: Router) {}

  volver() {
    this.router.navigate(['/dashboard']);
  }

  postular() {
    alert('¡Felicidades! Has postulado a esta oferta con éxito.');
    this.router.navigate(['/dashboard']);
  }
}