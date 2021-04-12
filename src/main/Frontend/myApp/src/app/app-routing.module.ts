import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Animal} from "./class/Animal";
import {AnimalsComponent} from "./animals/animals.component";

import {ConnectionComponent} from "./connection/connection.component";
import {MainpageComponent} from "./mainpage/mainpage.component";
import {LoginComponent} from "./auth/login/login.component";
import {AnimaldetailsComponent} from "./animaldetails/animaldetails.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {AuthComponent} from "./auth/auth.component";

const routes: Routes = [

  { path: 'animal/:animaltype_id', component: AnimalsComponent },
  //{ path: 'animals', component: AnimalsComponent },
  { path: 'mainpage', component: MainpageComponent },
  { path: 'connection', component: ConnectionComponent },
  { path: 'login', component: AuthComponent },
  { path: ':id', component: AnimaldetailsComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'registed', component: SignupComponent },




];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
