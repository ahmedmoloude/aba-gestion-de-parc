import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import {
  selectEnvExtincteurPayload,
  selectEnvExtincteurIsLoading,
} from 'app/core/store/extincteur/extincteur.selectors';
import Swal from 'sweetalert2';
import { deleteextincteur, fetchextincteurs } from 'app/core/store/extincteur/extincteur.actions';
import { DialogExtincteurComponent } from './dialog-extincteur/dialog-extincteur.component';
import { ExtincteurService } from 'app/core/services/extincteur.service';
import { selectEnvPayloadtypeExtincteur } from 'app/core/store/typeExtincteur/typeExtincteur.selectors';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { RechargeExtincteurComponent } from './recharge-extincteur/recharge-extincteur.component';
import { HistoriqueExtincteurComponent } from './historique-extincteur/historique-extincteur.component';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-extincteurs',
  templateUrl: './extincteurs.component.html',
  styleUrls: ['./extincteurs.component.css'],
})
export class ExtincteursComponent implements OnInit {
  p: number = 1;
  spinner: boolean = false;
  extincteurs: any;
  links: any;
  types : any;
  datafilter : any;
  inputsFiler = [
    {
      name: 'matricule',
      placeholder: 'Code',
      type: 'text',
    },
    {
      name: 'type_id',
      placeholder: 'Type',
      type: 'select',
      options: [],
    },
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
    {
      name: 'date_fin_validite',
      placeholder: 'Date de fin de validité',
      type: 'date',
    },
    {
      name: 'affectee',
      placeholder: 'Affécté à',
      type: 'select',
      options: [
        {
          text: 'CONDUCTEUR',
          value: 'CONDUCTEUR',
        },
        {
          text: 'VEHICULE',
          value: 'VEHICULE',
        },
        {
          text: 'AGENCE',
          value: 'AGENCE',
        },
      ]
    },
  ];

  constructor(
    public dialog: MatDialog,
    private _router: Router,
    private extincteurService : ExtincteurService,
    public datepipe: DatePipe,
    private store: Store<AppState>,
    public permissionService: PermissionService
  ) {}

  filtrer($event){
    this.spinner = true;
    console.log("FILTER RDV", $event)
    this.datafilter = $event;
    this.extincteurService.getExtincteur($event).subscribe((data) => {
      this.spinner = false;
        console.log('data retourné ', data);
        this.extincteurs = data["response"].data;
        this.links = data["response"].links;
    })
  }

  diffrenceDate( end_date){
    // Define the two dates
    const date1 = moment();
    const date2 = moment(end_date);

    // Calculate the date difference in days
    const dateDifferenceInDays = date2.diff(date1, 'days');

    // console.log('Date Difference in Days:', dateDifferenceInDays);
    return (dateDifferenceInDays)
  }

  statut( end_date){
    // Define the two dates
    const date1 = moment();
    const date2 = moment(end_date);

    if(date1 > date2){
      return "Expiré"
    }else{
      return "Non Expiré"
    }

  }

  ngOnInit(): void {
    this.store.dispatch(fetchextincteurs());

    this.store.select(selectEnvExtincteurPayload).subscribe((res) => {
      this.extincteurs = res.data;
      console.log(' extincteurs ========>', this.extincteurs);
      this.links = res.links;
      console.log(' links ========>', this.links);
    });

    this.store.select(selectEnvExtincteurIsLoading).subscribe((res) => {
      this.spinner = res;
      console.log(res);
    });

    this.store.select(selectEnvPayloadtypeExtincteur).subscribe((res) => {
      // console.log(" tonnage========>", res)
      this.types = res
      for(var i=0; i<this.types.length; i++){
        this.inputsFiler["1"].options.push({
          'text' : this.types[i].name,
          'value' : this.types[i].id,
        })
      }
    });
  }

  formatNumber(value) {
    // console.log("value", value)
    // console.log("123456789".toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "))
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  getTheNext(event){
    this.extincteurService.getExtincteur(this.datafilter, event).subscribe((res:any)=>{
      console.log("data", res.response.data)
    this.extincteurs = res.response.data
    this.links = res.response.links
    this.spinner = false
  })
  }

  openDialog(type, item): void {
    this.dialog.open(DialogExtincteurComponent, {
      disableClose: true,
      width: '831px',
      data: { type, item },
    });
  }

  recharger(item): void {
    const dialogRef = this.dialog.open(RechargeExtincteurComponent, {
      disableClose: true,
      width: '831px',
      data: { item },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        // console.log("ITEM", item)
        // console.log("DATA GET", data)
        // console.log("EXTINCTEURS", this.extincteurs)
        // this.extincteurs["last_recharge"] = data
        // this.extincteurs["recharges"].unshift(data);
        // console.log("EXTINCTEURS", this.extincteurs)
        this.spinner = true;
        this.extincteurService.getExtincteur().subscribe((res : any) => {
          console.log("RESPONSE", res)
          this.extincteurs = res.response.data
          this.links = res.response.links
          this.spinner = false;
        })
      }
    });
  }

  openDialogHistorique(item){
    this.dialog.open(HistoriqueExtincteurComponent, {
      disableClose: true,
      width: '782px',
      height: '100vh',
      data: { item },
      position: { right: '0px' },
    });
  }

  deletExtincteur(uuid) {
    console.log('delete');
    console.log(uuid);
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer Extincteur ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(deleteextincteur({ uuid }));
      }
    });
  }

  exportExcel() {
    const data = [];
    var extincteurs = []
    this.extincteurService.getExtincteur(this.datafilter, -1).subscribe(
      (res:any) => {
        console.log("data conducteur", res)
        extincteurs = res.response;
        for (var i = 0; i < extincteurs.length; i++) {
          let extincteur = extincteurs[i];
          let object = {
            Code: extincteur.matricule,
            Numéro: extincteur.n_extincteur,
            Date_achat: this.datepipe.transform(extincteur.date_achat, 'dd/MM/yyy'),
            Date_fin_validité  : this.datepipe.transform(extincteur.date_fin_validite, 'dd/MM/yyy'),
            Date_affectation: this.datepipe.transform(extincteur.date_affectation, 'dd/MM/yyy'),
            Prestataire: extincteur.prestataire_achat?.name,
            Affecté_à: extincteur.affectee,
            Conducteur: extincteur.driver?.first_name + ' ' + extincteur.driver?.last_name,
            Véhicule: extincteur.truck?.matricule,
            Agence: extincteur.agence?.name,
            Montant: this.formatNumber(extincteur.montant),
            Statut : this.statut(extincteur.date_fin_validite),
            Type: extincteur.type?.name,
            Volume: extincteur.volume?.name,

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
        this.saveExcelFile(excelBuffer, 'extincteurs');
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
