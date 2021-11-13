import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Router} from '@angular/router';
import {User} from '../class/User';
import {BehaviorSubject, Observable} from 'rxjs';

import {NotificationService} from './notification.service';
import {User1} from '../class/User1';
import {Shelter} from '../class/Shelter';
import {token} from 'flatpickr/dist/utils/formatting';
import {Animal} from '../class/Animal';
import {MenuComponent} from '../menu/menu.component';
import {MenuService} from './menu.service';



export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: '',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get OwnerRole(): string {
    return this._OwnerRole;
  }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ''
    })
  };

  private authUrl = 'http://localhost:8080/api/owner';
  private _OwnerID: number;
  private _OwnerRole: string;

  isLogin$ = new BehaviorSubject<boolean>(true);
  isADMIN$ = new BehaviorSubject<boolean>(this.hasToken());









  constructor(
    private http: HttpClient,
    private router: Router,
    private ns: NotificationService,
    private  menuService: MenuService,

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

        this.router.navigateByUrl('http://localhost:8080/api/owner/login', {skipLocationChange: true}).then(() =>
          this.router.navigate(['/login']));


      },
      error => {
        this.ns.show('HIBA! Regisztráció sikertelen!');
        console.error(error);
      }
    );
  }


  login(user: User): void {

    this.http.post(`${this.authUrl}/login`, user, {responseType: 'text'}).subscribe(

      data => {

        localStorage.setItem('Token', data);


        // tslint:disable-next-line:no-unused-expression radix
        this._OwnerID = parseInt(this.parseJwt(data).id);
        this._OwnerRole = this.parseJwt(data).role;


        this.isLogin$.next(true);
        console.log(this.parseJwt(data).role);
        if (this.parseJwt(data).role === 'ADMIN'){
          this.isADMIN$.next(true);
        }else{
          this.isADMIN$.next(false);
        }



        this.ns.show('Sikeres bejelentkezés!');
        this.router.navigate(['/mainpage']);





      },

      error => {
        this.ns.show('HIBA! Bejelentkezés sikertelen!');
        console.log(this.isLogin$.value);
        console.error(error);
      }
    );


    this.http.get<User1>(`${this.authUrl}/username?username=${user.username}`).subscribe(
      data => {
        localStorage.setItem('ownerID', String(data.id));

        localStorage.setItem('ownerRole', data.role);
      }
    );











  }

  public getOwnerbyid(id: number): Observable<User1> {
    return this.http.get<User1>(`${this.authUrl}/id?id=${id}`);
  }







  logout(): void {
    console.log(this.isLogin$);
    localStorage.removeItem('Token');
    localStorage.removeItem('ownerID');
    localStorage.removeItem('ownerRole');
    this.isLogin$.next(false);
    this.isADMIN$.next(false);

    this._OwnerID = -1;

    this.ns.show('Sikeres kijelentkezés!');
    console.log(this.isLogin$.value);
    this.router.navigate(['/mainpage']);



  }


  protected hasToken(): boolean {
    console.log(!localStorage.getItem('Token'));
    console.log(!!localStorage.getItem('Token'));
    let k = true;
    if (localStorage.getItem('ownerRole') === 'ADMIN'){
      k = true;
    }else{
      k = false;
    }



    return k;
  }

  public parseJwt(token): any  {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // tslint:disable-next-line:only-arrow-functions typedef
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));



    return JSON.parse(jsonPayload);
  }






  get OwnerID(): number {
    return this._OwnerID;
  }


}
