import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { Observable } from 'rxjs';
import { DemandeState } from 'app/core/store/affretement/demande/demande.reducer';
import { loadClosedDemandes, loadDemandes } from 'app/core/store/affretement/demande/demande.actions';
import { RecuperationDocumentComponent } from './recuperation-document/recuperation-document.component';
import { DialogDocumentsComponent } from './dialog-documents/dialog-documents.component';
import { FormControl } from '@angular/forms';
import { PermissionService } from 'app/core/services/permission.service';
import { DialogBordereauComponent } from './dialog-bordereau/dialog-bordereau.component';
import { DialogAffectAgentComponent } from './dialog-affect-agent/dialog-affect-agent.component';
import { DialogAccuseReceptionComponent } from './dialog-accuse-reception/dialog-accuse-reception.component';
import { DialogVoirReceptionComponent } from './dialog-voir-reception/dialog-voir-reception.component';
import { DialogBordereauVersementComponent } from './dialog-bordereau-versement/dialog-bordereau-versement.component';
import { VoirBordereauVersementComponent } from './voir-bordereau-versement/voir-bordereau-versement.component';
import { DialogReferenceChequeComponent } from './dialog-reference-cheque/dialog-reference-cheque.component';

@Component({
  selector: 'app-documents-funds',
  templateUrl: './documents-funds.component.html',
  styleUrls: ['./documents-funds.component.css']
})
export class DocumentsFundsComponent implements OnInit {
  headerColumuns = [
    'N° déclaration',
    'N° d’expédition',
    'Destinataire',
    'Ville destination',
    'Adresse',
    'Nbr de palette',
    'Type de palette',
    'Retour documents',
    'Fonds',
  ];
  inputsFiler = [
    {
      name: 'n_demande',
      placeholder: 'N° De demande',
      type: 'text'
    },
    {
      name: 'n_declaration',
      placeholder: 'N° déclaration',
      type: 'text'
    },
    {
      name: 'date_creation_demande',
      placeholder: 'Date de création demande',
      type: 'date'
    },
    {
      name: 'expediteur_id',
      placeholder: 'Expéditeur',
      type: 'select',
      options: [],
    },
    {
      name: 'destinataire_id',
      placeholder: 'Destinataire',
      type: 'select',
      options: [],
    },
  ];
  p: number = 1;
  spinner: boolean = false;
  demandes = [];

  selection = new SelectionModel<any>(true, []);
  demande$: Observable<DemandeState> = this.store.select(state => state.demande);
  selected = new FormControl(0);
  displayRemise: boolean = false;
  displayRecuperation: boolean = false;
  countStatus: number = 0;

  constructor(private store: Store<AppState>,
              public dialog: MatDialog,
              public permissionService: PermissionService) { }

  ngOnInit(): void {
    this.store.dispatch(loadDemandes({data:null}));
    this.store.dispatch(loadClosedDemandes({data: null}));
    this.demande$.subscribe(
      (data) => {
        this.demandes = data.demandes;
        this.demandes?.forEach(e => {
          this.countStatus += (e.document_counts.SCANNED + e.document_counts.RECOVER);
          console.log(this.countStatus);

        })
      }
    );
  }

  getStatus(status: string) {
    switch (status) {
      case 'EN_COURS':
        return 'En cours';
      case 'SCANNED':
        return 'Scanné';
      case 'RECOVER':
        return 'Récupéré';
      case 'DELIVERED':
        return 'Remis';
      default:
        return '---';
    }
  }

  filtrer($event){
    // this.spinner = true;
    console.log("FILTER RDV", $event)
    let formValue = $event;
    if(Object.keys(formValue)?.length > 0) {
      let demande = formValue.n_demande;
      if(this.selected.value==0){
        this.store.dispatch(loadDemandes({data:demande}));
      } else if (this.selected.value==1){
        this.store.dispatch(loadClosedDemandes({data:demande}));
      }
    } else {
      this.store.dispatch(loadDemandes({data: null}));
      this.store.dispatch(loadClosedDemandes({data: null}));

    }




    // this.store.dispatch(FactureActions.loadFactures({data: facture}));
  }

  getIndex(){
    console.log(this.selected.value);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection?.selected?.length;
    const numRows = this.demandes?.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.demandes);
    this.displayRecuperation = false;
    this.displayRemise = false;
    this.selection.selected.forEach(e => {
      if (e.document_counts.SCANNED>0) {
        this.displayRecuperation = true;
      }
      if (e.document_counts.RECOVER>0) {
        this.displayRemise = true;
      }
    })
  }
  displayCheckbox(scanned: number, recover: number){
    return scanned > 0 || recover > 0;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    let ret = `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${this.selection.selected.indexOf(row)}`;
    this.displayRecuperation = false;
    this.displayRemise = false;
    console.log(this.selection.selected);

    this.selection.selected.forEach(e => {
      console.log(e.document_counts.SCANNED);

      if (e.document_counts.SCANNED>0) {
        this.displayRecuperation = true;
      }
      if (e.document_counts.RECOVER>0) {
        this.displayRemise = true;
      }
    })
    return ret
  }

  openStatusDialog(status: string, demande?: any) {
    if((!demande&&this.selection.isEmpty())) return;

    let dialogData = demande? [demande]:this.selection.selected

    const refDialog = this.dialog.open(RecuperationDocumentComponent, {
      disableClose: true,
      width: '611px',
      data: {demandes:dialogData, status} ,
    });
    refDialog.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.store.dispatch(loadDemandes({data:null}));
          if (data.status == 'RECOVER'){
            this.store.dispatch(loadClosedDemandes({data:null}));
          }
        }
      }
    )
  }

  opendocumentsedialog(demandes: any[], type: string) {
    this.dialog.open(DialogDocumentsComponent, {
      // disableClose: true,
      width: '1684px',
      data: { demandes, type},
    });
  }

  bordeareaudialog() {
    this.dialog.open(DialogBordereauComponent, {
      // disableClose: true,
      width: '684px',
      data: {},
    });
  }
  affectagentdialog() {
    this.dialog.open(DialogAffectAgentComponent, {
      // disableClose: true,
      width: '524px',
      data: {},
    });
  }
  accusereceptiondialog() {
    this.dialog.open(DialogAccuseReceptionComponent, {
      // disableClose: true,
      width: '684px',
      data: {},
    });
  }
  voirreceptiondialog() {
      this.dialog.open(DialogVoirReceptionComponent, {
        // disableClose: true,
        width: '684px',
        data: {},
    });
  }
  bordereauversementdialog() {
    this.dialog.open(DialogBordereauVersementComponent, {
      // disableClose: true,
      width: '684px',
      data: {},
    });
  }

  Voirbordereauversement() {
    this.dialog.open(VoirBordereauVersementComponent, {
      // disableClose: true,
      width: '684px',
      data: {},
    });
  }
  
  referencecheque(){
    this.dialog.open(DialogReferenceChequeComponent, {
      // disableClose: true,
      width: '384px',
      data: {},
    }); 
  }
}
