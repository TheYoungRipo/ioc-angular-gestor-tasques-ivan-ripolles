import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, switchMap, tap, throwError } from 'rxjs';
import { TASKS_ENDPOINT } from '../config/api.config';
import { Task } from '../models/task.model';
import { TaskApiDto } from '../models/task-api.model';
import { adaptTaskFromApi, adaptTaskListFromApi, adaptTaskToApiPayload } from '../adapters/task.adapter';

export interface SearchCriteria {
  text: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private allTasksSubject = new BehaviorSubject<Task[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  private searchTrigger$ = new BehaviorSubject<SearchCriteria>({ text: '', category: '' });
  private lastCriteria: SearchCriteria = { text: '', category: '' };

  readonly tasks$ = this.tasksSubject.asObservable();
  readonly allTasks$ = this.allTasksSubject.asObservable();
  readonly loading$ = this.loadingSubject.asObservable();
  readonly error$ = this.errorSubject.asObservable();

  constructor() {
    this.searchTrigger$
    .pipe(
      switchMap((criteria) => {
        this.lastCriteria = { ...criteria };
        return this.fetchAndFilterTasks(criteria);
      })
    )
    .subscribe();
  }

  getTasks(criteria: SearchCriteria = { text: '', category: '' }): Observable<Task[]> {
    this.lastCriteria = { ...criteria };
    return this.fetchAndFilterTasks(criteria);
  }

  search(criteria: SearchCriteria): void {
    this.searchTrigger$.next({ ...criteria });
  }

  retryLastQuery(): void {
    this.searchTrigger$.next({ ...this.lastCriteria });
  }

  createTask(newTaskInput: {
    titol: string;
    descripcio: string;
    categoria: string;
    data: string;
    hores: number;
    destacada?: boolean;
  }): Observable<Task> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    const payload = adaptTaskToApiPayload(newTaskInput);

    return this.http.post<TaskApiDto>(TASKS_ENDPOINT, payload).pipe(
      map((createdDto) => adaptTaskFromApi(createdDto)),
                                                                    tap((createdTask) => {
                                                                      const updatedAll = [...this.allTasksSubject.value, createdTask];
                                                                      this.allTasksSubject.next(updatedAll);
                                                                      this.tasksSubject.next(this.applyClientFilters(updatedAll, this.lastCriteria));
                                                                      this.loadingSubject.next(false);
                                                                    }),
                                                                    catchError((err) => {
                                                                      this.loadingSubject.next(false);
                                                                      this.errorSubject.next('No s’ha pogut crear la tasca a l’API local.');
                                                                      return throwError(() => err);
                                                                    })
    );
  }

  hasMatchingTasksAsync(term: string): Observable<boolean> {
    const cleanTerm = term.trim().toLowerCase();
    if (!cleanTerm) {
      return of(true);
    }

    return this.http.get<TaskApiDto[]>(TASKS_ENDPOINT).pipe(
      map((dtos) => adaptTaskListFromApi(dtos)),
                                                            map((tasks) =>
                                                            tasks.some(
                                                              (t) =>
                                                              t.titol.toLowerCase().includes(cleanTerm) ||
                                                              t.descripcio.toLowerCase().includes(cleanTerm) ||
                                                              t.categoria.toLowerCase().includes(cleanTerm)
                                                            )
                                                            ),
                                                            catchError(() => of(true))
    );
  }

  private fetchAndFilterTasks(criteria: SearchCriteria): Observable<Task[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    let params = new HttpParams();
    if (criteria.category && criteria.category.trim().length > 0) {
      params = params.set('category', criteria.category.trim().toLowerCase());
    }

    return this.http.get<TaskApiDto[]>(TASKS_ENDPOINT, { params }).pipe(
      map((dtos) => adaptTaskListFromApi(dtos)),
                                                                        tap((adaptedTasks) => {
                                                                          if (!criteria.category) {
                                                                            this.allTasksSubject.next(adaptedTasks);
                                                                          }
                                                                          const filtered = this.applyClientFilters(adaptedTasks, criteria);
                                                                          this.tasksSubject.next(filtered);
                                                                          this.loadingSubject.next(false);
                                                                        }),
                                                                        catchError((err) => {
                                                                          this.loadingSubject.next(false);
                                                                          this.errorSubject.next('Error en comunicar amb l’API local. Comprova que json-server està en marxa.');
                                                                          return of([]);
                                                                        })
    );
  }

  private applyClientFilters(tasks: Task[], criteria: SearchCriteria): Task[] {
    const query = criteria.text.trim().toLowerCase();
    const categoryFilter = criteria.category.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesText =
      !query ||
      task.titol.toLowerCase().includes(query) ||
      task.descripcio.toLowerCase().includes(query);
      const matchesCategory =
      !categoryFilter || task.categoria.toLowerCase() === categoryFilter;
      return matchesText && matchesCategory;
    });
  }
}
