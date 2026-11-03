# Gestor de tasques

## Autor/a
Ivan Ripolles Cervera

## Descripció
Aplicació web desenvolupada amb Angular per a gestionar les tasques diàries, filtrar per text i categoria, i veure el detall de les tasques seleccionades.

## Versions utilitzades
- Node.js: 24.21.0
- npm: 11.19.0
- Angular CLI: 22.2.2
- Git: 2.56.0

## Com crear i executar el projecte
1. Instal·lació de dependències: 
   npm install

2. Execució del servidor de desenvolupament local:
  ng serve

L'aplicació estarà accessible a `http://localhost:4200`.

## Branca de treball

Aquesta entrega es desenvolupa sobre la branca ra2-components.

## Components creats

    TaskBadgeComponent: Subcomponent d'etiqueta per mostrar la categoria.

    TaskCardComponent: Targeta que resumeix la informació d'una tasca (@Input) i n'emet la selecció (@Output).

    TaskListComponent: Llistat iteratiu de tasques utilitzant la sintaxi @for (...; track ...) i @empty.

    TaskFilterComponent: Formulari de cerca i filtratge combinat utilitzant FormsModule i [(ngModel)].
    
## Enllaç del repositori

https://github.com/TheYoungRipo/ioc-angular-gestor-tasques-ivan-ripolles

* **Verificació:** El fitxer conté totes les capçaleres de secció requerides per l'enunciat de l'assignatura.
