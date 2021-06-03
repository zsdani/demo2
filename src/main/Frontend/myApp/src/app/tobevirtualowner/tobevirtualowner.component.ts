import { Component, OnInit } from '@angular/core';
import {AuthService} from "../Services/auth.service";
import {AnimaldetailsComponent} from "../animaldetails/animaldetails.component";
import {PopupadoptComponent} from "../popupadopt/popupadopt.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tobevirtualowner',
  templateUrl: './tobevirtualowner.component.html',
  styleUrls: ['./tobevirtualowner.component.css']
})
export class TobevirtualownerComponent implements OnInit {

  constructor(
    public auth: AuthService,



  ) { }

  ngOnInit(): void {
  }



}
