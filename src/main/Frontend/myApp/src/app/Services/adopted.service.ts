import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {NotificationService} from './notification.service';
import {Observable} from 'rxjs';
import {Animal} from '../class/Animal';
import {Datee} from '../class/Datee';
import {IsAdopted} from '../class/IsAdopted';
import {Shelter} from '../class/Shelter';
import {httpOptions} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdoptedService {

  private URL = 'http://localhost:8080/api/adopted';

  constructor(
    private http: HttpClient,
    private  rout: ActivatedRoute,
    private ns: NotificationService,
  ) { }

  public addadopted(k: { allatid: number, ownerid: number }): void {
    this.http.post<IsAdopted>(`${this.URL}`, k).subscribe();
  }
/*
  public getadoptedanimals(param: { shelter_id: number; status2: number }): Observable<IsAdopted[]> {
    return this.http.post<IsAdopted[]>(`${this.URL}/listadoptedbyshelterid`, param);
  }

 */
//2.d
  public getadoptedanimals( shelter_id: number): Observable<IsAdopted[]> {
    return this.http.post<IsAdopted[]>(`${this.URL}/listadoptedbyshelterid`, shelter_id);
  }

  public getadoptedanimalsbyowner(ownerid: number): Observable<IsAdopted[]> {
    return this.http.post<IsAdopted[]>(`${this.URL}/getadoptedanimalsbyowner`, ownerid);
  }

  public getadoptedbyallatid(allatid: number ): Observable<IsAdopted[]> {
    return this.http.get<IsAdopted[]>(`${this.URL}/allatid?allatid=${allatid}`);
  }
/*
  public adoptednotsure(allatid: number): void {
    this.http.post<IsAdopted>(`${this.URL}/adoptednotsure`, allatid).subscribe();
  }

  public getbyallatid(allatid: number, status: number): Observable<IsAdopted> {
    return this.http.post<IsAdopted>(`${this.URL}/allatid?allatid=${allatid}`, status, httpOptions);
  }
   */


  public refuseadopted(id: number ): void {
     this.http.delete(`${this.URL}/id?id=${id}` , httpOptions).subscribe();
  }

  public acceptadopted(id: number): void {
    this.http.delete(`${this.URL}/2/id?id=${id}` , httpOptions).subscribe();
  }

  public deletebyowner(owner: number): void {
    this.http.post(`${this.URL}/seennoti`, owner).subscribe();


  }







}
