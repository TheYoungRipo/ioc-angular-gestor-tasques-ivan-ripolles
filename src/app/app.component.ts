import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Task } from './models/task.model';
import { TASKS_MOCK } from './data/tasks.mock';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFilterComponent } from './components/task-filter/task-filter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TaskListComponent, TaskFilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  appName = 'Gestor de tasques';
  tasks: Task[] = TASKS_MOCK;
  selectedTask: Task | null = null;

  handleTaskSelected(task: Task) {
    this.selectedTask = task;
  }
}
