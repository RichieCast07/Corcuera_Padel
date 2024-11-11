import { Component, OnInit } from '@angular/core';
import { CourtService } from '../../services/court.service';
import { firstValueFrom } from 'rxjs';
import { Court } from '../../interfaces/courts';

@Component({
  selector: 'app-form-courts',
  templateUrl: './form-courts.component.html',
  styleUrls: ['./form-courts.component.css']
})
export class FormCourtsComponent implements OnInit {
  courts: Court[] = [];
  newCourt: Court = { id: 0, nombre: '', localidad: '', tamano: '', disponibilidad: 'Disponible' };
  editIndex: number | null = null;
  constructor(private courtService: CourtService) { }

  ngOnInit(): void {
    this.getCourts();
  }

  getCourts(): void {
    this.courtService.getCourts().subscribe(
      (data) => {
        this.courts = data;
      },
      (error) => {
        console.error('Error al obtener canchas:', error);
      }
    );
  }

  addCourt(): void {
    console.log('Añadiendo cancha...');
    if (this.editIndex === null) {
      this.courtService.addCourt(this.newCourt).subscribe(
        (response) => {
          this.courts.push(response);
          this.resetCourtForm();
        },
        (error) => {
          console.error('Error al añadir cancha:', error);
        }
      );
    } else {
      this.updateCourt();
    }
  }

  editCourt(court: Court): void {
    this.editIndex = this.courts.findIndex((c) => c.id === court.id);
    this.newCourt = { ...court };
  }

  async updateCourt(): Promise<void> {
    try {
      if (this.newCourt.id !== undefined) {
        const courtId = this.newCourt.id;
        const response = await firstValueFrom(this.courtService.updateCourt(courtId, this.newCourt));
        if (this.editIndex !== null) {
          this.courts[this.editIndex] = response;
        }
        this.resetCourtForm();
      } else {
        console.error('Error: El ID de la cancha es undefined');
      }
    } catch (error) {
      console.error('Error al actualizar cancha:', error);
    }
  }

  deleteCourt(court: Court): void {
    if (court.id !== undefined) {
      this.courtService.deleteCourt(court.id).subscribe(
        () => {
          this.courts = this.courts.filter((c) => c.id !== court.id);
        },
        (error) => {
          console.error('Error al eliminar cancha:', error);
        }
      );
    } else {
      console.error('Error: El ID de la cancha es undefined');
    }
  }

  resetCourtForm(): void {
    this.newCourt = { id: 0, nombre: '', localidad: '', tamano: '', disponibilidad: 'Disponible' };
    this.editIndex = null;
  }
}
