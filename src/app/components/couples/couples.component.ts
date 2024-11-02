import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

interface Cancha {
  nombre: string;
  localidad: string;
  tamano: string;
  disponibilidad: string;
}

@Component({
  selector: 'app-couples',
  templateUrl: './couples.component.html',
  styleUrls: ['./couples.component.css']
})
export class CouplesComponent implements OnInit {
  parejas: any[] = [];
  canchas: Cancha[] = [];
  newCouple = { nombre: '', padelista1: '', padelista2: '', cancha: '' };
  newCancha: Cancha = { nombre: '', localidad: '', tamano: '', disponibilidad: 'Libre' };
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
    const canchaExistente = this.canchas.find(cancha => cancha.nombre.toLowerCase() === this.newCouple.cancha.toLowerCase());
    if (!canchaExistente) {
      Swal.fire('La cancha no existe. Por favor, añada la cancha primero.', '', 'error');
      return;
    }

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

  addCancha() {
    const nombreExistente = this.canchas.some(cancha => cancha.nombre.toLowerCase() === this.newCancha.nombre.toLowerCase());
    if (nombreExistente) {
      Swal.fire('Este nombre de cancha ya existe. Por favor, elija un nombre diferente.', '', 'error');
      return;
    }

    this.canchas.push({ ...this.newCancha });
    localStorage.setItem('canchas', JSON.stringify(this.canchas));
    this.newCancha = { nombre: '', localidad: '', tamano: '', disponibilidad: 'Libre' };
    Swal.fire('Cancha agregada correctamente', '', 'success');
  }

  setCanchaStatus(nombreCancha: string, status: string) {
    const canchaIndex = this.canchas.findIndex(cancha => cancha.nombre === nombreCancha);
    if (canchaIndex !== -1) {
      this.canchas[canchaIndex].disponibilidad = status;
    }
    localStorage.setItem('canchas', JSON.stringify(this.canchas));
  }

  editCouple(index: number) {
    this.newCouple = { ...this.parejas[index] };
    this.editIndex = index;

    const parejaForm = document.getElementById('parejaForm');
    if (parejaForm) {
      parejaForm.scrollIntoView({ behavior: 'smooth' });
    }
  }

  deleteCouple(index: number) {
    if (confirm('¿Estas seguro de que deseas eliminar esta pareja?')) {
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

  editCancha(cancha: Cancha) {
    this.newCancha = { ...cancha };

    const canchaForm = document.getElementById('canchaForm');
    if (canchaForm) {
      canchaForm.scrollIntoView({ behavior: 'smooth' });
    }
  }

  deleteCancha(cancha: Cancha) {
    const canchaIndex = this.canchas.indexOf(cancha);
    if (canchaIndex > -1) {
      this.canchas.splice(canchaIndex, 1);
      localStorage.setItem('canchas', JSON.stringify(this.canchas));
      Swal.fire('Cancha eliminada correctamente', '', 'success');
    }
  }

  resetForm() {
    this.newCouple = { nombre: '', padelista1: '', padelista2: '', cancha: '' };
    this.editIndex = null;
  }

  resetCanchaForm() {
    this.newCancha = { nombre: '', localidad: '', tamano: '', disponibilidad: 'Libre' };
  }

  getDisponibilidad(nombreCancha: string): string {
    const cancha = this.canchas.find(c => c.nombre === nombreCancha);
    return cancha ? cancha.disponibilidad : 'Libre';
  }
}
