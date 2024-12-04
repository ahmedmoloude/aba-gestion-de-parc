import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailVehiculeComponent } from './detail-vehicule/detail-vehicule.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogPiecejointeComponent } from './dialog-piecejointe/dialog-piecejointe.component';
import { DialogClotureinterventionComponent } from './dialog-clotureintervention/dialog-clotureintervention.component';
import { InterventionMaintenanceFilter } from 'app/core/models/maintenance/filter/intervention-maintenance-filter.model';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { Observable, Subscription } from 'rxjs';
import { MaintenanceInterventionState } from 'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.reducer';
import { loadMaintenanceInterventions } from 'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.actions';
import { loadDiagnostique } from 'app/core/store/maintenance/diagnostique/diagnostique.actions';
import { Router } from '@angular/router';
import { Truck } from 'app/core/models/maintenance/intervention-maintenance.model';
import { Paginator } from 'app/core/models/paginator.model';
import { selectPagination } from 'app/core/store/pagination/pagination.selectors';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-liste-interventions',
  templateUrl: './liste-interventions.component.html',
  styleUrls: ['./liste-interventions.component.css']
})
export class ListeInterventionsComponent implements OnInit, OnDestroy {

  pagination!: Paginator;
  per_page = 10;
  p: number = 1;
  filterData: InterventionMaintenanceFilter;

  inputsFiler = [
    {
      name: 'num_demande',
      placeholder: 'N° demande',
      type: 'text'
    },
    {
      name: 'date_demande',
      placeholder: 'Date demande',
      type: 'date',
    },
    {
      name: 'codeImmat',
      placeholder: 'Code / Immatriculation',
      type: 'text',
    },
    {
      name: 'tonnage',
      placeholder: 'Tonnage',
      type: 'text',
    },
    {
      name: 'activity',
      placeholder: 'Activité',
      type: 'select',
      options: [
        {
          text: 'Messagerie',
          value: 'Messagerie',
        },
        {
          text: 'Affrètement',
          value: 'Afferetement',
        }
      ]
    },
    {
      name: 'type_intervention',
      placeholder: 'Type d’intervention',
      type: 'text'
    },

  ];

  extraInputsFilter = [
      {
        name: 'demandeur',
        placeholder: 'Demandeur',
        type: 'text'
      },
      {
        name: 'type_panne',
        placeholder: 'Type de panne',
        type: 'text',
      },
      {
        name: 'date_prise',
        placeholder: 'Date prise en charge',
        type: 'date',
      },
      {
        name: 'date_prevu',
        placeholder: 'Date fin prévu',
        type: 'date',
      },
      {
        name: 'date_fin',
        placeholder: 'Date fin réelle',
        type: 'date',
      },
      {
        name: 'statut',
        placeholder: 'Statut',
        type: 'select',
        options: [
          {
            text: 'En attend',
            value: 'en_attend',
          },
          {
            text: 'En Cours',
            value: 'en_cours',
          }
        ]
      },
  ];
  maintenanceIntervention$: Observable<MaintenanceInterventionState> = this.store.select(state => state.maintenanceIntervention);
  maintenanceInterventionSubscription: Subscription;
  constructor(public dialog: MatDialog,
              private store: Store<AppState>,
              private router: Router,
              public permissionService: PermissionService) { }

  ngOnInit(): void {
    this.store.select(selectPagination).subscribe(pagination => {
      this.pagination = pagination
    })
    this.store.dispatch(loadMaintenanceInterventions({data: null, per_page : this.per_page , page : 1}));
  }

  paginate($event: any){
    console.log( 'page size ' , $event)

    this.per_page = $event.rows;

    const paginator = {
      currentPage: $event.page,
      nextPage: $event.page + 1,
      pageSize: $event.pageCount,
      totalItems: this.pagination.totalItems,
    }
    this.p = paginator.nextPage

    this.store.dispatch(loadMaintenanceInterventions({ data: this.filterData , per_page : this.per_page , page : paginator.nextPage}));
  }

  filtrer($event){
    console.log("FILTER RDV", $event);
    let formValue = $event;
    let intervention: InterventionMaintenanceFilter = new InterventionMaintenanceFilter();
    intervention.activity = formValue.activity;
    intervention.codeImmat = formValue.codeImmat;
    intervention.date_demande = formValue.date_demande;
    intervention.date_fin = formValue.date_fin;
    intervention.date_prevu = formValue.date_prevu;
    intervention.date_prise = formValue.date_prise;
    intervention.demandeur = formValue.demandeur;
    intervention.num_demande = formValue.num_demande;
    intervention.statut = formValue.statut;
    intervention.tonnage = formValue.tonnage;
    intervention.type_intervention = formValue.type_intervention;
    intervention.type_panne = formValue.type_panne;
    this.filterData = intervention;
    this.store.dispatch(loadMaintenanceInterventions({data: intervention, per_page : this.per_page, page : this.p}));

  }

  getDetailsIntervention(uuid:string) {
    this.store.dispatch(loadDiagnostique({data: uuid}));
    this.router.navigate(['/detailinterventions/' + uuid]);
  }

  historiquevehicule( data: Truck): void {
    this.dialog.open(DetailVehiculeComponent, {
      disableClose: true,
      width: '741px',
      height: '100vh',
      data: data,
      position: { right: '0px' },
    });
  }
  addPiecejointe(id: number): void {
    const dialogRef = this.dialog.open(DialogPiecejointeComponent, {
      disableClose: true,
      width: '644px',
      data: id,
    });
  }
  closeInrevention(uuid: string): void {
    const dialogRef = this.dialog.open(DialogClotureinterventionComponent, {
      disableClose: true,
      width: '400px',
      data: uuid,
    });
  }

  getDiagnostique(uuid: string) {
    this.store.dispatch(loadDiagnostique({data: uuid}));
    this.router.navigate(['/diagnostique/' + uuid]);
  }

  ngOnDestroy() : void {
    this.maintenanceInterventionSubscription?.unsubscribe();
  }

  recieveCommande(uuid: string) {
    this.router.navigate(['/intervention_notification/' + uuid]);
  }
}
