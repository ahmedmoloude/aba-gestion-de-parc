import { cloneDeep } from 'lodash';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InterventionValidationDocumentsComponent } from '../intervention-validation-documents/intervention-validation-documents.component';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { DiagnostiqueState } from 'app/core/store/maintenance/diagnostique/diagnostique.reducer';
import { Observable, Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { MaintenanceStateEnum } from 'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.reducer';
import { createIntervention } from 'app/core/store/maintenance/diagnostique/diagnostique.actions';
import { InterventionRequest } from 'app/core/models/maintenance/intervention-request.model';

@Component({
  selector: 'app-intervention-bon-commande',
  templateUrl: './intervention-bon-commande.component.html',
  styleUrls: ['./intervention-bon-commande.component.css']
})
export class InterventionBonCommandeComponent implements OnInit, OnDestroy {
  showFirstButton: boolean = true;

  switchButton() {
    this.showFirstButton = !this.showFirstButton;
  }
  headerColumuns = [
    'Réf',
    'Désignation',
    'Demandeur',
    'Quantité',
    'Demande d’achat',
    // 'Prix unitaire',
    // 'Total HT',
    // 'TVA',
    // 'Total TTC'
  ];

  diagnostique$: Observable<DiagnostiqueState> = this.store.select(state => state.diagnostique);
  diagnostiqueSubscription: Subscription;
  spinner: boolean = false;
  dateFin: FormControl = new FormControl('', [Validators.required]);
  intervention;
  dateLivraison: FormControl = new FormControl('', [Validators.required]);
  pieces = []
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<InterventionBonCommandeComponent>,
              private store: Store<AppState>,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.diagnostiqueSubscription = this.diagnostique$.subscribe(
      (resp) => {
        if (resp?.dataState == MaintenanceStateEnum.SUCCESS && resp?.maintenanceIntervention) {
          this.intervention = resp.maintenanceIntervention;
          let intervention = cloneDeep(this.intervention)
          this.pieces = this.groupPiecesByReference(intervention.diagnostiques)
        }
      }
    )
  }
  getStockQuantity(id: number, quantity: number) {
    return quantity - this.getQuantityById(id);
  }
  // getQuantiteAAcheter(id: number, quantityStock: number): number{
  //   const quantityDemandee = this.getQuantityById(id);
  //   return Math.max(0, quantityDemandee - quantityStock);
  // }
  getQuantiteAAcheter(quantityDemandee: number, quantityStock: number): number{
    return Math.max(0, quantityDemandee - quantityStock);
  }

  groupPiecesByReference(diagnostiques) {
    let pieces = []
    for (const item of diagnostiques) {
      let pieceRechange = item?.piece_rechange;
      if (pieceRechange) {
        pieceRechange.quantite = this.getQuantityById(item.id);
        pieceRechange.quantity_stock = item?.quantity_stock;
        pieces.push(pieceRechange)
      }
    }

    let piecesRechange = [];
    for (const iterator of pieces) {
      let piece = piecesRechange.find(el => el.id == iterator.id);
      if(piece) {
        piece.quantite += iterator.quantite;
      } else {
        piecesRechange.push(iterator);
      }
    }
    console.log('groupPiecesByReference');
    console.log(pieces);
    console.log(piecesRechange);
    return piecesRechange;
  }

  getQuantityById( idToFind: number): number | null {
    for (const item of this.data) {
      for (const piece of item.pieces) {
        if (piece.id === idToFind) {
          return parseInt(piece.quantity, 10);
        }
      }
    }
    return null; // Return null if the ID is not found
  }
  validateIntervention(): void {
    if(this.dateLivraison.invalid) return;
    this.spinner = true;
    let request: InterventionRequest = new InterventionRequest();
    request.demande_intervention_id = this.intervention.id;
    request.categories = this.data;
    request.date_fin_reelle = this.dateLivraison.value;
    // if (this.data.place == 'INTERNE'){
    //   let reparators = [];
    //   for (const iterator of this.data.rechanges) {
    //     reparators.push(iterator.code);
    //     console.log(reparators)
    //   }
    //   request.reparateurs = reparators;
    // }
    // else if (this.data.place == 'EXTERNE') {
    //   let pieces = this.data.externe;
    //   console.log('pieces');
    //   console.log(pieces);
    //   request.diagnostiques = this.data.externe;
    // }

    this.store.dispatch(createIntervention({data: request}))
    this.diagnostiqueSubscription = this.diagnostique$.subscribe(
      (resp) => {
        if (resp.intervention && resp.interventionState == MaintenanceStateEnum.SUCCESS) {
          this.dialogRef.close();
          const dialogRef = this.dialog.open(InterventionValidationDocumentsComponent, {
            disableClose: false,
            width: '882px',
            data: this.intervention.n_demande,
          });
        }
        if (resp.interventionState == MaintenanceStateEnum.SUCCESS || resp.interventionState == MaintenanceStateEnum.ERROR){
          this.spinner = false;
        }
      },
      (error) => {
        this.spinner = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.diagnostiqueSubscription?.unsubscribe();
  }
}
