import { Component, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Observable, Subscription, catchError, debounceTime, distinctUntilChanged, map, of, switchMap, timer } from 'rxjs';
import { SearchCriteria, TaskService } from '../../services/task.service';

export const SEARCH_HISTORY_STORAGE_KEY = 'eac3_task_search_history_v1';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.scss'
})
export class TaskFilterComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private subscriptions = new Subscription();

  categories: string[] = [
    'Desenvolupament',
    'Formularis',
    'Optimització',
    'Qualitat',
    'Documentació',
    'Accessibilitat',
    'Lliurament'
  ];

  history: string[] = [];
  storageWarning: string | null = null;

  filterForm = this.fb.group({
    searchText: this.fb.control('', {
      validators: [Validators.minLength(2)],
                                asyncValidators: [this.termExistsInApiValidator()],
                                updateOn: 'change'
    }),
    category: this.fb.control('')
  });

  createForm = this.fb.group({
    titol: this.fb.control('', [Validators.required, Validators.minLength(3)]),
                             descripcio: this.fb.control('Tasca creada des del formulari reactiu EAC3.'),
                             categoria: this.fb.control('Desenvolupament', [Validators.required]),
                             data: this.fb.control('2026-11-24', [Validators.required]),
                             hores: this.fb.control(2, [Validators.required, Validators.min(1)]),
                             destacada: this.fb.control(false)
  });

  @Output() filterChange = new EventEmitter<SearchCriteria>();
  @Output() reset = new EventEmitter<void>();
  @Output() taskCreated = new EventEmitter<void>();

  ngOnInit(): void {
    this.history = this.loadHistoryFromStorage();

    const searchControl = this.filterForm.controls.searchText;
    const categoryControl = this.filterForm.controls.category;

    const textSub = searchControl.valueChanges
    .pipe(
      debounceTime(300),
          distinctUntilChanged()
    )
    .subscribe((rawText) => {
      const text = (rawText ?? '').trim();
      if (searchControl.hasError('minlength')) {
        return;
      }
      if (text.length >= 2) {
        this.addToHistory(text);
      }
      this.emitCriteria(text, categoryControl.value ?? '');
    });

    const catSub = categoryControl.valueChanges.subscribe((category) => {
      const text = (searchControl.value ?? '').trim();
      if (!searchControl.hasError('minlength')) {
        this.emitCriteria(text, category ?? '');
      }
    });

    this.subscriptions.add(textSub);
    this.subscriptions.add(catSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onApplyFilter(): void {
    if (this.filterForm.invalid) {
      this.filterForm.markAllAsTouched();
      return;
    }
    const text = (this.filterForm.controls.searchText.value ?? '').trim();
    const category = this.filterForm.controls.category.value ?? '';

    if (text.length >= 2) {
      this.addToHistory(text);
    }
    this.emitCriteria(text, category);
  }

  onResetFilter(): void {
    this.filterForm.reset({
      searchText: '',
      category: ''
    });
    this.reset.emit();
  }

  selectFromHistory(term: string): void {
    this.filterForm.controls.searchText.setValue(term);
    this.filterForm.controls.searchText.markAsTouched();
    this.addToHistory(term);
    this.emitCriteria(term, this.filterForm.controls.category.value ?? '');
  }

  onCreateTask(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const v = this.createForm.value;
    this.taskService
    .createTask({
      titol: v.titol ?? '',
      descripcio: v.descripcio ?? '',
      categoria: v.categoria ?? 'Desenvolupament',
      data: v.data ?? '2026-11-24',
      hores: Number(v.hores ?? 1),
                destacada: Boolean(v.destacada)
    })
    .subscribe({
      next: () => {
        this.createForm.reset({
          titol: '',
          descripcio: 'Tasca creada des del formulari reactiu EAC3.',
          categoria: v.categoria ?? 'Desenvolupament',
          data: '2026-11-24',
          hores: 2,
          destacada: false
        });
        this.taskCreated.emit();
      }
    });
  }

  private emitCriteria(text: string, category: string): void {
    this.filterChange.emit({ text, category });
  }

  private termExistsInApiValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = (control.value ?? '').trim();
      if (value.length < 2) {
        return of(null);
      }

      return timer(350).pipe(
        switchMap(() => this.taskService.hasMatchingTasksAsync(value)),
          map((exists) => (exists ? null : { noApiMatches: true })),
                             catchError(() => of(null))
      );
    };
  }

  private loadHistoryFromStorage(): string[] {
    try {
      const raw = localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : [];
    } catch {
      this.storageWarning = 'No s’ha pogut llegir l’historial de localStorage.';
      return [];
    }
  }

  private addToHistory(term: string): void {
    const clean = term.trim();
    if (clean.length < 2) {
      return;
    }
    if (this.history.length > 0 && this.history[0].toLowerCase() === clean.toLowerCase()) {
      return;
    }
    this.history = [clean, ...this.history.filter((t) => t.toLowerCase() !== clean.toLowerCase())].slice(0, 8);
    this.saveHistoryToStorage(this.history);
  }

  private saveHistoryToStorage(items: string[]): void {
    try {
      localStorage.setItem(SEARCH_HISTORY_STORAGE_KEY, JSON.stringify(items));
      this.storageWarning = null;
    } catch {
      this.storageWarning = 'No s’ha pogut desar l’historial a localStorage.';
    }
  }
}
