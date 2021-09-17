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
import {PopupadoptsureComponent} from "../popupadoptsure/popupadoptsure.component";
import {PopupadoptComponent} from "../popupadopt/popupadopt.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AnimaldetailsService} from "../Services/animaldetails.service";
import {AuthService, httpOptions} from "../Services/auth.service";
import {HttpClient} from "@angular/common/http";
import {CalendarService} from "../Services/calendar.service";
import {Animal} from "../class/Animal";
import {AnimaldetailsComponent} from "../animaldetails/animaldetails.component";
import {Datee} from "../class/Datee";
import {Shelter} from "../class/Shelter";



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
  public selectedhour: number=0;
  public selectedday: Date= new Date();


  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[];
  actions2: CalendarEventAction[];
  actions3: CalendarEventAction[];

  //localStorage.getItem("ownerID")
/*
  actions: CalendarEventAction[] = [
    {

      label: '<i class="fas fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

 */





  refresh: Subject<any> = new Subject();



  // ide kéne majd backendről benyomni a dolgokat




  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal,
              public dialog: MatDialog,
              private router:Router,
              public auth: AuthService,
              private http: HttpClient,
              private calendarService: CalendarService,
              private animaldetailsService: AnimaldetailsService,
              private animaldetails: AnimaldetailsComponent,

              ) {}


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






  minDate= new Date()
  now: number;
  day: number



  setView(view: CalendarView) {
    this.view = view;

  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }





  addEvent() {
    let PostData = {
      allatid: this.animaldetailsService.num ,
      ownerid: parseInt(localStorage.getItem("ownerID")),
      date: this.selectedday,
      hour: this.selectedhour

    }

    if(this.auth.isLogin$.value) {
      this.calendarService.addevent(PostData);

    }
    else{this.dialog.open(PopupadoptComponent)}


  }

  deleteEvent(eventToDelete: CalendarEvent) {
    //this.events = this.events.filter((event) => event !== eventToDelete);

    console.log(eventToDelete.id)
    console.log("hahahha")
    //this.calendarService.deleteevent(eve)



  }

  events: CalendarEvent[]= []




  x: number=this.animaldetailsService.num;
  public date3: Datee[]=[];
  public date4: Datee[]=[];






  ngOnInit(): void {




    this.calendarService.getevents(parseInt(localStorage.getItem("animalid"))).subscribe((res: Datee[])=>{
      this.date3 =res;
      console.log("bent:")
      for (let i = 0; i < this.date3.length; i++) {
        this.date4[i]=res[i];
        let num= this.date3[i].hour;
        var a = num.split(':');
        var minute = +a[1];
        var hour = +a[0]




        if(this.date3[i].ownerid== parseInt(localStorage.getItem("ownerID"))){
          this.actions3=this.actions
        } else{
          this.actions3=this.actions2
        }


        this.events[i] = {
          start: addHours(new Date(this.date3[i].date).setHours(hour,minute),0),
          end: addHours(new Date(this.date3[i].date).setHours(hour+1,minute),0),
          title: "Sétáltatás",

          id: this.date3[i].id,
          actions: this.actions3,




        }
























      }

    });
    console.log("kivul")
    console.log(this.events)
    console.log(this.date4)








    this.now=new Date().getHours()






    /*
    for (let i = 0; i < this.date3.length; i++) {
      console.log("1");
    }

     */


    this.actions = [
      {

        label:'<i class="fas fa-trash-alt"></i>',

        a11yLabel: 'Delete',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.calendarService.deleteevent(event.id).subscribe()
          console.log(event.title)
          console.log(typeof event.id)
          console.log("ejhhh")
          this.events = this.events.filter((iEvent) => iEvent !== event);
          this.handleEvent('Deleted', event);


        }





      },
    ];

    this.actions2 = [

    ];

















  }






}
