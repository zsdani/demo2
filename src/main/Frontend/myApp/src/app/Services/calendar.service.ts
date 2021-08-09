import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Shelter} from "../class/Shelter";
import {HttpClient} from "@angular/common/http";
import {Datee} from "../class/Datee";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private http: HttpClient,
    private ns : NotificationService
  ) { }


  url ="http://localhost:8080/api/date";

  public addevent(k: { date: string; hour: number }): void{


    this.http.post<Datee>(`${this.url}`,k).subscribe(
      data => {
        console.log(data);
        this.ns.show('Sikeres séta foglalás');

      },
      error => {
        this.ns.show('HIBA! Regisztráció sikertelen!');
        console.error(error);
      }
    );

  }
}
