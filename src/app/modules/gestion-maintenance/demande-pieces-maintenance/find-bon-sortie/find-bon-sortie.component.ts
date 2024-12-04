import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { demandesPiecesState } from 'app/core/store/maintenance/demande-piece/demande-piece.reducer';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { loadDemandePiecesList } from 'app/core/store/maintenance/demande-piece/demande-piece.actions';
import { Config } from 'app/config';
@Component({
  selector: 'app-find-bon-sortie',
  templateUrl: './find-bon-sortie.component.html',
  styleUrls: ['./find-bon-sortie.component.css']
})
export class FindBonSortieComponent implements OnInit, OnDestroy {
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
  type: string = this.data;

  constructor(private store: Store<AppState>,
    public dialogRef: MatDialogRef<FindBonSortieComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string
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

  getType(type) {
    switch (type) {
      case 'COMMANDE':
        return 'Bon de commande';
      case 'SORTIE':
        return 'Bon de sortie';
      case 'ACHAT':
        return 'bon d\'achat';
      default:
        return type;
    }
  }

  printBonCommande(bon: any ) {
    const link = document.createElement('a');
    link.href = this.url + bon?.path;
    link.target = '_blank';
    link.download = 'Bon de '+ this.type?.toLowerCase() + 'N° ' + bon?.bon+ '.pdf';
    link.click();
  }

  ngOnDestroy(): void {
    this.demandePieceSubscription?.unsubscribe();
  }
}
