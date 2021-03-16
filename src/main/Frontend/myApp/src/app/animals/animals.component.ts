import { Component, OnInit } from '@angular/core';
import {Animal} from "../class/Animal";
import {AnimalService} from "../Services/animal.service";

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
  //animals: Array<Animal> = [];

  //public animalss: Animal[] = [];

  constructor(
    private animalService: AnimalService
  ) { }

  public async  ngOnInit(): Promise<void> {


    this.animals= await this.animalService.getAnimals();
  }



/*
  public async ngOnInit(): Promise<void> {
    this.animalss = await this.animalService.getAnimals();

  }

 */






}
