import { HistoriquegpsComponent } from './historiquegps/historiquegps.component';
import { AssociationGpsComponent } from './association-gps/association-gps.component';
import Swal from 'sweetalert2';
import { ToastService } from 'app/core';
import { Router } from '@angular/router';
import { VehiculeService } from './../../../core/services/vehicule.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddGpsComponent } from 'app/modules/parametre/parametre-gps/add-gps/add-gps.component';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RessouresService } from 'app/core/services/ressoures.service';
import { selectEnvprestatairePayload } from 'app/core/store/prestataire/prestataire.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.css'],
})
export class GpsComponent implements OnInit {
  gps :any = [];
  links: any = [];
  spinner: boolean;
  export: FormGroup;
  start_time: any;
  end_time: any;
  vehicules : any
  prestataires : any
  datafilter : any;
  inputsFiler = [
    {
      name: 'imei_gps',
      placeholder: 'IMEI',
      type: 'text',
    },
    {
      name: 'de_date_acquisition_gps',
      placeholder: 'Date d\'acquisition : Du',
      type: 'date'
    },
    {
      name: 'a_date_acquisition_gps',
      placeholder: 'Date d\'acquisition : Au',
      type: 'date'
    },
    {
      name: 'prestataire_id',
      placeholder: 'Prestataire',
      type: 'select',
      options: []
    },
    {
      name: 'sonde',
      placeholder: 'Sonde',
      type: 'select',
      options: [
        {
          text: 'Avec sonde',
          value: true,
        },
        {
          text: 'Sans sonde',
          value: false,
        },
      ]
    },
    {
      name: 'vehicule_id',
      placeholder: 'Code Véhicule',
      type: 'select',
      options: []
    },
    {
      name: 'matricule',
      placeholder: 'Immatriculation',
      type: 'text',
    },
  ];

   constructor(
            public dialog: MatDialog,
            private vehiculeService: VehiculeService,
            public route: Router,
            private ressourceService: RessouresService,
            private store: Store<AppState>,
            private _toast: ToastService,
            public datepipe: DatePipe
  ) {}

  filtrer($event){
    this.spinner = true;
    console.log("FILTER GPS", $event)
    this.datafilter = $event;
    this.vehiculeService.getGps($event).subscribe((data) => {
      this.spinner = false;
        console.log('data retourné ', data);
        this.gps = data['response'].data;
        this.links = data['response'].links;
        this.spinner = false;
    })
  }

  ngOnInit(): void {
    this.export = new FormGroup({
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
    });

    this.spinner = true;
    this.vehiculeService.getGps().subscribe(
      (data) => {
        console.log("data", data)
        this.gps = data['response'].data;
        this.links = data['response'].links;
        console.log('gps', this.gps);
        this.spinner = false;
      },
      (error) => {
        console.log('error', error);
      });

      this.ressourceService.getTrucks().subscribe(
        (data:any) => {
          console.log("data vehicule", data.response)
          this.vehicules = data.response;
          for(var i=0; i<this.vehicules.length; i++){
            this.inputsFiler["5"].options.push({
              'text' : this.vehicules[i].matricule,
              'value' : this.vehicules[i].id,
            })
          }
        }
      );

      this.store.select(selectEnvprestatairePayload).subscribe((res) => {
        console.log(' prestatires ========>', res);
        this.prestataires = res.filter(d => d.type == 'GPS')
        for(var i=0; i<this.prestataires.length; i++){
          this.inputsFiler["3"].options.push({
            'text' : this.prestataires[i].name,
            'value' : this.prestataires[i].id,
          })
        }
      });
  }

  setDateDebut(e) {
    console.log("DATE DEBUT", e.target.value)
    this.start_time = e.target.value;
  }

  setDateFin(e) {
    console.log("DATE FIN", e.target.value)
    this.end_time = e.target.value;
  }

  openDialogAdd(type, item): void {
    const dialogRef = this.dialog.open(AddGpsComponent, {
      disableClose: true,
      width: '562px',
      data: { type, item },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.gps.unshift(data);
      }
    });
  }

  formatNumber(value) {
    // console.log("value", value)
    // console.log("123456789".toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "))
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  AssociationGps(item): void {
    const dialogRef = this.dialog.open(AssociationGpsComponent, {
      width: '662px',
      data: { item },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.spinner = true;
        this.vehiculeService.getGps().subscribe(
          (data) => {
            console.log("data", data)
            this.gps = data['response'].data;
            this.links = data['response'].links;
            console.log('gps', this.gps);
            this.spinner = false;
          },
          (error) => {
            console.log('error', error);
          });
      }
    });
  }

  Voirhistorique(item) {
    this.dialog.open(HistoriquegpsComponent, {
      disableClose: true,
      width: '782px',
      height: '100vh',
      data: { item },
      position: { right: '0px' },
    });
  }

  exportExcel() {
    const data = [];
    var gps = []
    this.vehiculeService.getGps(this.datafilter, -1).subscribe(
      (res:any) => {
        console.log("data GPS", res)
        gps = res.response;
        for (var i = 0; i < gps.length; i++) {
          let g = gps[i];
          let object = {
            IMEI: g.imei_gps,
            Status:g.status,
            Date_acquisition: this.datepipe.transform(g.date_acquisition_gps, 'dd/MM/yyy'),
            DMS: this.datepipe.transform(g.date_mise_en_service, 'dd/MM/yyy'),
            Prestataire: g.prestataire?.name,
            Sonde: g.sonde == false ? "Sans sonde" : "Avec sonde",
            Montant: this.formatNumber(g.montant),
            Code_véhicule: g.last_association?.vehicule?.code_interne,
            Immatriculation: g.last_association?.vehicule?.matricule,
            Date_association: g.last_association?.date_association,
          };
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
        this.saveExcelFile(excelBuffer, 'gps');
      }
    );
  }

  saveExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs.saveAs(data, fileName + EXCEL_EXTENSION);
  }
}
