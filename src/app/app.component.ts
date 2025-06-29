import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-list';
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