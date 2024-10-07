import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courts',
  templateUrl: './courts.component.html',
  styleUrls: ['./courts.component.css']
})
export class CourtsComponent implements OnInit {
  parejas: any[] = [];
  topParejas: any[] = [];
  isModalOpen: boolean = false;

  ngOnInit() {
    this.parejas = JSON.parse(localStorage.getItem('parejas') || '[]');
    this.parejas = this.shuffleArray(this.parejas);
  }

  shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  actualizarPuntajes(nuevasParejas: any[]) {
    this.parejas = nuevasParejas;
    this.topParejas = this.parejas.sort((a, b) => b.puntaje - a.puntaje).slice(0, 2);
  }

  eliminarJuego() {
    if (confirm('¿Estas seguro de que deseas eliminar este juego?')) {
      localStorage.removeItem('parejas');
      this.parejas = [];
      this.topParejas = [];
      alert('Juego eliminado correctamente');
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
