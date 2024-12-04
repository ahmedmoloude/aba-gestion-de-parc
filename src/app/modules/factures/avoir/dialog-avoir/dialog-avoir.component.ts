import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { createAvoir, loadConventionClient } from 'app/core/store/facturation/avoir/avoir.actions';
import { AvoirState } from 'app/core/store/facturation/avoir/avoir.reducer';
import { loadCustomerPayedFactures, loadFactures, loadPayedFactures } from 'app/core/store/facturation/facture/facture.actions';
import { FactureState, FactureStateEnum } from 'app/core/store/facturation/facture/facture.reducer';
import { CustomerState, CustomerStateEnum } from 'app/core/store/customer/customer.reducer';
import { Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { loadAccountCustomers } from 'app/core/store/customer/customer.actions';
import { Config } from 'app/config';


@Component({
  selector: 'app-dialog-avoir',
  templateUrl: './dialog-avoir.component.html',
  styleUrls: ['./dialog-avoir.component.css']
})
export class DialogAvoirComponent implements OnInit {
  avoirForm: FormGroup;

  factureUrl = `${Config.api.bill.searchList}?search=`;
  apiUrl= `${Config.api.customers.searchList}?type=customer&search=`;

  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'};
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'};


  factures = [];
  factures$: Observable<FactureState> = this.store.select(state => state.facture);

  customer$: Observable<CustomerState> = this.store.select(state => state.customer);
  customerSubscription: Subscription;
  customers=[];

  avoir$: Observable<AvoirState> = this.store.select(state => state.avoir);

  facturesSubscription: Subscription;
  formData:FormData = new FormData();

  disable: boolean = false;
  spinner: boolean = false;

  constructor(public dialog: MatDialog,
            public dialogRef: MatDialogRef<DialogAvoirComponent>,
            private formBuilder: FormBuilder,
            private store:Store<AppState>) { }

  ngOnInit(): void {
    this.initForm();
    // this.getCustomers();
    this.onSubscribeObservables();

    // get file
    const self = this;
    const fileUpload = document.getElementById('file-upload') as HTMLInputElement;
    const fileNameSpan: HTMLElement | null = document.querySelector('.file-name');

    fileUpload?.addEventListener('change', function() {
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
    this.avoirForm = this.formBuilder.group({
      facture: [],
      type: ['Facture', Validators.required],
      base_calcule: ['Avoir forfaitaire', Validators.required],
      montant_facture: [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]*)?$')],
      motif: ['Erreur de calcul', Validators.required],
      montant_calcule: [null, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]*)?$')]],
      // montantCalcule: [{value:null, disabled:true}, Validators.required],
      montant_avoir: [null, Validators.required],
      commentaire: [],
      attachement: [],
    })
  }

  getCustomers(){
    this.customerSubscription = this.customer$.subscribe(
      (resp: CustomerState) => {
        if (resp.status == CustomerStateEnum.INIT) {
          this.store.dispatch(loadAccountCustomers());
        }
        this.customers = resp.payload;
      },
      (err) =>{
        console.log('une erreur est survenue', err);
      }
    );
  }

  onSubscribeObservables (){
    this.avoirForm.controls.montant_calcule.valueChanges.subscribe(
      (value)=>{
        // this.avoirForm.controls.montantCalcule.setValue(value)
        console.log('montant_calcule');
        console.log(value);
        if (this.avoirForm.controls.montant_facture.value){
          let diff = (this.avoirForm.controls.montant_facture.value - value).toFixed(2) ;
          this.avoirForm.controls.montant_avoir.setValue(diff);
        }
      }
    )
    this.avoirForm.controls.montant_facture.valueChanges.subscribe(
      (value)=>{
        console.log('montant_facture');
        console.log(value);
        if(this.avoirForm.controls.montant_calcule.value){
          let diff = (value - this.avoirForm.controls.montant_calcule.value).toFixed(2) ;
          this.avoirForm.controls.montant_avoir.setValue(diff)
        }
      }
    )
    // base_calcule
    this.avoirForm.controls.base_calcule.valueChanges.subscribe(
      (value)=>{
        if ( value === "Convention client" ){
          this.disable = true;
          if (this.uuid ) {
            this.store.dispatch(loadConventionClient({uuid: this.uuid}));
            this.avoir$.subscribe(
              (resp) => {
                console.log(resp);
                console.log(resp);

                if (resp.montantAvoir && resp.dataState == "SUCCESS") {
                  this.avoirForm.controls.montant_calcule.setValue(resp.montantAvoir.total);
                }
              }
            );
          }
        } else {
          this.disable = false;
          this.avoirForm.controls.montant_calcule.setValue(null);
          this.avoirForm.controls.montant_avoir.setValue(null);
        }
      }
    )
  }

  uuid:string= null;
  selectFacture(event){
    console.log('this.avoirForm');
    console.log(this.avoirForm);
    console.log(event);

    this.avoirForm.controls.facture.setValue(event?.id);
    this.avoirForm.controls.montant_facture.setValue(event?.montant_ttc);
    console.log(event?.uuid);
    this.uuid = event?.uuid;

    if(this.avoirForm.controls.base_calcule.value === "Convention client"){
      this.disable = true;
      this.store.dispatch(loadConventionClient({uuid: this.uuid}));
      this.avoir$.subscribe(
        (resp) => {
          console.log(resp);

          if (resp.montantAvoir && resp.dataState == "SUCCESS") {
            this.avoirForm.controls.montant_calcule.setValue(resp.montantAvoir.total);
          }
        }
      );
    } else {
      this.disable = false;
      this.avoirForm.controls.montant_calcule.setValue(null);
      this.avoirForm.controls.montant_avoir.setValue(null);

    }
  }

  selectClient(event) {
    this.store.dispatch(loadCustomerPayedFactures({data: event?.id}))
    this.facturesSubscription = this.factures$.subscribe(
      (resp: FactureState) => {
        if (resp.dataState == FactureStateEnum.INIT) {
          this.store.dispatch(loadCustomerPayedFactures(event?.id));
        }
        // this.factures = resp.factures.filter(facture => facture.paiement_status != "not payed");
        this.factures  = resp.factures;
        console.log("this.factures");
        console.log(this.factures);
      },
      (err) =>{
        console.log('une erreur est survenue', err);
      }
    );
  }

  createAvoir() {
    if (this.avoirForm.invalid || this.avoirForm.controls.montant_avoir.value<=0) return;

    Swal.fire({
      text: `Êtes-vous sûr(e) de vouloir valider l'avoir de ${this.avoirForm.value.montant_avoir} Dhs`,
      icon: 'warning',
      iconColor: 'yellow',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'green',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.confirmCreation();
      }
    });
  }

  confirmCreation(){
    this.spinner = true;
    let formValue = this.avoirForm.value;
    console.log('formValue');
    console.log(formValue);
    this.formData.append('facture_id', formValue.facture);
    this.formData.append('base_calcule', formValue.base_calcule);
    this.formData.append('montant_facture', formValue.montant_facture);
    this.formData.append('motif', formValue.motif);
    this.formData.append('type', formValue.type);
    this.formData.append('montant_calcule', formValue.montant_calcule);
    this.formData.append('montant_avoir', formValue.montant_avoir);
    this.formData.append('commentaire', formValue.commentaire);


    this.store.dispatch(createAvoir({data:this.formData}));
    this.avoir$.subscribe(
      (resp) => {
        console.log(resp);
        this.spinner = false;
        if (resp.avoir&&resp.dataState=="SUCCESS") {
          this.dialogRef.close();
        }
      }, (error) => {
        this.spinner = false
      }
    );
    // this.formData.forEach((key,value)=> console.log(key +":" + value))
  }

}
