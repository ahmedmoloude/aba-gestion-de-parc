import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Facture } from 'app/core/models/facturation/facture.model';
import { DetailFactureService } from 'app/core/services/facturation/detail-facture.service';

@Component({
  selector: 'app-affretement-etat-control',
  templateUrl: './affretement-etat-control.component.html',
  styleUrls: ['./affretement-etat-control.component.css']
})
export class AffretementEtatControlComponent implements OnInit {

  headerColumuns = ['Date', 'N° demande', 'Port', 'Expéditeur', 'Destinataire','Destination', 'Palettes', 'Poids', 'HT'];

  p: number = 1;

  visibles: any = [];
  ReadMore: boolean = true;
  visible: boolean = false;

  factures= this.data;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Facture[],
             public dialogRef: MatDialogRef<AffretementEtatControlComponent>,
             private detailFactureService: DetailFactureService) {}

  ngOnInit(): void {
    console.log(this.factures);
    // this.calculateAmounts(this.factures);

  }

  amounts: Amounts ={ht: 0, ttc: 0, tva_service: 0, tva_transport: 0 };
  calculateSumOfHT(services){
    return this.detailFactureService.calculateSumOfHT(services);
  }

  calculateSumOfTarifs(tarifs: any[]){
    this.amounts = this.detailFactureService.calculateSumOfTarifs(tarifs);
    return this.amounts;
  }

  calculateSum(services,element){
    return this.detailFactureService.calculateSum(services,element);

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

class Amounts {ht: number; ttc: number; tva_service: number; tva_transport: number; }
