import { Component, Inject, OnInit } from '@angular/core';
import { RecouvrementState } from 'app/core/store/facturation/customer-fee/recouvrement/recouvrement.reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-recouvrement',
  templateUrl: './dialog-recouvrement.component.html',
  styleUrls: ['./dialog-recouvrement.component.css']
})
export class DialogRecouvrementComponent implements OnInit {
  headerColumuns = [
    'Code',
    'Client',
    'Ville',
    'Total',
    'Nbre de factures'
  ];
  recouvrement$: Observable<RecouvrementState> = this.store.select(state=>state.recouvrement);
  range= this.data;
  constructor(private store: Store<AppState>,
              @Inject(MAT_DIALOG_DATA) private data: string) { }

  ngOnInit(): void {
  }

}
