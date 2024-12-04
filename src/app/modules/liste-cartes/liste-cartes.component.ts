import { AffecteDialogComponent } from './affecte-dialog/affecte-dialog.component';
import { RechargerCarteComponent } from './recharger-carte/recharger-carte.component';
import { CartesDialogComponent } from './cartes-dialog/cartes-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'app/core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { VehiculeService } from 'app/core/services/vehicule.service';
import {
  selectEnvcarteIsLoading,
  selectEnvcartePayload,
  selectEnvcarteStatus,
} from 'app/core/store/carte/carte.selectors';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { selectEnvparcPayload } from 'app/core/store/parc/parc.selectors';
import { selectEnvprestatairePayload } from 'app/core/store/prestataire/prestataire.selectors';
import { selectTruckService } from 'app/core/store/resources/resources.selectors';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-liste-cartes',
  templateUrl: './liste-cartes.component.html',
  styleUrls: ['./liste-cartes.component.css'],
})
export class ListeCartesComponent implements OnInit {
  p: number = 1;
  progression: number = 0;
  cartes: any;
  datafilter : any;
  spinner: boolean;
  links: any = [];
  parcs: any = [];
  prestataires: any = [];
  services: any = [];
  inputsFiler = [
    {
      name: 'parc_id',
      placeholder: 'Sous parc',
      type: 'select',
      options: []
    },
    {
      name: 'prestataire_id',
      placeholder: 'Fournisseur',
      type: 'select',
      options: []
    },
    {
      name: 'n_carte',
      placeholder: 'N° carte',
      type: 'text'
    },
    {
      name: 'service_id',
      placeholder: 'Service',
      type: 'select',
      options: []
    },
    {
      name: 'type_affectation',
      placeholder: 'Type affectation',
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
      ],
    },
    {
      name: 'type',
      placeholder: 'Type de carte',
      type: 'select',
      options: [
        {
          text: 'AUTOROUTE',
          value: 'AUTOROUTE',
        },
        {
          text: 'GAZOILE',
          value: 'GAZOILE',
        },
        {
          text: 'EASY ONE',
          value: 'EASY_ONE',
        },
        {
          text: 'JAWAZ',
          value: 'JAWAZ',
        },
      ],
    },
  ];

  extraInputsFilter = [
    {
      name: 'status',
      placeholder: 'Statut',
      type: 'select',
      options: [
        {
          text: 'Actif',
          value: true,
        },
        {
          text: 'Innactif',
          value: false,
        }
      ]
    },
    {
      name: 'start_date_du',
      placeholder: 'Date début : Du',
      type: 'date',
    },
    {
      name: 'start_date_au',
      placeholder: 'Date début : Au',
      type: 'date',
    },
    {
      name: 'end_date_du',
      placeholder: 'Date fin : Du',
      type: 'date',
    },
    {
      name: 'end_date_au',
      placeholder: 'Date fin : Au',
      type: 'date',
    },
    {
      name: 'affectation_date_du',
      placeholder: 'Date affectation : Du',
      type: 'date',
    },
    {
      name: 'affectation_date_au',
      placeholder: 'Date affectation : Au',
      type: 'date',
    },
    {
      name: 'plafond',
      placeholder: 'Plafond',
      type: 'number',
    },
    {
      name: 'de_created_at',
      placeholder: 'Date de céation : Du',
      type: 'date'
    },
    {
      name: 'a_created_at',
      placeholder: 'Date de céation : Au',
      type: 'date'
    },
    {
      name: 'is_affected',
      placeholder: 'Affectée',
      type: 'select',
      options: [
        {
          text: 'Affectée',
          value: true,
        },
        {
          text: 'non Affectée',
          value: false,
        }
      ]
    },
  ];

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private boGridService: BoGridService,
    private vehiculeService: VehiculeService,
    public route: Router,
    public datepipe: DatePipe,
    private _toast: ToastService,
    public permissionService: PermissionService
  ) {}

  filter($event){
    this.spinner = true;
    console.log("FILTER CARTE", $event)
    this.datafilter = $event
    this.vehiculeService.getCarte($event).subscribe((data) => {
      this.spinner = false;
      console.log('data retourné ', data);
      this.cartes = data["response"].data;
      this.links = data["response"].links;
    })
  }

  ngOnInit(): void {
    this.store.select(selectEnvparcPayload).subscribe((res) => {
      // console.log(" parc========>", res)
      this.parcs = res
      for(var i=0; i<this.parcs.length; i++){
        this.inputsFiler["0"].options.push({
          'text' : this.parcs[i].name,
          'value' : this.parcs[i].id,
        })
      }
    });

    this.store.select(selectEnvprestatairePayload).subscribe((res) => {
      this.prestataires = res.filter(d => d.type == 'CARTE')
      console.log('CARTE', this.prestataires);
      for(var i=0; i<this.prestataires.length; i++){
        this.inputsFiler["1"].options.push({
          'text' : this.prestataires[i].name,
          'value' : this.prestataires[i].id,
        })
      }
    });

    this.store.select(selectTruckService).subscribe((res) => {
      this.services = res
      for(var i=0; i<this.services.length; i++){
        this.inputsFiler["3"].options.push({
          'text' : this.services[i].name,
          'value' : this.services[i].id,
        })
      }
    });

    this.spinner = true;
    this.vehiculeService.getCarte().subscribe(
      (data) => {
        this.cartes = data['response'].data;
        this.links = data['response'].links;
        console.log('cartes', this.cartes, this.links);
        this.spinner = false;
      },
      (error) => {
        console.log('error', error);
      });
  }

  formatNumber(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  exportExcel() {
    const data = [];
    var cartes = []
    this.vehiculeService.getCarte(this.datafilter, -1).subscribe(
      (res:any) => {
        console.log("CARTES ", res)
        cartes = res.response;
        for (var i = 0; i < cartes.length; i++) {
          let carte = cartes[i];
          let object = {
            Parc: carte.parc?.name,
            Fournisseur: carte.prestataire?.name,
            N_carte: carte.n_carte,
            Service: carte.service?.name,
            Type: carte.type,
            Date_debut: this.datepipe.transform(carte.start_date, 'dd/MM/yyy'),
            Date_fin : this.datepipe.transform(carte.end_date, 'dd/MM/yyy'),
            Montant_consommé: this.formatNumber(carte.qte_consomme) + 'DH',
            Solde: this.formatNumber(carte.solde) + 'DH',
            Plafond: this.formatNumber(carte.plafond) + 'DH',
            Type_Affectation:carte.last_affectation?.type_affectation,
            Date_Affectation:carte.last_affectation ? this.datepipe.transform(carte.last_affectation?.start_date, 'dd/MM/yyy') : null,
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
        this.saveExcelFile(excelBuffer, 'cartes');
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

  delet(uuid){
    console.log("uuid", uuid)
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer Carte ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.vehiculeService.deletCarte(uuid).subscribe(
          (data) => {
            console.log('delet', data),
              this._toast.success('Carte supprimé avec succès!');
              this.vehiculeService.getCarte().subscribe(
                (data) => {
                  this.cartes = data['response'].data;
                  this.links = data['response'].links;
                  console.log('cartes', this.cartes, this.links);
                  this.spinner = false;
                },
                (error) => {
                  console.log('error', error);
                }
              );
          },
          (error) => {
            console.log('error', error);
            this._toast.error('Une erreur est survenue lors de la suppression de Carte !');
          });
      }
    });
  }

  progress(solde, plafond) {
    return (solde / plafond) * 100;
  }

  ajouter(type, item): void {
    const dialogRef = this.dialog.open(CartesDialogComponent, {
      width: '831px',
      data: { type, item },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if( data == 'data'){
          this.vehiculeService.getCarte().subscribe(
            (data) => {
              this.cartes = data['response'].data;
              this.links = data['response'].links;
              console.log('cartes', this.cartes, this.links);
              this.spinner = false;
            },
            (error) => {
              console.log('error', error);
            });
        }else{
          console.log('get apres create', data);
          this.cartes.unshift(data);
          console.log(this.cartes);
        }

      }
    });
  }

  rechargecarte(item): void {
    const dialogRef = this.dialog.open(RechargerCarteComponent, {
      width: '831px',
      data: { item },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log('get apres create', data);
        this.vehiculeService.getCarte().subscribe((res: any) => {
          console.log('data', res.response.data);
          this.cartes = res.response.data;
          this.links = res.response.links;
          this.spinner = false;
        });
      }
    });
  }

  getTheNex(event) {
    this.vehiculeService.getCarte(this.datafilter, event).subscribe((res: any) => {
      console.log(res);
      this.cartes = res.response.data;
      this.links = res.response.links;
      this.spinner = false;
    });
  }

  mouvementstockcartes(uuid): void {
    this.route.navigate([`mouvementstockcartes/${uuid}`]);
  }


  affecte(item): void {
    const dialogRef = this.dialog.open(AffecteDialogComponent, {
      disableClose: true,
      width: '537px',
      data: { item },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log('get apres create', data);
        this.spinner = true;
        this.vehiculeService.getCarte().subscribe((res: any) => {
          console.log('data', res.response.data);
          this.cartes = res.response.data;
          this.links = res.response.links;
          this.spinner = false;
        });
      }
    });
  }
}
