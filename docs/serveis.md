# Serveis HTTP i integració API (RA3)

## Configuració
- Servidor local: `json-server` amb `server/db.json` al port `3001` (`http://localhost:3002/tasks`).
- Script d'arrencada: `npm run api`.
- URL base centralitzada a `src/app/config/api.config.ts`.
- `provideHttpClient()` configurat a `src/app/app.config.ts`.

## `TaskService` (`src/app/services/task.service.ts`)
- **GET**: `getTasks(criteria)` i `fetchAndFilterTasks(criteria)` consulten `/tasks` amb `HttpClient` i transformen la resposta amb `adaptTaskListFromApi`.
- **POST**: `createTask(input)` transforma l'entrada amb `adaptTaskToApiPayload`, fa `POST` a `/tasks`, adapta la resposta i actualitza l'estat local.
- **Estats**: `loading$` i `error$` exposats com a observables (`BehaviorSubject`), a més de `tasks$`.
- **`switchMap`**: S'utilitza dins del constructor sobre `this.searchTrigger$` per cancel·lar/substituir consultes anteriors quan arriben nous criteris de cerca o un reintent.
- **Reintent**: `retryLastQuery()` reemet `this.lastCriteria` a través de `searchTrigger$`.
