import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { PneumatiqueState } from 'app/core/store/maintenance/pneumatique/pneumatique.reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { Pneu } from 'app/core/models/maintenance/pneu.model';
import { createPneu } from 'app/core/store/maintenance/pneumatique/pneumatique.actions';
import { MaintenanceStateEnum } from 'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.reducer';
@Component({
  selector: 'app-add-pneumatique',
  templateUrl: './add-pneumatique.component.html',
  styleUrls: ['./add-pneumatique.component.css']
})
export class AddPneumatiqueComponent implements OnInit, OnDestroy {

  spinner: boolean = false;
  pneuForm: FormGroup;

  pneu$: Observable<PneumatiqueState> = this.store.select(state => state.pneumatique);
  pneuSubscription: Subscription;

  constructor(private store: Store<AppState>,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AddPneumatiqueComponent>) { }

  ngOnInit(): void {
    this.initForm();
    this.onValueschange();
  }

  initForm() {
    this.pneuForm = this.formBuilder.group({
      code_pneu: [null, [Validators.required]],
      date_acquisition: [null, [Validators.required]],
      km_acquisition: [null, [Validators.required]],
      dmc: [null, [Validators.required]],
      duree_vie: [null, [Validators.required]],
      etat: [null, [Validators.required]],
      fournisseur: [null, [Validators.required]],
      indice_charge: [null, [Validators.required]],
      indice_vitesse: [null, [Validators.required]],
      marque: [null, [Validators.required]],
      modele: [null, [Validators.required]],
      montant_ht: [0, [Validators.required]],
      montant_ttc: [0, [Validators.required]],
      tva: [0, [Validators.required]],
      type_pneu: [null, [Validators.required]],
      position: [null, [Validators.required]],
      usure: [null],
      profondeur: [null],
      pression: [null],
      comment: [null],
    });
  }
  onValueschange() {
    this.pneuForm.controls.montant_ht.valueChanges.subscribe(
      (value) => {
        let tva = this.pneuForm.controls.tva.value;
        if(tva) {
          let sum = (this.getFloatValue(tva) + this.getFloatValue(value)).toFixed(2);
          this.pneuForm.controls.montant_ttc.setValue(sum);
        }
      }
    );
    this.pneuForm.controls.tva.valueChanges.subscribe(
      (value) => {
        let montant_ht = this.pneuForm.controls.montant_ht.value;
        if(montant_ht) {
          let sum = (this.getFloatValue(montant_ht) + this.getFloatValue(value)).toFixed(2);
          this.pneuForm.controls.montant_ttc.setValue(sum);
        }
      }
    );

  }
  getFloatValue(value) {
    if(typeof value == 'number'){
      return value;
    }
    return parseFloat(value);
  }

  onAddPneu() {
    if(this.pneuForm.invalid) return;
    this.spinner = true;
    let formvalue = this.pneuForm.value;
    let pneu: Pneu = new Pneu();
    pneu.code_pneu = formvalue.code_pneu;
    pneu.date_acquisition = formvalue.date_acquisition;
    pneu.dmc = formvalue.dmc;
    pneu.duree_vie = formvalue.duree_vie;
    pneu.etat = formvalue.etat;
    pneu.fournisseur = formvalue.fournisseur;
    pneu.indice_charge = formvalue.indice_charge;
    pneu.indice_vitesse = formvalue.indice_vitesse;
    pneu.km_acquisition = formvalue.km_acquisition;
    pneu.marque = formvalue.marque;
    pneu.modele = formvalue.modele;
    pneu.montant_ht = formvalue.montant_ht;
    pneu.montant_ttc = formvalue.montant_ttc;
    pneu.position = formvalue.position;
    pneu.tva = formvalue.tva;
    pneu.usure = formvalue.usure;
    pneu.profondeur = formvalue.profondeur;
    pneu.pression = formvalue.pression;
    pneu.type_pneu = formvalue.type_pneu;
    pneu.comment = formvalue.comment;
    this.store.dispatch(createPneu({data: pneu}));
    this.pneuSubscription = this.pneu$.subscribe(
      (resp) => {
        if(resp.pneuState == MaintenanceStateEnum.SUCCESS && resp.pneu){
          this.dialogRef.close();
        }
        if (resp.pneuState == MaintenanceStateEnum.SUCCESS || resp.pneuState == MaintenanceStateEnum.ERROR){
          this.spinner = false;
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.pneuSubscription?.unsubscribe();
  }

}
