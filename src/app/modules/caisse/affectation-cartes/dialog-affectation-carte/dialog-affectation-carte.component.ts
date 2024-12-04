import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Carte } from 'app/core/models/caisse/carte.model';
import { AppState } from 'app/core/store/app.states';
import { addCaisseCarte } from 'app/core/store/caisse/carte/carte.actions';
import { CaisseCarteState, StateEnum } from 'app/core/store/caisse/carte/carte.reducer';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-affectation-carte',
  templateUrl: './dialog-affectation-carte.component.html',
  styleUrls: ['./dialog-affectation-carte.component.css']
})
export class DialogAffectationCarteComponent implements OnInit, OnDestroy {

  spinner: boolean = false;
  addCarteForm: FormGroup;

  carte$: Observable<CaisseCarteState> = this.store.select(state=>state.caisseCarte);
  carteSubscription: Subscription;

  constructor(private store: Store<AppState>,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<DialogAffectationCarteComponent>) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addCarteForm =  this.formBuilder.group({
      libelle:[,[Validators.required]],
      banque:[,[Validators.required]],
      n_carte:[,[Validators.required]],
      cvv:[,[Validators.required]],
      plafond:[,[Validators.required]],
      expiration_date:[,[Validators.required]],
    });
  }

  addCarte() {
    if(this.addCarteForm.invalid) return;

    this.spinner = true;
    let formValue = this.addCarteForm.value;

    let carte = new Carte();
    carte.libelle = formValue.libelle;
    carte.banque = formValue.banque;
    carte.n_carte = formValue.n_carte;
    carte.cvv = formValue.cvv;
    carte.plafond = formValue.plafond;
    carte.expiration_date = formValue.expiration_date;

    this.store.dispatch(addCaisseCarte({data: carte}));
    this.carteSubscription = this.carte$.subscribe(
      (resp) => {

        console.log('add carte');
        console.log(resp);

        if (resp.caisseCarte && resp.carteState == StateEnum.SUCCESS) {
          // this.store.dispatch(loadCaisseCartes(null));
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
