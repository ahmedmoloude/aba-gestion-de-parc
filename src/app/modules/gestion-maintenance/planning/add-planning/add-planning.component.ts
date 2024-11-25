import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { PlanningState } from 'app/core/store/maintenance/planning/planning.reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { MatDialogRef } from '@angular/material/dialog';
import { RessouresService } from 'app/core/services/ressoures.service';
import { addPlanning } from 'app/core/store/maintenance/planning/planning.actions';
import { MaintenanceStateEnum } from 'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.reducer';
import { Truck } from 'app/core/models/maintenance/intervention-maintenance.model';
import { Planning } from 'app/core/models/maintenance/planning.model';
@Component({
  selector: 'app-add-planning',
  templateUrl: './add-planning.component.html',
  styleUrls: ['./add-planning.component.css']
})
export class AddPlanningComponent implements OnInit, OnDestroy {

  spinner: boolean = false;
  planningForm: FormGroup

  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}

  planning$: Observable<PlanningState> = this.store.select(state => state.planning);
  planningSubscription: Subscription;

  trucks : Truck[] = [];
  truck: Truck;

  constructor(private store: Store<AppState>,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddPlanningComponent>,
    private ressourceService: RessouresService,) { }

  ngOnInit(): void {
    this.initForm();
    this.ressourceService.getTrucks().subscribe(
      (data:any) => {
        console.log("data conducteur", data)
        this.trucks = data.response;
      }
    );
  }

  initForm() {
    this.planningForm = this.formBuilder.group({
      truck_id: [null, [Validators.required]],
      operation: [null, [Validators.required]],
      date_debut: [null, [Validators.required]],
      date_fin: [null, [Validators.required]],
      rappel_jour: [0, [Validators.required]],
      rappel_km: [0, [Validators.required]],
      comment: [null],
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
    planning.truck_id = formvalue.truck_id;
    planning.operation = formvalue.operation;
    planning.date_debut = formvalue.date_debut;
    planning.rappel_jour = formvalue.rappel_jour;
    planning.date_fin = formvalue.date_fin;
    planning.rappel_km = formvalue.rappel_km;
    planning.comment = formvalue.comment;
    this.store.dispatch(addPlanning({data: planning}));
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
