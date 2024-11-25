import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompleterCommandeComponent } from '../completer-commande/completer-commande.component';
import { DetailDemandeComponent } from '../detail-demande/detail-demande.component';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { demandesPiecesState } from 'app/core/store/maintenance/demande-piece/demande-piece.reducer';
import { MaintenanceStateEnum } from 'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.reducer';
import { loadDemandePiecesBon, loadDemandePiecesDetail, loadDemandePiecesHistoric } from 'app/core/store/maintenance/demande-piece/demande-piece.actions';
import { DemandePiecejointeComponent } from '../demande-piecejointe/demande-piecejointe.component';
import { BonAchatComponent } from '../bon-achat/bon-achat.component';
@Component({
  selector: 'app-historique-demande',
  templateUrl: './historique-demande.component.html',
  styleUrls: ['./historique-demande.component.css']
})
export class HistoriqueDemandeComponent implements OnInit, OnDestroy {
  headerColumuns = [
    'N° de demande',
    'Date',
    'Demandeur',
    'N° BCI',
    'N° DA',
    'N° de bon sortie',
    'Statut',
  ];
  inputsFiler = [
    {
      name: 'demande',
      placeholder: 'N° de commande',
      type: 'text'
    },
    {
      name: 'date_demande',
      placeholder: 'Date',
      type: 'date',
    },
    {
      name: 'demandeur',
      placeholder: 'Demandeur',
      type: 'text',
    },
    {
      name: 'bci',
      placeholder: 'N° BCI',
      type: 'text',
    },
    {
      name: 'da',
      placeholder: 'N° DA',
      type: 'text',
    },
    {
      name: 'statut',
      placeholder: 'Statut',
      type: 'select',
      options: [
        {
          text: 'En Cours',
          value: 'en_cours',
        },
        {
          text: 'Annule',
          value: 'annule',
        }
      ]
    },

  ];

  demandePiece$: Observable<demandesPiecesState> = this.store.select(state => state.demandePieces);
  demandePieceSubscription: Subscription;

  constructor(public dialog: MatDialog,
    private store: Store<AppState>,) { }

  ngOnInit(): void {
    let status = true;
    this.demandePieceSubscription = this.demandePiece$.subscribe(
      (resp) => {
        if (!(resp.historicState== MaintenanceStateEnum.SUCCESS && resp.demandesHistoric)){
          status = false;
        }
      }
    );
    if(!status) {
      this.store.dispatch(loadDemandePiecesHistoric(null));
    }
  }

  filtrer($event){
    console.log("FILTER RDV", $event)
  }

  addPiecejointe(id: number): void {
    const dialogRef = this.dialog.open(DemandePiecejointeComponent, {
      disableClose: true,
      width: '644px',
      data: id,
    });
  }

  getdetaildemande(demande: any): void {
    this.store.dispatch(loadDemandePiecesDetail({data: demande?.id}));
    this.dialog.open(DetailDemandeComponent, {
      disableClose: true,
      width: '466px',
      height: '100vh',
      data: demande,
      position: { right: '0px' },
    });
  }

  VoirBon(reference: string, type: string) {
    console.log('VoirBon');
    console.log(reference, type  );

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
