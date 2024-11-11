import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tables-formation',
  templateUrl: './tables-formation.component.html',
  styleUrl: './tables-formation.component.css'
})
export class TablesFormationComponent {

  parejas: any[] = [];
  scoreForm = { nombrePareja: '', puntaje: 0 };
  isModalOpen = false;
  isModalOpenCourts = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getParejas();
  }

  getParejas() {
    this.http.get<any[]>('/api/couples').subscribe(data => {
      this.parejas = data;
    });
  }

  addScore() {
    this.http.post('/api/couples/add-score', this.scoreForm).subscribe(() => {
      this.getParejas();
      this.closeModal();
    });
  }

  storeCouple() {
    this.http.post('/api/couples', { nombre: this.scoreForm.nombrePareja, puntaje: 0 }).subscribe(() => {
      this.getParejas();
      this.closeModalCourts();
    });
  }

  iniciarRuleta() {
    // Lógica de ruleta aleatoria
  }

  cambiarEtapa(etapa: string) {
    // Lógica para cambiar etapas
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openModalCourts() {
    this.isModalOpenCourts = true;
  }

  closeModalCourts() {
    this.isModalOpenCourts = false;
  }
}
