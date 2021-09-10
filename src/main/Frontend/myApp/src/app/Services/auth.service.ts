import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Router} from "@angular/router";
import {User} from "../class/User";
import {BehaviorSubject, Observable} from "rxjs";

import {NotificationService} from "./notification.service";
import {User1} from "../class/User1";
import {Shelter} from "../class/Shelter";



export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': '',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
    })
  };

  private authUrl = 'http://localhost:8080/api/owner';

  isLogin$ = new BehaviorSubject<boolean>(this.hasToken());
  //isLogin$ = new BehaviorSubject<boolean>(false);








  constructor(
    private http: HttpClient,
    private router: Router,
    private ns : NotificationService
  ) {
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLogin$.asObservable();
  }

  register(user: User1): void {
    this.http.post<User1>(`${this.authUrl}/register`, user, this.httpOptions).subscribe(
      data => {
        console.log(data);
        this.ns.show('Sikeres regisztráció!');

        this.router.navigateByUrl('http://localhost:8080/api/owner/login', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/login']));


      },
      error => {
        this.ns.show('HIBA! Regisztráció sikertelen!');
        console.error(error);
      }
    );
  }


  login(user: User): void {
    console.log(user);
    console.log("0");

    this.http.post(`${this.authUrl}/login`, user, {responseType: 'text'}).subscribe(

      data => {

        localStorage.setItem('Token', data);
        console.log(this.isLogin$.value);

        this.isLogin$.next(true);
        console.log(this.isLogin$.value);
        this.ns.show('Sikeres bejelentkezés!');
        this.router.navigate(['/mainpage']);

      },

      error => {
        this.ns.show('HIBA! Bejelentkezés sikertelen!');
        console.log("tuuuup:");
        console.log(this.isLogin$.value);
        console.error(error);
      }
    );


    this.http.get<User1>(`${this.authUrl}/username?username=${user.username}`).subscribe(
      data => {
        localStorage.setItem('ownerID', String(data.id));
      }
    );


  }



  logout(): void {
    console.log(this.isLogin$);
    localStorage.removeItem('Token');
    localStorage.removeItem('ownerID');
    this.isLogin$.next(false);

    this.ns.show('Sikeres kijelentkezés!');
    console.log(this.isLogin$.value);

  }


  protected hasToken(): boolean {
    return !!localStorage.getItem('Token');
  }









}
