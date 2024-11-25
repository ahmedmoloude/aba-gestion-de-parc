import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { demandesPiecesState } from 'app/core/store/maintenance/demande-piece/demande-piece.reducer';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { loadDemandePiecesBon } from 'app/core/store/maintenance/demande-piece/demande-piece.actions';
import { BonAchatComponent } from '../bon-achat/bon-achat.component';
import { VoirBonComponent } from '../voir-bon/voir-bon.component';
@Component({
  selector: 'app-detail-demande',
  templateUrl: './detail-demande.component.html',
  styleUrls: ['./detail-demande.component.css']
})
export class DetailDemandeComponent implements OnInit, OnDestroy {
  p: number = 1;

  headerColumuns = [
    'N°',
    'Date',
    'Type',
    ''
  ];

  demandePiece$: Observable<demandesPiecesState> = this.store.select(state => state.demandePieces);
  demandePieceSubscription: Subscription;

  demande = this.data
  constructor(private store: Store<AppState>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DetailDemandeComponent>,) { }

  ngOnInit(): void {
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


  VoirBon(item: any) {
    console.log('VoirBon');
    console.log();
    const dialogRef = this.dialog.open(VoirBonComponent, {
      disableClose: true,
      width: '562px',
      data: item,
    });
  }


  // VoirBon(reference: string, type: string) {
  //   console.log('VoirBon');
  //   console.log(reference, type  );

  //   this.store.dispatch(loadDemandePiecesBon({data: {reference: reference, type: type}}));
  //   const dialogRef = this.dialog.open(BonAchatComponent, {
  //     disableClose: true,
  //     width: '562px',
  //     data: type,
  //   });
  // }

  ngOnDestroy(): void {
    this.demandePieceSubscription?.unsubscribe();
  }

}
