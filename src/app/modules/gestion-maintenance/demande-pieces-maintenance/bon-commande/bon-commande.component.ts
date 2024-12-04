import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ValidationDocumentsComponent } from '../validation-documents/validation-documents.component';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { demandesPiecesState } from 'app/core/store/maintenance/demande-piece/demande-piece.reducer';
import { generateDemandePiecesBonAchat, loadDemandePiecesBon, loadDemandePiecesBonSortie } from 'app/core/store/maintenance/demande-piece/demande-piece.actions';
import { MaintenanceStateEnum } from 'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.reducer';
import { BonSortieComponent } from '../bon-sortie/bon-sortie.component';
import { BonAchatComponent } from '../bon-achat/bon-achat.component';
@Component({
  selector: 'app-bon-commande',
  templateUrl: './bon-commande.component.html',
  styleUrls: ['./bon-commande.component.css']
})
export class BonCommandeComponent implements OnInit, OnDestroy {
  showFirstButton: boolean = true;
  spinner: boolean = false;
  show: boolean = false;
  bonSortiePartiel: boolean = false;
  disabled: boolean = true;

  headerColumuns = [
    'Réf',
    'Désignation',
    'Demandeur',
    'Quantité demandée',
    'Quantité en stock',
    'Demande d’achat',
    // 'Prix unitaire',
    // 'Total HT',
    // 'TVA',
    // 'Total TTC'
  ];
  data: any[] =[];
  demandePiece$: Observable<demandesPiecesState> = this.store.select(state => state.demandePieces);
  demandePieceSubscription: Subscription;

  constructor(public dialog: MatDialog,
        public dialogRef: MatDialogRef<BonCommandeComponent>,
        private store: Store<AppState>,) { }

  ngOnInit(): void {
    this.demandePieceSubscription = this.demandePiece$.subscribe(
      (resp) => {
        if (resp?.BonCommandeState==MaintenanceStateEnum.SUCCESS && resp.BonCommande) {
          this.data = resp.BonCommande?.data;
          this.show = this.data?.find(e=> e.demande_achat>0)? true:false;
          this.disabled = this.data?.find(e=> e.demande_achat>0 && !e.bon_achat)? true:false;
          this.bonSortiePartiel = this.data.find(e => e.quantity_demande > e.demande_achat);
        }

      }
    );
  }

  switchButton() {
    this.showFirstButton = !this.showFirstButton;
  }

  generateBonAchat(id: number) {
    this.spinner= true
    this.store.dispatch(generateDemandePiecesBonAchat({data: id}));
    this.demandePieceSubscription = this.demandePiece$.subscribe(
      (resp) => {
        if(resp?.generateBonAchatState==MaintenanceStateEnum.SUCCESS  || resp?.generateBonAchatState==MaintenanceStateEnum.ERROR) {
          this.spinner = false;
        }
      }
    );
  }

  generateBonSortie(): void {
    this.spinner = true;
    console.log('this.data')
    console.log(this.data);
     let diagnostiques = []
    for (const item of this.data) {
      if((item?.quantity_demande - item?.demande_achat) > 0){
        diagnostiques.push({
          id: item?.diagnostique_id,
          quantity_demande: item?.quantity_demande,
          demande_achat: item?.demande_achat
        });
      }
    }
    let request = {
      type: (this.show && diagnostiques.length>0 )? 'PARTIAL' : 'FINISHED',
      diagnostiques: diagnostiques
    }
    this.store.dispatch(loadDemandePiecesBonSortie({data: request}));
    this.demandePieceSubscription = this.demandePiece$.subscribe(
      (resp) => {
        if(resp?.bonSortieState==MaintenanceStateEnum.SUCCESS && resp?.bonSortie){
          this.dialogRef.close();
          const dialogRef = this.dialog.open(BonSortieComponent, {
            disableClose: true,
            width: '882px',
            data: { },
          });
        }
        if(resp?.bonSortieState==MaintenanceStateEnum.SUCCESS  || resp?.bonSortieState==MaintenanceStateEnum.ERROR) {
          this.spinner = false;
        }
      }
    );

  }

  VoirBon(reference: string, type: string) {
    this.store.dispatch(loadDemandePiecesBon({data: {reference: reference, type: type}}));
    const dialogRef = this.dialog.open(BonAchatComponent, {
      disableClose: true,
      width: '882px',
      data: type,
    });
  }

  ngOnDestroy(): void {
    this.demandePieceSubscription?.unsubscribe();
  }
}
