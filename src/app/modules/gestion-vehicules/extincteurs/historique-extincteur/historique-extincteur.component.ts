import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-historique-extincteur',
  templateUrl: './historique-extincteur.component.html',
  styleUrls: ['./historique-extincteur.component.css']
})
export class HistoriqueExtincteurComponent implements OnInit {

  extincteurs :any = [];
  inputsFiler = [
    {
      name: 'de_date_achat',
      placeholder: 'Date d\'achat : Du',
      type: 'date'
    },
    {
      name: 'a_date_achat',
      placeholder: 'Date d\'achat : Au',
      type: 'date'
    },
  ];

  filtrer($event){
    // this.spinner = true;
    console.log("FILTER HISTORIQUE EXTINCTEUR", $event)
    // this.datafilter = $event;
    // this.extincteurService.getExtincteur($event).subscribe((data) => {
    //   this.spinner = false;
    //     console.log('data retourné ', data);
    //     this.extincteurs = data["response"].data;
    //     this.links = data["response"].links;
    // })
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.extincteurs = this.data["item"];
    console.log("extincteurs====>", this.extincteurs)
  }

  exportExcel() {
    console.log("EXPORT")
    const data = [];
        for (var i = 0; i < this.extincteurs.recharges.length; i++) {
          let recharge = this.extincteurs.recharges[i];
          console.log("ASSOCIATION I", recharge)
          let object = {
            Extincteur: this.extincteurs.n_extincteur,
            Date_recharge: this.datepipe.transform(recharge.date_recharge, 'dd/MM/yyy'),
            Prestataire: recharge.prestataire_recharge?.name,
            Montant: this.formatNumber(recharge.montant_recharge) + " DH",
            Motif : recharge.motif,
            Description : recharge.description,

          };
          console.log("OBJECT", object)
          data.push(object);
        }
        console.log('data', data);
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const wb: XLSX.WorkBook = {
          Sheets: { data: ws },
          SheetNames: ['data'],
        };
        const excelBuffer: any = XLSX.write(wb, {
          bookType: 'xlsx',
          type: 'array',
        });
        this.saveExcelFile(excelBuffer, 'historique_extincteurs');
  }

  saveExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  formatNumber(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

}
