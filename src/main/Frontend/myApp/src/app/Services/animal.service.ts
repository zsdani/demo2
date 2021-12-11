import { Injectable } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Animal} from '../class/Animal';
import {httpOptions} from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {AnimaldetailsService} from './animaldetails.service';
import {AppComponent} from '../app.component';
import {ActivatedRoute} from '@angular/router';
import {Datee} from '../class/Datee';
import {Shelter} from '../class/Shelter';
import {NotificationService} from './notification.service';
import {IsAdopted} from "../class/IsAdopted";
import {AuthInterceptor} from "../auth.interceptor";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private animalURL = 'http://localhost:8080/api/animal';



  constructor(
    private http: HttpClient,
    private  rout: ActivatedRoute,
    private ns: NotificationService,
    // public appComponent: AppComponent,
  ) {
  }
/*
  public getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.animalURL}`);
  }

 */
  addAnimal(animal: Animal): void {
    const header = new HttpHeaders({
      Token: `${localStorage.getItem('Token')}`,
    });

    this.http.post<Animal>(`${this.animalURL}`, animal, {headers: header}).subscribe(
      data => {
        console.log(data);
      },
      error => {
        this.ns.show('HIBA! Állat létrehozás sikertelen!');
      }
    );
  }




  public getAnimals(valami: string | null): Observable<Animal[]> {
    let params = new HttpParams();
    if (typeof valami === 'string') {
      params = params.append('animaltype_id', valami);
    }
    return this.http.get<Animal[]>(`${this.animalURL}/animaltype_id` , {params} );
  }

  public getanimalsbyshelterid(id: number): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.animalURL}/shelter_id?shelter_id=${id}`);
  }

  public getanimalbyid(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${this.animalURL}/id?id=${id}`);
  }











  // tslint:disable-next-line:max-line-length
  public getspecanimals(param: { age: number, size: number, animaltype: number, gender: number; shelter_id: number, gonadectomy: number } ): Observable<Animal[]> {
    return this.http.post<Animal[]>(`${this.animalURL}/findspec`, param);
  }


  ///listadoptedbyshelterid

  public getadoptedanimals(param: { shelter_id: number; status: number }): Observable<IsAdopted[]> {
    return this.http.post<IsAdopted[]>(`${this.animalURL}/listadoptedbyshelterid`, param);
  }







}
