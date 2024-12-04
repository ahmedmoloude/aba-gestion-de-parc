import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { Observable, Subscription } from 'rxjs';
import { Receipt } from 'app/core/models/facturation/customer-fee/receipt.model';
import { CustomerState } from 'app/core/store/customer/customer.reducer';
import { createReceipt } from 'app/core/store/facturation/customer-fee/receipt/receipt.actions';
import { ReceiptState } from 'app/core/store/facturation/customer-fee/receipt/receipt.reducer';
import { ModeReglementState } from 'app/core/store/facturation/customer-fee/mode-reglement/mode-reglement.reducer';
import { Config } from 'app/config';
@Component({
  selector: 'app-create-encaissement-dialog',
  templateUrl: './create-encaissement-dialog.component.html',
  styleUrls: ['./create-encaissement-dialog.component.css']
})
export class CreateEncaissementDialogComponent implements OnInit, OnDestroy {

  spinner: boolean = false;

  customer$: Observable<CustomerState> = this.store.select(state => state.customer);
  customerSubscription: Subscription;
  customers=[];
  reglementForm: FormGroup;
  receipt$: Observable<ReceiptState> = this.store.select(state => state.receipt);
  modeReglement$: Observable<ModeReglementState> = this.store.select(state => state.modeReglement);
  modeReglementSubscription: Subscription;
  apiUrl= `${Config.api.customers.searchList}?type=customer&search=`;


  modeReglements: any[] = []
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'};
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'};

  constructor(private store: Store<AppState>,
              private formBuilder:FormBuilder,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<CreateEncaissementDialogComponent>) {}

  ngOnInit(): void {
    this.initForm();
    // this.getCustomers();
    this.getModeReglements();
  }

  initForm(){
    this.reglementForm = this.formBuilder.group({
      customer: [, Validators.required],
      reglement: [, Validators.required],
      mode_paiement: ["", Validators.required],
      date_demande: [, Validators.required],
      reference_reglement: []
    });
    console.log(this.reglementForm.value);

  }
  getCustomers(){
    this.customerSubscription = this.customer$.subscribe(
      (resp: CustomerState) => {
        this.customers = resp.payload;
      },
      (err) =>{
        console.log('une erreur est survenue', err);
      }
    );
  }
  getModeReglements(){
    this.modeReglementSubscription = this.modeReglement$.subscribe(
      (resp: ModeReglementState) => {
        console.log(resp);

        this.modeReglements = resp.modeReglements;
      },
      (err) =>{
        console.log('mode reglement: une erreur est survenue', err);
      }
    );
  }

  selectClient(event) {
    this.reglementForm.controls.customer.setValue(event?.id);
  }

  createReglement(){
    if (this.reglementForm.invalid)return;

    this.spinner = true;
    let formValue = this.reglementForm.value;
    console.log(formValue);
    let reglement = new Receipt();
    reglement.customer_id = formValue.customer;
    reglement.reglement = formValue.reglement;
    reglement.mode_paiement = formValue.mode_paiement;
    reglement.reference_reglement = formValue.reference_reglement;
    reglement.date_demande = formValue.date_demande;
    this.store.dispatch(createReceipt({data:reglement}));
    this.receipt$.subscribe(
      (resp) => {
        this.spinner = false
        if (resp.receipt&&resp.dataState=="SUCCESS") {
          this.dialogRef.close();
        }
      },
      (error) => {
        this.spinner = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.customerSubscription?.unsubscribe();
    this.modeReglementSubscription?.unsubscribe();
  }
}
