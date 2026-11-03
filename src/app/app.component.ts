import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from './models/task.model';
import { TASKS_MOCK } from './data/tasks.mock';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFilterComponent } from './components/task-filter/task-filter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TaskListComponent, TaskFilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  appName = 'Gestor de tasques';
  tasks: Task[] = TASKS_MOCK;
  filteredTasks: Task[] = TASKS_MOCK;
  selectedTask: Task | null = null;

  handleTaskSelected(task: Task) {
    this.selectedTask = task;
  }

  onFilterChange(filter: { text: string; category: string }) {
    const query = filter.text.toLowerCase().trim();
    this.filteredTasks = this.tasks.filter(task => {
      const matchesText = task.titol.toLowerCase().includes(query) ||
      task.descripcio.toLowerCase().includes(query);
      const matchesCategory = filter.category ? task.categoria === filter.category : true;
      return matchesText && matchesCategory;
    });
  }

  onResetFilter() {
    this.filteredTasks = this.tasks;
  }
}
