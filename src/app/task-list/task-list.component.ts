import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export type FilterType = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  currentFilter: FilterType = 'all';
  selectedDate: Date | null = null;

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    const dateParam = this.route.snapshot.params['date'];
    if (dateParam) {
      this.selectedDate = new Date(dateParam);
      console.log(`Tasks for date: ${this.selectedDate.toLocaleDateString()}`);
    }
  }

  tasks: Task[] = [
    new Task("Complete project documentation"), 
    new Task("Review pull requests"), 
    new Task("Plan team meeting agenda"),
    new Task("Update dependencies"),
    new Task("Fix responsive design issues")
  ];

  add(taskTitle: string): void {
    if (taskTitle && taskTitle.trim()) {
      this.tasks.push(new Task(taskTitle.trim()));
    }
  }

  remove(task: Task): void {
    const confirmRemove = confirm(`Are you sure you want to delete "${task.title}"?`);
    if (confirmRemove) {
      this.tasks = this.tasks.filter(t => t !== task);
    }
  }
  setFilter(filter: FilterType): void {
    this.currentFilter = filter;
  }
  getFilteredTasks(): Task[] {
    switch (this.currentFilter) {
      case 'active':
        return this.tasks.filter(task => !task.is_done);
      case 'completed':
        return this.tasks.filter(task => task.is_done);
      default:
        return this.tasks;
    }
  }
  getActiveTasksCount(): number {
    return this.tasks.filter(task => !task.is_done).length;
  }

  getCompletedTasksCount(): number {
    return this.tasks.filter(task => task.is_done).length;
  }
  clearCompleted(): void {
    const completedCount = this.getCompletedTasksCount();
    if (completedCount > 0) {
      const confirmClear = confirm(`Are you sure you want to delete ${completedCount} completed task${completedCount > 1 ? 's' : ''}?`);
      if (confirmClear) {
        this.tasks = this.tasks.filter(task => !task.is_done);
      }
    }
  }
  trackByTask(index: number, task: Task): string {
    return task.id;
  }
  getRelativeTime(date: Date): string {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  }
}

class Task {
  id: string;
  createdAt: Date;
  is_done: boolean = false;

  constructor(public title: string) {
    this.id = this.generateId();
    this.createdAt = new Date();
  }

  toggleIsDone(): void {
    this.is_done = !this.is_done;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

