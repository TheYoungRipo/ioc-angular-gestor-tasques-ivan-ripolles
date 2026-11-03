import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { TaskBadgeComponent } from '../task-badge/task-badge.component';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, TaskBadgeComponent],
  template: `
  <div class="card" (click)="onSelect()" [class.destacada]="task.destacada">
  <div class="card-header">
  <h3>{{ task.titol }}</h3>
  <app-task-badge [categoria]="task.categoria"></app-task-badge>
  </div>
  <p>{{ task.descripcio }}</p>
  <div class="card-footer">
  <span>📅 {{ task.data | date:'dd/MM/yyyy' }}</span>
  <span>⏱️ {{ task.hores }} hores</span>
  </div>
  </div>
  `,
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Output() taskSelected = new EventEmitter<Task>();

  onSelect() {
    this.taskSelected.emit(this.task);
  }
}
