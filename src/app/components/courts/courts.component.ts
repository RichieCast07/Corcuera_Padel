import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courts',
  templateUrl: './courts.component.html',
  styleUrls: ['./courts.component.css']
})
export class CourtsComponent implements OnInit {
  parejas: any[] = [];
  semifinalistas: any[] = [];
  finalista: any = null;
  isModalOpen: boolean = false;
  scoreForm = { nombrePareja: '', puntaje: 0 };
  etapa = 'grupo';

  ngOnInit() {
    this.parejas = JSON.parse(localStorage.getItem('parejas') || '[]');
    this.seleccionarSemifinalistas();
  }

  seleccionarSemifinalistas() {
    this.semifinalistas = [...this.parejas]
      .sort((a, b) => b.puntaje - a.puntaje)
      .slice(0, 2);
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addScore() {
    const pareja = this.parejas.find(p => p.nombre === this.scoreForm.nombrePareja);
    if (pareja) {
      pareja.puntaje += +this.scoreForm.puntaje;

      if (this.etapa === 'semifinal') {
        pareja.puntajeSemifinal = pareja.puntaje;
        this.determinarFinalista();
      }

      localStorage.setItem('parejas', JSON.stringify(this.parejas));
      this.scoreForm = { nombrePareja: '', puntaje: 0 };
      this.closeModal();
      Swal.fire('Puntaje agregado correctamente', '', 'success');

      this.seleccionarSemifinalistas();
    }
  }

  determinarFinalista() {
    if (this.semifinalistas.length > 1) {
      this.finalista = this.semifinalistas.reduce((a, b) => (a.puntajeSemifinal > b.puntajeSemifinal ? a : b));
    }
  }

  cambiarEtapa(nuevaEtapa: string) {
    this.etapa = nuevaEtapa;
    if (nuevaEtapa === 'semifinal') {
      this.seleccionarSemifinalistas();
    }
  }
}
