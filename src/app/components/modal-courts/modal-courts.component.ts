import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-courts',
  templateUrl: './modal-courts.component.html',
  styleUrls: ['./modal-courts.component.css']
})
export class ModalCourtsComponent {
  isModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
