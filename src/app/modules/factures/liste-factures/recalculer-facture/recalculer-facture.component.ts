import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Facture } from 'app/core/models/facturation/facture.model';
import { AppState } from 'app/core/store/app.states';
import { AvoirState } from 'app/core/store/facturation/avoir/avoir.reducer';
import { recalculateFacture } from 'app/core/store/facturation/facture/facture.actions';
import { FactureState, FactureStateEnum } from 'app/core/store/facturation/facture/facture.reducer';
import { Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recalculer-facture',
  templateUrl: './recalculer-facture.component.html',
  styleUrls: ['./recalculer-facture.component.css']
})
export class RecalculerFactureComponent implements OnInit {

  factureForm: FormGroup;
  facture: Facture = this.data;
  avoir$: Observable<AvoirState> = this.store.select(state => state.avoir);
  facture$: Observable<FactureState> = this.store.select(state => state.facture);

  factureSubscription: Subscription;
  formData:FormData = new FormData();

  disable: boolean = false;
  spinner: boolean = false;

  constructor(private store: Store<AppState>,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Facture,
              public dialogRef: MatDialogRef<RecalculerFactureComponent>) { }

  ngOnInit(): void {
    console.log(this.facture);

    this.initForm();
    this.onSubscribeObservables();

    // get file
    const self = this;
    const fileUpload = document.getElementById('file-upload') as HTMLInputElement;
    const fileNameSpan: HTMLElement | null = document.querySelector('.file-name');

    fileUpload.addEventListener('change', function() {
      const file: File | null = fileUpload.files?.[0];
      if (file) {
        fileNameSpan.textContent = file.name;
        self.formData = new FormData();
        self.formData.append('attachement', file);

      } else {
        fileNameSpan.textContent = 'Choisir un fichier';
      }
    });
  }

  initForm() {
    // TRANSFORM DATE
    var datePipe = new DatePipe("fr-FR");
    var factureDate = datePipe.transform(this.facture?.facture_date, 'yyyy-MM-dd');

    this.factureForm = this.formBuilder.group({
      customer: new FormControl({value:this.facture?.customer?.name, disabled: true}),
      base_calcule: ['Saisi Manuelle', Validators.required],
      montant_facture: new FormControl({value: this.facture?.montant_ttc, disabled: true}, Validators.required),
      date_facture: new FormControl({value: factureDate, disabled: true}, Validators.required),
      montant_calcule: [null, Validators.required],
      motif: ['Erreur de calcul', Validators.required],
      commentaire: [],
      attachement: []
    })
  }

  onSubscribeObservables (){
    // base_calcule
    this.factureForm.controls.base_calcule.valueChanges.subscribe(
      (value) => {
        if (value === 'Convention client') {
          this.factureForm.controls.montant_calcule.disable();
          this.disable = true;
          this.avoir$.subscribe((resp) => {
            console.log('convention');
            console.log(resp);

            if (resp.montantAvoir && resp.dataState == 'SUCCESS') {
              this.factureForm.controls.montant_calcule.setValue(
                resp.montantAvoir.total
              );
            }
          });
        } else {
          this.factureForm.controls.montant_calcule.enable();
          this.disable = false;
          this.factureForm.controls.montant_calcule.setValue(null);
        }
      }
      );
  }

  recalculateFacture() {
    if (this.factureForm.invalid) return;

    Swal.fire({
      text: `Êtes-vous sûr(e) de confirmer le calcul de la facture N° ${this.facture.reference}`,
      icon: 'warning',
      iconColor: 'yellow',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'green',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.confirmCalculation();
      }
    });
  }

  confirmCalculation(){
    this.spinner = true;
    let formValue = this.factureForm.getRawValue();
    console.log('formValue');
    console.log(formValue);
    //"base_calcule(Convention client,Saisi Manuelle)","montant","motif(Erreur de calcul,Facture erronée),"commentaire","attachement","facture_id"
    this.formData.append('facture_id', `${this.facture.id}`);
    this.formData.append('base_calcule', formValue.base_calcule);
    this.formData.append('motif', formValue.motif);
    this.formData.append('montant', formValue.montant_calcule);
    this.formData.append('commentaire', formValue.commentaire);



    this.store.dispatch(recalculateFacture({data:this.formData}));
    this.facture$.subscribe(
      (resp) => {
        console.log(resp);
        this.spinner = false;
        if (resp.recalculation&&resp.dataState==FactureStateEnum.SUCCESS
          ) {
          this.dialogRef.close({recalculation: resp.recalculation});
        }
      }, (error) => {
        this.spinner = false
      }
    );
    // this.formData.forEach((key,value)=> console.log(key +":" + value))
  }

}
