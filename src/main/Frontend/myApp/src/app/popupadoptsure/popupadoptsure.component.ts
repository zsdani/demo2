import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {trackDuration} from "@angular/compiler-cli/ngcc/src/entry_point_finder/utils";

@Component({
  selector: 'app-popupadoptsure',
  templateUrl: './popupadoptsure.component.html',
  styleUrls: ['./popupadoptsure.component.css']
})
export class PopupadoptsureComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) { }

  durationInSeconds = 5;

  ngOnInit(): void {
  }

  openSnackBar(message: string){
    this.snackBar.open(message)._dismissAfter(3000)


  }

}
