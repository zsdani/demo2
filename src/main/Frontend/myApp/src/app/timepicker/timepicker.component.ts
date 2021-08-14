import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.css']
})
export class TimepickerComponent implements OnInit {

  time = {hour: 13, minute: 30};
  public date: Date = new Date();
  constructor() { }

  ngOnInit(): void {
  }

}
