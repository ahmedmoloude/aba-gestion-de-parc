import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { PneumatiqueState } from 'app/core/store/maintenance/pneumatique/pneumatique.reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { AffectationRequest, Pneu } from 'app/core/models/maintenance/pneu.model';import { affectPneu } from 'app/core/store/maintenance/pneumatique/pneumatique.actions';
import { MaintenanceStateEnum } from 'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.reducer';
import { RessouresService } from 'app/core/services/ressoures.service';
@Component({
  selector: 'app-affecter-vehicule',
  templateUrl: './affecter-vehicule.component.html',
  styleUrls: ['./affecter-vehicule.component.css']
})
export class AffecterVehiculeComponent implements OnInit, OnDestroy {
  spinner: boolean = false;
  pneuForm: FormGroup;

  pneu$: Observable<PneumatiqueState> = this.store.select(state => state.pneumatique);
  pneuSubscription: Subscription;

  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}

  trucks: any = [];
  pneu = this.data;

  constructor(private store: Store<AppState>,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AffecterVehiculeComponent>,
              private ressourceService: RessouresService,
              @Inject(MAT_DIALOG_DATA) private data: Pneu) { }

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
    this.pneuForm = this.formBuilder.group({
      position: [null, [Validators.required]],
      truck_id: [null, [Validators.required]],
      date_debut: [null, [Validators.required]],
      date_fin: [null, [Validators.required]],
      km_depart: [null, [Validators.required]],
    })
  }

  onTruckChange(event){
    if(event) {
      console.log("EVENT", event)
      this.pneuForm.controls['truck_id'].setValue(event.id);
    }
  }

  onAffectPneu() {
    if(this.pneuForm.invalid) return;
    this.spinner = true;
    let formvalue = this.pneuForm.value;
    let affectation: AffectationRequest = new AffectationRequest();
    affectation.date_debut = formvalue.date_debut;
    affectation.date_fin = formvalue.date_fin;
    affectation.position = formvalue.position;
    affectation.truck_id = formvalue.truck_id;
    affectation.km_depart = formvalue.km_depart;
    affectation.pneu_id = this.data.id;

    this.store.dispatch(affectPneu({data: affectation}));
    this.pneuSubscription = this.pneu$.subscribe(
      (resp) => {
        if(resp.dataState == MaintenanceStateEnum.SUCCESS && resp.affectation){
          this.dialogRef.close();
        }
        if (resp.dataState == MaintenanceStateEnum.SUCCESS || resp.dataState == MaintenanceStateEnum.ERROR){
          this.spinner = false;
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.pneuSubscription?.unsubscribe();
  }
}
