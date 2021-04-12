import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Router} from "@angular/router";
import {User} from "../class/User";
import {BehaviorSubject, Observable} from "rxjs";
import {any} from "codelyzer/util/function";
import {NotificationService} from "./notification.service";



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




  constructor(
    private http: HttpClient,
    private router: Router,
    private ns : NotificationService
  ) {
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLogin$.asObservable();
  }

  register(user: User): void {
    this.http.post<User>(`${this.authUrl}/register`, user, this.httpOptions).subscribe(
      data => {
        this.ns.show('Sikeres regisztráció!');

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
        this.isLogin$.next(true);
        this.ns.show('Sikeres bejelentkezés!');
        this.router.navigate(['/mainpage']);

      },

      error => {
        this.ns.show('HIBA! Bejelentkezés sikertelen!');
        console.error(error);
      }
    );
  }



  logout(): void {
    localStorage.removeItem('Token');
    this.isLogin$.next(false);
    this.ns.show('Sikeres kijelentkezés!');
    this.router.navigate(['/']);
  }


  protected hasToken(): boolean {
    return !!localStorage.getItem('Token');
  }









}
