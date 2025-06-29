import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { CalendarComponent } from './calendar/calendar.component';

export const routes: Routes = [
  {component: TaskListComponent, path: 'tasks'},
  {component: CalendarComponent, path: ''}
];
