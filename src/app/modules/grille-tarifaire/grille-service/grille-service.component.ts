import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectGridIsLoading } from 'app/core/store/grids/grids.selectors';

@Component({
  selector: 'app-grille-service',
  templateUrl: './grille-service.component.html',
  styleUrls: ['./grille-service.component.css'],
})
export class GrilleServiceComponent implements OnInit {
  @Input() grids: any[];
  headerColumuns = [
    'Origine',
    'Destination',
    'Rubrique',
    'Base de calcul',
    'Valeur',
    'Min',
    'Max',
    'Unité supplémentaire',
    'Valeur supplémentaire',
  ];
  page: number = 1;
  isLoading$ = this.store.select(selectGridIsLoading);
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    console.log(this.grids, 'grids services');

    console.log(this.grids, '12121212');
  }

  convertToPourcentage(coef: number): number {
    coef = coef * 100;
    return Math.round((coef + Number.EPSILON) * 100) / 100;
  }
}
