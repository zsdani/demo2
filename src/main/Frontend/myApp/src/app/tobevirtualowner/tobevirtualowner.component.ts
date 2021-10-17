import { Component, OnInit } from '@angular/core';
import {AuthService} from '../Services/auth.service';
import {AnimaldetailsComponent} from '../animaldetails/animaldetails.component';
import {PopupadoptComponent} from '../popupadopt/popupadopt.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AnimaldetailsService} from '../Services/animaldetails.service';
import {Animal} from '../class/Animal';
import {Shelter} from '../class/Shelter';
import {ShelterService} from '../Services/shelter.service';
import {AnimalService} from '../Services/animal.service';


@Component({
  selector: 'app-tobevirtualowner',
  templateUrl: './tobevirtualowner.component.html',
  styleUrls: ['./tobevirtualowner.component.css']
})
export class TobevirtualownerComponent implements OnInit {
  public demo1TabIndex = 1;

  animal: Animal = new Animal;
  public aszam: any;
  public shelterss: Shelter[] = [];
  public animalss: Animal[] = [];
  public selectedshelter = 0;
  public selectedanimal: Animal = null;
  lehet = true;



  constructor(
    public auth: AuthService,
    public animaldetailservice: AnimaldetailsService,
    private  shelterService: ShelterService,
    private animalService: AnimalService,



  ) { }



  ngOnInit(): void {
    const tabCount = 2;
    this.aszam = localStorage.getItem('wirtualowneranimal');
    this.demo1TabIndex = parseInt(localStorage.getItem('kex')) % tabCount;

    if (localStorage.getItem('wirtualowneranimal') !== null) {
      this.animaldetailservice.getAnimal(parseInt(localStorage.getItem('wirtualowneranimal')), this.animaldetailservice.text).subscribe((res: Animal) => {
        console.log(res);
        this.animal = res;
      });
    }




    this.shelterService.getShelters().subscribe((res: Shelter[]) => {
      this.shelterss = res;

    });
    if (this.selectedshelter !== 0) {
      this.animalService.getanimalsbyshelterid(this.selectedshelter).subscribe((res: Animal[]) => {
        this.animalss = res;
        console.log(res);

      });
    }





    localStorage.removeItem('wirtualowneranimal');
    localStorage.removeItem('kex');
    console.log(localStorage.getItem('wirtualowneranimal'));



  }
  function(k: number){
    this.lehet = false;
    this.animalService.getanimalsbyshelterid(this.selectedshelter).subscribe((res: Animal[]) => {
      this.animalss = res;

    });
  }

  cancel(){
    this.selectedshelter = null;
    this.selectedanimal = null;

  }



}
