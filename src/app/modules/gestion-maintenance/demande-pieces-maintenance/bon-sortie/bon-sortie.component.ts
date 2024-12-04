import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { demandesPiecesState } from 'app/core/store/maintenance/demande-piece/demande-piece.reducer';
import { MatDialogRef } from '@angular/material/dialog';
import { loadDemandePiecesList } from 'app/core/store/maintenance/demande-piece/demande-piece.actions';
import { Config } from 'app/config';
@Component({
  selector: 'app-bon-sortie',
  templateUrl: './bon-sortie.component.html',
  styleUrls: ['./bon-sortie.component.css']
})
export class BonSortieComponent implements OnInit, OnDestroy {
  headerColumuns = [
    'Nom de pièce',
    'Référence d\'achat',
    'Quantité livrée',
    'Prix unitaire',
    'Prix HT',
    'TVA',
    'Total TTC',
  ];

  url: string = Config.api.bill.printBill;



  sommePrixUnitaire;
  sommeMontantHT;
  sommeTva;
  sommeMontantTTC;

  demandePiece$: Observable<demandesPiecesState> = this.store.select(state => state.demandePieces);
  demandePieceSubscription: Subscription;

  constructor(private store: Store<AppState>,
    public dialogRef: MatDialogRef<BonSortieComponent>,
    ) { }

  ngOnInit(): void {
  }

  calculateSum(arr, property) {
    return arr?.reduce((sum, item) => sum + this.getFloatValue(item[property]), 0);
  }

  getFloatValue(value) {
    if(typeof value == 'number'){
      return value;
    }
    return parseFloat(value);
  }

  changeStatus(){
    this.store.dispatch(loadDemandePiecesList(null));
    this.dialogRef.close();
  }

  printBonCommande(bon: any ) {
    const link = document.createElement('a');
    link.href = this.url + bon;
    link.target = '_blank';
    link.download = 'Bon de sortie N° ' + bon;
    link.click();
  }

  ngOnDestroy(): void {
    this.demandePieceSubscription?.unsubscribe();
  }
}
