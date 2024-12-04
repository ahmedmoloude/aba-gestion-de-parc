import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogRecouvrementComponent } from './dialog-recouvrement/dialog-recouvrement.component';
import { VisualistationGlobalComponent } from './visualistation-global/visualistation-global.component';
import { Observable } from 'rxjs';
import { RecouvrementState } from 'app/core/store/facturation/customer-fee/recouvrement/recouvrement.reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { CustomerState } from 'app/core/store/customer/customer.reducer';
import { Customer } from 'app/core/models/customer.model';
import * as RecouvrementsActions from 'app/core/store/facturation/customer-fee/recouvrement/recouvrement.actions'
import { loadAccountCustomers } from 'app/core/store/customer/customer.actions';
import { VisualistationDetailsComponent } from './visualistation-details/visualistation-details.component';
import { RecouvrementFilter } from 'app/core/models/facturation/filters/recouvrement-filter.model';
import { RecouvreurState } from 'app/core/store/facturation/recouvreur/recouvreur.reducer';
import { loadRecouvreurs } from 'app/core/store/facturation/recouvreur/recouvreur.actions';
import { Recouvreur } from 'app/core/models/facturation/recouvreur.model';
import { Config } from 'app/config';
import { Paginator } from 'app/core/models/paginator.model';
import { selectPagination } from 'app/core/store/pagination/pagination.selectors';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-recouvrement',
  templateUrl: './recouvrement.component.html',
  styleUrls: ['./recouvrement.component.css']
})
export class RecouvrementComponent implements OnInit {

  pagination!: Paginator;
  per_page = 10;
  p: number = 1;
  filterData: RecouvrementFilter;

  panelOpenState = false;
  headerColumuns = [
    'Factures échus',
    'créances',
    'Nbre factures',
    'Nbre clients',
  ];
  inputsFiler = [
    {
      name: 'recouvreur',
      placeholder: 'Recouvreur',
      type: 'select',
      options: [],
    },
    {
      name: 'client',
      placeholder: 'Client',
      type: 'select',
      keys: ['code', 'name'],
      apiUrl: `${Config.api.customers.searchList}?type=customer&search=`,
      options: [],

    },
    {
      name: 'activity',
      placeholder: 'Activité',
      type: 'select',
      options: [
        {
          text: 'Tout',
          value: '',
        },
        {
          text: 'Messagerie',
          value: 'Messagerie',
        },
        {
          text: 'Affrèttement',
          value: 'Afferetement',
        }
      ]
    }
  ];
  customers : Customer[]=[];

  customer$: Observable<CustomerState> = this.store.select(state => state.customer);

  recouvrement$: Observable<RecouvrementState> = this.store.select(state=>state.recouvrement);
  recouvreur$: Observable<RecouvreurState> = this.store.select(state => state.recouvreur);
  recouvreurs: Recouvreur[] = [];

  constructor(public dialog: MatDialog,
              private store: Store<AppState>,
              public permissionService: PermissionService) { }

  ngOnInit(): void {
    this.store.select(selectPagination).subscribe(pagination => {
      this.pagination = pagination
    })
    this.store.dispatch(RecouvrementsActions.loadRecouvrements({data: null, per_page : this.per_page , page : 1}));
    this.store.dispatch(RecouvrementsActions.loadTotalRecouvrements());
    // this.store.dispatch(loadAccountCustomers());
    this.store.dispatch(loadRecouvreurs());

    // this.customer$.subscribe(
    //   (resp) =>{
    //     this.customers = resp.payload;
    //     for(var i=0; i<this.customers.length; i++){
    //       this.inputsFiler["1"].options.push({
    //         'text' : `${this.customers[i].code} - ${this.customers[i].name}`,
    //         'value' : `${this.customers[i].id}`,
    //       })
    //     }
    //   }
    // );

    this.recouvreur$.subscribe(
      (resp) =>{
        console.log('recouvreur');
        console.log(resp?.recouvreurs);
        this.recouvreurs = resp?.recouvreurs;
        for(var i=0; i<this.recouvreurs?.length; i++){
          this.inputsFiler["0"].options.push({
            'text' : `${this.recouvreurs[i].firstName} ${this.recouvreurs[i].lastName}`,
            'value' : `${this.recouvreurs[i].id}`,
          })
        }
      }
    );
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


    this.store.dispatch(RecouvrementsActions.loadRecouvrements({ data: this.filterData , per_page : this.per_page , page : paginator.nextPage}));


  }

  filtrer($event){
    // this.spinner = true;
    console.log("FILTER RDV", $event);
    let formValue = $event
    let recouvrement : RecouvrementFilter = new RecouvrementFilter();
    recouvrement.customer_id = formValue.client;
    recouvrement.activity = formValue.activity;
    recouvrement.recouvreur_id = formValue.recouvreur;
    this.filterData = recouvrement;
    this.store.dispatch(RecouvrementsActions.loadRecouvrements({data: recouvrement, per_page : this.per_page, page : this.p}));
  }

  dialogrecouvrement(range: string): void {
    this.store.dispatch(RecouvrementsActions.loadRecouvrementsByRange({data:range}));
    this.dialog.open(DialogRecouvrementComponent, {
      disableClose: false,
      width: '1684px',
      data: range,
    });
  }

  getTotalCreance(data) {
    let sum = 0
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        if(element){
          sum += parseFloat(element);
        }
      }
    }

    return sum;
  }

  visualistationglobal(customer:any): void {

    this.store.dispatch(RecouvrementsActions.loadRecouvrement({data:customer?.id}));
    this.dialog.open(VisualistationGlobalComponent, {
      disableClose: false,
      width: '1684px',
      data: customer,
    });
  }
  visualistationdetails(id: number): void {
    this.store.dispatch(RecouvrementsActions.loadRecouvrement({data:id}));
    this.dialog.open(VisualistationDetailsComponent, {
      disableClose: false,
      width: '1620px',
      data: {},
    });
  }

}
