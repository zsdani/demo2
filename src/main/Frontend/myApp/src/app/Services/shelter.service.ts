import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Animal} from "../class/Animal";
import {httpOptions} from "./auth.service";
import {Shelter} from "../class/Shelter";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShelterService {
  private shelterURL = 'http://localhost:8080/api/shelter';
  private tryURl = 'http://jsonplaceholder.typicode.com/posts';

  constructor(
    private http: HttpClient
  ) {
  }



  public getShelters(): Observable<Shelter[]> {
    return this.http.get<Shelter[]>(`${this.shelterURL}`);
  }



  public getShelter(id: number): Promise<Shelter> {
    return this.http.get<Shelter>(`${this.shelterURL}/${id}`, httpOptions).toPromise();
  }
}
