import { Component, Inject, OnInit } from '@angular/core';
import { RecouvrementState } from 'app/core/store/facturation/customer-fee/recouvrement/recouvrement.reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-visualistation-global',
  templateUrl: './visualistation-global.component.html',
  styleUrls: ['./visualistation-global.component.css']
})
export class VisualistationGlobalComponent implements OnInit {
  headerColumuns = [
    'Date',
    'N° facture',
    'HT',
    'Remise',
    'TTC',
    'Avoirs',
    'Net',
    'P.E',
    'Montant',
    'Solde',
  ];
  recouvrement$: Observable<RecouvrementState> = this.store.select(state=>state.recouvrement);
  customer = this.data;

  constructor(private store: Store<AppState>,
            @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
  }

  getDifference(x,y){
    if(!x){
      x=0;
    }
    if(!y){
      y=0;
    }

    return parseFloat(x) - parseFloat(y);
  }

  getSum(list,element){
    let sum =0;
    for (const item of list) {
      if(list.montant_avoir){
        sum += parseFloat(list.element);
      }
    }
    return sum;
  }

}
