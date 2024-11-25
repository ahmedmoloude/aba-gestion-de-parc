import { AddPlanningComponent } from './add-planning/add-planning.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { PlanningState } from 'app/core/store/maintenance/planning/planning.reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { deletePlanning, updatePlanning, addPlanning, loadPlannings, accomplishPlanning } from 'app/core/store/maintenance/planning/planning.actions';
import Swal from 'sweetalert2';
import { UpdatePlanningComponent } from './update-planning/update-planning.component';
import { Planning } from 'app/core/models/maintenance/planning.model';
import { Truck } from 'app/core/models/maintenance/intervention-maintenance.model';
import { RessouresService } from 'app/core/services/ressoures.service';
import { PermissionService } from 'app/core/services/permission.service';
import { MaintenanceStateEnum } from 'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.reducer';
@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css'],
})
export class PlanningComponent implements OnInit {
  p: number = 1;
  headerColumuns = [
    'N°',
    'Véhicule',
    'Opération',
    'Date début',
    'Date fin',
    'Rappel avant',
    'Rappel avant',
    'Commentaire',
    'Statut',
  ];
  inputsFiler = [
    {
      name: 'truck_id',
      placeholder: 'Véhicule',
      type: 'select',
      options: []
    },
    {
      name: 'operation',
      placeholder: 'Opération',
      type: 'select',
      options: [
        {
          text: 'Révision générale',
          value: 'REVISION_GENERAL',
        },
        {
          text: 'Révision partielle',
          value: 'revision_partielle',
        }
      ]
    },
    {
      name: 'date_debut',
      placeholder: 'Date début',
      type: 'date',
    },
    {
      name: 'date_fin',
      placeholder: 'Date fin',
      type: 'date',
    }

  ];


  planning$: Observable<PlanningState> = this.store.select(state => state.planning);
  planningSubscription: Subscription;

  trucks : Truck[] = [];
  truck: Truck;

  constructor(public dialog: MatDialog,
              private ressourceService: RessouresService,
              private store: Store<AppState>,
              public permissionService: PermissionService) { }

  ngOnInit(): void {
    this.store.dispatch(loadPlannings(null));
    this.ressourceService.getTrucks().subscribe(
      (data:any) => {
        this.trucks = data.response;
        for(var i=0; i<this.trucks.length; i++){
          this.inputsFiler["0"].options.push({
            'text' : this.trucks[i].code_interne,
            'value' : `${this.trucks[i].id}`,
          })
        }
      }
    );
  }

  filtrer($event){
    let formValue = $event
    let planning : Planning = new Planning();
    planning.truck_id = formValue.truck_id;
    planning.operation = formValue.operation;
    planning.date_debut = formValue.date_debut;
    planning.date_fin = formValue.date_fin;
    this.store.dispatch(loadPlannings({data: planning}));
  }

  addplanning(): void {
    this.dialog.open(AddPlanningComponent, {
      width: '845px',
      data: {},
    });
  }

  updateplanning(planning: Planning): void {
    this.dialog.open(UpdatePlanningComponent, {
      width: '845px',
      data: planning,
    });
  }


  accomplishPlanning(uuid: string, statut: string) {
    if (statut !== 'NON_ACCOMPLI') return;
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir accomplir ce planning ?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'green',
      cancelButtonColor: 'black',
      reverseButtons: true,
      showLoaderOnConfirm: true,
      customClass: {
        loader: 'swal2-green-loader',
      },
      preConfirm: async () => {
        return new Promise<boolean>((resolve) => {
          this.store.dispatch(accomplishPlanning({ data: {uuid} }));

          this.planning$.subscribe((resp) => {
            if (resp.planningState === MaintenanceStateEnum.SUCCESS) {
              resolve(true);
            } else if (resp.planningState === MaintenanceStateEnum.ERROR) {
              resolve(false);
            }
          });
        });
      },
    })
  }

  deletePlanning(uuid: string) {
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer ce planning ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
      reverseButtons: true,
      showLoaderOnConfirm: true,
      customClass: {
        loader: 'swal2-green-loader',
      },
      preConfirm: async () => {
        return new Promise<boolean>((resolve) => {
          this.store.dispatch(deletePlanning({ data: uuid }));

          this.planning$.subscribe((resp) => {
            if (resp.deletePlanningState === MaintenanceStateEnum.SUCCESS) {
              resolve(true);
            } else if (resp.deletePlanningState === MaintenanceStateEnum.ERROR) {
              resolve(false);
            }
          });
        });
      },
    })
  }

  ngOnDestroy(): void {
    this.planningSubscription?.unsubscribe();
  }
}
