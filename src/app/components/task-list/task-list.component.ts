import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  template: `
  <div class="task-list">
  @for (task of tasks; track task.id) {
    <app-task-card [task]="task" (taskSelected)="onTaskSelected($event)"></app-task-card>
  }
  </div>
  `,
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  @Input({ required: true }) tasks: Task[] = [];
  @Output() selectTask = new EventEmitter<Task>();

  onTaskSelected(task: Task) {
    this.selectTask.emit(task);
  }
}
