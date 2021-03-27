import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'myApp';
  constructor(private router:Router) {
  }

  goToDogs(animalytype_id: number){
    this.router.navigate(["animal", animalytype_id ])


  }

  goToCats(animalytype_id: number){
    this.router.navigate(["animal", animalytype_id])
  }




}
