import { Component, OnInit } from '@angular/core';
import {AuthService} from '../Services/auth.service';
import {ShelterService} from '../Services/shelter.service';
import {AnimalService} from '../Services/animal.service';
import {AdoptedService} from '../Services/adopted.service';
import {User1} from '../class/User1';
import {IsAdopted} from '../class/IsAdopted';
import {Animal} from '../class/Animal';
import {Shelter} from '../class/Shelter';
import {NotificationService} from "../Services/notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  public animal: Animal = new Animal();
  public isadopted: IsAdopted = new IsAdopted();

  public isadopteds: IsAdopted [] = [];
  public animals: Animal [] = [];
  public sumanimals: Animal [] = [];
  public users: User1 [] = [];
  public tomb: number [] = [];
  public animalid: number [] = [];

  constructor(
    public auth: AuthService,
    public shelterService: ShelterService,
    public animalsService: AnimalService,
    public adoptedService: AdoptedService,
    public authService: AuthService,
    public notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.adoptedService.getadoptedanimalsbyowner(this.auth.user.id).subscribe((res: IsAdopted[]) => {
      localStorage.setItem('db', String(res.length));
      for (let i = 0; i < res.length; i++) {
        this.animalid[i] = res[i].allatid;

        this.animalsService.getanimalbyid(this.animalid[i]).subscribe((res1: Animal) => {
        this.animals.push(res1);
        console.log(res1);
        res[i].allatname = res1.name;

      });

        this.isadopteds.push(res[i]);
      }

      console.log(res);
    });


  }

  deletenotifications(){
    this.adoptedService.deletebyowner(this.auth.user.id);
    location.reload();

  }



}
