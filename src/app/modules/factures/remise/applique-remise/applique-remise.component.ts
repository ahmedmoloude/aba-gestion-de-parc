import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Discount } from 'app/core/models/facturation/discount.model';
import { Facture } from 'app/core/models/facturation/facture.model';
import { FactureFilter } from 'app/core/models/facturation/filters/facture-filter.model';
import { AppState } from 'app/core/store/app.states';
import { createDiscount } from 'app/core/store/facturation/discount/discount.actions';
import { DiscountState } from 'app/core/store/facturation/discount/discount.reducer';
import { loadFactures } from 'app/core/store/facturation/facture/facture.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-applique-remise',
  templateUrl: './applique-remise.component.html',
  styleUrls: ['./applique-remise.component.css']
})
export class AppliqueRemiseComponent implements OnInit {

  discountForm: FormGroup
  discountTypes$: Observable<DiscountState> = this.store.select(state => state.discount)
  factures = this.data.factures;
  filters = this.data.filters;

  discountAmount: number = null;
  spinner: boolean = false;

  constructor(private store: Store<AppState>,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AppliqueRemiseComponent>,
              @Inject(MAT_DIALOG_DATA) private data: {factures:Facture[], filters: FactureFilter}) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void{
    this.discountForm = this.formBuilder.group({
      discountType: [, Validators.required],
      discountRate: [0, Validators.required],
      nature: ["Pourcentage", Validators.required],
      discountOn: ["Facture", Validators.required]
    })
  }

  getDiscountAmount(){
    if((this.factures.length == 1)&&(this.discountForm.controls.nature.value == 'Pourcentage')){
      let facture = this.factures[0];
      switch (this.discountForm.controls.discountOn.value) {
        case "Facture":
          this.discountAmount = (this.discountForm.controls.discountRate.value*parseFloat(facture?.montant_ht))/100;
          break;
        case "Service":
          this.discountAmount = (this.discountForm.controls.discountRate.value*parseFloat(facture?.montant_service_ht))/100;
          break;
        case "Transport":
          this.discountAmount = (this.discountForm.controls.discountRate.value*parseFloat(facture?.montant_transport_ht))/100;
          break;
      }
    } else {
      this.discountAmount = null;
    }
  }

  createRemise() {
    if(this.discountForm.invalid) return;

    this.spinner = true;

    let formValue = this.discountForm.value;

    let discount = new Discount();
    discount.remise_type_id= formValue.discountType;
    discount.nature= formValue.nature;
    discount.taux = formValue.discountRate;
    discount.remise_sur = formValue.discountOn;
    discount.factures = [];
    this.factures.map(facture =>discount.factures.push(facture.uuid));
    console.log(discount);

    this.store.dispatch(createDiscount({data: discount}));
    // discountTypes is an observable of discountState
    this.discountTypes$.subscribe(
      (resp) => {
        console.log('create remise');
        console.log(resp);
        if (resp.discount&&resp.dataState=="SUCCESS") {
          this.dialogRef.close({discount: resp.discount});
          this.store.dispatch(loadFactures({data: this.filters , per_page : 10 , page : 0}))
        }
        if (resp.dataState== "ERROR" ||resp.dataState=="SUCCESS") {
        this.spinner = false;
        }
      },
      (error) => {
        this.spinner = false;
      }
    );
  }
}
