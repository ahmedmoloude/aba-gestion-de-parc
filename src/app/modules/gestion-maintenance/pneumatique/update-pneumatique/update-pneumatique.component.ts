import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { PneumatiqueState } from 'app/core/store/maintenance/pneumatique/pneumatique.reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { Pneu } from 'app/core/models/maintenance/pneu.model';
import { createPneu, updatePneu } from 'app/core/store/maintenance/pneumatique/pneumatique.actions';
import { MaintenanceStateEnum } from 'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.reducer';
@Component({
  selector: 'app-update-pneumatique',
  templateUrl: './update-pneumatique.component.html',
  styleUrls: ['./update-pneumatique.component.css']
})
export class UpdatePneumatiqueComponent implements OnInit, OnDestroy {

  spinner: boolean = false;
  pneuForm: FormGroup;

  pneu$: Observable<PneumatiqueState> = this.store.select(state => state.pneumatique);
  pneuSubscription: Subscription;

  pneu = this.data;
  constructor(private store: Store<AppState>,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<UpdatePneumatiqueComponent>,
              @Inject(MAT_DIALOG_DATA) private data: Pneu) { }

  ngOnInit(): void {
    this.initForm();
    this.onValueschange();
  }

  initForm() {
    this.pneuForm = this.formBuilder.group({
      code_pneu: [this.pneu?.code_pneu, [Validators.required]],
      date_acquisition: [this.pneu?.date_acquisition, [Validators.required]],
      km_acquisition: [this.pneu?.km_acquisition, [Validators.required]],
      dmc: [this.pneu?.dmc, [Validators.required]],
      duree_vie: [this.pneu?.duree_vie, [Validators.required]],
      etat: [this.pneu?.etat, [Validators.required]],
      fournisseur: [this.pneu?.fournisseur, [Validators.required]],
      indice_charge: [this.pneu?.indice_charge, [Validators.required]],
      indice_vitesse: [this.pneu?.indice_vitesse, [Validators.required]],
      marque: [this.pneu?.marque, [Validators.required]],
      modele: [this.pneu?.modele, [Validators.required]],
      montant_ht: [this.pneu?.montant_ht, [Validators.required]],
      montant_ttc: [this.pneu?.montant_ttc, [Validators.required]],
      tva: [this.pneu?.tva, [Validators.required]],
      type_pneu: [this.pneu?.type_pneu, [Validators.required]],
      position: [this.pneu?.position, [Validators.required]],
      usure: [this.pneu?.usure],
      profondeur: [this.pneu?.profondeur],
      pression: [this.pneu?.pression],
      comment: [this.pneu?.comment],
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
    pneu.pneu_id = this.data?.id;
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
    pneu.type_pneu = formvalue.type_pneu;
    pneu.usure = formvalue.usure;
    pneu.profondeur = formvalue.profondeur;
    pneu.pression = formvalue.pression;
    pneu.comment = formvalue.comment;
    this.store.dispatch(updatePneu({data: pneu}));
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
