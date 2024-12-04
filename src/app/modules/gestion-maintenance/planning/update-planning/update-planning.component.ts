import { Component, Inject, OnDestroy, OnInit, ViewChildren, QueryList  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { PlanningState } from 'app/core/store/maintenance/planning/planning.reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RessouresService } from 'app/core/services/ressoures.service';
import { updatePlanning } from 'app/core/store/maintenance/planning/planning.actions';
import { MaintenanceStateEnum } from 'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.reducer';
import { Truck } from 'app/core/models/maintenance/intervention-maintenance.model';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';
import { Planning } from 'app/core/models/maintenance/planning.model';

@Component({
  selector: 'app-update-planning',
  templateUrl: './update-planning.component.html',
  styleUrls: ['./update-planning.component.css']
})
export class UpdatePlanningComponent implements OnInit , OnDestroy {

  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;


  spinner: boolean = false;
  planningForm: FormGroup

  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}

  planning$: Observable<PlanningState> = this.store.select(state => state.planning);
  planningSubscription: Subscription;

  trucks : Truck[] = [];

  planning: Planning = this.data;
  truck: Truck = this.data?.truck;

  constructor(@Inject(MAT_DIALOG_DATA) private data: Planning,
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdatePlanningComponent>,
    private ressourceService: RessouresService,) { }

  ngOnInit(): void {
    this.initForm();
    this.ressourceService.getTrucks().subscribe(
      (data:any) => {
        console.log("data conducteur", data)
        this.trucks = data.response;
        setTimeout(() => {
          this.searchComponents.toArray()[0].selectObject(this.truck);
        });
      }
    );
  }

  initForm() {
    this.planningForm = this.formBuilder.group({
      truck_id: [this.truck?.id, [Validators.required]],
      operation: [this.planning?.operation, [Validators.required]],
      date_debut: [this.planning?.date_debut, [Validators.required]],
      date_fin: [this.planning?.date_fin, [Validators.required]],
      rappel_jour: [this.planning?.rappel_jour, [Validators.required]],
      rappel_km: [this.planning?.rappel_km, [Validators.required]],
      comment: [this.planning?.comment],
    });
  }

  onTruckChange(event){
    if(event) {
      console.log("EVENT", event)
      this.planningForm.controls['truck_id'].setValue(event.id);
      this.truck = event;
    }
  }

  onAddPlanning() {
    if(this.planningForm.invalid) return;
    this.spinner = true;
    let formvalue = this.planningForm.value;
    let planning: Planning = new Planning();
    planning.uuid= this.data.uuid;
    planning.truck_id = formvalue.truck_id;
    planning.operation = formvalue.operation;
    planning.date_debut = formvalue.date_debut;
    planning.rappel_jour = formvalue.rappel_jour;
    planning.date_fin = formvalue.date_fin;
    planning.rappel_km = formvalue.rappel_km;
    planning.comment = formvalue.comment;
    this.store.dispatch(updatePlanning({data: planning}));
    this.planningSubscription = this.planning$.subscribe(
      (resp) => {
        if(resp.planningState == MaintenanceStateEnum.SUCCESS && resp.planning){
          this.dialogRef.close();
        }
        if (resp.planningState == MaintenanceStateEnum.SUCCESS || resp.planningState == MaintenanceStateEnum.ERROR){
          this.spinner = false;
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.planningSubscription?.unsubscribe();
  }
}
