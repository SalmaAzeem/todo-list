import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, MatDatepickerModule, MatNativeDateModule, RouterLink],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {
  selectedDate = new Date();  
  constructor() { }
  
  ngOnInit(): void {
    this.selectedDate = new Date();
  }
}
