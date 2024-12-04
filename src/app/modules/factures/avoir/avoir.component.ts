import { RapportAvoirComponent } from './rapport-avoir/rapport-avoir.component';
import { DialogReglementComponent } from './dialog-reglement/dialog-reglement.component';
import { DialogAvoirComponent } from './dialog-avoir/dialog-avoir.component';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'app/core/store/app.states';
import { AvoirState, AvoirStateEnum } from 'app/core/store/facturation/avoir/avoir.reducer';
import { exportAvoirs, exportPdfAvoir, loadAvoirs, loadRapportAvoir } from 'app/core/store/facturation/avoir/avoir.actions';
import { loadFactures, loadPayedFactures } from 'app/core/store/facturation/facture/facture.actions';
import { AvoirFilter } from 'app/core/models/facturation/filters/avoir-filter.model';
import { Config } from 'app/config';
import { loadAccountCustomers } from 'app/core/store/customer/customer.actions';
import { Paginator } from 'app/core/models/paginator.model';
import { selectPagination } from 'app/core/store/pagination/pagination.selectors';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-avoir',
  templateUrl: './avoir.component.html',
  styleUrls: ['./avoir.component.css'],
})
export class AvoirComponent implements OnInit {
  pagination!: Paginator;
  per_page = 10;
  p: number = 1;
  filterData: AvoirFilter;
  headerColumuns = [
    'N° d’avoir',
    'Date d\'avoir',
    'N° de facture',
    'Date de facture',
    'Base de calcul',
    'Montant d\'avoir',
    'Type d\'avoir',
    'Motif',
    'Workflow',
  ];
      // reference,base_calcule(Convention client,Avoir forfaitaire),date_facture,montant_facture

  inputsFiler = [
    {
      name: 'reference',
      placeholder: 'N° d’avoir / N° de facture',
      type: 'text'
    },
    {
      name: 'base_calcule',
      placeholder: 'Base de calcul',
      type: 'select',
      options:[
        {
          text: 'Convention client',
          value: 'Convention client'
        },
        {
          text: 'Avoir forfaitaire',
          value: 'Avoir forfaitaire'
        },
      ]
    },
    {
      name: 'date_facture',
      placeholder: 'Date de facture',
      type: 'date'
    },
    {
      name: 'montant_facture',
      placeholder: 'Montant facture (Dhs)',
      type: 'text'
    },
  ];

  link: string = Config.api.avoir.exportAvoir;
  downloadPdflink: string = Config.api.avoir.downloadAvoir;

  loadAvoirs$: Observable<AvoirState> = this.store.select(state => state.avoir);
  constructor(public dialog: MatDialog,
              private store: Store<AppState>,
              public permissionService: PermissionService) {}

  ngOnInit(): void {
    this.store.select(selectPagination).subscribe(pagination => {
      this.pagination = pagination
    })
    this.store.dispatch(loadAvoirs({data:null, per_page : this.per_page , page : 1}));
    this.store.dispatch(loadAccountCustomers());
    // this.store.dispatch(loadPayedFactures());
    this.store.dispatch(loadRapportAvoir());
  }

  adddialog(): void {
    this.dialog.open(DialogAvoirComponent, {
      disableClose: true,
      width: '928px',
      data: {},
    });
  }

  reglementdialog(): void {
    this.dialog.open(DialogReglementComponent, {
      disableClose: true,
      width: '900px',
      data: {},
    });
  }

  rapportavoir(): void {
    this.dialog.open(RapportAvoirComponent, {
      disableClose: true,
      width: '818px',
      data: {},
    });
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

    this.store.dispatch(loadAvoirs({ data: this.filterData , per_page : this.per_page , page : paginator.nextPage}));
  }

  filtrer($event){
    // this.spinner = true;
    console.log("FILTER RDV", $event);
    let formValue = $event;
    let avoir : AvoirFilter = new AvoirFilter();
    avoir.reference = formValue.reference;
    avoir.base_calcule = formValue.base_calcule;
    avoir.date_facture = formValue.date_facture;
    avoir.montant_facture = formValue.montant_facture;
    this.store.dispatch(loadAvoirs({data: avoir, per_page : this.per_page, page : this.p}));

  }

  exportavoirs() {
    this.store.dispatch(exportAvoirs());
  }
  exportSubscription: Subscription;

  importPdfAvoir(id: number, reference: string) {
      this.store.dispatch(exportPdfAvoir({data: id}));
     this.exportSubscription =  this.loadAvoirs$.subscribe(
        (resp) => {
          if( resp.pdfFile && resp?.pdfFileState == AvoirStateEnum.SUCCESS){
            this.downloadFile(resp?.pdfFile?.file, reference)
          }
        }
      )
    }

    // download file
    downloadFile(data: string, reference: string): void {
      const linkSource = 'data:application/pdf;base64,'+data;
      const downloadLink = document.createElement("a");
      downloadLink.href = linkSource;
      downloadLink.target="_blank";
      downloadLink.download = 'Avoir_' + reference + '.pdf';
      downloadLink.click();
    }

    ngOnDestroy() {
      this.exportSubscription?.unsubscribe();
    }
}
