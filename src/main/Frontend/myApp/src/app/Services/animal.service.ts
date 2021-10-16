import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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

    console.log(animal);
    this.http.post<Animal>(`${this.animalURL}`, animal, httpOptions).subscribe(
      data => {
        console.log(data);

        const PostData = {

        };

      },
      error => {
        this.ns.show('HIBA! Állat létrehozás sikertelen!');
        console.error(error);
      }
    );
  }




  public getAnimals(valami: string | null): Observable<Animal[]> {
    let params = new HttpParams();
    if (typeof valami === 'string') {
      params = params.append('animaltype_id', valami);
    }
    return this.http.get<Animal[]>(`${this.animalURL}/animaltype_id` , {params});
  }



  // tslint:disable-next-line:max-line-length
  public getspecanimals(param: { age: number, size: number, animaltype: number, gender: number; shelter_id: number, gonadectomy: number } ): Observable<Animal[]> {
    return this.http.post<Animal[]>(`${this.animalURL}/findspec`, param);
  }







}
