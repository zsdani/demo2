import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Animal} from "../class/Animal";
import {httpOptions} from "./auth.service";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {AnimaldetailsService} from "./animaldetails.service";
import {AppComponent} from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private animalURL = 'http://localhost:8080/api/animal';


  constructor(
    private http: HttpClient,
    //public appComponent: AppComponent,
  ) {
  }

  public getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.animalURL}`);
  }


/* ha id szerint szeretném
  public getAnimals(): Observable<Animal[]> {
    //let x = this.appComponent.x
    //console.log(x)
    let params = new HttpParams();
    params =params.append("animaltype_id",0+"")
    return this.http.get<Animal[]>(`${this.animalURL}/animaltype_id` , {params:params});
  }

 */




}
