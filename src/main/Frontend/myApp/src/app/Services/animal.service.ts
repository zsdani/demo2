import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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



  public getAnimals(): Promise<Animal[]> {
    return this.http.get<Animal[]>(`${this.animalURL}`, httpOptions).toPromise();
  }

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
