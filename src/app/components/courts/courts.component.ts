import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courts',
  templateUrl: './courts.component.html',
  styleUrls: ['./courts.component.css']
})
export class CourtsComponent implements OnInit {
  parejas: any[] = [];
  canchas: any[] = [];
  semifinalistas: any[] = [];
  finalista: any = null;
  isModalOpen: boolean = false;
  isRuletaOpen: boolean = false;
  isModalOpenCourts: boolean = false;
  scoreForm = { nombrePareja: '', puntaje: 0 };
  etapa = 'grupo';
  emparejamientos: any[] = [];

  ngOnInit() {
    this.parejas = JSON.parse(localStorage.getItem('parejas') || '[]');
    this.canchas = JSON.parse(localStorage.getItem('canchas') || '[]');
    this.seleccionarSemifinalistas();
  }

  iniciarRuleta() {
    this.isRuletaOpen = true;
    this.emparejamientos = this.generarEmparejamientosAleatorios();
  }

  closeRuleta() {
    this.isRuletaOpen = false;
  }

  generarEmparejamientosAleatorios(): any[] {
    const shuffled = this.shuffleArray([...this.parejas]);
    const pairs = [];
    for (let i = 0; i < shuffled.length; i += 2) {
      if (shuffled[i + 1]) {
        pairs.push([shuffled[i], shuffled[i + 1]]);
      }
    }
    return pairs;
  }

  shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
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

  openModalCourts() {
    this.isModalOpenCourts = true;
  }

  closeModalCourts() {
    this.isModalOpenCourts = false;
  }

  addScore() {
    const pareja = this.parejas.find(p => p.nombre === this.scoreForm.nombrePareja);
    if (pareja) {
      const puntajeNuevo = parseFloat(this.scoreForm.puntaje.toString());
      if (!isNaN(puntajeNuevo)) {
        pareja.puntaje = (pareja.puntaje || 0) + puntajeNuevo;
        if (this.etapa === 'semifinal') {
          pareja.puntajeSemifinal = pareja.puntaje;
          this.determinarFinalista();
        }
        localStorage.setItem('parejas', JSON.stringify(this.parejas));
        this.scoreForm = { nombrePareja: '', puntaje: 0 };
        this.closeModal();
        Swal.fire('Puntaje agregado correctamente', '', 'success');
        this.seleccionarSemifinalistas();
      } else {
        Swal.fire('El puntaje ingresado no es válido.', '', 'error');
      }
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

  deleteCouple(index: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta pareja?')) {
      const parejaEliminada = this.parejas[index];
      this.parejas.splice(index, 1);
      localStorage.setItem('parejas', JSON.stringify(this.parejas));

      const parejasEliminadas = JSON.parse(localStorage.getItem('parejasEliminadas') || '[]');
      parejasEliminadas.push(parejaEliminada);
      localStorage.setItem('parejasEliminadas', JSON.stringify(parejasEliminadas));

      Swal.fire('Pareja eliminada correctamente', '', 'success');
    }
  }

  deleteCancha(index: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta cancha?')) {
      const canchaEliminada = this.canchas[index];
      this.canchas.splice(index, 1);
      localStorage.setItem('canchas', JSON.stringify(this.canchas));

      const canchasEliminadas = JSON.parse(localStorage.getItem('canchasEliminadas') || '[]');
      canchasEliminadas.push(canchaEliminada);
      localStorage.setItem('canchasEliminadas', JSON.stringify(canchasEliminadas));

      Swal.fire('Cancha eliminada correctamente', '', 'success');
    }
  }

  storeCouple() {
    const nuevaPareja = {
      nombre: this.scoreForm.nombrePareja,
      puntaje: 0
    };
    const parejasAlmacenadas = JSON.parse(localStorage.getItem('parejasAlmacenadas') || '[]');
    parejasAlmacenadas.push(nuevaPareja);
    localStorage.setItem('parejasAlmacenadas', JSON.stringify(parejasAlmacenadas));

    this.parejas = this.parejas.filter(p => p.nombre !== this.scoreForm.nombrePareja);
    localStorage.setItem('parejas', JSON.stringify(this.parejas));
    this.scoreForm = { nombrePareja: '', puntaje: 0 };
    this.closeModalCourts();
    Swal.fire('Pareja almacenada correctamente', '', 'success');
  }
}
