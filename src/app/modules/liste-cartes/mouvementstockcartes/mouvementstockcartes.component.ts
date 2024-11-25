
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectEnvcartePayload } from 'app/core/store/carte/carte.selectors';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { environment } from 'environments/environment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-mouvementstockcartes',
  templateUrl: './mouvementstockcartes.component.html',
  styleUrls: ['./mouvementstockcartes.component.css'],
})
export class MouvementstockcartesComponent implements OnInit {
  headerColumuns = ['Date', 'Montant rajouté', 'Nom de carte', 'Fournisseur', 'Service', 'PJ'];
  headerConsommation = ['Date', 'Qté alimentée', 'Montant consommé', 'Véhicule', 'PJ'];
  uuid :any;
  carte:any;
  alimentations:any;
  consommations:any;
  linksALi:any;
  linksConso:any;
  spinnerAli : boolean =false;
  spinnerConso : boolean =false;
  url = environment.STORAGE + '/depense/';

  constructor(public dialog: MatDialog,
    private store: Store<AppState>, 
    private vehiculeService : VehiculeService,
    public datepipe: DatePipe,
    private route: ActivatedRoute) {}

    ngOnInit(): void {
      this.uuid = this.route.snapshot.params.uuid;
      console.log("uuid", this.uuid);
      this.spinnerAli = true;
      this.spinnerConso = true;
      this.vehiculeService.getCarteByuuid(this.uuid).subscribe((res:any)=>{
        console.log("data", res.response)
        this.carte = res.response
        console.log("id carte", this.carte.id)
        this.vehiculeService.getDepenseById('ALIMENTATION', this.carte.id).subscribe(
          (data) => {
            this.alimentations = data['response'].data;
            this.linksALi = data['response'].links;
            console.log('alimentations', this.alimentations);
            this.spinnerAli = false
          },
          (error) => {
            console.log('error', error);
        });
    
        this.vehiculeService.getDepenseById('CONSOMMATION', this.carte.id).subscribe(
          (data) => {
            this.consommations = data['response'].data;
            this.linksConso = data['response'].links;
            console.log('consommations', this.consommations);
            this.spinnerConso = false
          },
          (error) => {
            console.log('error', error);
        });
      })
    }

    getTheNextAli(link){
      this.spinnerAli = true
      const page = link.url.substr(54)
      console.log("page", page)
      this.vehiculeService.getDepenseById('ALIMENTATION', this.carte.id, page).subscribe((res:any)=>{
        console.log("data", res.response.data)
      this.alimentations = res.response.data
      this.linksALi = res.response.links
      this.spinnerAli = false 
    })
    }
  
    getTheNextCons(link){
      this.spinnerConso = true
      const page = link.url.substr(54)
      console.log("page", page)
      this.vehiculeService.getDepenseById('CONSOMMATION', this.carte.id, page).subscribe((res:any)=>{
        console.log("data", res.response.data)
      this.consommations = res.response.data
      this.linksConso = res.response.links
      this.spinnerConso = false 
    })
    }

    formatNumber(value) {
      // console.log("value", value)
      // console.log("123456789".toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "))
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    exportExcelConsommation(){
      console.log("EXPORT")
      const data = [];
      for (var i = 0; i < this.consommations.length; i++) {
        let consommation = this.consommations[i];
        console.log("consommation I", consommation)
        let object = {
          Date: this.datepipe.transform(consommation.created_at, 'dd/MM/yyy'),
          Quantité: consommation.quantite + " L",
          Montant: this.formatNumber(consommation.montant) + " DH",
          Véhicule: consommation.truck?.matricule,
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
      this.saveExcelFile(excelBuffer, 'consommation');
    }

    exportExcelAlimentation(){
      console.log("EXPORT")
      const data = [];
      for (var i = 0; i < this.alimentations.length; i++) {
        let alimentation = this.alimentations[i];
        console.log("ASSOCIATION I", alimentation)
        let object = {
          Date: this.datepipe.transform(alimentation.created_at, 'dd/MM/yyy'),
          Montant: this.formatNumber(alimentation.montant) + " DH",
          Carte: alimentation.carte?.libelle,
          Fournisseur: alimentation.prestataire?.name,
          Service : alimentation.carte?.service?.name,
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
      this.saveExcelFile(excelBuffer, 'alimentation');
    }

    saveExcelFile(buffer: any, fileName: string): void {
      const EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
  
      const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
      saveAs.saveAs(data, fileName + EXCEL_EXTENSION);
    }

}
