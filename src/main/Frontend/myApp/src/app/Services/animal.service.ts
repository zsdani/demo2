import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Animal} from "../class/Animal";
import {httpOptions} from "./auth.service";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private animalURL = 'http://localhost:8080/api/animal';
  private tryURl = 'http://jsonplaceholder.typicode.com/posts';

  constructor(
    private http: HttpClient
  ) {
  }





  public getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.animalURL}`);
  }

/*
  public getAnimal(id: number): Observable<Animal> {
    let params = new HttpParams();
    params =params.append("id",id+"")
    return this.http.get<Animal>(`${this.animalURL}/id`, {params:params});
  }

 */


  /*

    public async getAnimals(): Promise<any> {
      this.http.get<Array<Animal>>('http://localhost:8080/api/animal');




      let resp = await fetch(this.animalURL).then(response => {
        response.json();

      });
      console.log(resp);
      return resp;

       */


    //this.http.get<Array<Animal>>('http://localhost:8080/api/animal');





  /*
  public getAnimals(): Promise<Animal[]> {
   return this.http.get<Animal[]>(`${this.animalURL}`, httpOptions).toPromise();
  }

   */


}
