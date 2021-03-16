import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Animal} from "./class/Animal";
import {AnimalsComponent} from "./animals/animals.component";

import {ConnectionComponent} from "./connection/connection.component";
import {MainpageComponent} from "./mainpage/mainpage.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [

  { path: 'animals', component: AnimalsComponent },
  { path: 'mainpage', component: MainpageComponent },
  { path: 'connection', component: ConnectionComponent },
  { path: 'login', component: LoginComponent },



];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
