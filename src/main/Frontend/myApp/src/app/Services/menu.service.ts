import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  private _refreshneed$ = new Subject<void>();

  get refreshneed$(){
    return this.refreshneed$;
  }




}
