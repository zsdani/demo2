import { Component, OnInit } from '@angular/core';
import {AuthService} from '../Services/auth.service';
import {OwnerShelter} from '../class/OwnerShelter';
import {ShelterService} from '../Services/shelter.service';
import {Shelter} from '../class/Shelter';
import {AnimalService} from '../Services/animal.service';
import {Animal} from '../class/Animal';
import {AdoptedService} from '../Services/adopted.service';
import {IsAdopted} from '../class/IsAdopted';
import {User1} from '../class/User1';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public shelterService: ShelterService,
    public animalsService: AnimalService,
    public adoptedService: AdoptedService,
    public authService: AuthService,
  ) { }

  public animal: Animal = new Animal();
  public theuser: User1 = new User1();

  public shelters: Shelter [] = [];
  public animals: Animal [] = [];
  public sumanimals: Animal [] = [];
  public users: User1 [] = [];
  public tomb: number [] = [];
  public animalid: number [] = [];
  public ownerid: number [] = [];

  ngOnInit(): void {
    this.auth.getOwnerbyid(parseInt(localStorage.getItem('ownerID'))).subscribe((res0: User1) => {
      this.theuser = res0;
    });


    if (localStorage.getItem('ownerRole') === 'ADMIN') {
      this.shelterService.getaSheltertoOwner(parseInt(localStorage.getItem('ownerID'))).subscribe((res: OwnerShelter[]) => {
        console.log('menhelyid:');
        console.log(res);
        for (let i = 0; i < res.length; i++) {
          this.tomb[i] = res[i].shelterid;
        }
        for (let i = 0; i < this.tomb.length; i++) {
          this.animalsService.getadoptedanimals(this.tomb[i]).subscribe((res2: Animal[]) => {
            for (let j = 0; j < res2.length; j++) {
              console.log('menhelyesallatokakiknek a statuszuk 1');
              console.log(res2[j]);
              this.animals.push(res2[j]);
              this.animalid.push(res2[j].id);
            }
            for (let k = 0; k < this.animalid.length; k++) {
              this.adoptedService.getbyallatid(this.animalid[k]).subscribe((res3: IsAdopted) => {
                this.ownerid[k] = res3.ownerid;
                console.log('allatok, akikket orokbe fogadtak az owner idje');
                console.log(res3);
                for (let l = 0; l < this.ownerid.length; l++) {
                  this.authService.getOwnerbyid(this.ownerid[l]).subscribe((res4: User1) => {
                    this.animals[l].owner = res4.username;
                    console.log('ownerke neve');
                    console.log(res4);
                  });
                }
              });
            }


          });
        }
      });

    }
  }

  accept(id: number){
    this.adoptedService.acceptadopted(id);
    location.reload();
  }

  refuse(id: number){
    this.adoptedService.refuseadopted(id);
    location.reload();

  }


}
