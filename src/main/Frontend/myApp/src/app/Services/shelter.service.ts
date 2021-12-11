import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Animal} from '../class/Animal';
import {AuthService, httpOptions} from './auth.service';
import {Shelter} from '../class/Shelter';
import {Observable, Subscription} from 'rxjs';
import {Datee} from '../class/Datee';
import {NotificationService} from './notification.service';
import {Router} from '@angular/router';
import {OwnerShelter} from '../class/OwnerShelter';

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
    public auth: AuthService,
  ) {
  }

  public addVote(shelterid: number, yourvote: number){
    const header = new HttpHeaders().set(
      'Token', `${localStorage.getItem('Token')}`
    );

    this.http.post(`${this.shelterURL}/vote/id?id=${shelterid}`, yourvote, {headers: header}).subscribe(
      data => {
        this.ns.show('Sikeres értékelés');
      },
      error => {
        this.ns.show('HIBA! Az értékelés közben');
      }
    );
  }



  public getShelters(): Observable<Shelter[]> {

    return this.http.get<Shelter[]>(`${this.shelterURL}`);
  }



  public getShelter(id: number): Observable<Shelter> {

    return this.http.get<Shelter>(`${this.shelterURL}/id?id=${id}`);
  }

  updateShelter(id: number, shelter: Shelter): void {
    const header = new HttpHeaders().set(
      'Token', `${localStorage.getItem('Token')}`
    );
    this.http.put<Shelter>(`${this.shelterURL}?id=${id}`, shelter , {headers: header}).subscribe(
      data => {
        this.ns.show('Sikeres menhely módosítás!');

      },
      error => {
        this.ns.show('HIBA! Menhely módosítása sikertelen!');
        console.error(error);
      }
    );

  }


  addShelter(shelter: Shelter): void {
    const header = new HttpHeaders().set(
      'Token', `${localStorage.getItem('Token')}`
    );
    this.http.post<Shelter>(`${this.shelterURL}`, shelter, {headers: header}).subscribe(
      data => {
        const PostData = {
          ownerid: this.auth.user.id,
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
    const header = new HttpHeaders().set(
      'Token', `${localStorage.getItem('Token')}`
    );

    this.http.post(`${this.url}`, k, {headers: header}).subscribe(
      data => {



      });


  }

  getaSheltertoOwner(ownerid: number): Observable<OwnerShelter[]>{
    const header = new HttpHeaders().set(
      'Token', `${localStorage.getItem('Token')}`
    );

    return this.http.post<OwnerShelter[]>(`${this.url}/index?index=${ownerid}`, ownerid, {headers: header} );

  }



}
