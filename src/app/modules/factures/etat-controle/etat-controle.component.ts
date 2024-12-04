import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Facture } from 'app/core/models/facturation/facture.model';
import { ExpeditionItem } from 'app/core/models/facturation/expedition-item.model';
import { TarifDetail } from 'app/core/models/facturation/tarif-detail.model';
import { DetailFactureService } from 'app/core/services/facturation/detail-facture.service';

@Component({
  selector: 'app-etat-controle',
  templateUrl: './etat-controle.component.html',
  styleUrls: ['./etat-controle.component.css'],
})
export class EtatControleComponent implements OnInit {

  headerColumuns = ['Date', 'N° d’expédition', 'N° déc', 'Port', 'Expéditeur', 'Destinataire','Destination', 'Colis', 'Poids', 'HT'];

  p: number = 1;

  visibles: any = [];
  ReadMore: boolean = true;
  visible: boolean = false;

  factures= this.data;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Facture[],
             public dialogRef: MatDialogRef<EtatControleComponent>,
             private detailFactureService: DetailFactureService) {}

  ngOnInit(): void {
    console.log(this.factures);
    this.calculateAmounts(this.factures);
  }

  facturesAmounts: FactureAmounts[] =[];
  calculateAmounts(factures: Facture[]){
    for (const facture of factures) {
    let factureAmounts: FactureAmounts = new FactureAmounts();
     let count_colis = 0;

     factureAmounts.expeditions =[]
      for (const expedition of facture.expeditions) {

        let ItemsProperties = this.detailFactureService.sumExpeditionItemsProperties(expedition?.expedition_items);
        let tarifs = this.detailFactureService.sumTarifDetails(expedition?.expedition_tarif_details);
        count_colis += ItemsProperties?.number;

        factureAmounts.expeditions.push({ItemsProperties:ItemsProperties,tarifs:tarifs});
      }

      factureAmounts.totalTarifDetails = this.detailFactureService.sumTotalTarifDetails(facture?.expeditions);
      factureAmounts.totalTransportTarifs = this.detailFactureService.getTotalTransportTarifs(facture?.expeditions);
      factureAmounts.count_colis = facture.count_colis ? facture.count_colis : count_colis;
      factureAmounts.count_expedition = facture.count_expedition ? facture.count_expedition : facture?.expeditions?.length;

      this.facturesAmounts.push(factureAmounts);
      console.log(factureAmounts);

    }
  }


  isVisible(index) {
    let founded = this.visibles.find((i) => i.index == index);
    return founded ? founded.visible : false;
  }

  onclick(index) {
    if (!this.visibles.find((i) => i.index == index)) {
      this.visibles.push({
        index,
        visible: true,
      });
    } else {
      this.visibles.find((i) => i.index == index).visible = !this.visibles.find(
        (i) => i.index == index
      ).visible;
    }
  }

}

class FactureAmounts {
  expeditions: Array<{
    ItemsProperties: { number: number, weight: number, declared_value: number },
    tarifs: { ht: number; tva: number; ttc: number; htTotal: number; ttcTotal: number }
   }>;
  totalTarifDetails: { ht: number; tva: number; ttc: number };
  totalTransportTarifs: { ht: number; tva: number; ttc: number };
  count_colis: number;
  count_expedition: number;
}
