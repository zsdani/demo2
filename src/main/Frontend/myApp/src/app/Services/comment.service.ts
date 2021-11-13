import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Datee} from "../class/Datee";
import {Shelter} from "../class/Shelter";
import {HttpClient} from "@angular/common/http";
import {NotificationService} from "./notification.service";
import {IsAdopted} from "../class/IsAdopted";
import {Commente} from "../class/Comment";
import {Animal} from "../class/Animal";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private URL = 'http://localhost:8080/api/comment';


  constructor(
    private http: HttpClient,
    private ns: NotificationService
  ) { }

  public addComment(k: {comment: string, allatid: number, ownerid: number} ): void {
    console.log(k);
    this.http.post<Commente>(`${this.URL}`, k).subscribe();

  }

  public getComments(allatid: number): Observable<Commente[]>{
    return this.http.get<Commente[]>(`${this.URL}/all/allatid?allatid=${allatid}`);
  }

  public deleteComment(id: number): void {
    this.http.delete(`${this.URL}/del/id?id=${id}`).subscribe();
  }

  public getComment(id: number): Observable<Commente>{
    return this.http.get<Commente>(`${this.URL}/id?id=${id}`);
  }
  public updateComment(id: number, comment: Commente): void {
    console.log(id);
    console.log(comment);
    this.http.put<Commente>(`${this.URL}/up/id?id=${id}`, comment).subscribe();

  }


}
