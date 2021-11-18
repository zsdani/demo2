import { Component, OnInit } from '@angular/core';
import {IsAdopted} from '../class/IsAdopted';
import {OwnerShelter} from '../class/OwnerShelter';
import {Router} from '@angular/router';
import {AuthService} from '../Services/auth.service';
import {AdoptedService} from '../Services/adopted.service';
import {ShelterService} from '../Services/shelter.service';
import {MenuService} from '../Services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  show = false;
  public isadopteds: IsAdopted [] = [];
  public isadoptedsadopted: IsAdopted [] = [];
  public isadoptedsvirtual: IsAdopted [] = [];
  public sheltersid: number [] = [];
  owner = '';
  num = 0;

  constructor(
    private router: Router,
    public auth: AuthService,
    public adoptedService: AdoptedService,
    public shelterService: ShelterService,
    public menuService: MenuService,
  ) { }

  ngOnInit(): void {



    this.owner = localStorage.getItem('ownerRole');




    if (localStorage.getItem('ownerRole') === 'USER') {
      this.adoptedService.getadoptedanimalsbyowner(parseInt(localStorage.getItem('ownerID'))).subscribe((res: IsAdopted[]) => {
        this.isadopteds = res;
        console.log('__________');
        console.log(res.length);
        console.log('__________');


      });
    }

    if (localStorage.getItem('ownerRole') === 'ADMIN') {
      this.shelterService.getaSheltertoOwner(parseInt(localStorage.getItem('ownerID'))).subscribe((res: OwnerShelter[]) => {
        for (let i = 0; i < res.length; i++) {
          this.sheltersid[i] = res[i].shelterid;
        }
        for (let i = 0; i < this.sheltersid.length; i++) {
          const PostData = {
            shelter_id: this.sheltersid[i],
            status2: 1,

          };
          this.adoptedService.getadoptedanimals(PostData).subscribe((res2: IsAdopted[]) => {
            this.isadoptedsadopted = res2;
            console.log(this.isadoptedsadopted);

          });

        }

        for (let i = 0; i < this.sheltersid.length; i++) {
          const PostData = {
            shelter_id: this.sheltersid[i],
            status2: 2,

          };
          this.adoptedService.getadoptedanimals(PostData).subscribe((res3: IsAdopted[]) => {
            this.isadoptedsvirtual = res3;
            console.log(this.isadoptedsvirtual);

          });

        }






      });
    }
  }

  goToDogs(animalytype_id: number){

    this.router.navigateByUrl('http://localhost:8080/api/animal/0', {skipLocationChange: true}).then(() =>
      this.router.navigate(['animal', animalytype_id ]));


  }

  goToCats(animalytype_id: number){

    this.router.navigateByUrl('http://localhost:8080/api/animal/1', {skipLocationChange: true}).then(() =>
      this.router.navigate(['animal', animalytype_id]));
  }

  notificationopen(){
    this.show = !this.show;
    this.ngOnInit();



  }
  refresh(){
    this.ngOnInit();
  }



}
