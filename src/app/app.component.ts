import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFilterComponent } from './components/task-filter/task-filter.component';
import { Task } from './models/task.model';
import { SearchCriteria, TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TaskFilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private taskService = inject(TaskService);

  tasks: Task[] = [];
  selectedTask: Task | null = null;
  isLoading = false;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.taskService.tasks$.subscribe((list) => {
      this.tasks = list;
      if (this.selectedTask && !list.some((t) => t.id === this.selectedTask?.id)) {
        this.selectedTask = null;
      }
    });

    this.taskService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });

    this.taskService.error$.subscribe((err) => {
      this.errorMessage = err;
    });
  }

  onFilterChange(criteria: SearchCriteria): void {
    this.taskService.search(criteria);
  }

  onResetFilter(): void {
    this.taskService.search({ text: '', category: '' });
    this.selectedTask = null;
  }

  onTaskCreated(): void {
    this.taskService.retryLastQuery();
  }

  onRetry(): void {
    this.taskService.retryLastQuery();
  }

  selectTask(task: Task): void {
    this.selectedTask = task;
  }
}
