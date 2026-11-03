import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.scss'
})
export class TaskFilterComponent {
  searchText: string = '';
  selectedCategory: string = '';

  categories: string[] = [
    'Desenvolupament',
    'Formularis',
    'Optimització',
    'Qualitat',
    'Documentació',
    'Disseny',
    'Accessibilitat',
    'Lliurament'
  ];

  @Output() filterChange = new EventEmitter<{ text: string; category: string }>();
  @Output() reset = new EventEmitter<void>();

  onApplyFilter() {
    this.filterChange.emit({
      text: this.searchText,
      category: this.selectedCategory
    });
  }

  onResetFilter() {
    this.searchText = '';
    this.selectedCategory = '';
    this.reset.emit();
  }
}
