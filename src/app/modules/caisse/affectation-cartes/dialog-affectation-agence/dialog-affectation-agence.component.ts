import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Carte } from 'app/core/models/caisse/carte.model';
import { AgenceState } from 'app/core/store/agence/agence.reducer';
import { AppState } from 'app/core/store/app.states';
import { affectCaisseCarte } from 'app/core/store/caisse/carte/carte.actions';
import { CaisseCarteState, StateEnum } from 'app/core/store/caisse/carte/carte.reducer';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-affectation-agence',
  templateUrl: './dialog-affectation-agence.component.html',
  styleUrls: ['./dialog-affectation-agence.component.css']
})
export class DialogAffectationAgenceComponent implements OnInit, OnDestroy {

  spinner: boolean = false;

  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'};
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'};

  carte$: Observable<CaisseCarteState> = this.store.select(state=>state.caisseCarte);
  carteSubscription: Subscription;
  carte: Carte = this.data;

  agence$: Observable<AgenceState> = this.store.select(state=>state.agence);
  agences = [];

  carteForm: FormGroup;
  constructor(private store: Store<AppState>,
        @Inject(MAT_DIALOG_DATA) private data: Carte,
        private dialogRef: MatDialogRef<DialogAffectationAgenceComponent>,
        private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.initForm();
    this.agence$.subscribe(
      (data) => {
        this.agences  = data?.payload;
      }
    );
  }

  initForm() {
    this.carteForm = this.formBuilder.group({
      carte_id: [ this.carte.id, [Validators.required]],
      agency_id:[, [Validators.required]],
      start_date:[, [Validators.required]],
    })
  }

  selectAgence(event){
    console.log(event)
    this.carteForm.controls.agency_id.setValue(event.id);
  }

  affectCard() {
    if(this.carteForm.invalid) return;
    this.spinner = true;
    let formValue = this.carteForm.value;

    this.store.dispatch(affectCaisseCarte({data: formValue}));
    this.carteSubscription = this.carte$.subscribe(
      (resp) => {

        if (resp.caisseCarte && resp.carteState == StateEnum.SUCCESS) {
          this.dialogRef.close();
        }
        if (resp.carteState == StateEnum.SUCCESS || resp.carteState == StateEnum.ERROR){
          this.spinner = false;
        }
      },
      (error) => {
        this.spinner = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.carteSubscription?.unsubscribe();
  }

}
