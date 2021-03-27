import { Component, OnInit } from '@angular/core';
import {Animal} from "../class/Animal";
import {AnimalService} from "../Services/animal.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AnimaldetailsService} from "../Services/animaldetails.service";
import {Shelter} from "../class/Shelter";
import {ShelterService} from "../Services/shelter.service";



@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css'],
})
export class AnimalsComponent implements OnInit {


  //public animals: any;
  selectedgender: number=-1;
  public selectedanimal: number=-1;
  public selectedshelter:   number=-1;//Shelter = new Shelter();
  public animals: Animal[] = [];
  public genders: number[] = [0,1,-1];
  public animaltypes: number[] = [0,1,-1];
  public shelterss: Shelter[] = [];
  public shelters: number[] = [0,1,-1];
  private gender:number=-1;
  public _x:number=0;
  public  valami: string | null="";

  animal: Animal = new Animal;
  //animals: Array<Animal> = [];

  //public animalss: Animal[] = [];

  constructor(
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
    console.log(this.valami)
    this.animaldetailsService.getAnimal(pageID, this.valami)


  }




/*
  public goToDetails(pageID: number): void {
    console.log(pageID);
    this._x=pageID;
    this.animaldetailsService.getAnimal(pageID)
      .subscribe(res=> {this.animal=res})

  }


 */









/*
  public async ngOnInit(): Promise<void> {
    this.animalss = await this.animalService.getAnimals();

  }

 */



  set x(value: number) {
    this._x = value;
  }

  get x(): number {
    return this._x;
  }




}
