import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Animal} from "../class/Animal";




@Injectable({
  providedIn: 'root'
})
export class AnimaldetailsService {


  private animalURL = 'http://localhost:8080/api/animal';
  private _num: number=0;


  constructor(
    private http: HttpClient
  ) {
  }



  public getAnimal(id: number): Observable<Animal> {
    this._num = id;
    let params = new HttpParams();
    params =params.append("id",id+"")
    return this.http.get<Animal>(`${this.animalURL}/id`, {params:params});
  }

  get num(): number {
    return this._num;
  }


}
