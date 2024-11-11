import { Component, OnInit } from '@angular/core';
import { CoupleService } from '../../services/couple.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-form-couples',
  templateUrl: './form-couples.component.html',
  styleUrls: ['./form-couples.component.css']
})
export class FormCouplesComponent implements OnInit {
  parejas: any[] = [];
  newCouple = { nombre: '', padelista1: '', padelista2: '', cancha: '' };
  editIndex: number | null = null;

  constructor(private coupleService: CoupleService) {}

  ngOnInit(): void {
    this.getCouples();
  }

  async getCouples(): Promise<void> {
    try {
      this.parejas = await firstValueFrom(this.coupleService.getCouples());
    } catch (error) {
      console.error('Error al obtener parejas:', error);
    }
  }

  async addCouple(): Promise<void> {
    try {
      if (this.editIndex === null) {
        const response = await firstValueFrom(this.coupleService.addCouple(this.newCouple));
        this.parejas.push(response);
        this.resetForm();
      } else {
        await this.updateCouple();
      }
    } catch (error) {
      console.error('Error al añadir pareja:', error);
    }
  }

  editCouple(index: number): void {
    this.editIndex = index;
    this.newCouple = { ...this.parejas[index] };
  }

  async updateCouple(): Promise<void> {
    try {
      const coupleId = this.parejas[this.editIndex!].id;
      const response = await firstValueFrom(this.coupleService.updateCouple(coupleId, this.newCouple));
      this.parejas[this.editIndex!] = response;
      this.resetForm();
    } catch (error) {
      console.error('Error al actualizar pareja:', error);
    }
  }

  async deleteCouple(index: number): Promise<void> {
    try {
      const coupleId = this.parejas[index].id;
      await firstValueFrom(this.coupleService.deleteCouple(coupleId));
      this.parejas.splice(index, 1);
    } catch (error) {
      console.error('Error al eliminar pareja:', error);
    }
  }

  resetForm(): void {
    this.newCouple = { nombre: '', padelista1: '', padelista2: '', cancha: '' };
    this.editIndex = null;
  }

  getDisponibilidad(cancha: string): string {
    return cancha === 'Ocupada' ? 'Ocupada' : 'Disponible';
  }
}
