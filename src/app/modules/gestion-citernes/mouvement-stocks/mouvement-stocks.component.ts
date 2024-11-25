import { HistoriqueDialogComponent } from './historique-dialog/historique-dialog.component';
import { JaugeageDialogComponent } from './jaugeage-dialog/jaugeage-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectEnvciternePayload } from 'app/core/store/citerne/citerne.selectors';
import { VehiculeService } from 'app/core/services/vehicule.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-mouvement-stocks',
  templateUrl: './mouvement-stocks.component.html',
  styleUrls: ['./mouvement-stocks.component.css'],
})
export class MouvementStocksComponent implements OnInit {
  headerColumuns = ['Date', 'Crée par', 'Qté rajoutée (L)', 'Compteur (L)', 'Nom de citerne', 'montant' , 'fournisseur' , 'immatriculation' , 'chauffeur du fournisseur', 'PJ'  ];
  headerConsommation = ['Date', 'Crée par', 'Qte consommée (L)', 'Véhicule', 'Tonnage (T)', 'Consommation réelle (%)', 'Consommation théorique (%)'];
  uuid :any;
  citerne:any;
  alimentations:any;
  consommations:any;
  mouvements:any;
  linksALi:any;
  linksConso:any;
  spinnerAli : boolean =false;
  spinnerConso : boolean =false;
  spinnerCiterne : boolean =false;
  url = environment.STORAGE + '/details_citerne/';
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

  constructor(public dialog: MatDialog,
    private store: Store<AppState>,
    private vehiculeService : VehiculeService,
    public datepipe: DatePipe,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.uuid = this.route.snapshot.params.uuid;
    console.log("uuid", this.uuid);
    // this.spinnerAli = true;
    // this.spinnerConso = true;
    this.spinnerCiterne = true;
    this.vehiculeService.getCiterneByuuid(this.uuid).subscribe((res:any)=>{
      console.log("data citerne", res.response)
      this.citerne = res.response
      this.spinnerCiterne=false
      this.mouvements = this.citerne.mouvements;
      console.log("MOUVEMENTS ", this.mouvements);
      this.alimentations = this.mouvements.filter(m => m.type == 'ALIMENTATION')
      console.log('alimentations', this.alimentations);
      this.consommations = this.mouvements.filter(m => m.type == 'CONSOMMATION')
      console.log('consommations', this.consommations);
      // this.vehiculeService.getMouvement('ALIMENTATION', this.citerne.id).subscribe(
      //   (data) => {
      //     this.alimentations = data['response'].data;
      //     this.linksALi = data['response'].links;
      //     console.log('alimentations', this.alimentations);
      //     this.spinnerAli = false
      //   },
      //   (error) => {
      //     console.log('error', error);
      // });

      // this.vehiculeService.getMouvement('CONSOMMATION', this.citerne.id).subscribe(
      //   (data) => {
      //     this.consommations = data['response'].data;
      //     this.linksConso = data['response'].links;
      //     console.log('consommations', this.consommations);
      //     this.spinnerConso = false
      //   },
      //   (error) => {
      //     console.log('error', error);
      // });

    })
  }

  filter_consommation($event){
    $event["type"] = 'CONSOMMATION'
    $event["citerne_id"] = this.citerne.id
    this.spinnerConso = true;
    console.log("FILTER CONSOMMATION", $event)
    // this.datafilter = $event
    this.vehiculeService.getMouvement($event).subscribe((data) => {
      this.spinnerConso = false;
      console.log('data retourné ', data);
      this.consommations = data["response"].data;
      this.linksConso = data["response"].links;
    })
  }

  filter_alimentation($event){
    $event["type"] = 'ALIMENTATION'
    $event["citerne_id"] = this.citerne.id
    this.spinnerAli = true;
    console.log("FILTER CONSOMMATION", $event)
    // this.datafilter = $event
    this.vehiculeService.getMouvement($event).subscribe((data) => {
      this.spinnerAli = false;
      console.log('data retourné ', data);
      this.alimentations = data["response"].data;
      this.linksALi = data["response"].links;
    })
  }

  getTheNextAli(event){
    this.spinnerAli = true
    this.vehiculeService.getMouvement(null, event).subscribe((res:any)=>{
      console.log("data", res.response.data)
    this.alimentations = res.response.data
    this.linksALi = res.response.links
    this.spinnerAli = false
  })
  }

  getTheNextCons(event){
    this.spinnerConso = true
    this.vehiculeService.getMouvement(null, event).subscribe((res:any)=>{
      console.log("data", res.response.data)
    this.consommations = res.response.data
    this.linksConso = res.response.links
    this.spinnerConso = false
  })
  }

  jaugeage(id): void {
    const dialogRef = this.dialog.open(JaugeageDialogComponent, {
      width: '411px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log('get apres create jaugeage', data);
        this.citerne.jaugeages.unshift(data)
      }
    });
  }

  hostoriquejaugeage(item): void {
    this.dialog.open(HistoriqueDialogComponent, {
      disableClose: true,
      width: '741px',
      height: '100vh',
      data: { item },
      position: { right: '0px' },
    });
  }

  exportExcelConsommation(){
    console.log("EXPORT")
    const data = [];
    for (var i = 0; i < this.consommations.length; i++) {
      let consommation = this.consommations[i];
      console.log("consommation I", consommation)
      let object = {
        Date: this.datepipe.transform(consommation.created_at, 'dd/MM/yyy'),
        Crée_par: consommation.user?.name,
        Quantité: consommation.quantite + "L",
        Véhicule: consommation.truck?.matricule,
        Tonnage: consommation.truck?.tonnage?.name,
        Consommation_réelle: consommation.truck?.taux_consommation_reel + "L",
        Consommation_théorique: consommation.truck?.taux_consommation_theorique + "L",
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
        Crée_par: alimentation.user?.name,
        Quantité: alimentation.quantite + "L",
        Compteur: alimentation.compteur + "L",
        Citerne: this.citerne.name,
        Montant: (+(alimentation.montant))?.toFixed(2),
        Fournisseur: alimentation.supplier_driver?.name || '---' ,
        Immatriculation: (alimentation.carNumberPart1&&alimentation.carNumberPart2&&alimentation.carNumberPart3)?`${alimentation.carNumberPart1} ${alimentation.carNumberPart2} ${alimentation.carNumberPart3}`:'---',
        'Chauffeur du fournisseur': (alimentation.supplier_driver&&alimentation.supplier_driver_cin)?alimentation.supplier_driver + ' - ' + alimentation.supplier_driver_cin:'---'
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
