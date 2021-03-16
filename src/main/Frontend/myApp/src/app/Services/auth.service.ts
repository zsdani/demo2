import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Router} from "@angular/router";



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

  private authUrl = 'http://localhost:8080/owner';

  public isLoggedIn = false;

  public redirectUrl: string | undefined;
  authenticated = false;


  constructor(
    private http: HttpClient, private router: Router
  ) { }









}
