import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Config } from 'app/config';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css']
})
export class TimeLineComponent implements OnInit {
  headerColumuns = ['Version', "Date d'activation", "Date d'expiration", "Auteur du refus", "Date du refus", "Motif du refus", "Statut", 'Pdf', 'Adv'];
  page: number = 1;
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<TimeLineComponent>,
  ) { }

  ngOnInit(): void { }

  showQuoteGridDetails(quoteUuid: any): void {
    window.open("tree-quote/details/" + quoteUuid, '_blank');
  }

  downloadOffer(id: number): void {
    window.open(Config.api.quotes.download_quote + '/' + id, '_blank');
    // this.boQuoteService.downloadQuotePdf(id).subscribe((res: any) => {
    //   var blob = new Blob([res], { type: 'application/pdf' });
    //   var url = window.URL.createObjectURL(blob);
    //   const link = document.createElement('a');
    //   link.href = url; link.target = '_blank'; link.click();
    // }, e => this._toast.error("Devis pdf introuvable !"));
  }

}
