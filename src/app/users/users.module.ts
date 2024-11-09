import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRegisterComponent } from './form-register/form-register.component';
import { FormLoginComponent } from './form-login/form-login.component';



@NgModule({
  declarations: [
    FormRegisterComponent,
    FormLoginComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
