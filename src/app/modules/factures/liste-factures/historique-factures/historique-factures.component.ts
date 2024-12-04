import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HistoryFilter } from 'app/core/models/facturation/filters/history-filter.model';
import { AppState } from 'app/core/store/app.states';
import { loadFacturesHistory } from 'app/core/store/facturation/facture/facture.actions';
import { FactureState } from 'app/core/store/facturation/facture/facture.reducer';
import { CustomerState } from 'app/core/store/customer/customer.reducer';
import { Customer } from 'app/core/models/customer.model';
import { Observable } from 'rxjs';
import { loadAccountCustomers } from 'app/core/store/customer/customer.actions';
import { Paginator } from 'app/core/models/paginator.model';
import { selectPagination } from 'app/core/store/pagination/pagination.selectors';
import { Config } from 'app/config';

@Component({
  selector: 'app-historique-factures',
  templateUrl: './historique-factures.component.html',
  styleUrls: ['./historique-factures.component.css']
})
export class HistoriqueFacturesComponent implements OnInit {
  pagination!: Paginator;
  per_page = 10;
  p: number = 1;
  filterData: HistoryFilter;

  headerColumuns = [
    'N° Facture',
    'Date de modif',
    'Client',
    'Statut',
    'Ancien montant',
    'Nouveau montant',
    'Base de calcul',
  ];
  inputsFiler = [
    {
      name: 'reference',
      placeholder: 'N° Facture',
      type: 'text'
    },
    {
      name: 'date',
      placeholder: 'Date de modif',
      type: 'date',
    },
    {
      name: 'customer',
      placeholder: 'Client',
      type: 'select',
      keys: ['code', 'name'],
      apiUrl: `${Config.api.customers.searchList}?type=customer&search=`,
      options: [],
    },
    {
      name: 'statut',
      placeholder: 'Statut',
      type: 'select',
      options: [
        {
          text: 'Recalculée',
          value: 'Recalculer',
        },
        {
          text: 'Annulée',
          value: 'Annuler',
        }
      ],
    },
    {
      name: 'base_calcul',
      placeholder: 'Base de calcul',
      type: 'select',
      options: [
        {
          text: 'Saisi Manuelle',
          value: 'Saisi Manuelle'
        },
        {
          text: 'Convention client',
          value: 'Convention client'
        },
      ]
    },
  ];

  facture$: Observable<FactureState> = this.store.select(state => state.facture);
  customer$: Observable<CustomerState> = this.store.select(state => state.customer);
  customers : Customer[]=[];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadFacturesHistory({data:null, per_page : this.per_page , page : 1}));
    this.store.select(selectPagination).subscribe(pagination => {
      this.pagination = pagination
    })
    // this.store.dispatch(loadAccountCustomers());
    // this.customer$.subscribe(
    //   (resp) =>{
    //     this.customers = resp.payload;
    //     for(var i=0; i<this.customers.length; i++){
    //       this.inputsFiler["2"].options.push({
    //         'text' : this.customers[i].name,
    //         'value' : `${this.customers[i].id}`,
    //       })
    //     }
    //   }
    // )
  }

  filtrer($event){
    // this.spinner = true;
    console.log("FILTER RDV", $event)
    let formValue = $event;
    let history : HistoryFilter = new HistoryFilter();
    history.reference = formValue.reference;
    history.date = formValue.date;
    history.customer = formValue.customer;
    history.statut = formValue.statut;
    history.base_calcul = formValue.base_calcul;
    this.filterData = history;
    this.store.dispatch(loadFacturesHistory({data: history, per_page : this.per_page, page : this.p}));

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


    this.store.dispatch(loadFacturesHistory({ data: this.filterData, per_page : this.per_page , page : paginator.nextPage}));


  }
}
