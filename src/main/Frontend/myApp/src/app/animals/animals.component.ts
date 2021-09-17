import { Component, OnInit } from '@angular/core';
import {Animal} from "../class/Animal";
import {AnimalService} from "../Services/animal.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AnimaldetailsService} from "../Services/animaldetails.service";
import {Shelter} from "../class/Shelter";
import {ShelterService} from "../Services/shelter.service";
import {HttpClient} from "@angular/common/http";
import {Datee} from "../class/Datee";



@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css'],
})
export class AnimalsComponent implements OnInit {



  //public animals: any;
  selectedgender: number=-1;
  public selectedgonadectomy: number=-1;
  public selectedage: number=-1;
  public selectedshelter:   number=-1;//Shelter = new Shelter();
  public selectedsize:   number=-1;
  public animals: Animal[] = [];
  public genders: number[] = [0,1,-1];
  public animaltypes: number[] = [0,1,-1];
  public shelterss: Shelter[] = [];
  public shelters: number[] = [0,1,-1];
  private gender:number=-1;
  public _x:number=0;
  public  valami: string | null="";



  animal: Animal = new Animal;



  constructor(
    private http: HttpClient,
    private animalService: AnimalService,
    private animaldetailsService: AnimaldetailsService,
    private  shelterService: ShelterService,
    private  rout: ActivatedRoute,

  ) {this.rout.snapshot.paramMap.get('animaltype_id')}

  public  ngOnInit(): void  {
    this.valami=this.rout.snapshot.paramMap.get('animaltype_id');
     this.animalService.getAnimals(this.rout.snapshot.paramMap.get('animaltype_id')).subscribe((res: Animal[])=>{
       this.animals =res;

     });

    this.shelterService.getShelters().subscribe((res: Shelter[])=>{
      this.shelterss =res;

    });




  }




   goToDetails(pageID: number): any {
    console.log(pageID)
    console.log(this.valami)
     localStorage.setItem('animalid', String(pageID));
    this.animaldetailsService.getAnimal(pageID, this.valami)


  }








  set x(value: number) {
    this._x = value;
  }

  get x(): number {
    return this._x;
  }





  myFunction() {
    let PostData = {
      age: this.selectedage,
      size: this.selectedsize,

      gender: this.selectedgender,
      shelter: this.selectedshelter,
      gonadectomy: this.selectedgonadectomy,

    };

    this.animalService.getspecanimals(PostData).subscribe((res: Animal[])=> {
      console.log(res);

    })




  }


}
