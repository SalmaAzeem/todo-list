import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    let date: Date = new Date(this.route.snapshot.params['date']);
    console.log(`Tasks for date: ${date.toLocaleDateString()}`);
  }
  tasks: Task[] = [
    new Task("visit the doctor"), 
    new Task("buy groceries"), 
    new Task("clean the house")
  ];
  add(newtask: string) {
    console.log(newtask);
    this.tasks.push(new Task(newtask));
  }
  remove(task: Task) {
    let confirmRemove = confirm(`Are you sure you want to remove "${task.title}"?`);
    if (confirmRemove) {
      this.tasks = this.tasks.filter(t => t !== task);
    }
  }
}

class Task {
  constructor(public title: string) {}
  toggleIsDone() {
    this.is_done = !this.is_done;
  }
  public is_done: boolean = false;
}

