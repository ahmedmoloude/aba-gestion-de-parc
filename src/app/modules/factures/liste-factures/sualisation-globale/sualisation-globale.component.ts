import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { FactureState } from 'app/core/store/facturation/facture/facture.reducer';
import * as FactureActions from 'app/core/store/facturation/facture/facture.actions';
import { Observable, Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DetailFactureService } from 'app/core/services/facturation/detail-facture.service';
import { Expedition } from 'app/core/models/facturation/expedition.model';
import { ServiceAmountsSum } from '../affretement-global-facture/affretement-global-facture.component';


@Component({
  selector: 'app-sualisation-globale',
  templateUrl: './sualisation-globale.component.html',
  styleUrls: ['./sualisation-globale.component.css']
})
export class SualisationGlobaleComponent implements OnInit {
  ReadMore:boolean = true;
  visible:boolean = false;
  bill$:Observable<FactureState> = this.store.select(state => state.facture);
  billSubscription: Subscription;
  uuid!: string;
  totalTarifDetails: { ht: number; tva: number; ttc: number};
  totalTransportTarifs: { ht: number; tva: number; ttc: number};
  rubricsObject = {
    'TRANSPORT': 'Transport',
    'BL': 'Bon de livraison ',
    'FACTURE': 'Facture',
    'REMBOURSEMENT': 'C/Remboursement',
    'TRAITE': 'C/Traite',
    'CHEQUE': 'C/chèque',
    'ADV': 'ADV',
    'IMMOBILISATION': 'Immobilisation ',
    'TRANSPALETTE': 'Transpalette',
    'POINT_DECHARGEMENT': 'Point dechargement ',
    'MANUTENTION': 'Manutention',
    'RETOUR_PALEETE': 'Retour palette',
    'DROIT_DE_TIMBRE': 'Droits de timbre',
    'DROIT_FIXE': 'Droit Fixe',
    'DROIT_VARIABLE': 'Droit Variable',
  };
  amountsSumByService: ServiceAmountsSum = {};


  constructor(private store:Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<SualisationGlobaleComponent>,
    private detailFactureService: DetailFactureService) {}

  ngOnInit(): void {
    this.getBill(this.data);
    // this.bill$.subscribe(
    //   (res) =>{
    //     if (res?.facture && res?.dataState =='Success') {
    //       this.totalTarifDetails = this.sumTotalTarifDetails(res?.facture?.expeditions);
    //       this.totalTransportTarifs = this.getTotalTransportTarifs(res?.facture?.expeditions);
    //     }
    //   }
    // )
  }

  getBill(uuid:string){
    this.store.dispatch(FactureActions.loadFactureDetail({data: uuid}));
    this.billSubscription = this.bill$.subscribe(
      (resp) => {
        if (resp?.dataState == 'Success' && resp?.facture ) {
          this.totalTarifDetails = this.sumTotalTarifDetails(resp?.facture?.expeditions);
          this.totalTransportTarifs = this.getTotalTransportTarifs(resp?.facture?.expeditions);
          this.amountsSumByService = this.calculateAmountsSumByService(resp.facture?.expeditions);
        }
      }
    );
  }

  getMTRemise(montant_ht, taux) {
    return parseFloat(montant_ht)*taux;
  }

  onclick() {
    this.ReadMore = !this.ReadMore;
    this.visible = !this.visible
  }

  sumTotalTarifDetails(expeditions: Expedition[]): { ht: number; tva: number; ttc: number } {
    return this.detailFactureService.sumTotalTarifDetails(expeditions);
  }

  getTotalTransportTarifs(expeditions: Expedition[]): { ht: number; tva: number; ttc: number }{
    return this.detailFactureService.getTotalTransportTarifs(expeditions);
  }

  calculateAmountsSumByService(data: any[]): ServiceAmountsSum {
    const amountsSumByService: ServiceAmountsSum = {};

    for (const expedition of data) {
        for (const detail of expedition.expedition_tarif_details) {
            const ht = parseFloat(detail.ht);
            const ttc = parseFloat(detail.ttc);
            if (!isNaN(ht) && !isNaN(ttc)) {
                if (amountsSumByService[detail.service]) {
                    amountsSumByService[detail.service].ht += ht;
                    amountsSumByService[detail.service].ttc += ttc;
                } else {
                    amountsSumByService[detail.service] = { ht, ttc };
                }
            }
        }
    }

    return amountsSumByService;
  }

  ngOnDestroy(): void {
    this.billSubscription?.unsubscribe();
  }

}
