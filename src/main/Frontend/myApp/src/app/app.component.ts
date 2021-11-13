import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './Services/auth.service';
import {AdoptedService} from './Services/adopted.service';
import {IsAdopted} from './class/IsAdopted';
import {OwnerShelter} from './class/OwnerShelter';
import {ShelterService} from './Services/shelter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'myApp';
  constructor(

    ) {}

    ngOnInit(): void {
  }












}
