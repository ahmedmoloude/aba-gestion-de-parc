import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { demandesPiecesState } from 'app/core/store/maintenance/demande-piece/demande-piece.reducer';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { completeDemandePiecesCommande } from 'app/core/store/maintenance/demande-piece/demande-piece.actions';
import { MaintenanceStateEnum } from 'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.reducer';
@Component({
  selector: 'app-completer-commande',
  templateUrl: './completer-commande.component.html',
  styleUrls: ['./completer-commande.component.css']
})
export class CompleterCommandeComponent implements OnInit, OnDestroy {
  headerColumuns = [
    'réf',
    'Nom de pièce',
    'Quantité Livrée',
    // 'Prix unitaire',
    // 'Prix HT',
    // 'TVA',
    // 'Total TTC',
  ];

  demandePiece$: Observable<demandesPiecesState> = this.store.select(state => state.demandePieces);
  demandePieceSubscription: Subscription;

  spinner: boolean = false;

  constructor(private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) private data: number,
    private dialogRef: MatDialogRef<CompleterCommandeComponent>
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

  CompleteCommande() {
    this.spinner = true;
    this.store.dispatch(completeDemandePiecesCommande({data: this.data}));
    this.demandePieceSubscription = this.demandePiece$.subscribe(
      (resp) => {
        if(resp?.completeCommandeState==MaintenanceStateEnum.SUCCESS){
          this.dialogRef.close();
        }
        if(resp?.completeCommandeState==MaintenanceStateEnum.SUCCESS  || resp?.completeCommandeState==MaintenanceStateEnum.ERROR) {
          this.spinner = false;
        }
      }
    );

  }

  ngOnDestroy(): void {
    this.demandePieceSubscription?.unsubscribe();
  }
}
