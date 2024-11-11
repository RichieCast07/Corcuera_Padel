import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoragesComponent } from './storages.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    StoragesComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class StoragesModule { }
