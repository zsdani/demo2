import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {httpOptions} from "./auth.service";
import {Shelter} from "../class/Shelter";
import {Animal} from "../class/Animal";
import {ActivatedRoute} from "@angular/router";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  private filesURL = 'http://localhost:8080/api/files';

  constructor(
    private http: HttpClient,
    private  rout: ActivatedRoute,
    private ns: NotificationService,

  ) {}

  public getFiles(): Observable<File[]> {
    return this.http.get<File[]>(`${this.filesURL}`);
  }

  addPicc(picc: FormData): void {

    console.log(picc);
    this.http.post(`${this.filesURL}/upload`, picc).subscribe(
      data => {
        this.ns.show('Sikedresadasdasd');

      },
      error => {
        this.ns.show('HIBA! Állat létrehozás sikertelen!');
        console.error(error);
      }
    );
  }

/*
  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post<File>(this.filesURL, fileToUpload, httpOptions)

      .map(() => { return true; })
      .catch((e) => this.handleError(e));




  }

 */


}
