import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { Observable, Subscription } from 'rxjs';
import { CustomerState } from 'app/core/store/customer/customer.reducer';
import { createUnpaid } from 'app/core/store/facturation/customer-fee/unpaid/unpaid.actions';
import { UnpaidState } from 'app/core/store/facturation/customer-fee/unpaid/unpaid.reducer';
import { Unpaid } from 'app/core/models/facturation/customer-fee/unpaid.model';
import { Config } from 'app/config';


@Component({
  selector: 'app-create-unpaid-dialog',
  templateUrl: './create-unpaid-dialog.component.html',
  styleUrls: ['./create-unpaid-dialog.component.css']
})
export class CreateUnpaidDialogComponent implements OnInit {

  spinner: boolean = false;

  unpaid$: Observable<UnpaidState> = this.store.select(state => state.unpaid);
  customer$: Observable<CustomerState> = this.store.select(state => state.customer);
  customerSubscription: Subscription;
  customers = [];
  unpaidForm: FormGroup;

  references = [];


  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'};
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'};
  apiUrl= `${Config.api.customers.searchList}?type=customer&search=`;


  constructor(private store: Store<AppState>,
              private formBuilder:FormBuilder,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<CreateUnpaidDialogComponent>) {}

  ngOnInit(): void {
    this.initForm();
    // this.getCustomers();
  }

  initForm(){
    this.unpaidForm = this.formBuilder.group({
      customer: [, Validators.required],
      date_demande: [, Validators.required],
      reference_reglement: []
    });
    console.log(this.unpaidForm.value);

  }
  getCustomers(){
    this.customerSubscription = this.customer$.subscribe(
      (resp: CustomerState) => {
        console.log(resp);
        this.customers = resp.payload;
      },
      (err) =>{
        console.log('une erreur est survenue', err);
      }
    );
  }

  selectClient(event) {
    this.unpaidForm.controls.customer.setValue(event?.id);
    this.references = event?.paiements;
  }

  selectReference(event) {
    console.log('event');
    console.log(event);

    this.unpaidForm.controls.reference_reglement.setValue(event?.reference_reglement);
    this.unpaidForm.controls.date_demande.setValue(event?.date_demande);
  }

  createUnpaid(){
    if (this.unpaidForm.invalid)return;
    this.spinner = true;
    let formValue = this.unpaidForm.value;
    console.log(formValue);
    let unpaid = {
      customer_id: formValue.customer,
      reference_reglement: formValue.reference_reglement,
      date_demande: formValue.date_demande,
    };
    console.log(unpaid);

    this.store.dispatch(createUnpaid({data:unpaid}));
    this.unpaid$.subscribe(
      (resp) => {
        this.spinner = false;
        if (resp.unpaid&&resp.dataState=="SUCCESS") {
          this.dialogRef.close();
        }
      },
      (error) => {
        this.spinner = false;
      }
    );
  }


}
