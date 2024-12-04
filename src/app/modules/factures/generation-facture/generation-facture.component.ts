import { M } from '@angular/cdk/keycodes';
import { EtatControleComponent } from './../etat-controle/etat-controle.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { CustomerState } from 'app/core/store/customer/customer.reducer';
import * as CustomerActions from 'app/core/store/customer/customer.actions';
import * as FactureActions from 'app/core/store/facturation/facture/facture.actions';
import { FactureState, FactureStateEnum } from 'app/core/store/facturation/facture/facture.reducer';
import { Prefacturation } from 'app/core/models/facturation/prefacturation.model';
import { Facture } from 'app/core/models/facturation/facture.model';
import Swal from 'sweetalert2';
import { AffretementEtatControlComponent } from '../affretement-etat-control/affretement-etat-control.component';
import { Config } from 'app/config';

@Component({
  selector: 'app-generation-facture',
  templateUrl: './generation-facture.component.html',
  styleUrls: ['./generation-facture.component.css'],
})
export class GenerationFactureComponent implements OnInit, OnDestroy {
  prefacturationForm: FormGroup;

  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'};
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'};

  customers=[];
  customer$:Observable<CustomerState> = this.store.select(state => state.customer);
  customerSubscription: Subscription;

  prefacturation: Prefacturation;
  prefacturation$: Observable<FactureState> = this.store.select(state => state.facture);
  prefacturationSubscription: Subscription;

  appearStatus: boolean = false;
  status: string;

  apiUrl= `${Config.api.customers.searchList}?type=customer&search=`;

  constructor(public router: Router,
              public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private store:Store<AppState>,) {}

  ngOnInit(): void {
    this.initForm();
    // this.customerSubscription = this.customer$.subscribe(
    //   (resp: CustomerState) => {
    //     if (resp.status == 'INIT') {
    //       this.store.dispatch(CustomerActions.loadAccountCustomers());
    //     }
    //     this.customers = resp.payload;
    //   },
    //   (err) =>{
    //     console.log('une erreur est survenue', err);
    //   }
    // );
    this.prefacturationSubscription = this.prefacturation$.subscribe(
      (resp: FactureState) => {
        this.prefacturation = resp.prefacturation;
        console.log(this.prefacturation);
        console.log('prefacture');
        console.log(resp);
      },
      (err) =>{
        console.log('une erreur est survenue', err);
      }
    );
  }

  initForm() {
    this.prefacturationForm = this.formBuilder.group({
      startDate: [],
      activity: ['Tout', Validators.required],
      customer: []
    });
  }

  selectClient(event) {
    this.prefacturationForm.controls.customer.setValue(event?.id);
  }
  search: {startDate: Date, activity: string, customer: string} ;
  onPrefacturation(){
    console.log(this.prefacturationForm.value);
    if(this.prefacturationForm.invalid) return;

    let formValue = this.prefacturationForm.value;
    this.search = {
      startDate: formValue.startDate,
      activity: formValue.activity,
      customer: formValue.customer
    }
    this.status = formValue.activity;
    console.log('status');
    console.log(this.status);
    this.store.dispatch(FactureActions.prepareFacture({data: this.search}));
  }

  onCancelPrefacturation(): void {
    this.prefacturationForm.reset();
    this.router.navigate(['/listefactures']);
  }

  getControlState(state: Facture): void {
    this.dialog.open(EtatControleComponent, {
      disableClose: true,
      width: '1500px',
      data: state,
    });
  }


  getAffretementControlState(state: Facture): void {
    this.dialog.open(AffretementEtatControlComponent, {
      disableClose: true,
      width: '1500px',
      data: state,
    });
  }

  onGenerateFactures() {
    if(this.search)
    Swal.fire({
      text: `Êtes-vous sûr(e) de vouloir generer ces factures?`,
      icon: 'warning',
      iconColor: 'yellow',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'green',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(FactureActions.generateFactures({data: this.search}));
      }
    });
  }

  ngOnDestroy(): void {
    this.customerSubscription?.unsubscribe();
  }
}
