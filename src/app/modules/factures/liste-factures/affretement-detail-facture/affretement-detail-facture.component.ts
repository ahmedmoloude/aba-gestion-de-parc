import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { FactureState } from 'app/core/store/facturation/facture/facture.reducer';
import * as FactureActions from 'app/core/store/facturation/facture/facture.actions';
import { Observable } from 'rxjs';
import { Document } from 'app/core/models/facturation/document.model';
import { ExpeditionItem } from 'app/core/models/facturation/expedition-item.model';
import { TarifDetail } from 'app/core/models/facturation/tarif-detail.model';
import { DetailFactureService } from 'app/core/services/facturation/detail-facture.service';

@Component({
  selector: 'app-affretement-detail-facture',
  templateUrl: './affretement-detail-facture.component.html',
  styleUrls: ['./affretement-detail-facture.component.css']
})
export class AffretementDetailFactureComponent implements OnInit {
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
  uuid!: string;


  constructor(private activatedRoute: ActivatedRoute,
              private store:Store<AppState>,
              private detailFactureService: DetailFactureService) {}

  ngOnInit(): void {
    this.uuid = this.activatedRoute.snapshot.params['uuid'];
    console.log(this.uuid);

    this.getBill(this.uuid);
    // this.bill$.subscribe(
    //   (res) =>{
    //     console.log(res);
    //   }
    // )
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



}
