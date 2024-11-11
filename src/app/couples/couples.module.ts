import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCouplesComponent } from './form-couples/form-couples.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FormCouplesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class CouplesModule { }
