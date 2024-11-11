import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRegisterComponent } from './users/form-register/form-register.component';
import { FormLoginComponent } from './users/form-login/form-login.component';
import { FormCouplesComponent } from './couples/form-couples/form-couples.component';
import { FormCourtsComponent } from './courts/form-courts/form-courts.component';
import { TablesFormationComponent } from './game-formation/tables-formation/tables-formation.component';
import { StoragesComponent } from './storages/storages.component';

const routes: Routes = [
  {path: "", component: FormRegisterComponent},
  {path: "login", component: FormLoginComponent},
  {path: "couples", component: FormCouplesComponent},
  {path: "courts", component: FormCourtsComponent},
  {path: "table-formation", component: TablesFormationComponent},
  {path: "storages", component: StoragesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
