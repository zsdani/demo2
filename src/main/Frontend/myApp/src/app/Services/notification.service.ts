import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  public show(message:string): void {
    let config = new MatSnackBarConfig();
    config.duration = 5000;
    // @ts-ignore
    this.snackBar.open(message, null, config);
  }
}
