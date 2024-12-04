import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { VersementFilter } from 'app/core/models/caisse/filter/versement-filter.model';
import { AppState } from 'app/core/store/app.states';
import { loadVersementsCheck, loadVersementsVirement, validateVersementCheck } from 'app/core/store/caisse/versement/versement.actions';
import { VersementState } from 'app/core/store/caisse/versement/versement.reducer';
import { Observable, Subscription } from 'rxjs';
import { CustomerState } from 'app/core/store/customer/customer.reducer';
import { SelectionModel } from '@angular/cdk/collections';
import { Versement } from 'app/core/models/caisse/versement.model';
import { StateEnum } from 'app/core/store/caisse/carte/carte.reducer';
import { Config } from 'app/config';
@Component({
  selector: 'app-cheque',
  templateUrl: './cheque.component.html',
  styleUrls: ['./cheque.component.css']
})
export class ChequeComponent implements OnInit {

  p: number = 1;
  spinner: boolean = false;

  headerColumuns = [
    'Client à rembourser',
    'N° EXP',
    'Total à rembourser',
  ];
  inputsFiler = [
    {
      name: 'n_expedition',
      placeholder: 'N° Expédition',
      type: 'text',
    },
    {
      name: 'customer',
      placeholder: 'Client',
      type: 'select',
      keys: ['code', 'name'],
      apiUrl: `${Config.api.customers.searchList}?type=customer&search=`,
      options: [],
    },
  ];

  versement$: Observable<VersementState> = this.store.select(state=>state.versement);
  versements: Versement[];
  selection = new SelectionModel<Versement>(true, []);

  customer$: Observable<CustomerState> = this.store.select(state => state.customer);
  customerSubscription: Subscription;
  customers = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.getCustomers();
    this.versement$.subscribe(
      (resp: VersementState) => {
        if(resp.checkDataState == StateEnum.SUCCESS )
        this.versements = resp.versementsCheck.filter(v => v.remis != "REMIS");
        console.log('this.versements');
        console.log(this.versements);

      });

  }

  filtrer($event){
    console.log("FILTER RDV", $event)
    let formValue = $event;
    let versement = new VersementFilter();
    versement.customer = formValue.customer;
    versement.n_expedition = formValue.n_expedition;
    versement.type = "Virement";
    this.store.dispatch(loadVersementsCheck({data: versement}))
  }

  getCustomers(){
    this.customerSubscription = this.customer$.subscribe(
      (resp: CustomerState) => {
        console.log(resp);
        this.customers = resp.payload;
        for(var i=0; i<this.customers.length; i++){
          this.inputsFiler["1"].options.push({
            'text' : this.customers[i].name,
            'value' : `${this.customers[i].id}`,
          })
        }
      },
      (err) =>{
        console.log('une erreur est survenue', err);
      }
    );
  }

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.versements.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.versements);
  }

  /** The label for the documentbox on the passed row */
  checkboxLabel(row?: Versement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${this.selection.selected.indexOf(row)}`;
  }


  validate(versement?: Versement) {
    if(!versement && this.selection.isEmpty()) return;

    let data = versement? [versement]:this.selection.selected;
    let documents = []
    for (const item of data) {
      documents.push(item.document_id);
    }
    this.store.dispatch(validateVersementCheck({data:{documents: documents}}));
    this.selection.clear();
  }

}
