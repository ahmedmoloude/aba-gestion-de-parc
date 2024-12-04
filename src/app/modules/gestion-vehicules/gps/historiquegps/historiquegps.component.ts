import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-historiquegps',
  templateUrl: './historiquegps.component.html',
  styleUrls: ['./historiquegps.component.css']
})
export class HistoriquegpsComponent implements OnInit {

  gps :any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.gps = this.data["item"];
    console.log("GPS====>", this.gps)
  }

  exportExcel() {
    console.log("EXPORT")
    const data = [];
    // this.vehiculeService.getGps(this.export.value, -1).subscribe(
    //   (res:any) => {
    //     console.log("data conducteur", res)
    //     gps = res.response;
        for (var i = 0; i < this.gps.associations.length; i++) {
          let association = this.gps.associations[i];
          console.log("ASSOCIATION I", association)
          let object = {
            IMEI: this.gps.imei_gps,
            Date_acquisition: this.datepipe.transform(this.gps.date_acquisition_gps, 'dd/MM/yyy'),
            Prestataire: this.gps.prestataire?.name,
            Montant: this.formatNumber(this.gps.montant),
            Véhicule : association.vehicule?.matricule,
            Statut : association.statut,
            Date : this.datepipe.transform(association.date_association, 'dd/MM/yyy'),
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
        this.saveExcelFile(excelBuffer, 'historique_gps');
      // }
    // );
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
