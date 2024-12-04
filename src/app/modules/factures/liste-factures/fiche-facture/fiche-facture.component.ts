import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Config } from 'app/config';
import { Facture } from 'app/core/models/facturation/facture.model';

@Component({
  selector: 'app-fiche-facture',
  templateUrl: './fiche-facture.component.html',
  styleUrls: ['./fiche-facture.component.css']
})
export class FicheFactureComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Facture,
              public dialogRef: MatDialogRef<FicheFactureComponent>) { }

  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  pdfDetail: string;
  pdfglobal: string;
  facture = this.data;
  ngOnInit(): void {
    const url: string = Config.api.bill.printBill;
    const file: {
      detaillee: string | null,
      globale: string | null,
      detaillee_remise: string | null,
      globale_remise: string | null} = this.facture?.file;
    const detailUrl = (file?.detaillee_remise)? file.detaillee_remise : file?.detaillee;
    this.pdfDetail = url +  detailUrl;
    const globalUrl = (file?.globale_remise) ? file.globale_remise : file?.globale;
    this.pdfglobal = url + globalUrl;

    console.log('global');
    console.log(this.pdfglobal);
    console.log(this.pdfDetail);

  }

  openPdf(filePath){
    window.open(filePath, '_blank');
  }

}
