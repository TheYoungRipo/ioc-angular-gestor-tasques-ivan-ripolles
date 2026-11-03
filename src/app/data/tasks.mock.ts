import { Task } from '../models/task.model';

export const TASKS_MOCK: Task[] = [
  {
    id: 1,
    titol: 'Dissenyar interfície Angular',
    descripcio: 'Crear els components base i estructurar el layout amb SCSS.',
    categoria: 'Desenvolupament',
    data: '2026-10-15',
    hores: 4,
    destacada: true
  },
{
  id: 2,
  titol: 'Configurar rutes i navegació',
  descripcio: 'Establir el sistema de rutes standalone per al gestor de tasques.',
  categoria: 'Desenvolupament',
  data: '2026-10-16',
  hores: 3,
  destacada: false
},
{
  id: 3,
  titol: 'Implementar formulari de filtres',
  descripcio: 'Afegir FormsModule i ngModel per filtrar per text i categoria.',
  categoria: 'Formularis',
  data: '2026-10-18',
  hores: 5,
  destacada: true
},
{
  id: 4,
  titol: 'Optimitzar consum de memòria',
  descripcio: 'Revisar subscripcions i fluxos de dades reactius.',
  categoria: 'Optimització',
  data: '2026-10-20',
  hores: 2,
  destacada: false
},
{
  id: 5,
  titol: 'Escriure proves unitàries',
  descripcio: 'Cobrir els components principals amb tests a Jasmine/Karma.',
  categoria: 'Qualitat',
  data: '2026-10-22',
  hores: 6,
  destacada: false
},
{
  id: 6,
  titol: 'Documentar codi font',
  descripcio: 'Actualitzar el README.md amb informació tècnica detallada.',
  categoria: 'Documentació',
  data: '2026-10-25',
  hores: 2,
  destacada: true
},
{
  id: 7,
  titol: 'Corregir estil de l aside',
  descripcio: 'Aplicar regles CSS explícites per compliment de l EAC1.',
  categoria: 'Disseny',
  data: '2026-10-26',
  hores: 1,
  destacada: false
},
{
  id: 8,
  titol: 'Integrar control de flux Angular 22',
  descripcio: 'Migrar directives a @for amb track i @if / @else.',
  categoria: 'Desenvolupament',
  data: '2026-10-28',
  hores: 4,
  destacada: true
},
{
  id: 9,
  titol: 'Revisió d accessibilitat ARIA',
  descripcio: 'Afegir atributs aria-live, rols i focus visible.',
  categoria: 'Accessibilitat',
  data: '2026-10-29',
  hores: 3,
  destacada: false
},
{
  id: 10,
  titol: 'Generar paquet de lliurament ODT',
  descripcio: 'Recopilar captures i emplenar el document de respostes.',
  categoria: 'Lliurament',
  data: '2026-11-01',
  hores: 2,
  destacada: true
}
];
