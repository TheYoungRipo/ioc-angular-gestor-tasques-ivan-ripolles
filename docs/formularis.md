# Formulari reactiu, validacions i historial (RA3)

## Formulari de cerca (`TaskFilterComponent`)
- Implementat amb `ReactiveFormsModule` i `FormBuilder`.
- **Validació síncrona**: `Validators.minLength(2)` al camp `searchText`.
- **Validació asíncrona**: `termExistsInApiValidator()` comprova a l'API (`hasMatchingTasksAsync`) si existeixen elements que coincideixin amb el terme.
- **`debounce`**: `debounceTime(300)` i `distinctUntilChanged()` sobre `searchText.valueChanges`, i `timer(350)` dins del validador asíncron.
- **Neteja**: Botó `Netejar cerca` que restableix el formulari i recarrega el llistat complet.

## Historial a `localStorage`
- Clau utilitzada: `eac3_task_search_history_v1`.
- Evita duplicats consecutius i reordena termes repetits sense duplicar-los.
- Permet seleccionar un terme de l'historial per tornar a cercar-lo.
- Lectura i escriptura protegides amb blocs `try/catch`.
