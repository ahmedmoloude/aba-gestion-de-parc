import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { loadAccountCustomers, loadUnpaidCustomers } from 'app/core/store/customer/customer.actions';
import { loadUnpaids } from 'app/core/store/facturation/customer-fee/unpaid/unpaid.actions';
import { UnpaidState } from 'app/core/store/facturation/customer-fee/unpaid/unpaid.reducer';
import { Observable } from 'rxjs';
import { CreateUnpaidDialogComponent } from './create-unpaid-dialog/create-unpaid-dialog.component';
import { UnpaidFilter } from 'app/core/models/facturation/filters/unpaid-filter.model';
import { CustomerState } from 'app/core/store/customer/customer.reducer';
import { Customer } from 'app/core/models/customer.model';
import { Config } from 'app/config';
import { PermissionService } from 'app/core/services/permission.service';


@Component({
  selector: 'app-gestion-impayes',
  templateUrl: './gestion-impayes.component.html',
  styleUrls: ['./gestion-impayes.component.css'],
})
export class GestionImpayesComponent implements OnInit {
  p: number = 1;
  headerColumuns = [
    'Code / client',
    // 'Facture',
    // 'Date de facture',
    'Règlement',
    'Mode de paiement',
    'Référenece chèque',
    'Date de règlement',
    ''
  ];
  inputsFiler = [
    {
      name: 'reference_reglement',
      placeholder: 'Référence',
      type: 'text'
    },
    {
      name: 'customer_id',
      placeholder: 'Client',
      type: 'select',
      keys: ['code', 'name'],
      apiUrl: `${Config.api.customers.searchList}?type=customer&search=`,
      options: [],

    },

    {
      name: 'date_demande',
      placeholder: 'Date de demande',
      type: 'date',
    },

  ];
  unpaid$: Observable<UnpaidState> = this.store.select(state => state.unpaid);
  customer$: Observable<CustomerState> = this.store.select(state => state.customer);
  customers : Customer[]=[];


  constructor(private store: Store<AppState>,
    public dialog: MatDialog,
    public permissionService: PermissionService) {}

  ngOnInit(): void {
    this.store.dispatch(loadUnpaids({data: null}));
    // this.store.dispatch(loadAccountCustomers());
    this.store.dispatch(loadUnpaidCustomers());
    // this.customer$.subscribe(
    //   (resp) =>{
    //     this.customers = resp.payload;
    //     for(var i=0; i<this.customers.length; i++){
    //       this.inputsFiler["1"].options.push({
    //         'text' : this.customers[i].name,
    //         'value' : `${this.customers[i].id}`,
    //       })
    //     }
    //   }
    // )

    console.log('unpaids');
    this.unpaid$.subscribe(
      (res) =>{
        console.log(res);
      }
    );

  }
  filtrer($event){
    // this.spinner = true;
    console.log("FILTER RDV", $event);
    let formValue = $event
    let unpaid : UnpaidFilter= new UnpaidFilter();
    unpaid.reference_reglement = formValue.reference_reglement;
    unpaid.customer_id = formValue.customer_id;
    unpaid.date_demande = formValue.date_demande;
    this.store.dispatch(loadUnpaids({data: unpaid}));
  }

  createUnpaidDialog(){
    this.dialog.open(CreateUnpaidDialogComponent, {
      disableClose: true,
      width: '450px',
      data: {},
    });
  }

}
