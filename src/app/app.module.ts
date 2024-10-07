import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CouplesComponent } from './components/couples/couples.component';
import { NavbarmComponent } from './components/navbarm/navbarm.component';
import { CourtsComponent } from './components/courts/courts.component';
import { ModalCourtsComponent } from './components/modal-courts/modal-courts.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    CouplesComponent,
    NavbarmComponent,
    CourtsComponent,
    ModalCourtsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
