import { Component, OnInit } from '@angular/core';
import {Animal} from "../class/Animal";
import {AnimalService} from "../Services/animal.service";
import {Shelter} from "../class/Shelter";
import {ShelterService} from "../Services/shelter.service";

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  public shelters: Shelter[] = [];

  selected: number=-1;
  public shelter: Shelter | undefined;


  constructor(
    private shelterService: ShelterService

  ) { }

  public async  ngOnInit(): Promise<void> {


    this.shelters= await this.shelterService.getShelters();
  }

}
