import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./Services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'myApp';
  constructor(
    private router:Router,
    public auth: AuthService,
    ) {
  }

  goToDogs(animalytype_id: number){

    this.router.navigateByUrl('http://localhost:8080/api/animal/0', {skipLocationChange: true}).then(()=>
    this.router.navigate(["animal", animalytype_id ]));


  }

  goToCats(animalytype_id: number){

    this.router.navigateByUrl('http://localhost:8080/api/animal/1', {skipLocationChange: true}).then(()=>
      this.router.navigate(["animal", animalytype_id]));
  }




}
