import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {trackDuration} from "@angular/compiler-cli/ngcc/src/entry_point_finder/utils";
import {AnimalService} from "../Services/animal.service";
import {AdoptedService} from "../Services/adopted.service";

@Component({
  selector: 'app-popupadoptsure',
  templateUrl: './popupadoptsure.component.html',
  styleUrls: ['./popupadoptsure.component.css']
})
export class PopupadoptsureComponent implements OnInit {

  constructor(private snackBar: MatSnackBar,
              private adoptedService: AdoptedService,
              private animalService: AnimalService,

              ) { }

  durationInSeconds = 5;

  ngOnInit(): void {
  }

  openSnackBar(message: string){
    this.snackBar.open(message)._dismissAfter(3000);
    const PostData = {
      allatid: parseInt(localStorage.getItem('animalid')) ,
      ownerid: parseInt(localStorage.getItem('ownerID')),
      shelterid: 2

    };
    console.log(PostData);
    this.adoptedService.addadopted(PostData);
    //this.adoptedService.adoptednotsure(PostData.allatid);



  }

}
