import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="filter-box">
  <p>Barra de filtres (pròximament funcional amb FormsModule a l'Exercici 3)</p>
  </div>
  `,
  styleUrl: './task-filter.component.scss'
})
export class TaskFilterComponent {
}
