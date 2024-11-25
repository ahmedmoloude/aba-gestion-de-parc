import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectEnvmodelePayload, selectEnvmodeleIsLoading } from 'app/core/store/modele/modele.selectors';

@Component({
  selector: 'app-parametre-modele',
  templateUrl: './parametre-modele.component.html',
  styleUrls: ['./parametre-modele.component.css'],
})
export class ParametreModeleComponent implements OnInit {
  headerColumuns = ['Modèle', 'Marque'];
  p: number = 1;
  modeles : any;
  spinner : boolean;

  constructor(private store: Store<AppState>,) {}

  ngOnInit(): void {
    this.store.select(selectEnvmodelePayload).subscribe((res) => {  
      // console.log(" brand========>", res)
      this.modeles = res
    });

    this.store.select(selectEnvmodeleIsLoading).subscribe((res) => {  
      // console.log(" spinner========>", res)
      this.spinner = res
    });
  }
}
