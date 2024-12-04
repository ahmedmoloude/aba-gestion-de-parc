import { AddInterventionComponent } from './add-intervention/add-intervention.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'app/core';
import { selectEnvinterventionIsLoading, selectEnvinterventionPayload, selectEnvinterventionStatus } from 'app/core/store/intervention/intervention.selectors';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { fetchinterventions } from 'app/core/store/intervention/intervention.actions';
import Swal from 'sweetalert2';
import { Paginator } from 'app/core/models/paginator.model';
import { selectPagination } from 'app/core/store/pagination/pagination.selectors';
import { Observable, Subscription } from 'rxjs';
import { MaintenanceInterventionState } from 'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.reducer';
import { loadMaintenanceInterventions } from 'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.actions';
import { InterventionMaintenanceFilter } from 'app/core/models/maintenance/filter/intervention-maintenance-filter.model';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-demande-intervention',
  templateUrl: './demande-intervention.component.html',
  styleUrls: ['./demande-intervention.component.css'],
})
export class DemandeInterventionComponent implements OnInit {

  pagination!: Paginator;
  per_page = 10;
  p: number = 1;
  filterData: InterventionMaintenanceFilter;

  maintenanceIntervention$: Observable<MaintenanceInterventionState> = this.store.select(state => state.maintenanceIntervention);
  maintenanceInterventionSubscription: Subscription;

  inputsFiler = [
    {
      name: 'demande',
      placeholder: 'N° demande',
      type: 'text'
    },
    {
      name: 'date_demande',
      placeholder: 'Date demande',
      type: 'date',
    },
    {
      name: 'code_imm',
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
        name: 'date_fin',
        placeholder: 'Date fin prévu',
        type: 'date',
      },
      {
        name: 'date_fin_reelle',
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
  interventions :any = [];
  links : any = [];
  spinner : boolean;
  filtres = {
    num_demande : '',
    Immatricule : '',
    Date_demande : ''
  }
  constructor(public dialog: MatDialog,
              private boGridService :BoGridService,
              private vehiculeService :VehiculeService,
              private store: Store<AppState>,
              private _toast: ToastService,
              public permissionService: PermissionService
            ) {}

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

  ajouter(type, item = null): void {
    const dialogRef = this.dialog.open(AddInterventionComponent, {
      width: '831px',
      data: { type, item },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.store.dispatch(loadMaintenanceInterventions({data: null, per_page : this.per_page , page : 1}));

        // if(!type){
        //   this.interventions = this.interventions.filter(function(obj) {
        //     return obj.uuid !== item.uuid;
        //   });
        //   this.interventions.unshift(data);
        // }else{
        //   this.interventions.unshift(data);
        // }
      }
    });
  }

  getTheNext(event){
    this.spinner = true ;
    this.vehiculeService.getIntervention(event).subscribe((res:any)=>{
      this.interventions = res.response.data
      this.links = res.response.links
      this.spinner = false
    })
  }

  getIntervention(){
    this.spinner = true ;
    this.vehiculeService.getInterventionFiltre(this.filtres).subscribe((res:any)=>{
       this.interventions = res.response.data
       this.links = res.response.links
       this.spinner = false
     })
  }

  deletDemande(uuid){
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer la demande d\'intervention ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.vehiculeService.deletIntervention(uuid).subscribe((res:any)=>{
          this.interventions = this.interventions.filter(d => d.uuid != uuid)
          this._toast.error("Demande supprimé avec succées");
        },
        (error) => {
          console.log('error', error);
          this._toast.error("Une erreur est survenue");
        })
      }
    });
  }

}
