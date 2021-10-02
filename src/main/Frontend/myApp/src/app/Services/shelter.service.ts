import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Animal} from '../class/Animal';
import {httpOptions} from './auth.service';
import {Shelter} from '../class/Shelter';
import {Observable} from 'rxjs';
import {Datee} from '../class/Datee';
import {NotificationService} from './notification.service';
import {Router} from '@angular/router';
import {OwnerShelter} from "../class/OwnerShelter";

@Injectable({
  providedIn: 'root'
})
export class ShelterService {
  private shelterURL = 'http://localhost:8080/api/shelter';
  private url = 'http://localhost:8080/api/ownershelter';

  constructor(
    private http: HttpClient,
    private ns: NotificationService,
    private router: Router,
  ) {
  }



  public getShelters(): Observable<Shelter[]> {
    return this.http.get<Shelter[]>(`${this.shelterURL}`);
  }



  public getShelter(id: number): Promise<Shelter> {
    return this.http.get<Shelter>(`${this.shelterURL}/${id}`, httpOptions).toPromise();
  }


  addShelter(shelter: Shelter): void {

    console.log(shelter);

    this.http.post<Shelter>(`${this.shelterURL}`, shelter, httpOptions).subscribe(
      data => {
        console.log(data.id);

        const PostData = {
          ownerid: parseInt(localStorage.getItem('ownerID')),
          shelterid: data.id
        };

        this.addSheltertoOwner(PostData);
        this.ns.show('Sikeres menhely létrehozás!');



      },
      error => {
        this.ns.show('HIBA! Menhely létrehozás sikertelen!');
        console.error(error);
      }
    );
  }

  addSheltertoOwner(k: {ownerid: number, shelterid: number}): void{
    console.log(k.shelterid + 'most elotte vagyunk ' + k.ownerid);
    this.http.post(`${this.url}`, k).subscribe(
      data => {

        console.log('Siker');

      });
    console.log('most ment ki ');

  }

  getaSheltertoOwner(ownerid: number): Observable<OwnerShelter[]>{

    return this.http.post<OwnerShelter[]>(`${this.url}/index?index=${ownerid}`, ownerid );




  }



}
