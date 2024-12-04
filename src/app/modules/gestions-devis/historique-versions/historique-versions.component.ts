import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Config } from 'app/config';
import { BoQuoteService } from 'app/core/services/admin-bo/bo-quotes.service';
import { ToastService } from 'app/services';

@Component({
  selector: 'app-historique-versions',
  templateUrl: './historique-versions.component.html',
  styleUrls: ['./historique-versions.component.css'],
})
export class HistoriqueVersionsComponent implements OnInit {
  headerColumuns = ['Version', "Date d'activation", "Date d'expiration", "Auteur du refus", "Date du refus", "Motif du refus", "Statut", 'Pdf', 'Adv'];
  page: number = 1;
  validations = [];
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<HistoriqueVersionsComponent>,
    private boQuoteService: BoQuoteService,
    private _toast: ToastService
  ) { }

  ngOnInit(): void {
    this.validations = this.dialogData.quote.last_version[0].workflow.sort((a, b) => a.niveau - b.niveau)
  }

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
