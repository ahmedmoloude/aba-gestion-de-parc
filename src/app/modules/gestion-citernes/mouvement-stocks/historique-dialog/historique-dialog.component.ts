import { Component, OnInit } from '@angular/core';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { ToastService } from 'app/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-historique-dialog',
  templateUrl: './historique-dialog.component.html',
  styleUrls: ['./historique-dialog.component.css'],
})
export class HistoriqueDialogComponent implements OnInit {
  headerColumuns = [
    'Date de jaugeage',
    'Stock théorique',
    'Qté réel',
    'Ecart',
    'Nom de pompiste',
  ];
  inputsFiler = [
    {
      name: 'de_created_at',
      placeholder: 'De',
      type: 'date',
    },
    {
      name: 'a_created_at',
      placeholder: 'A',
      type: 'date',
    },
  ];
  id : any;
  jaugeages : any;
  spinner : boolean = false;

  constructor(public vehiculeService : VehiculeService,
              private _toast: ToastService,
              public datepipe: DatePipe,
              @Inject(MAT_DIALOG_DATA) public data: any,) {}

  ngOnInit(): void {
    this.jaugeages = this.data["item"];
    console.log("data get recharge", this.jaugeages);
  }

  filter($event){
    console.log("FILTER CONTACT", $event)
  }

  exportExcel() {
    console.log("EXPORT")
    const data = [];
        for (var i = 0; i < this.jaugeages.length; i++) {
          let jougeage = this.jaugeages[i];
          console.log("jougeage I", jougeage)
          let object = {
            Date_jaugeage: this.datepipe.transform(jougeage.date, 'dd/MM/yyy'),
            Stock_théorique: this.formatNumber(jougeage.quantite - jougeage.ecart),
            Qté_réel: this.formatNumber(jougeage.quantite),
            Ecart: this.formatNumber(jougeage.ecart),
            Nom_pompiste : jougeage.user?.name,
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
        this.saveExcelFile(excelBuffer, 'historique_jaugeage');
  }

  saveExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  formatNumber(value) {
    return value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, " ") || '';
  }

}
