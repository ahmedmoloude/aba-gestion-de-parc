import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { FactureState, FactureStateEnum } from 'app/core/store/facturation/facture/facture.reducer';
import * as FactureActions from 'app/core/store/facturation/facture/facture.actions';
import { Observable, Subscription } from 'rxjs';
import { Document } from 'app/core/models/facturation/document.model';
import { ExpeditionItem } from 'app/core/models/facturation/expedition-item.model';
import { TarifDetail } from 'app/core/models/facturation/tarif-detail.model';
import { DetailFactureService } from 'app/core/services/facturation/detail-facture.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-affretement-regenerate-facture',
  templateUrl: './affretement-regenerate-facture.component.html',
  styleUrls: ['./affretement-regenerate-facture.component.css']
})
export class AffretementRegenerateFactureComponent implements OnInit {
  headerColumuns = [
    'Date',
    'N° demande',
    'Expéditeur',
    'Destination',
    'Destinataires',
    'Camion',
    'Pallette',
    'Poids',
    'V déc',
    'Fonds',
    'BL',
    'Fact',
    'Port',
    'Mnt HT',
    'Transport',
    'Services',
    'TVA Transport',
    'TVA Services',
    'Mnt TTC',
  ];
  bill$:Observable<FactureState> = this.store.select(state => state.facture);
  billSubscription: Subscription;
  uuid!: string;
  selection = new SelectionModel<any>(true, []);
  bill = null;
  demandes = [];
  // demandesCanBeModified = [];
  // demandesCannotBeModified = [];
  spinner: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
              public dialogRef: MatDialogRef<AffretementRegenerateFactureComponent>,
              private store:Store<AppState>,
              private detailFactureService: DetailFactureService,
              public permissionService: PermissionService) {}

  ngOnInit(): void {
    this.uuid = this.data;
    console.log(this.uuid);

    this.getBill(this.uuid);
    this. billSubscription = this.bill$.subscribe(
      (res) =>{
        console.log(res);
        this.selection.clear();
        if (res.dataState == FactureStateEnum.SUCCESS && res.facture?.demandes?.length > 0){
          this.bill = res?.facture;
          this.demandes = this.bill?.demandes;
          // this.demandesCanBeModified = this.demandes.filter(e => e.is_light);
          // this.demandesCannotBeModified = this.demandes.filter(e => !e.is_light);
          this.selection.select(...this.demandes);
        }
      }
    )
  }

  getBill(uuid:string){
    this.store.dispatch(FactureActions.loadFactureDetail({data: uuid}));
  }

  getDocumentsByTypeCount(documents: Document[], type: string): number {
    if (documents.length>0)
      return this.detailFactureService.getDocumentsByTypeCount(documents, type);
  }

  sumExpeditionItemsProperties(expeditionItems: ExpeditionItem[]): { number: number, weight: number, declared_value: number } {
      return this.detailFactureService.sumExpeditionItemsProperties(expeditionItems);
  }

  sumAmounts(items: any): number {
    return this.detailFactureService.sumAmounts(items);
  }

  sumTarifDetails(expeditionTarifDetails: TarifDetail[]): { ht: number; tva: number; ttc: number; htTotal: number; ttcTotal: number } {
    return this.detailFactureService.sumTarifDetails(expeditionTarifDetails);
  }

  getTransportTarifs(expeditionTarifDetails: TarifDetail[]): { ht: number; tva: number; ttc: number } {
    return this.detailFactureService. getTransportTarifs(expeditionTarifDetails);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.demandes.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.demandes);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${this.selection.selected.indexOf(row)}`;
  }

  regenerateFacture() {
    let selected = this.selection.selected;
    if(this.isAllSelected() || (!this.selection.hasValue()) || this.demandes.length < 1) return;
    this.spinner = true;
    let demande_ids = [];
    // this.demandes.forEach(e => {
    //   if (!e.is_light || selected.includes(e)) {
    //     demande_ids.push(e.id);
    //   }
    // });
    selected.map(e => demande_ids.push(e.id))

    let data = {
      facture_id: this.bill.id,
      demande_ids: demande_ids
    }
    console.log('regenerateFacture');
    console.log(data);

    this.store.dispatch(FactureActions.regenerateAffretementFacture({data}));
    this. billSubscription = this.bill$.subscribe(
      (res) =>{

        if(res.regenerateState == FactureStateEnum.SUCCESS) {
          this.dialogRef.close();
        }

        if(res.regenerateState == FactureStateEnum.SUCCESS  || res.regenerateState == FactureStateEnum.ERROR) {
          this.spinner = false
        }

      }
    )
  }

  ngOnDestroy() {
    this.billSubscription?.unsubscribe();

  }

}
