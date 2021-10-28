import { Component, OnInit } from '@angular/core';
import {Animal} from '../class/Animal';
import {AnimalService} from '../Services/animal.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AnimaldetailsService} from '../Services/animaldetails.service';
import {Shelter} from '../class/Shelter';
import {ShelterService} from '../Services/shelter.service';
import {HttpClient} from '@angular/common/http';
import {Datee} from '../class/Datee';



@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css'],
})
export class AnimalsComponent implements OnInit {



  // public animals: any;
  selectedgender = -1;
  public selectedgonadectomy = -1;
  public selectedage = -1;
  public selectedshelter = -1; // Shelter = new Shelter();
  public selectedsize = -1;
  public animals: Animal[] = [];
  public genders: number[] = [0, 1, -1];
  public animaltypes: number[] = [0, 1, -1];
  public shelterss: Shelter[] = [];
  public shelters: number[] = [0, 1, -1];
  private gender = -1;
  public _x = 0;
  public  valami: string | null = '';



  animal: Animal = new Animal;



  constructor(
    private http: HttpClient,
    private animalService: AnimalService,
    private animaldetailsService: AnimaldetailsService,
    private  shelterService: ShelterService,
    private  rout: ActivatedRoute,

  ) {this.rout.snapshot.paramMap.get('animaltype_id'); }

  public  ngOnInit(): void  {
    localStorage.setItem('animalid', '0');
    localStorage.setItem('animaltype', this.rout.snapshot.paramMap.get('animaltype_id'));
    this.valami = this.rout.snapshot.paramMap.get('animaltype_id');
    this.animalService.getAnimals(this.rout.snapshot.paramMap.get('animaltype_id')).subscribe((res: Animal[]) => {
       this.animals = res;
       console.log(res)

     });

    this.shelterService.getShelters().subscribe((res: Shelter[]) => {
      this.shelterss = res;

    });


  }




   goToDetails(pageID: number): any {
    console.log(pageID);
    console.log(this.valami);
    localStorage.setItem('animalid', String(pageID));
    this.animaldetailsService.getAnimal(pageID, this.valami);


  }













  myFunction() {
    const PostData = {
      age: this.selectedage,
      size: this.selectedsize,
      animaltype: parseInt(localStorage.getItem('animaltype')),
      gender: this.selectedgender,
      shelter_id: this.selectedshelter,
      gonadectomy: this.selectedgonadectomy,

    };

    this.animalService.getspecanimals(PostData).subscribe((res: Animal[]) => {
      console.log('na?');
      console.log(res);
      this.animals = res;


    });




  }


  set x(value: number) {
    this._x = value;
  }

  get x(): number {
    return this._x;
  }


}
