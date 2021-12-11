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
import {AdoptedService} from "../Services/adopted.service";
import {User1} from "../class/User1";
import {MatSnackBar} from "@angular/material/snack-bar";


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
  public valami: string;





  constructor(
    public auth: AuthService,
    public animaldetailservice: AnimaldetailsService,
    private  shelterService: ShelterService,
    private animalService: AnimalService,
    private adoptedService: AdoptedService,
    private snackBar: MatSnackBar,



  ) { }



  ngOnInit(): void {
    const tabCount = 2;
    this.aszam = localStorage.getItem('wirtualowneranimal');
    this.demo1TabIndex = parseInt(localStorage.getItem('kex')) % tabCount;

    this.animalService.getanimalbyid(parseInt(localStorage.getItem('animalid'))).subscribe((res: Animal) => {
      console.log(res.shelter.id);
      this.valami = res.shelter.id + "";
      localStorage.setItem('shelter_id', this.valami);
    });

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
  virtauladopt(){


    const PostData = {
      allatid: parseInt(localStorage.getItem('animalid')) ,
      ownerid: this.auth.user.id,
      shelter_id: parseInt(localStorage.getItem('shelter_id')),
      status2: 2

    };
    console.log(PostData);
    this.adoptedService.addadopted(PostData);
    this.snackBar.open("Ne felejtsd el az utalás, különben nem sikeres a virtuális örökbefogadás")._dismissAfter(4000);
    location.reload();
  }



}
