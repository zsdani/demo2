import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';


import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours, getHours,
} from 'date-fns';

import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';

registerLocaleData(localeHu);

import {Observable, Subject, Subscription} from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import {PopupadoptsureComponent} from '../popupadoptsure/popupadoptsure.component';
import {PopupadoptComponent} from '../popupadopt/popupadopt.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AnimaldetailsService} from '../Services/animaldetails.service';
import {AuthService, httpOptions} from '../Services/auth.service';
import {HttpClient} from '@angular/common/http';
import {CalendarService} from '../Services/calendar.service';
import {Animal} from '../class/Animal';
import {AnimaldetailsComponent} from '../animaldetails/animaldetails.component';
import {Datee} from '../class/Datee';
import {Shelter} from '../class/Shelter';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private modal: NgbModal,
              public dialog: MatDialog,
              private router: Router,
              public auth: AuthService,
              private http: HttpClient,
              private calendarService: CalendarService,
              private animaldetailsService: AnimaldetailsService,
              private animaldetails: AnimaldetailsComponent,

              ) {}


  locale = 'hu';
  @ViewChild('modalContent', {static: true})
  modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  public selectedhour = 0;
  public selectedday: Date = new Date();


  modalData!: {
    action: string;
    event: CalendarEvent;
  };
  actions: CalendarEventAction[] = [];
  actions2: CalendarEventAction[] = [];
  actions3: CalendarEventAction[] = [];

  refresh: Subject<any> = new Subject();

  activeDayIsOpen = true;

  minDate = new Date();
  now: number;
  day: number;


  x: number = this.animaldetailsService.num;
  public date3: Datee[] = [];
  public date4: Datee[] = [];

  events: CalendarEvent[] = [

  ];










  ngOnInit(): void {

    this.actions = [
      {
        label: '<i class="fas fa-trash-alt"></i>',
        a11yLabel: 'Delete',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.calendarService.deleteevent(event.id).subscribe();
          console.log(event.title);
          console.log(event.id);
          console.log('ejhhh');
          this.events = this.events.filter((iEvent) => iEvent !== event);
          //this.handleEvent('Deleted', event);
        }
      },
    ];

    this.actions2 = [
    ];




    // tslint:disable-next-line:radix
    this.calendarService.getevents(parseInt(localStorage.getItem('animalid'))).subscribe((res: Datee[]) => {

      this.date3 = res;
      console.log("datumok");
      console.log(res);


      for (let i = 0; i < this.date3.length; i++) {
        this.date4[i] = res[i];
        const num = this.date3[i].hour;
        const a = num.split(':');
        const minute = +a[1];
        const hour = +a[0];


        if (this.date3[i].ownerid === this.auth.user.id){
          this.actions3 = this.actions;
        } else{
          this.actions3 = this.actions2;
        }

        this.events.push(
          {
            start: addHours(new Date(this.date3[i].date).setHours(hour, minute), 0),
            end: addHours(new Date(this.date3[i].date).setHours(hour + 1, minute), 0),
            title: 'Sétáltatás',

            id: this.date3[i].id,
            actions: this.actions3,

          }

        );

/*
        this.events[i] = {
          start: addHours(new Date(this.date3[i].date).setHours(hour, minute), 0),
          end: addHours(new Date(this.date3[i].date).setHours(hour + 1, minute), 0),
          title: 'Sétáltatás',
          id: this.date3[i].id,
          actions: this.actions3,
        };
 */


      }

    });
    this.now = new Date().getHours();
  }



  setView(view: CalendarView) {
    this.view = view;

  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }





  addEvent() {
    const PostData = {
      allatid: this.animaldetailsService.num ,
      ownerid: this.auth.user.id,
      date: this.selectedday,
      hour: this.selectedhour

    };

    if (this.auth.isLoggedIn()) {
      this.calendarService.addevent(PostData);
      setTimeout(() => {
        location.reload();
      }, 1500);



    }
    else{this.dialog.open(PopupadoptComponent); }


    //this.ngOnInit();
  }










}
