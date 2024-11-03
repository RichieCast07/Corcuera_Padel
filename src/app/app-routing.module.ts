import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CouplesComponent } from './components/couples/couples.component';
import { CourtsComponent } from './components/courts/courts.component';
import { StoragesComponent } from './components/storages/storages.component';

const routes: Routes = [
  {path: "", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "couples", component: CouplesComponent},
  {path: "courts", component: CourtsComponent},
  {path: "storages", component: StoragesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
