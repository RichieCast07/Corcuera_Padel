import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesFormationComponent } from './tables-formation/tables-formation.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    TablesFormationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class GameFormationModule { }
