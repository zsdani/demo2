import { Component, OnInit } from '@angular/core';
import {Animal} from "../class/Animal";
import {AnimalService} from "../Services/animal.service";
import {Route, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AnimaldetailsService} from "../Services/animaldetails.service";



@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css'],
})
export class AnimalsComponent implements OnInit {


  //public animals: any;
  selectedgender: number=-1;
  public animals: Animal[] = [];
  public genders: number[] = [0,1,-1];
  private gender:number=-1;
  public _x:number=0;
  public selectedAnimal: Animal = new Animal;
  animal: Animal = new Animal;
  //animals: Array<Animal> = [];

  //public animalss: Animal[] = [];

  constructor(
    private animalService: AnimalService,
    private animaldetailsService: AnimaldetailsService,

  ) { }

  public  ngOnInit(): void  {


     this.animalService.getAnimals().subscribe((res: Animal[])=>{
       this.animals =res;
     });



  }

    //console.log(this.animals)


   goToDetails(pageID: number): any {
    console.log(pageID)
    this.animaldetailsService.getAnimal(pageID)


  }




/*
  public goToDetails(pageID: number): void {
    console.log(pageID);
    this._x=pageID;
    this.animaldetailsService.getAnimal(pageID)
      .subscribe(res=> {this.animal=res})

  }


 */





  public onNewClicka(): void {
    this.selectedAnimal = new Animal();
  }



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
