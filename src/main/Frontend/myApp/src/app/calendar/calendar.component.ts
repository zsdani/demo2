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

import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import {PopupadoptsureComponent} from "../popupadoptsure/popupadoptsure.component";
import {PopupadoptComponent} from "../popupadopt/popupadopt.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AnimaldetailsService} from "../Services/animaldetails.service";
import {AuthService, httpOptions} from "../Services/auth.service";
import {HttpClient} from "@angular/common/http";
import {CalendarService} from "../Services/calendar.service";



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {


  locale: string = "hu";
  @ViewChild('modalContent', {static: true})
  modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  public selectedhour: number=-1;
  public selectedday: string="default";


  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];



  refresh: Subject<any> = new Subject();

  // ide kéne majd backendről benyomni a dolgokat
  events: CalendarEvent[] = [



  ];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal,
              public dialog: MatDialog,
              private router:Router,
              public auth: AuthService,
              private http: HttpClient,
              private calendarService: CalendarService) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    //this.modalData = { event, action };
    //this.modal.open(this.modalContent, { size: 'lg' });
  }




  minDate= new Date();
  now: number;
  day: number

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;

  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  private _PostData = {
    date: this.selectedday,
    hour: this.selectedhour,
  };


  addEvent() {
    console.log(this._PostData)
    this.calendarService.addevent(this._PostData);

    if(this.auth.isLogin$.value) {
      /*
      this.http.post(this.url,valami,httpOptions);
      console.log("elvileg elment...")

       */

    }
    else{this.dialog.open(PopupadoptComponent)}
  }




  ngOnInit(): void {

    this.now=new Date(). getHours()


  }


  get PostData(): { date: string; hour: number } {
    return this._PostData;
  }



}
