import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { Observable, Subscription } from 'rxjs';
import { MaintenanceInterventionState, MaintenanceStateEnum } from 'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.reducer';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { closeIntervention } from 'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.actions';
@Component({
  selector: 'app-dialog-clotureintervention',
  templateUrl: './dialog-clotureintervention.component.html',
  styleUrls: ['./dialog-clotureintervention.component.css']
})
export class DialogClotureinterventionComponent implements OnInit, OnDestroy {

  maintenanceIntervention$: Observable<MaintenanceInterventionState> = this.store.select(state => state.maintenanceIntervention);
  maintenanceInterventionSubscription: Subscription;

  spinner: boolean = false;
  constructor(private store: Store<AppState>,
      @Inject(MAT_DIALOG_DATA) private data: string,
      private dialogRef: MatDialogRef<DialogClotureinterventionComponent>) { }

  ngOnInit(): void {
  }

  closeIntervention() {
    this.spinner = true;
    this.store?.dispatch(closeIntervention({data: this.data}));
    this.maintenanceInterventionSubscription = this.maintenanceIntervention$.subscribe(
      (resp) => {
        if(resp?.dataState == MaintenanceStateEnum.SUCCESS) {
          this.spinner = false;
          this.dialogRef.close();
        }
      }
    );
  }

  ngOnDestroy() : void {
    this.maintenanceInterventionSubscription?.unsubscribe();
  }
}
