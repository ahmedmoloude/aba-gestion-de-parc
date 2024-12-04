import { RecalculerFactureComponent } from './recalculer-facture/recalculer-facture.component';
import { MotiffacteurComponent } from './motiffacteur/motiffacteur.component';
import { SualisationGlobaleComponent } from './sualisation-globale/sualisation-globale.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FicheFactureComponent } from './fiche-facture/fiche-facture.component';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import * as FactureActions from 'app/core/store/facturation/facture/facture.actions';
import * as CustomerActions from 'app/core/store/customer/customer.actions';
import { Observable, Subscription } from 'rxjs';
import { FactureState, FactureStateEnum } from 'app/core/store/facturation/facture/facture.reducer';
import { Facture } from 'app/core/models/facturation/facture.model';
import { loadConventionClient } from 'app/core/store/facturation/avoir/avoir.actions';
import { HistoriqueFacturesComponent } from './historique-factures/historique-factures.component';
import { FactureFilter } from 'app/core/models/facturation/filters/facture-filter.model';
import { Customer } from 'app/core/models/customer.model';
import { CustomerState } from 'app/core/store/customer/customer.reducer';
import { RessourceState } from 'app/core/store/resources/resources.reducer';
import { AgenceState } from 'app/core/store/agence/agence.reducer';
import { Agence } from 'app/core/models/agence.model';
import { AffretementGlobalFactureComponent } from './affretement-global-facture/affretement-global-facture.component';
import { RecouvreurState } from 'app/core/store/facturation/recouvreur/recouvreur.reducer';
import { loadRecouvreurs } from 'app/core/store/facturation/recouvreur/recouvreur.actions';
import { Recouvreur } from 'app/core/models/facturation/recouvreur.model';
import { parse } from 'path';
import { Config } from 'app/config';
import { StateEnum } from 'app/core/store/caisse/carte/carte.reducer';
import { Paginator } from 'app/core/models/paginator.model';
import { selectPagination } from 'app/core/store/pagination/pagination.selectors';
import { PermissionService } from 'app/core/services/permission.service';
import { PiecejointeComponent } from './piecejointe/piecejointe.component';
import { AffretementRegenerateFactureComponent } from './affretement-regenerate-facture/affretement-regenerate-facture.component';

@Component({
  selector: 'app-liste-factures',
  templateUrl: './liste-factures.component.html',
  styleUrls: ['./liste-factures.component.css'],
})
export class ListeFacturesComponent implements OnInit, OnDestroy {

  pagination!: Paginator;
  per_page = 10;
  p: number = 1;
  filterData: FactureFilter;

  type: string = 'Messagerie' ;
  bills = [];
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
          text: 'Affrètement',
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
      {
        name: 'recouvreur_id',
        placeholder: 'Code recouvreur',
        type: 'select',
        options: []
      },
  ];

  bills$:Observable<FactureState> = this.store.select(state => state.facture);
  customer$: Observable<CustomerState> = this.store.select(state => state.customer);
  agence$: Observable<AgenceState> = this.store.select(state => state.agence);
  ressources$: Observable<RessourceState> = this.store.select(state => state.ressources);
  recouvreur$: Observable<RecouvreurState> = this.store.select(state => state.recouvreur);
  customers : Customer[]=[];
  agences: Agence[] = [];
  zones: any[] = [];
  recouvreurs: Recouvreur[] = [];
  intervalId: any;
  url: string = Config.api.bill.exportFacture;

  constructor(public dialog: MatDialog,
              public route: Router,
              private store:Store<AppState>,
              public permissionService: PermissionService) {}

  ngOnInit(): void {
    this.store.select(selectPagination).subscribe(pagination => {
      this.pagination = pagination
    })
    this.getBills();
    // this.store.dispatch(CustomerActions.loadAccountCustomers());
    this.store.dispatch(loadRecouvreurs());
    this.subscribeObservables();

  }
  subscribeObservables() {
    this.bills$.subscribe(
      (res) =>{
        console.log(res);
        if(res.factures&&res.dataState==FactureStateEnum.SUCCESS)
        this.bills = res.factures
      }
    )
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
    // );

    this.agence$.subscribe(
      (resp) =>{
        console.log('agences');
        console.log(resp?.payload);
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
        console.log('zones');
        console.log(resp.zones);
        this.zones = resp.zones;
        for(var i=0; i<this.zones.length; i++){
          this.inputsFiler["5"].options.push({
            'text' : this.zones[i].name,
            'value' : `${this.zones[i].id}`,
          })
        }
      }
    );

    this.recouvreur$.subscribe(
      (resp) =>{
        console.log('recouvreur');
        console.log(resp?.recouvreurs);
        this.recouvreurs = resp?.recouvreurs;
        for(var i=0; i<this.recouvreurs?.length; i++){
          this.extraInputsFilter["1"].options.push({
            'text' : this.recouvreurs[i].reference,
            'value' : `${this.recouvreurs[i].id}`,
          })
        }
      }
    );
  }

  getBills(){
    this.store.dispatch(FactureActions.loadFactures({data: null, per_page : this.per_page , page : 1}));
    // this.factureService.getBills().subscribe(
    //   (resp: ResponseData) => {
    //     console.log(resp);
    //     if(resp.status === 200)
    //     this.bills = resp.response;
    //   }
    // );

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
  filterFacture: FactureFilter =  new FactureFilter();
  filtrer($event){
    // this.spinner = true;

    console.log("FILTER RDV", $event)
    let formValue = $event
    let facture : FactureFilter = new FactureFilter();
    facture.reference = formValue.reference;
    facture.customer_id = formValue.customer_id;
    facture.zone_id = formValue.zone_id;
    facture.recouvreur_id = formValue.recouvreur_id;
    facture.start_date = formValue.start_date;
    facture.end_date = formValue.end_date;
    facture.activity = formValue.activity;
    facture.agency_id = formValue.agence_id;
    facture.recouvreur_id = formValue.recouvreur_id;
    this.type = formValue.activity == 'Afferetement' ? 'Affrètement' : 'Messagerie';
    this.filterFacture = facture;
    this.filterData  = facture;

    this.store.dispatch(FactureActions.loadFactures({data: facture, per_page : this.per_page, page : this.p}));
  }


  getMTRemise(montant_ht, taux, taux_remise) {
    let remise = 0;
    if (montant_ht){
      if (taux){
        remise = (parseFloat(montant_ht)*taux)/100;
      } else if (taux_remise) {
        remise = (parseFloat(montant_ht)*taux_remise)/100;
      }
    }
    return remise;
  }

  getBalancePayable(facture){
   let amount = this.getMontantTTC(facture);
    let balancePayable = 0
    return amount - facture?.total_paye;
  }

  sualisationglobale(uuid: string, nature:string): void {
    if(nature == 'Messagerie') {
      this.dialog.open(SualisationGlobaleComponent, {
        disableClose: true,
        width: '1128px',
        data: uuid,
      });
    } else {
      this.dialog.open(AffretementGlobalFactureComponent, {
        disableClose: true,
        width: '1128px',
        data: uuid,
      });
    }

  }

  getFactureDetail(uuid: string, nature:string) {
    if(nature == 'Messagerie') {
      this.route.navigate([`genererfacture/${uuid}`]);
    } else {
      this.route.navigate([`getfacture/${uuid}`]);

    }
  }

  generatefacture() {
    this.store.dispatch(CustomerActions.loadAccountCustomers());
    this.route.navigate([`generationfacture`]);
  }

  expnonfacture(){
    this.route.navigate([`expnonfacture`]);
  }

  addPiecejointe(uuid: string): void {
    this.dialog.open(PiecejointeComponent, {
      disableClose: true,
      width: '474px',
      data: uuid,
    });
  }

  motiffacteur(uuid: string): void {
    this.dialog.open(MotiffacteurComponent, {
      disableClose: true,
      width: '474px',
      data: uuid,
    });
  }

  recalculerfacture(facture: Facture): void {
    if(facture.paiement_status != "not payed") return;
    this.store.dispatch(loadConventionClient({uuid: facture.uuid}));
    const dialog = this.dialog.open(RecalculerFactureComponent, {
      disableClose: true,
      width: '814px',
      data: facture,
    });
    // dialog.afterClosed().subscribe((data) => {
    //   if (data) {
    //     let recalculation = JSON.parse(JSON.stringify(data.recalculation));
    //     let facture = recalculation?.facture;
    //     let factureIndex = this.bills.findIndex((f) => f.id == facture.id);
    //     console.log(factureIndex);
    //     this.bills[factureIndex] = facture;
    //     this.bills.splice(factureIndex, 1, facture)
    //   }
    // });
  }

  fichefacture(facture: Facture): void {
    this.dialog.open(FicheFactureComponent, {
      disableClose: true,
      width: '925px',
      data: facture,
    });
  }

  historiquefactures(): void {
    this.dialog.open(HistoriqueFacturesComponent, {
      disableClose: true,
      width: '932px',
      height: '100vh',
      data: { },
      position: { right: '0px' },
    });
  }

  cancelFacture(uuid: string){
    this.store.dispatch(FactureActions.cancelFacture({data: uuid}))

  }

  getMontantTTC(facture) {
    let remise = parseFloat(facture?.remise_montant) || 0;
    return (facture?.montant_recalcule)? facture.montant_recalcule - remise : (facture?.montant_ht? facture.montant_ht - remise : 0)
  }

  exportSubscription: Subscription
  exportFactures() {
    this.store.dispatch(FactureActions.exportFactures({data: this.filterFacture}));
   this.exportSubscription =  this.bills$.subscribe(
      (resp) => {
        if( resp.file && resp?.fileState == FactureStateEnum.SUCCESS){
          // this.handleBlobData(resp?.file);
          this.downloadExcelFile(resp?.file?.base64_data)
        }

      }
    )
  }

  downloadDoc(blobData){
    var blob = new Blob(blobData);
    var url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.click();
  }
  downloadExcelFile(data: string): void {
  const linkSource = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,'+data;
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.target = '_blank';
  downloadLink.download = 'fileName.xlsx';
  downloadLink.click();
  this.exportSubscription?.unsubscribe()
}

  handleBlobData(blobData: Blob) {
    const blobUrl = window.URL.createObjectURL(blobData);

    // For example, create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = 'exportedFile.xlsx'; // Specify the desired file name
    // document.body.appendChild(downloadLink);
    downloadLink.click();
    this.exportSubscription?.unsubscribe()
    // Clean up the Blob URL after use
    // window.URL.revokeObjectURL(blobUrl);
  }

  regenerateAffretementFacture(uuid: string) {
    this.dialog.open(AffretementRegenerateFactureComponent, {
      disableClose: true,
      width: '925px',
      data: uuid,
    });
  }
  ngOnDestroy() {
    this.exportSubscription?.unsubscribe()
  }

}
