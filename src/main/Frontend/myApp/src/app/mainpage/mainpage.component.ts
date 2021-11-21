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
import {FormControl, FormGroup} from '@angular/forms';


import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import {isElementScrolledOutsideView} from '@angular/cdk/overlay/position/scroll-clip';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})




export class MainpageComponent implements OnInit {



  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;



  title = 'angular-text-search-highlight';
  searchText = '';
  characters = [];
  map1 = new Map();





  imageObject: Array<object> = [
    {
      image: '/assets/pic/kutya.jpg',
      thumbImage: '/assets/pic/kutya.jpg',

    },
    {
      image: '/assets/pic/tanya.jpg',
      thumbImage: '/assets/pic/tanya.jpg',

    },
    {
      image: '/assets/pic/kutya.jpg',
      thumbImage: '/assets/pic/kutya.jpg',

    }
    ,
    {
      image: '/assets/pic/photo_2021-10-11_16-47-23.jpg',
      thumbImage: '/assets/pic/photo_2021-10-11_16-47-23.jpg',

    },
    {
      imageSize: {width: '800px', height: '300px', space: 4},
      image: '/assets/pic/kutya.jpg',
      thumbImage: '/assets/pic/kutya.jpg',


    }




  ];


  constructor(
    public auth: AuthService,
    public shelterService: ShelterService,
    public animalsService: AnimalService,
    public adoptedService: AdoptedService,
    public authService: AuthService,
  ) { }


  public thenumm: number [] = [];
  public theown: number [] = [];
  public thesearchanimal: Animal = new Animal();
  public theisadpoted: IsAdopted = new IsAdopted();
  public thesearchanimals: Animal [] = [];
  public theisadopteds: IsAdopted [] = [];
  public thestatus: number [] =  [];

  public animal: Animal = new Animal();
  public theuser: User1 = new User1();

  public shelters: Shelter [] = [];
  public animals: Animal [] = [];
  public sumanimals: Animal [] = [];
  public users: User1 [] = [];
  public tomb: number [] = [];
  public animalid: number [] = [];
  public ownerid: number [] = [];
  public usersi: User1 [] = [];
  public tombi: number [] = [];
  public animalidi: number [] = [];
  public owneridi: number [] = [];
  public sheltersi: Shelter [] = [];
  public animalsi: Animal [] = [];

  show: boolean;

  public usersii: User1 [] = [];
  public tombii: number [] = [];
  public animalidii: number [] = [];
  public owneridii: number [] = [];
  public sheltersii: Shelter [] = [];
  public animalsii: Animal [] = [];

  ngOnInit(): void {







    // ez csak hogy tudjam melyik felhasználóval vagyok épp bejelentekzve
    this.auth.getOwnerbyid(parseInt(localStorage.getItem('ownerID'))).subscribe((res0: User1) => {
      this.theuser = res0;
    });


    if (localStorage.getItem('ownerRole') === 'ADMIN') {




      this.shelterService.getaSheltertoOwner(parseInt(localStorage.getItem('ownerID'))).subscribe((res: OwnerShelter[]) => {
        // console.log('menhelyid:');
        // console.log(res);
        for (let i = 0; i < res.length; i++) {
          this.tomb[i] = res[i].shelterid;
        }
        for (let i = 0; i < this.tomb.length; i++) {
          const PostData = {
            shelter_id: this.tomb[i],
            status2: 1,

          };
          this.adoptedService.getadoptedanimals(PostData).subscribe((res2: IsAdopted[]) => {
            console.log(res2);
            for (let j = 0; j < res2.length; j++) {
              console.log('menhelyesallatokakiknek a statuszuk 1');
              console.log(res2[j]);

              this.animalid.push(res2[j].allatid);
              this.ownerid.push(res2[j].ownerid);


              console.log(this.animalid);
              console.log(this.animalid.length);
            }
            if (i === this.tomb.length - 1) {




            for (let k = 0; k < this.animalid.length; k++) {

              this.animalsService.getanimalbyid(this.animalid[k]).subscribe((res3: Animal) => {
                console.log(this.animalid[k] + ' ' + k);
                console.log('allat:');
                console.log(res3);
                this.animals.push(res3);


                this.characters.push(res3.name + ' (' + res3.shelter.name + ')');
                this.map1.set(res3.name + ' (' + res3.shelter.name + ')', res3.id);
                this.options.push(res3.name + ' (' + res3.shelter.name + ')');


                this.authService.getOwnerbyid(this.ownerid[k]).subscribe((res4: User1) => {
                  this.animals[k].owner = res4.username;
                  console.log('ownerke neve');
                  console.log(res4);
                });


              });


            }
          }else{
          }




          });
        }




      });






      // virtual
      this.shelterService.getaSheltertoOwner(parseInt(localStorage.getItem('ownerID'))).subscribe((res: OwnerShelter[]) => {
        // console.log('menhelyid:');
        // console.log(res);
        for (let i = 0; i < res.length; i++) {
          this.tombi[i] = res[i].shelterid;
        }
        for (let i = 0; i < this.tomb.length; i++) {
          const PostDatai = {
            shelter_id: this.tombi[i],
            status2: 2,

          };
          this.adoptedService.getadoptedanimals(PostDatai).subscribe((res2: IsAdopted[]) => {
            console.log(res2);
            for (let j = 0; j < res2.length; j++) {
              console.log('menhelyesallatokakiknek a statuszuk 1');
              console.log(res2[j]);

              this.animalidi.push(res2[j].allatid);
              this.owneridi.push(res2[j].ownerid);


              console.log(this.animalidi);
              console.log(this.animalidi.length);
            }
            if (i === this.tombi.length - 1) {




              for (let k = 0; k < this.animalidi.length; k++) {

                this.animalsService.getanimalbyid(this.animalidi[k]).subscribe((res3: Animal) => {
                  console.log(this.animalidi[k] + ' ' + k);
                  console.log('allat:');
                  console.log(res3);
                  this.animalsi.push(res3);


                  this.characters.push(res3.name + ' (' + res3.shelter.name + ')');
                  this.map1.set(res3.name + ' (' + res3.shelter.name + ')', res3.id);
                  this.options.push(res3.name + ' (' + res3.shelter.name + ')');


                  this.authService.getOwnerbyid(this.owneridi[k]).subscribe((res4: User1) => {
                    this.animalsi[k].owner = res4.username;
                    console.log('ownerke neve');
                    console.log(res4);
                  });


                });


              }
            }else{
            }




          });
        }




      });

      // Elfogadott virtuális ownerek
      this.shelterService.getaSheltertoOwner(parseInt(localStorage.getItem('ownerID'))).subscribe((res: OwnerShelter[]) => {
        // console.log('menhelyid:');
        // console.log(res);
        for (let i = 0; i < res.length; i++) {
          this.tombii[i] = res[i].shelterid;
        }
        for (let i = 0; i < this.tombii.length; i++) {
          const PostDataii = {
            shelter_id: this.tombii[i],
            status2: 3,

          };
          this.adoptedService.getadoptedanimals(PostDataii).subscribe((res2: IsAdopted[]) => {
            console.log(res2);
            for (let j = 0; j < res2.length; j++) {
              console.log('menhelyesallatokakiknek a statuszuk 1');
              console.log(res2[j]);

              this.animalidii.push(res2[j].allatid);
              this.owneridii.push(res2[j].ownerid);


              console.log(this.animalidii);
              console.log(this.animalidii.length);
            }
            if (i === this.tombii.length - 1) {




              for (let k = 0; k < this.animalidii.length; k++) {

                this.animalsService.getanimalbyid(this.animalidii[k]).subscribe((res3: Animal) => {
                  console.log(this.animalidii[k] + ' ' + k);
                  console.log('allat:');
                  console.log(res3);
                  this.animalsii.push(res3);


                  this.characters.push(res3.name + ' (' + res3.shelter.name + ')');
                  this.map1.set(res3.name + ' (' + res3.shelter.name + ')', res3.id);
                  this.options.push(res3.name + ' (' + res3.shelter.name + ')');


                  this.authService.getOwnerbyid(this.owneridii[k]).subscribe((res4: User1) => {
                    this.animalsii[k].owner = res4.username;
                    console.log('ownerke neve');
                    console.log(res4);
                  });


                });


              }
            }else{
            }




          });
        }




      });






    }

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

  }

  accept(id: number){
    this.adoptedService.acceptadopted(id);
    location.reload();
  }

  refuse(id: number){
    this.adoptedService.refuseadopted(id);
    location.reload();

  }

  search(value: string){

    this.thenumm = [];
    this.theown = [];
    this.thesearchanimal = null;
    this.theisadpoted = null;
    this.thesearchanimals = [];
    this.theisadopteds = [];
    this.thestatus = [];


    this.show = true;
    // console.log(parseInt(this.map1.get(value)));

    this.adoptedService.getadoptedbyallatid(parseInt(this.map1.get(value))).subscribe((res: IsAdopted[]) => {
      for (let i = 0; i < res.length; i++) {
        this.thenumm.push(res[i].allatid);
        this.theown.push(res[i].ownerid);
        this.theisadopteds.push(res[i]);
        this.thestatus.push(res[i].status2);
        // console.log(this.theisadopteds[i]);
      }
      for (let i = 0; i < res.length; i++) {
        // console.log(this.thenumm[i]);
        this.animalsService.getanimalbyid(this.thenumm[i]).subscribe((res1: Animal) => {
          res1.thestatus = this.thestatus[i];
          this.thesearchanimals.push(res1);
          // console.log(res1);

          this.authService.getOwnerbyid(this.theown[i]).subscribe((res2: User1) => {
            this.thesearchanimals[i].owner = res2.username;
            // console.log(res2);

          });


        });
      }


    });



  }

  deletesearch(){
    //this.options=null;
    location.reload();


  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
/*
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

 */


}
