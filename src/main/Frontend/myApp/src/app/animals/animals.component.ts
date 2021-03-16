import { Component, OnInit } from '@angular/core';
import {Animal} from "../class/Animal";
import {AnimalService} from "../Services/animal.service";
import {Route, Router} from "@angular/router";


@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {
  //public animals: any;
  selectedgender: number=-1;
  public animals: Animal[] = [];
  public genders: number[] = [0,1,-1];
  public gender:number=-1;
  public selectedAnimal: Animal = new Animal;
  //animals: Array<Animal> = [];

  //public animalss: Animal[] = [];

  constructor(
    private animalService: AnimalService,
    private router:Router

  ) { }

  public async  ngOnInit(): Promise<void> {


    this.animals= await this.animalService.getAnimals();
  }

  async goToDetails(pageID: number): Promise<void> {
    this.selectedAnimal = await this.animalService.getAnimal(pageID)
  }

  public onNewClicka(): void {
    this.selectedAnimal = new Animal();
  }



/*
  public async ngOnInit(): Promise<void> {
    this.animalss = await this.animalService.getAnimals();

  }

 */






}
