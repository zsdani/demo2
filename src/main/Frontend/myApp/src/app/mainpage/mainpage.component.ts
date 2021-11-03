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
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})




export class MainpageComponent implements OnInit {





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
        console.log('menhelyid:');
        console.log(res);
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

            console.log("allatidek");
            console.log(this.animalid);
            for (let k = 0; k < this.animalid.length; k++) {
              this.animalsService.getanimalbyid(this.animalid[k]).subscribe((res3: Animal) => {
                console.log("allat:");
                console.log(res3);
                this.animals.push(res3);


                this.authService.getOwnerbyid(this.ownerid[k]).subscribe((res4: User1) => {
                    this.animals[k].owner = res4.username;
                    console.log('ownerke neve');
                    console.log(res4);
                  });



              });
            }
            }
          });
        }

      });


      // virtual
      this.shelterService.getaSheltertoOwner(parseInt(localStorage.getItem('ownerID'))).subscribe((res: OwnerShelter[]) => {
        console.log('menhelyid:');
        console.log(res);
        for (let i = 0; i < res.length; i++) {
          this.tombi[i] = res[i].shelterid;
        }
        for (let i = 0; i < this.tombi.length; i++) {
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

              console.log("allatidek");
              console.log(this.animalidi);
              for (let k = 0; k < this.animalidi.length; k++) {
                this.animalsService.getanimalbyid(this.animalidi[k]).subscribe((res3: Animal) => {
                  console.log("allat:");
                  console.log(res3);
                  this.animalsi.push(res3);


                  this.authService.getOwnerbyid(this.owneridi[k]).subscribe((res4: User1) => {
                    this.animalsi[k].owner = res4.username;
                    console.log('ownerke neve');
                    console.log(res4);
                  });



                });
              }
            }
          });
        }

      });

      // Elfogadott virtuális ownerek
      this.shelterService.getaSheltertoOwner(parseInt(localStorage.getItem('ownerID'))).subscribe((res: OwnerShelter[]) => {
        console.log('menhelyid:');
        console.log(res);
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

              console.log("allatidek");
              console.log(this.animalidii);
              for (let k = 0; k < this.animalidii.length; k++) {
                this.animalsService.getanimalbyid(this.animalidii[k]).subscribe((res3: Animal) => {
                  console.log("allat:");
                  console.log(res3);
                  this.animalsii.push(res3);


                  this.authService.getOwnerbyid(this.owneridii[k]).subscribe((res4: User1) => {
                    this.animalsii[k].owner = res4.username;
                    console.log('ownerke neve');
                    console.log(res4);
                  });



                });
              }
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
