import { selectEnvprestatairePayload, selectEnvprestataireIsLoading } from './../../../core/store/prestataire/prestataire.selectors';
import { AppState } from 'app/core/store/app.states';
import { Store } from '@ngrx/store';
import { AddPrestataireComponent } from './add-prestataire/add-prestataire.component';
import Swal from 'sweetalert2';
import { ToastService } from 'app/core';
import { Router } from '@angular/router';
import { VehiculeService } from './../../../core/services/vehicule.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { deleteprestataire } from 'app/core/store/prestataire/prestataire.actions';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-parametre-prestataire',
  templateUrl: './parametre-prestataire.component.html',
  styleUrls: ['./parametre-prestataire.component.css']
})
export class ParametrePrestataireComponent implements OnInit {

  data :any = [];
  gps :any = [];
  visites :any = [];
  assurances :any = [];
  contrats :any = [];
  achat_extincteurs :any = [];
  recharge_extincteurs :any = [];
  locations : any = [];
  leasings : any =[];
  citernes : any =[];
  cartes : any =[];
  links: any = [];
  fuel_suppliers : any =[];

  spinner: boolean;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private vehiculeService: VehiculeService,
    private _router: Router,
    public datepipe: DatePipe,
    private _toast: ToastService,
    public permissionService: PermissionService ) {}

  ngOnInit(): void {

    this.store.select(selectEnvprestatairePayload).subscribe((res) => {
      console.log(' prestatires ========>', res);
      this.data = res;
      this.gps = this.data.filter(d => d.type == 'GPS')
      console.log('gps', this.gps);
      this.visites = this.data.filter(d => d.type == 'VISITE')
      console.log('VISITE', this.visites);
      this.assurances = this.data.filter(d => d.type == 'ASSURANCE')
      console.log('ASSURANCE', this.assurances);
      this.contrats = this.data.filter(d => d.type == 'CONTRAT')
      console.log('CONTRAT', this.contrats);
      this.achat_extincteurs = this.data.filter(d => d.type == 'ACHAT_EXTINCTEUR')
      console.log('ACHAT_EXTINCTEUR', this.achat_extincteurs);
      this.recharge_extincteurs = this.data.filter(d => d.type == 'RECHARGE_EXTINCTEUR')
      console.log('RECHARGE_EXTINCTEUR', this.recharge_extincteurs);
      this.locations = this.data.filter(d => d.type == 'LOCATION')
      console.log('SOCIETE_LOCATION', this.locations);
      this.leasings = this.data.filter(d => d.type == 'LEASING')
      console.log('SOCIETE_LEASING', this.leasings);
      this.citernes = this.data.filter(d => d.type == 'CITERNE')
      console.log('CITERNE', this.citernes);
      this.cartes = this.data.filter(d => d.type == 'CARTE')
      console.log('CARTE', this.cartes);
      this.fuel_suppliers = this.data.filter(d => d.type == 'FUEL')
    });

    this.store.select(selectEnvprestataireIsLoading).subscribe((res) => {
      console.log(' spinner ========>', res);
      this.spinner = res;
    });
  }

  addDialog(type, mode="add", item): void {
    const dialogRef = this.dialog.open(AddPrestataireComponent, {
      disableClose: true,
      width: '500',
      data: { type, mode, item },
    });
  }

  exportExcel( type = null ){
    const data = [];
    var prestataires = []

    this.store.select(selectEnvprestatairePayload).subscribe((res) => {
      console.log(' prestatires ========>', res);
      if(type){
        prestataires = res.filter(d => d.type == type)
        console.log('prestataires', prestataires);
      }else{
        prestataires = res;
        console.log('prestataires', prestataires);
      }

      for (var i = 0; i < prestataires.length; i++) {
        let prestataire = prestataires[i];
        // console.log("DATE FORMAT ", this.datepipe.transform(vehicule.created_at, 'yyyy-MM-dd'))
        let object = {
          Date_création: this.datepipe.transform(prestataire.created_at, 'dd/MM/yyy'),
          Nom: prestataire.name,
          Type: prestataire.type,
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
      this.saveExcelFile(excelBuffer, 'prestataires');
    });
  }

  saveExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  delet(uuid){
    console.log("UUID", uuid)
    Swal.fire({
      title: "Êtes-vous sûr(e) de vouloir supprimer le prestataire ?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(deleteprestataire({ uuid }));
      } else {
      }
    });
  }

  detailsDoc(type) {
    this._router.navigate([`listprestataire/${type}`]);
  }
}
