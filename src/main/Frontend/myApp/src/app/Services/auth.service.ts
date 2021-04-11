import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Router} from "@angular/router";
import {User} from "../class/User";
import {BehaviorSubject, Observable} from "rxjs";
import {any} from "codelyzer/util/function";



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

  private authUrl = 'http://localhost:8080/api/owner/login';

  isLogin$ = new BehaviorSubject<boolean>(this.hasToken());

  public valami: string | undefined;
  authenticated = false;


  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLogin$.asObservable();
  }


/*
  login(user: User)  {
    console.log("1");
    console.log(user.username);
    return this.http.post<User>(`${this.authUrl}` , user);

  }

 */




/*
  login(username:string, password:string )  {
    return this.http.post<User>(`${this.authUrl}` , {username, password}, httpOptions).subscribe(
      data => {
        localStorage.setItem('token', data['token']);
        this.isLogin$.next(true);
      });
  }


 */

  login(user: User): void {
    this.http.post<User>(`${this.authUrl}`, user, this.httpOptions).subscribe(

      data => {
        console.log("1");
        // @ts-ignore
        localStorage.setItem('Token', data['Token']);
        console.log("2");
        if (typeof this.valami === "string") {
          localStorage.setItem('Token', this.valami)
        }
        console.log("3");
        console.log(localStorage.getItem('Token'));
        console.log(this.valami);
        this.isLogin$.next(true);
        //this.ns.show('Sikeres bejelentkezés!');
        this.router.navigate(['/mainpage']);
      },
      error => {
        //this.ns.show('HIBA! Bejelentkezés sikertelen!');
        console.error(error);
      }
    );
  }



  logout(): void {
    localStorage.removeItem('Token');
    this.isLogin$.next(false);
    //this.ns.show('Sikeres kijelentkezés!');
    this.router.navigate(['/']);
  }


  protected hasToken(): boolean {
    return !!localStorage.getItem('Token');
  }









}
