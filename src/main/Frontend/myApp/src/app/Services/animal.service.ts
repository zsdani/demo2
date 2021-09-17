import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Animal} from "../class/Animal";
import {httpOptions} from "./auth.service";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {AnimaldetailsService} from "./animaldetails.service";
import {AppComponent} from "../app.component";
import {ActivatedRoute} from "@angular/router";
import {Datee} from "../class/Datee";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private animalURL = 'http://localhost:8080/api/animal';


  constructor(
    private http: HttpClient,
    private  rout: ActivatedRoute,
    //public appComponent: AppComponent,
  ) {
  }
/*
  public getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.animalURL}`);
  }

 */



  public getAnimals(valami: string | null): Observable<Animal[]> {
    let params = new HttpParams();
    if (typeof valami === "string") {
      params = params.append("animaltype_id", valami)
    }
    return this.http.get<Animal[]>(`${this.animalURL}/animaltype_id` , {params:params});
  }



  public getspecanimals(param: { age: number, size:number,gender: number; shelter: number, gonadectomy: number } ): Observable<Animal[]> {
    return this.http.post<Animal[]>(`${this.animalURL}/findspec`,param)
  }







}
