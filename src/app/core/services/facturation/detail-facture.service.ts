import { Injectable } from '@angular/core';
import { Document } from 'app/core/models/facturation/document.model';
import { ExpeditionItem } from 'app/core/models/facturation/expedition-item.model';
import { Expedition } from 'app/core/models/facturation/expedition.model';
import { Item } from 'app/core/models/facturation/item.model';
import { TarifDetail } from 'app/core/models/facturation/tarif-detail.model';

@Injectable({
  providedIn: 'root'
})
export class DetailFactureService {

  constructor() { }

  groupDocumentsByType(documents: Document[]): { [type: string]: { count: number, documents: Document[] } } {
    const documentsByType: { [type: string]: { count: number, documents: Document[] } } = {};

    documents.forEach((document: Document) => {
      const type = document.type;
      if (!documentsByType[type]) {
        documentsByType[type] = {
          count: 0,
          documents: []
        };
      }
      documentsByType[type].count++;
      documentsByType[type].documents.push(document);
    });

    return documentsByType;
  }

  getDocumentsByTypeCount(documents: Document[], type: string): number {
    const groupedDocuments = this.groupDocumentsByType(documents);
    return groupedDocuments[type].count;
  }


  sumExpeditionItemsProperties(expeditionItems: ExpeditionItem[]): { number: number, weight: number, declared_value: number } {
  let sumNumber = 0;
  let sumWeight = 0;
  let sumDeclaredValue = 0;

  expeditionItems.forEach((item: ExpeditionItem) => {
    sumNumber += item.number;
    sumWeight += parseFloat(item.weight);
    sumDeclaredValue += parseFloat(item.declared_value);
  });

  return { number: sumNumber, weight: sumWeight, declared_value: sumDeclaredValue };
}

 sumAmounts(items: any): number {
    const funds = JSON.parse(items);
    let sum = 0;

    funds.forEach((item: Item) => {
      sum += parseFloat(item.amount);
    });

    return sum;
  }


 sumTarifDetails(expeditionTarifDetails: TarifDetail[]): { ht: number; tva: number; ttc: number; htTotal: number; ttcTotal: number } {
    let sumHt = 0;
    let sumTva = 0;
    let sumTtc = 0;
    let amountHt = 0
    let amountTtc = 0;

    expeditionTarifDetails.forEach((detail: TarifDetail) => {
      amountHt += parseFloat(detail.ht);
      amountTtc += parseFloat(detail.ttc);
      if (detail.service !== "TRANSPORT") {
        sumHt += parseFloat(detail.ht);
        sumTva += parseFloat(detail.tva);
        sumTtc += parseFloat(detail.ttc);
      }
    });

    return { ht: sumHt, tva: sumTva, ttc:sumTtc, htTotal:amountHt, ttcTotal: amountTtc };
  }
  sumTotalTarifDetails(expeditions: Expedition[]): { ht: number; tva: number; ttc: number } {
    let sumHt = 0;
    let sumTva = 0;
    let sumTtc = 0;

    expeditions.forEach((expedition: Expedition) => {
      let sumTarifDetails = this.sumTarifDetails(expedition?.expedition_tarif_details);
        sumHt += sumTarifDetails.ht;
        sumTva += sumTarifDetails.tva;
        sumTtc += sumTarifDetails.ttc;
    });

    return { ht: sumHt, tva: sumTva, ttc: sumTtc };
  }

  getTransportTarifs(expeditionTarifDetails: TarifDetail[]): { ht: number; tva: number; ttc: number }{
    let transHt = 0;
    let transTva = 0;
    let transTtc = 0;
    expeditionTarifDetails.forEach((detail: TarifDetail) => {
      if (detail.service == "TRANSPORT" || detail.service == "TRANSPORT RETOUR" ) {
        transHt += parseFloat(detail.ht);
        transTva += parseFloat(detail.tva);
        transTtc += parseFloat(detail.ttc);
      }
    });

    return { ht: transHt, tva: transTva, ttc: transTtc };
  }

  getTotalTransportTarifs(expeditions: Expedition[]): { ht: number; tva: number; ttc: number }{
    let transHt = 0;
    let transTva = 0;
    let transTtc = 0;

    expeditions.forEach((expedition: Expedition) => {
      let transportTarifs = this.getTransportTarifs(expedition?.expedition_tarif_details);
      transHt += transportTarifs.ht;
      transTva += transportTarifs.tva;
      transTtc += transportTarifs.ttc;
    });

    return { ht: transHt, tva: transTva, ttc: transTtc };
  }

  calculateSumOfHT(services: any[]): number {
    let sum = 0;
    for (const service of services) {
      const htValue = parseFloat(service.ht);
      sum += isNaN(htValue) ? 0 : htValue;
    }
    return sum;
  }

  calculateSum(objects: any[], element: any): number {
    let sum = 0;
    for (const item of objects) {
      const value = parseFloat(item[element]?.nbr_palette);
      sum += isNaN(value) ? 0 : value;
    }
    return sum;
  }

  
  calculateSumOfTarifs(demandes: any[]): any {
    let sum = { ht: 0, ttc: 0, tva_service: 0, tva_transport: 0 };

    for (const entry of demandes) {
      sum.ht += parseFloat(entry.tarifs.ht) || 0;
      sum.ttc += parseFloat(entry.tarifs.ttc) || 0;
      sum.tva_service += parseFloat(entry.tarifs.tva_service) || 0;
      sum.tva_transport += parseFloat(entry.tarifs.tva_transport) || 0;
    }
    return sum;
  }
}
