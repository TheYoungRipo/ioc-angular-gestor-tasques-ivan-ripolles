# Models i adaptador de dades (RA3)

## Fitxers implicats
- Model d'API: `src/app/models/task-api.model.ts` (`TaskApiDto`, `CreateTaskPayload`)
- Model intern: `src/app/models/task.model.ts` (`Task`)
- Adaptador: `src/app/adapters/task.adapter.ts` (`adaptTaskFromApi`, `adaptTaskListFromApi`, `adaptTaskToApiPayload`)

## Taula de mapatge API -> Model intern

| Camp API (`TaskApiDto`) | Camp model intern (`Task`) | Transformació / Normalització aplicada |
| --- | --- | --- |
| `id` | `id: number` | Conversió numèrica segura (`Number(...)`), amb fallback si no és vàlid. |
| `title` | `titol: string` | `trim()` i valor per defecte si queda buit. |
| `description` | `descripcio: string` | `trim()` i text per defecte si està buit. |
| `category` | `categoria: string` | `trim()`, minúscules i mapeig a etiqueta llegible (`Desenvolupament`, `Formularis`, etc.). |
| `status` | `estat: string` | `trim()` i valor per defecte `'pendent'`. |
| `dueDate` | `data: string` | `trim()` i normalització a ISO local (`YYYY-MM-DDT09:00:00`) per al `date` pipe. |
| `estimatedHours` | `hores: number` | Conversió numèrica segura (`Number(...)` >= 0), per defecte `1`. |
| `featured` | `destacada?: boolean` | Conversió booleana explícita amb `Boolean(...)`. |
