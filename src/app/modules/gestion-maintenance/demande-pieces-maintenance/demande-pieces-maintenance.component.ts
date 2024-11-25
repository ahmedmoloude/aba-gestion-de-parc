import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompleterCommandeComponent } from './completer-commande/completer-commande.component';
import { BonCommandeComponent } from './bon-commande/bon-commande.component';
import { DemandePiecejointeComponent } from './demande-piecejointe/demande-piecejointe.component';
import { DetailDemandeComponent } from './detail-demande/detail-demande.component';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { demandesPiecesState } from 'app/core/store/maintenance/demande-piece/demande-piece.reducer';
import { loadDemandePiecesBon, loadDemandePiecesBonCommande, loadDemandePiecesDetail, loadDemandePiecesHistoric, loadDemandePiecesList } from 'app/core/store/maintenance/demande-piece/demande-piece.actions';
import { BonAchatComponent } from './bon-achat/bon-achat.component';
import { PermissionService } from 'app/core/services/permission.service';
import { FindBonSortieComponent } from './find-bon-sortie/find-bon-sortie.component';
@Component({
  selector: 'app-demande-pieces-maintenance',
  templateUrl: './demande-pieces-maintenance.component.html',
  styleUrls: ['./demande-pieces-maintenance.component.css']
})
export class DemandePiecesMaintenanceComponent implements OnInit, OnDestroy {

  p: number = 1;

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
      name: 'n_demande',
      placeholder: 'N° de commande',
      type: 'text'
    },
    {
      name: 'date',
      placeholder: 'Date',
      type: 'date',
    },
    {
      name: 'demandeur',
      placeholder: 'Demandeur',
      type: 'text',
    },
    {
      name: 'n_bon_comande',
      placeholder: 'N° BCI',
      type: 'text',
    },
    {
      name: 'n_demande_achat',
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
              private store: Store<AppState>,
              private router: Router,
              public permissionService: PermissionService) { }


  ngOnInit(): void {
    this.store.dispatch(loadDemandePiecesList(null));
  }

  filtrer($event){
    console.log("FILTER RDV", $event);
    let formValue = $event;
    let demande = {
      n_demande: formValue.n_demande,
      date: formValue.date,
      demandeur: formValue.demandeur,
      n_bon_comande: formValue.n_bon_comande,
      n_demande_achat: formValue.n_demande_achat,
      n_demande_sortie: formValue.n_demande_sortie,
      statut: formValue.statut
    }
    this.store.dispatch(loadDemandePiecesList({data: demande}));
  }

  loadDemandePiecesHistoric() {
    this.store.dispatch(loadDemandePiecesHistoric(null));
    this.router.navigate(['historiquedemande']);
  }


  completercommande(id: number): void {
    this.store.dispatch(loadDemandePiecesBonCommande({data:id}));
    const dialogRef = this.dialog.open(CompleterCommandeComponent, {
      disableClose: false,
      width: '1029px',
      data: id,
    });
  }

  voirBoncommande(id: number): void {
    this.store.dispatch(loadDemandePiecesBonCommande({data:id}));
    const dialogRef = this.dialog.open(BonCommandeComponent, {
      disableClose: false,
      width: '1650px',
      data: id,
    });
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
      width: '562px',
      height: '100vh',
      data: demande,
      position: { right: '0px' },
    });
  }

  VoirBon(reference: string, type: string) {
    console.log('VoirBon');
    console.log(reference, type  );

    this.store.dispatch(loadDemandePiecesBon({data:{reference: reference, type: type}}));
    const dialogRef = this.dialog.open(BonAchatComponent, {
      disableClose: true,
      width: '882px',
      data: type,
    });
  }
  VoirBonSortie(reference: string, type: string) {
    console.log('VoirBon');
    console.log(reference, type  );

    this.store.dispatch(loadDemandePiecesBon({data:{reference: reference, type: type}}));
    const dialogRef = this.dialog.open(FindBonSortieComponent, {
      disableClose: true,
      width: '882px',
      data: type,
    });
  }

  ngOnDestroy(): void {
    this.demandePieceSubscription?.unsubscribe();
  }

}
