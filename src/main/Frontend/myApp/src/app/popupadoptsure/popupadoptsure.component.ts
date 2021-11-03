import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {trackDuration} from "@angular/compiler-cli/ngcc/src/entry_point_finder/utils";
import {AnimalService} from "../Services/animal.service";
import {AdoptedService} from "../Services/adopted.service";
import {Animal} from "../class/Animal";

@Component({
  selector: 'app-popupadoptsure',
  templateUrl: './popupadoptsure.component.html',
  styleUrls: ['./popupadoptsure.component.css']
})
export class PopupadoptsureComponent implements OnInit {

  public valami: string;

  constructor(private snackBar: MatSnackBar,
              private adoptedService: AdoptedService,
              private animalService: AnimalService,

              ) { }

  durationInSeconds = 5;

  ngOnInit(): void {
    this.animalService.getanimalbyid(parseInt(localStorage.getItem('animalid'))).subscribe((res: Animal) => {
      console.log(res.shelter.id);
      this.valami = res.shelter.id + "";
      localStorage.setItem('shelter_id', this.valami);
    });
  }

  openSnackBar(message: string){
    this.snackBar.open(message)._dismissAfter(3000);
    const PostData = {
      allatid: parseInt(localStorage.getItem('animalid')) ,
      ownerid: parseInt(localStorage.getItem('ownerID')),
      shelter_id: parseInt(localStorage.getItem('shelter_id')),
      status2: 1,

    };
    console.log(PostData);
    this.adoptedService.addadopted(PostData);




  }

}
