import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCourtsComponent } from './form-courts/form-courts.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    FormCourtsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class CourtsModule { }
