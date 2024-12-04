import { DialogReglementComponent } from './../avoir/dialog-reglement/dialog-reglement.component';
import { AppliqueRemiseComponent } from './applique-remise/applique-remise.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import * as FactureActions from 'app/core/store/facturation/facture/facture.actions';
import * as CustomerActions from 'app/core/store/customer/customer.actions';
import { Observable } from 'rxjs';
import { FactureState, FactureStateEnum } from 'app/core/store/facturation/facture/facture.reducer';
import { Facture } from 'app/core/models/facturation/facture.model';
import { loadDiscountTypes } from 'app/core/store/facturation/discount/discount.actions';
import { SelectionModel } from '@angular/cdk/collections';
import { Config } from 'app/config';
import { Customer } from 'app/core/models/customer.model';
import { CustomerState } from 'app/core/store/customer/customer.reducer';
import { FactureFilter } from 'app/core/models/facturation/filters/facture-filter.model';
import { RessourceState } from 'app/core/store/resources/resources.reducer';
import { AgenceState } from 'app/core/store/agence/agence.reducer';
import { Agence } from 'app/core/models/agence.model';
import { Paginator } from 'app/core/models/paginator.model';
import { selectPagination } from 'app/core/store/pagination/pagination.selectors';
import { PermissionService } from 'app/core/services/permission.service';
import { selectAuthUser } from 'app/core/store/profil/profil.selectors';
import { RemiseService } from 'app/core/services/facturation/remise.service';

@Component({
  selector: 'app-remise',
  templateUrl: './remise.component.html',
  styleUrls: ['./remise.component.css'],
})
export class RemiseComponent implements OnInit {

  pagination!: Paginator;
  per_page = 10;
  p: number = 1;
  filterData: FactureFilter;

  inputsFiler = [
    {
      name: 'reference',
      placeholder: 'N° de facture',
      type: 'text'
    },
    {
      name: 'customer_id',
      placeholder: 'Nom de client',
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
          text: 'Messagerie',
          value: 'Messagerie',
        },
        {
          text: 'Affrèttement',
          value: 'Afferetement',
        }
      ]
    },
    {
      name: 'start_date',
      placeholder: 'Du',
      type: 'date'
    },
    {
      name: 'end_date',
      placeholder: 'Au',
      type: 'date'
    },
    {
      name: 'zone_id',
      placeholder: 'Zone',
      type: 'select',
      options: [],
    },

  ];
  extraInputsFilter = [
    {
      name: 'agence_id',
      placeholder: 'agence',
      type: 'select',
      options: [],
    },

  ];
  applyDiscount: boolean = false;
  bills$:Observable<FactureState> = this.store.select(state => state.facture);
  bills: Facture[] = [];
  factures: Facture[] = [];
  FacturesIds: Array<Facture> = [];
  url: string = Config.api.bill.printBill;

  selection = new SelectionModel<Facture>(true, []);

  customer$: Observable<CustomerState> = this.store.select(state => state.customer);
  agence$: Observable<AgenceState> = this.store.select(state => state.agence);
  ressources$: Observable<RessourceState> = this.store.select(state => state.ressources);
  customers : Customer[]=[];
  agences: Agence[] = [];
  zones: any[] = [];

  user: any;

  constructor(public dialog: MatDialog,
            private store:Store<AppState>,
            private remiseService : RemiseService,
            public permissionService: PermissionService) {}

  ngOnInit(): void {
    this.store.select(selectPagination).subscribe(pagination => {
      this.pagination = pagination
    })
    this.store.select(selectAuthUser).subscribe((res) => (this.user = res));
    this.store.dispatch(FactureActions.loadFactures({data: null , per_page : this.per_page , page : this.p}));
    this.store.dispatch(loadDiscountTypes());
    // this.store.dispatch(CustomerActions.loadAccountCustomers());
    this.subscribeObservables();
  }

  showValidateRemiseBtn(remise){
    let workflowValidation = remise.workflow
    let remiseStep = remise.workflow_step
    let currentStep = workflowValidation.find(item => item.niveau == remiseStep)
    let checkerDone = workflowValidation.filter(item => item.status == 'DONE').length
    let checkerPending = workflowValidation.filter(item => item.status == 'PENDING').length
    let checkerReject = workflowValidation.filter(item => item.status == 'REJECT').length
      if(checkerDone === workflowValidation.length
      ){
        return false
      }else if(this.user.temp_role?.name.includes('admin') || this.user.role?.name.includes('admin')){
          return true
        
      }
    if(currentStep){
      return this.user.temp_role?.id == currentStep.role_id && currentStep.status == 'PENDING'
    }
    return false
  }

  validateRemise(remise, status){
    this.remiseService.validateRemise(remise, {status: status}).subscribe(
      (res: any) => {
        this.store.dispatch(FactureActions.loadFactures({ data: this.filterData , per_page : this.per_page , page : this.p}));
      },
      (err) => {
      }
    );
  }

  subscribeObservables() {
    this.bills$.subscribe(
      (data: FactureState) => {
        console.log('factures');
        console.log(data);
        console.log(data.factures);
        if (data.dataState==FactureStateEnum.SUCCESS && data.factures?.length > 0){
          this.selection.clear();
          this.factures = [...data.factures].filter(facture => !facture.is_annuler);
          console.log('factures filtered');
          console.log(this.factures);

          this.bills = this.factures.filter(facture => !facture?.remise && facture?.paiement_status == 'not payed' && (!facture?.montant_recalcule||(facture?.montant_recalcule && facture?.base_recalculation!='Saisi Manuelle')));

        }
      }
    );
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
    this.agence$.subscribe(
      (resp) =>{
        this.agences = resp?.payload;
        for(var i=0; i<this.agences?.length; i++){
          this.extraInputsFilter["0"].options.push({
            'text' : this.agences[i].name,
            'value' : `${this.agences[i].id}`,
          })
        }
      }
    );
    this.ressources$.subscribe(
      (resp) =>{
        this.zones = resp.zones;
        for(var i=0; i<this.zones.length; i++){
          this.inputsFiler["5"].options.push({
            'text' : this.zones[i].name,
            'value' : `${this.zones[i].id}`,
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

    this.store.dispatch(FactureActions.loadFactures({ data: this.filterData , per_page : this.per_page , page : paginator.nextPage}));


  }

  filtrer($event){
    // this.spinner = true;
    console.log("FILTER RDV", $event)
    let formValue = $event
    let facture : FactureFilter = new FactureFilter();
    facture.reference = formValue.reference;
    facture.customer_id = formValue.customer_id;
    facture.zone_id = formValue.zone_id;
    facture.start_date = formValue.start_date;
    facture.end_date = formValue.end_date;
    facture.activity = formValue.activity;
    this.filterData  = facture;

    this.store.dispatch(FactureActions.loadFactures({data: facture , per_page : this.per_page , page : this.p}));
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.bills.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.bills);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Facture): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${this.selection.selected.indexOf(row)}`;
  }

  getMTRemise(montant_ht, taux) {
    return (parseFloat(montant_ht)*taux)/100;
  }

  // AppliqueRemiseComponent(facture: Facture): void {
  //   const dialogRef = this.dialog.open(AppliqueRemiseComponent, {
  //     disableClose: false,
  //     width: '411px',
  //     data: facture,
  //   });
  //   dialogRef.afterClosed().subscribe((data) => {
  //     if (data) {
  //       let fa = JSON.parse(JSON.stringify(facture));
  //       fa.remise = data.discount;
  //       let facctureIndex = this.bills.findIndex((f) => f.id == facture.id);
  //       this.bills[facctureIndex] = fa;
  //       this.applyDiscount = false;
  //     }
  //   });
  // }

  reglementdialog(workflow): void {
    this.dialog.open(DialogReglementComponent, {
      disableClose: true,
      width: '850px',
      data: { workflow},
    });
  }

  onCancelDiscountOnMultiCustomers(){
    this.FacturesIds = [];
  }

  onApplyDiscountOnMultiCustomers(facture?: Facture){
    if((!facture&&this.selection.isEmpty())) return;

    let dialogData = facture? [facture]:this.selection.selected
    const dialogRef = this.dialog.open(AppliqueRemiseComponent, {
      disableClose: false,
      width: '411px',
      data: {factures: dialogData, filters: this.filterData},
    });
    // dialogRef.afterClosed().subscribe((data) => {
    //   if (data) {
    //     this.selection.clear();
    //     let remise = data.discount;
    //     let factures = JSON.parse(JSON.stringify(remise?.factures));
    //     factures.map(facture => {
    //       facture.taux_remise = remise.taux;
    //       let facctureIndex = this.bills.findIndex((f) => f.id == facture.id);
    //       this.bills[facctureIndex] = facture;
    //     })
    //     this.applyDiscount = false;
    //   }
    // });
  }

  open(x){
    console.log('url');
    console.log(x);
  }

  downloadDoc(path: string){
    const link = document.createElement('a');
    link.href = this.url+path;
    link.target = '_blank';
    link.click();
  }


  getMontantTTC(facture) {
    let remise = parseFloat(facture?.remise_montant) || 0;
    return (facture?.montant_recalcule)? facture.montant_recalcule - remise : (facture?.montant_ht? facture.montant_ht - remise : 0)
  }
  getBalancePayable(facture){
    let amount = this.getMontantTTC(facture);
     let balancePayable = 0
     return amount - facture?.total_paye;
   }
}
