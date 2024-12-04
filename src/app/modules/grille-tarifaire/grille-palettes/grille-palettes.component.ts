import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectGridIsLoading } from 'app/core/store/grids/grids.selectors';

@Component({
  selector: 'app-grille-palettes',
  templateUrl: './grille-palettes.component.html',
  styleUrls: ['./grille-palettes.component.css'],
})
export class GrillePalettesComponent implements OnInit {
  @Input() grids: any[];
  @Input() position: number;

  headerColumuns = [
    'Origine',
    'Destination',
    'Base de calcul',
    'Tranche',
    'Valeur',
    'Maximum par expédition',
    'Minimum par expédition',
    'Minimum par colis'
  ];

  
  page: number = 1;
  isLoading$ = this.store.select(selectGridIsLoading);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    console.log("palette");
    console.log(this.grids, 'grids par nature');
  }
  pageChange(page) {
    this.page = +page;
  }
}
