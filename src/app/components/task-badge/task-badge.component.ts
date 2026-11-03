import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
  <span class="badge">
  {{ categoria }}
  </span>
  `,
  styleUrl: './task-badge.component.scss'
})
export class TaskBadgeComponent {
  @Input({ required: true }) categoria!: string;
}
