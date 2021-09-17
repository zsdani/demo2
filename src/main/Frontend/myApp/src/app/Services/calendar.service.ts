import { Injectable } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Shelter} from "../class/Shelter";
import {HttpClient} from "@angular/common/http";
import {Datee} from "../class/Datee";
import {NotificationService} from "./notification.service";
import {Animal} from "../class/Animal";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {


  constructor(
    private http: HttpClient,
    private ns : NotificationService
  ) { }

  private _date2: Datee[];


  url ="http://localhost:8080/api/date";



  public getevents(index: number): Observable<Datee[]> {
    return this.http.post<Datee[]>(`${this.url}/d`,index)
  }








  public deleteevent(index: string | number): Observable<Datee> {
    return this.http.delete<Datee>(`${this.url}/delete/id?id=${index}`)
  }





  public addevent(k: { allatid: number, ownerid:number,date: Date; hour: number }): void{


    this.http.post<Datee>(`${this.url}`,k).subscribe(
      data => {

        this.ns.show('Sikeres séta foglalás');

      },
      error => {
        this.ns.show('HIBA időpont üzközés miatt!');
        console.error(error);
      }
    );



  }


}
