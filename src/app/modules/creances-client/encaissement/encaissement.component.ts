import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { loadAccountCustomers } from 'app/core/store/customer/customer.actions';
import { loadReceipts } from 'app/core/store/facturation/customer-fee/receipt/receipt.actions';
import { ReceiptState } from 'app/core/store/facturation/customer-fee/receipt/receipt.reducer';
import { Observable } from 'rxjs';
import { CreateEncaissementDialogComponent } from './create-encaissement-dialog/create-encaissement-dialog.component';
import { CustomerState } from 'app/core/store/customer/customer.reducer';
import { Customer } from 'app/core/models/customer.model';
import { ReceiptFilter } from 'app/core/models/facturation/filters/receipt-filter.model';
import { Paginator } from 'app/core/models/paginator.model';
import { selectPagination } from 'app/core/store/pagination/pagination.selectors';
import { loadModeReglements } from 'app/core/store/facturation/customer-fee/mode-reglement/mode-reglement.actions';
import { Config } from 'app/config';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-encaissement',
  templateUrl: './encaissement.component.html',
  styleUrls: ['./encaissement.component.css'],
})
export class EncaissementComponent implements OnInit {
  pagination!: Paginator;
  per_page = 10;
  p: number = 1;
  filterData: ReceiptFilter;

  headerColumuns = [
    'Code / client',
    'Réglement',
    'date de réglement',
    'Mode de paiment',
    'Référence réglement',

  ];
  customers : Customer[]=[];

  inputsFiler = [
    {
      name: 'client',
      placeholder: 'Client',
      type: 'select',
      keys: ['code', 'name'],
      apiUrl: `${Config.api.customers.searchList}?type=customer&search=`,
      options: [],

    },
    {
      name: 'mode_reglement',
      placeholder: 'Mode de règlement',
      type: 'select',
      options: [
        {
          text:'ESPECE',
          value: 'ESPECE',
        },
        {
          text:'CHEQUE',
          value: 'CHEQUE',
        },
        {
          text:'VIREMENT',
          value: 'VIREMENT',
        },
        {
          text:'EFFET',
          value: 'EFFET',
        },
        {
          text:'AVOIR',
          value: 'AVOIR',
        }
      ],
    },
    {
      name: 'date_demande',
      placeholder: 'Date de demande',
      type: 'date',
    },
    {
      name: 'reference',
      placeholder: 'Référence',
      type: 'text'
    },
    {
      name: 'montant',
      placeholder: 'Montant',
      type: 'text'
    },
  ];
  receipt$: Observable<ReceiptState> = this.store.select(state => state.receipt);
  customer$: Observable<CustomerState> = this.store.select(state => state.customer);


  constructor(private store: Store<AppState>,
              public dialog: MatDialog,
              public permissionService: PermissionService) {}

  ngOnInit(): void {
    this.store.select(selectPagination).subscribe(pagination => {
      this.pagination = pagination
    })
    this.store.dispatch(loadReceipts({data: null, per_page : this.per_page , page : 1}));
    // this.store.dispatch(loadAccountCustomers());
    this.store.dispatch(loadModeReglements());
    // this.customer$.subscribe(
    //   (resp) =>{
    //     this.customers = resp.payload;
    //     for(var i=0; i<this.customers.length; i++){
    //       this.inputsFiler["0"].options.push({
    //         'text' : this.customers[i].name,
    //         'value' : `${this.customers[i].id}`,
    //       })
    //     }
    //   }
    // )
  }

  createEncaissementDialog(){
    this.dialog.open(CreateEncaissementDialogComponent, {
      disableClose: true,
      width: '450px',
      data: {},
    });
  }
  filtrer($event){
    // this.spinner = true;
    console.log("FILTER RDV", $event);
    let formValue = $event
    let receipt : ReceiptFilter = new ReceiptFilter();
    receipt.customer_id = formValue.client;
    receipt.mode_paiement = formValue.mode_reglement;
    receipt.date_demande = formValue.date_demande;
    receipt.reference = formValue.reference;
    receipt.montant = formValue.montant;
    this.filterData = receipt;
    this.store.dispatch(loadReceipts({data: receipt, per_page : this.per_page, page : this.p}));
  }

  paginate($event: any){
    console.log( 'page size ' , $event)

    this.per_page = $event.rows;


    const paginator = {
      currentPage: $event.page,
      nextPage: $event.page + 1,
      pageSize: $event.pageCount,
      totalItems: this.pagination.totalItems,
    }
    this.p = paginator.nextPage


    this.store.dispatch(loadReceipts({ data: this.filterData , per_page : this.per_page , page : paginator.nextPage}));


  }
}
