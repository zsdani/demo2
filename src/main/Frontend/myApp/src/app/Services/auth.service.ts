import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Router} from '@angular/router';
import {User} from '../class/User';
import {BehaviorSubject, Observable, pipe} from 'rxjs';

import {NotificationService} from './notification.service';
import {User1} from '../class/User1';
import {Shelter} from '../class/Shelter';
import {token} from 'flatpickr/dist/utils/formatting';
import {Animal} from '../class/Animal';
import {MenuComponent} from '../menu/menu.component';
import {MenuService} from './menu.service';

import jwt_decode from 'jwt-decode';
import {Jwt} from '../class/Jwt';



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
  get getIsadmin$(): Observable<boolean> {

    return this.Isadmin$;
  }
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

  public isLogin$ = new BehaviorSubject<boolean>(this.hasToken());
  public isADMIN$ = new BehaviorSubject<boolean>(this.hasToken());

  private  _LogedIn$ = new BehaviorSubject<boolean>(false);
  public LogedIn$ = this._LogedIn$.asObservable();

  private  _IsAdmin$ = new BehaviorSubject<boolean>(false);
  private Isadmin$ = this._IsAdmin$.asObservable();

  user!: Jwt;
  role = '';


  _isLogin$ = this.isLogin$.asObservable();
  _isADMIN$ = this.isADMIN$.asObservable();










  constructor(
    private http: HttpClient,
    private router: Router,
    private ns: NotificationService,
    private  menuService: MenuService,

  ) {
    const token = localStorage.getItem('Token');
    this._LogedIn$.next(!!token);


    if (!!token){
      if (this.getUser(token).role === 'ADMIN'){this._IsAdmin$.next(true); } else {this._IsAdmin$.next(false); }
      this.user = this.getUser(token);
      // this.role = this.getUser(token).role;
      // console.log(this.role);
    } else  {
      this.user = new Jwt();
    }




  }

  isLoggedIn(): boolean {
     return !!localStorage.getItem('Token');
  }

  isAdmin(): Observable<boolean>{
    return this.isADMIN$.asObservable();
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

    this.http
      .post(`${this.authUrl}/login`, user, {responseType: 'text'}).subscribe(

      data => {

        localStorage.setItem('Token', data);
        this.user = this.getUser(data);
        if (this.user.role === 'ADMIN') {
          this._IsAdmin$.next(true);
        } else {
          this._IsAdmin$.next(false);
        }









        this._LogedIn$.next(true);


        // this.isLogin$.next(true);
        /*
        console.log(this.parseJwt(data).role);
        if (this.parseJwt(data).role === 'ADMIN'){
          this.isADMIN$.next(true);
        }else{
          this.isADMIN$.next(false);
        }

         */



        this.ns.show('Sikeres bejelentkezés!');
        this.router.navigate(['/mainpage']);





      },

      error => {
        this.ns.show('HIBA! Bejelentkezés sikertelen!');
        console.log(this.isLogin$.value);
        console.error(error);
      }
    );


/*
    this.http.get<User1>(`${this.authUrl}/username?username=${user.username}`).subscribe(
      data => {
        localStorage.setItem('ownerID', String(data.id));

        localStorage.setItem('ownerRole', data.role);
      }


    );
 */










  }

  private getUser(token: string): Jwt{
    console.log(JSON.parse(atob(token.split('.')[1])));
    return JSON.parse(atob(token.split('.')[1]))as Jwt;
  }

  public getOwnerbyid(id: number): Observable<User1> {
    const header = new HttpHeaders({
      Token: `${localStorage.getItem('Token')}`,
    });

    return this.http.get<User1>(`${this.authUrl}/id?id=${id}`, {headers: header});
  }







  logout(): void {
    console.log(this.isLogin$);
    localStorage.removeItem('Token');
    localStorage.removeItem('ownerID');
    localStorage.removeItem('ownerRole');
    this.isLogin$.next(false);
    this.isADMIN$.next(false);

    this._LogedIn$.next(false);
    this._IsAdmin$.next(false);

    this.role = '';


    this._OwnerID = -1;

    this.ns.show('Sikeres kijelentkezés!');
    console.log(this.isLogin$.value);
    this.router.navigate(['/mainpage']);
    this.user = new Jwt();




  }

  protected hasToken(): boolean {
    return !!localStorage.getItem('Token');
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

  getDecodedAccessToken(token: string): any {
    try{
      return jwt_decode(token);
    }
    catch (Error){
      return null;
    }
  }






  get OwnerID(): number {
    return this._OwnerID;
  }


}
