import { Component, OnInit } from '@angular/core';
import {Animal} from '../class/Animal';
import {AnimalService} from '../Services/animal.service';
import {Shelter} from '../class/Shelter';
import {ShelterService} from '../Services/shelter.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  public shelters: Shelter[] = [];

  currentRate = 0;
  yourrate=0;

  selected = -1;
  public shelter: Shelter | undefined;
  public  shelter2: Shelter;


  constructor(
    private shelterService: ShelterService

  ) { }

  public  ngOnInit(): void  {

    this.shelterService.getShelters().subscribe((res: Shelter[]) => {
      this.shelters = res;



    });

  }

  selectshleter(){
    this.shelterService.getShelter(this.selected).subscribe((res2: Shelter) => {
      this.shelter2 = res2;
      console.log(this.shelter2);
      if(res2.db===0){this.currentRate=0;}else {
        this.currentRate = res2.stars / res2.db;
      }
    });

  }
  vote(shelterid: number,yourvote: number){
    this.shelterService.addVote(shelterid, yourvote);
    location.reload();

  }

}
