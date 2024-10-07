import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-couples',
  templateUrl: './couples.component.html',
  styleUrls: ['./couples.component.css']
})
export class CouplesComponent implements OnInit {
  parejas: any[] = [];
  newCouple = { nombre: '', padelista1: '', padelista2: '', cancha: '' };
  canchas: any[] = [];
  editIndex: number | null = null;

  ngOnInit() {
    this.loadCouples();
    this.loadCanchas();
  }

  loadCouples() {
    this.parejas = JSON.parse(localStorage.getItem('parejas') || '[]');
  }

  loadCanchas() {
    this.canchas = JSON.parse(localStorage.getItem('canchas') || '[]');
  }

  addCouple() {
    if (this.editIndex === null) {
      const nombreExistente = this.parejas.some(pareja => pareja.nombre.toLowerCase() === this.newCouple.nombre.toLowerCase());
      if (nombreExistente) {
        Swal.fire('Este nombre de pareja ya existe. Por favor, elija un nombre diferente.', '', 'error');
        return;
      }
    }

    if (this.editIndex !== null) {
      const oldCancha = this.parejas[this.editIndex].cancha;
      this.parejas[this.editIndex] = { ...this.newCouple };

      if (oldCancha !== this.newCouple.cancha) {
        this.setCanchaStatus(this.newCouple.cancha, 'Ocupada');

        const isCanchaUsed = this.parejas.some(pareja => pareja.cancha === oldCancha);
        if (!isCanchaUsed) {
          this.setCanchaStatus(oldCancha, 'Libre');
        }
      }

      this.editIndex = null;
    } else {
      this.parejas.push({ ...this.newCouple });
      this.setCanchaStatus(this.newCouple.cancha, 'Ocupada');
    }

    localStorage.setItem('parejas', JSON.stringify(this.parejas));
    this.resetForm();
    Swal.fire('Pareja agregada correctamente', '', 'success');
  }

  setCanchaStatus(nombreCancha: string, status: string) {
    const canchaIndex = this.canchas.findIndex(cancha => cancha.nombre === nombreCancha);
    if (canchaIndex !== -1) {
      this.canchas[canchaIndex].disponibilidad = status;
    } else if (status === 'Ocupada') {
      this.canchas.push({ nombre: nombreCancha, disponibilidad: status });
    }
    localStorage.setItem('canchas', JSON.stringify(this.canchas));
  }

  editCouple(index: number) {
    this.newCouple = { ...this.parejas[index] };
    this.editIndex = index;
  }

  deleteCouple(index: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta pareja?')) {
      const canchaNombre = this.parejas[index].cancha;
      this.parejas.splice(index, 1);
      localStorage.setItem('parejas', JSON.stringify(this.parejas));

      const isCanchaUsed = this.parejas.some(pareja => pareja.cancha === canchaNombre);
      if (!isCanchaUsed) {
        this.setCanchaStatus(canchaNombre, 'Libre');
      }
      Swal.fire('Pareja eliminada correctamente', '', 'success');
    }
  }

  // restablece el formulario
  resetForm() {
    this.newCouple = { nombre: '', padelista1: '', padelista2: '', cancha: '' };
    this.editIndex = null;
  }

  getDisponibilidad(nombreCancha: string): string {
    const cancha = this.canchas.find(c => c.nombre === nombreCancha);
    return cancha ? cancha.disponibilidad : 'Libre';
  }
}
