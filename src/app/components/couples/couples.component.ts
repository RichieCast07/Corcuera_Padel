import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

interface Cancha {
  nombre: string;
  localidad: string;
  tamano: string;
  disponibilidad: string;
}

interface Pareja {
  nombre: string;
  padelista1: string;
  padelista2: string;
  cancha: string;
  puntaje: number;
}

@Component({
  selector: 'app-couples',
  templateUrl: './couples.component.html',
  styleUrls: ['./couples.component.css']
})
export class CouplesComponent implements OnInit {
  parejas: Pareja[] = [];
  canchas: Cancha[] = [];
  newCouple: Pareja = { nombre: '', padelista1: '', padelista2: '', cancha: '', puntaje: 0 };
  newCancha: Cancha = { nombre: '', localidad: '', tamano: '', disponibilidad: 'Libre' };
  editIndex: number | null = null;
  editCanchaIndex: number | null = null; // Nuevo índice para editar canchas

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
      this.parejas.push({ ...this.newCouple });
    } else {
      const oldCancha = this.parejas[this.editIndex].cancha;
      this.parejas[this.editIndex] = { ...this.newCouple };

      if (oldCancha !== this.newCouple.cancha) {
        this.setCanchaStatus(this.newCouple.cancha, 'Ocupada');
        const isOldCanchaUsed = this.parejas.some(pareja => pareja.cancha === oldCancha);
        if (!isOldCanchaUsed) {
          this.setCanchaStatus(oldCancha, 'Libre');
        }
      }
      this.editIndex = null;
    }

    this.setCanchaStatus(this.newCouple.cancha, 'Ocupada');
    localStorage.setItem('parejas', JSON.stringify(this.parejas));
    this.resetForm();
    Swal.fire('Pareja agregada correctamente', '', 'success');
  }

  addCancha() {
    if (this.editCanchaIndex !== null) {
      this.canchas[this.editCanchaIndex] = { ...this.newCancha };
      this.editCanchaIndex = null;
    } else {
      const nombreExistente = this.canchas.some(cancha => cancha.nombre.toLowerCase() === this.newCancha.nombre.toLowerCase());
      if (nombreExistente) {
        Swal.fire('Este nombre de cancha ya existe. Por favor, elija un nombre diferente.', '', 'error');
        return;
      }
      this.canchas.push({ ...this.newCancha });
    }
    localStorage.setItem('canchas', JSON.stringify(this.canchas));
    this.resetCanchaForm();
    Swal.fire('Cancha agregada correctamente', '', 'success');
  }

  deleteCouple(index: number) {
    const parejaEliminada = this.parejas[index];
    this.parejas.splice(index, 1);
    localStorage.setItem('parejas', JSON.stringify(this.parejas));

    const parejasAlmacenadas = JSON.parse(localStorage.getItem('parejasAlmacenadas') || '[]');
    parejasAlmacenadas.push(parejaEliminada);
    localStorage.setItem('parejasAlmacenadas', JSON.stringify(parejasAlmacenadas));

    this.setCanchaStatus(parejaEliminada.cancha, 'Libre');
    Swal.fire('Pareja almacenada correctamente', '', 'success');
  }

  deleteCancha(cancha: Cancha) {
    const canchaIndex = this.canchas.indexOf(cancha);
    if (canchaIndex > -1) {
      const canchaEliminada = this.canchas[canchaIndex];
      this.canchas.splice(canchaIndex, 1);
      localStorage.setItem('canchas', JSON.stringify(this.canchas));

      const canchasAlmacenadas = JSON.parse(localStorage.getItem('canchasEliminadas') || '[]');
      canchasAlmacenadas.push(canchaEliminada);
      localStorage.setItem('canchasEliminadas', JSON.stringify(canchasAlmacenadas));

      Swal.fire('Cancha almacenada correctamente', '', 'success');
    }
  }

  editCouple(index: number) {
    this.newCouple = { ...this.parejas[index] };
    this.editIndex = index;
  }

  editCancha(cancha: Cancha) {
    const index = this.canchas.indexOf(cancha);
    if (index > -1) {
      this.newCancha = { ...cancha };
      this.editCanchaIndex = index;
    }
  }

  setCanchaStatus(nombreCancha: string, status: string) {
    const canchaIndex = this.canchas.findIndex(cancha => cancha.nombre === nombreCancha);
    if (canchaIndex !== -1) {
      this.canchas[canchaIndex].disponibilidad = status;
    }
    localStorage.setItem('canchas', JSON.stringify(this.canchas));
  }

  getDisponibilidad(nombreCancha: string): string {
    const cancha = this.canchas.find(c => c.nombre === nombreCancha);
    return cancha ? cancha.disponibilidad : 'Libre';
  }

  resetForm() {
    this.newCouple = { nombre: '', padelista1: '', padelista2: '', cancha: '', puntaje: 0 };
    this.editIndex = null;
  }

  resetCanchaForm() {
    this.newCancha = { nombre: '', localidad: '', tamano: '', disponibilidad: 'Libre' };
    this.editCanchaIndex = null;
  }
}
