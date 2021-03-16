import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Animal} from "./class/Animal";
import {AnimalsComponent} from "./animals/animals.component";

import {ConnectionComponent} from "./connection/connection.component";

const routes: Routes = [

  { path: 'animals', component: AnimalsComponent },

  { path: 'connection', component: ConnectionComponent },



];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
