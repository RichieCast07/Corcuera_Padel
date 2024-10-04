import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-courts',
  templateUrl: './modal-courts.component.html',
  styleUrls: ['./modal-courts.component.css'] // Nota: Corregir 'styleUrl' a 'styleUrls'
})
export class ModalCourtsComponent {
  isModalOpen: boolean = false;

  // Método para abrir el modal
  openModal(): void {
    this.isModalOpen = true;
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.isModalOpen = false;
  }
}
