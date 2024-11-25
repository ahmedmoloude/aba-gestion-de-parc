import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, RequiredValidator, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DiagnostiqueRequest } from 'app/core/models/maintenance/diagnostique-request.model';
import { AppState } from 'app/core/store/app.states';
import { createDiagnostique } from 'app/core/store/maintenance/diagnostique/diagnostique.actions';
import { DiagnostiqueState } from 'app/core/store/maintenance/diagnostique/diagnostique.reducer';
import { MaintenanceStateEnum } from 'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.reducer';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-validation-diag',
  templateUrl: './validation-diag.component.html',
  styleUrls: ['./validation-diag.component.css']
})
export class ValidationDiagComponent implements OnInit, OnDestroy {
  headerColumuns = [
    'Nom de pièce',
    'Quantité demandée',
    'Prix unitaire',
    'Prix HT',
    'TVA',
    'Total TTC',
  ];
  spinner: boolean = false;
  dateFin: FormControl = new FormControl('', [Validators.required]);
  demande = this.data.demande;
  diagnostique$: Observable<DiagnostiqueState> = this.store.select(state => state.diagnostique);
  diagnostiqueSubscription: Subscription;
  constructor(@Inject(MAT_DIALOG_DATA) private data: {demande:any, request:DiagnostiqueRequest},
              private dialogRef: MatDialogRef<ValidationDiagComponent>,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnInit(): void {
  }
  validateDiag() {
    if(this.dateFin.invalid) return;
    this.spinner = true;
    let request = this.data.request;
    request.date_fin_prevu = this.dateFin.value;
    this.store.dispatch(createDiagnostique({data: request}));
    this.diagnostiqueSubscription = this.diagnostique$.subscribe(
      (resp) => {
        if (resp.diagnostique && resp.diagnostiqueState == MaintenanceStateEnum.SUCCESS) {
          this.dialogRef.close();
          this.router.navigate(['/listeinterventions'])
        }
        if (resp.diagnostiqueState == MaintenanceStateEnum.SUCCESS || resp.diagnostiqueState == MaintenanceStateEnum.ERROR){
          this.spinner = false;
        }
      },
      (error) => {
        this.spinner = false;
      }
    );

  }
  ngOnDestroy(): void {
    this.diagnostiqueSubscription?.unsubscribe();
  }
}
