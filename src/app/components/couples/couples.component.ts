import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-couples',
  templateUrl: './couples.component.html',
  styleUrls: ['./couples.component.css']
})
export class CouplesComponent {
  // Propiedades para cada pareja
  nombrePareja1: string = '';
  padelista1_1: string = '';
  padelista2_1: string = '';
  campoJuego1: string = '';

  nombrePareja2: string = '';
  padelista1_2: string = '';
  padelista2_2: string = '';
  campoJuego2: string = '';

  nombrePareja3: string = '';
  padelista1_3: string = '';
  padelista2_3: string = '';
  campoJuego3: string = '';

  nombrePareja4: string = '';
  padelista1_4: string = '';
  padelista2_4: string = '';
  campoJuego4: string = '';

  nombrePareja5: string = '';
  padelista1_5: string = '';
  padelista2_5: string = '';
  campoJuego5: string = '';

  nombrePareja6: string = '';
  padelista1_6: string = '';
  padelista2_6: string = '';
  campoJuego6: string = '';

  parejas: any[] = [];

  constructor(private router: Router) {}

  addCouple() {
    console.log('Agregado Correctamente');
    // Validar que todos los campos estén completos
    if (!this.nombrePareja1 || !this.padelista1_1 || !this.padelista2_1 ||
        !this.nombrePareja2 || !this.padelista1_2 || !this.padelista2_2 ||
        !this.nombrePareja3 || !this.padelista1_3 || !this.padelista2_3 ||
        !this.nombrePareja4 || !this.padelista1_4 || !this.padelista2_4 ||
        !this.nombrePareja5 || !this.padelista1_5 || !this.padelista2_5 ||
        !this.nombrePareja6 || !this.padelista1_6 || !this.padelista2_6) {
      Swal.fire('Por favor complete todos los campos', '', 'error');
      return;
    }

    // Crear las 6 parejas
    const nuevaPareja1 = {
      nombre: this.nombrePareja1,
      padelista1: this.padelista1_1,
      padelista2: this.padelista2_1,
      campoJuego: this.campoJuego1,
      puntaje: 0
    };

    const nuevaPareja2 = {
      nombre: this.nombrePareja2,
      padelista1: this.padelista1_2,
      padelista2: this.padelista2_2,
      campoJuego: this.campoJuego2,
      puntaje: 0
    };

    const nuevaPareja3 = {
      nombre: this.nombrePareja3,
      padelista1: this.padelista1_3,
      padelista2: this.padelista2_3,
      campoJuego: this.campoJuego3,
      puntaje: 0
    };

    const nuevaPareja4 = {
      nombre: this.nombrePareja4,
      padelista1: this.padelista1_4,
      padelista2: this.padelista2_4,
      campoJuego: this.campoJuego4,
      puntaje: 0
    };

    const nuevaPareja5 = {
      nombre: this.nombrePareja5,
      padelista1: this.padelista1_5,
      padelista2: this.padelista2_5,
      campoJuego: this.campoJuego5,
      puntaje: 0
    };

    const nuevaPareja6 = {
      nombre: this.nombrePareja6,
      padelista1: this.padelista1_6,
      padelista2: this.padelista2_6,
      campoJuego: this.campoJuego6,
      puntaje: 0
    };

    // Guarda las parejas en el LocalStorage
    this.parejas.push(nuevaPareja1, nuevaPareja2, nuevaPareja3, nuevaPareja4, nuevaPareja5, nuevaPareja6);
    localStorage.setItem('parejas', JSON.stringify(this.parejas));

    Swal.fire('Emparejamiento aleatorio', '', 'success').then(() => {
      this.router.navigate(['/courts']);
    });
  }

  ngOnInit() {
    // Cargar parejas existentes
    this.parejas = JSON.parse(localStorage.getItem('parejas') || '[]');
  }
}
