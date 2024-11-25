import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectEnvtruckCategoryPayload, selectEnvtruckCategoryIsLoading } from 'app/core/store/truckCategory/truckCategory.selectors';

@Component({
  selector: 'app-parametre-categorie',
  templateUrl: './parametre-categorie.component.html',
  styleUrls: ['./parametre-categorie.component.css'],
})
export class ParametreCategorieComponent implements OnInit {
  headerColumuns = ['Catégorie'];
  page: number = 1;
  categories : any;
  spinner : boolean;

  constructor(private store: Store<AppState>,) {}

  ngOnInit(): void {
    this.store.select(selectEnvtruckCategoryPayload).subscribe((res) => {  
      // console.log(" brand========>", res)
      this.categories = res
    });

    this.store.select(selectEnvtruckCategoryIsLoading).subscribe((res) => {  
      // console.log(" spinner========>", res)
      this.spinner = res
    });
  }
}
