import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { CaisseCarteState } from 'app/core/store/caisse/carte/carte.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-historique-carte',
  templateUrl: './historique-carte.component.html',
  styleUrls: ['./historique-carte.component.css']
})
export class HistoriqueCarteComponent implements OnInit {
  headerColumuns = [
    'Date',
    'Montant (Dhs)',
    'Alimentée par',
    'Motif',
  ];

  carte$: Observable<CaisseCarteState> = this.store.select(state=>state.caisseCarte);

  cardNumber = this.data;
  constructor(private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) private data: number) { }

  ngOnInit(): void {
  }

}
