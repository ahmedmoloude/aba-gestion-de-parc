import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { AppState } from 'app/core/store/app.states';
import { selectEnvVehiculeDocumentPayload, selectEnvVehiculeDocumentIsLoading } from 'app/core/store/vehiculedocument/vehiculedocument.selectors';
import { AddDialogComponent } from 'app/modules/document-administrative/assurance/add-dialog/add-dialog.component';
import { environment } from 'environments/environment';
import { AddDialogComponent as vignette } from 'app/modules/document-administrative/vignette/add-dialog/add-dialog.component';
import { AddDialogComponent as autorisation } from 'app/modules/document-administrative/autorisation/add-dialog/add-dialog.component';
import { AddDialogComponent as carte } from 'app/modules/document-administrative/carte-grise/add-dialog/add-dialog.component';
import { AddDialogComponent as taxe } from 'app/modules/document-administrative/taxe/add-dialog/add-dialog.component';
import { AddDialogComponent as tachygraphe } from 'app/modules/document-administrative/tachygraphe/add-dialog/add-dialog.component';
import { AddDialogComponent as visite } from 'app/modules/document-administrative/visite/add-dialog/add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import { deleteVehiculeDocuments } from 'app/core/store/vehiculedocument/vehiculedocument.actions';
import { DatePipe } from '@angular/common';
import { PermissionService } from 'app/core/services/permission.service';
import { selectEnvtruckTypePayload } from 'app/core/store/truckType/truckType.selectors';
@Component({
  selector: 'app-list-document',
  templateUrl: './list-document.component.html',
  styleUrls: ['./list-document.component.css'],
})
export class ListDocumentComponent implements OnInit {
  p: number = 1;
  type : string;
  documents : any;
  spinner:boolean;
  url = environment.STORAGE + '/document_vehicule/';

  propreties;
  documentType : string;
  inputsFilter = [];
  extraInputsFilter = [];
  documentDialog;

  types : any;
  typeOptions = [];
  brands : any;
  brandOptions = [];


  constructor(  private route: ActivatedRoute,
                private store: Store<AppState>,
                private vehiculeService : VehiculeService,
                public dialog: MatDialog,
                public datepipe: DatePipe,
                public permissionService: PermissionService,
              ) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.params.type;
    console.log('type', this.type);

    this.propreties = this.getDocumentPropreties(this.type)
    this.documentType = this.propreties?.type;
    this.documentDialog = this.propreties?.dialog;
    this.inputsFilter = this.propreties?.inputs;
    this.extraInputsFilter = this.propreties?.extraInputs;

    this.spinner = true;
    this.vehiculeService.documentByType(null, this.documentType).subscribe((res:any)=>{
      console.log("data", res)
      this.documents = res
      this.spinner = false
      console.log("documents", this.documents)
    });

    this.store.select(selectEnvtruckTypePayload).subscribe((res) => {
      this.types = res;
      for (const item of this.types) {
        this.typeOptions.push({
          'text' : item.name,
          'value' : `${item.id}`,
        })
      }
    });

    this.vehiculeService.getBrand().subscribe(
      (data) => {
        console.log("data", data)
        this.brands = data['response'];
        for (const item of this.brands) {
          this.brandOptions.push({
            'text' : item.name,
            'value' : `${item.id}`,
          })
        }
      },
      (error) => {
        console.log('error', error);
      });

  }

  getDocumentPropreties(type: string) {
    switch(type) {
      case 'Assurance':
        return {
          type: 'ASSURANCE',
          dialog: AddDialogComponent,
          inputs: [
            {
              name: 'matricule',
              placeholder: 'Immatriculation',
              type: 'text',
            },
            {
              name: 'code_interne',
              placeholder: 'Code interne',
              type: 'text',
            },
            {
              name: 'n_police',
              placeholder: 'N° police',
              type: 'text'
            },
            {
              name: 'start_date',
              placeholder: 'date début',
              type: 'date'
            },
            {
              name: 'end_date',
              placeholder: 'date fin',
              type: 'date'
            },
            {
              name: 'rappel',
              placeholder: 'Rappel',
              type: 'date',
            },
          ],
          extraInputs: [
            {
              name: 'echeance',
              placeholder: 'Echéance',
              type: 'text',
            },
            {
              name: 'montant',
              placeholder: 'Montant',
              type: 'text',
            },
          ]
        };
      case 'Vignette':
        return {
          type: 'VIGNETTE',
          dialog: vignette,
          inputs: [
            {
              name: 'matricule',
              placeholder: 'Immatriculation',
              type: 'text',
            },
            {
              name: 'code_interne',
              placeholder: 'Code interne',
              type: 'text',
            },
            {
              name: 'puissance_fiscale',
              placeholder: 'Puissance fiscale',
              type: 'text'
            },
            {
              name: 'start_date',
              placeholder: 'date début',
              type: 'date'
            },
            {
              name: 'end_date',
              placeholder: 'date fin',
              type: 'date'
            },
            {
              name: 'marque',
              placeholder: 'Marque',
              type: 'select',
              options: this.brandOptions
            },
          ],
          extraInputs: [
            {
              name: 'truck_type',
              placeholder: 'Type',
              type: 'select',
              options: this.typeOptions
            }
          ]
        };
      case 'Viste technique':
        return {
          type: 'VISITE_TECHNIQUE',
          dialog: visite,
          inputs: [
            {
              name: 'matricule',
              placeholder: 'Immatriculation',
              type: 'text',
            },
            {
              name: 'code_interne',
              placeholder: 'Code interne',
              type: 'text',
            },
            {
              name: 'start_date',
              placeholder: 'date début',
              type: 'date'
            },
            {
              name: 'end_date',
              placeholder: 'date fin',
              type: 'date'
            },
            {
              name: 'marque',
              placeholder: 'Marque',
              type: 'select',
              options: this.brandOptions
            },
            {
              name: 'truck_type',
              placeholder: 'Type',
              type: 'select',
              options: this.typeOptions
            }
          ],
          extraInputs: []
        };
      case 'Carte grise':
        return {
          type: 'CARTE_GRISE',
          dialog: carte,
          inputs: [
            {
              name: 'matricule',
              placeholder: 'Immatriculation',
              type: 'text',
            },
            {
              name: 'code_interne',
              placeholder: 'Code interne',
              type: 'text',
            },
            {
              name: 'n_carte_grise',
              placeholder: 'N° de carte grise',
              type: 'text'
            },
            {
              name: 'start_date',
              placeholder: 'date début',
              type: 'date'
            },
            {
              name: 'end_date',
              placeholder: 'date fin',
              type: 'date'
            },
            {
              name: 'marque',
              placeholder: 'Marque',
              type: 'select',
              options: this.brandOptions
            },
          ],
          extraInputs: [
            {
              name: 'truck_type',
              placeholder: 'Type',
              type: 'select',
              options: this.typeOptions
            }
          ]
        };
      case 'Carnet tachygraphe':
        return {
          type: 'CARNET_TACHYGRAPHIQUE',
          dialog: tachygraphe,
          inputs: [
            {
              name: 'matricule',
              placeholder: 'Immatriculation',
              type: 'text',
            },
            {
              name: 'code_interne',
              placeholder: 'Code interne',
              type: 'text',
            },
            {
              name: 'n_ordre',
              placeholder: 'N° d\'ordre',
              type: 'text'
            },
            {
              name: 'start_date',
              placeholder: 'date début',
              type: 'date'
            },
            {
              name: 'end_date',
              placeholder: 'date fin',
              type: 'date'
            },
            {
              name: 'marque',
              placeholder: 'Marque',
              type: 'select',
              options: this.brandOptions
            },
          ],
          extraInputs: [
            {
              name: 'truck_type',
              placeholder: 'Type',
              type: 'select',
              options: this.typeOptions
            }
          ]
        };
      case 'Autorisation de circulation':
        return {
          type: 'AUTORISATION',
          dialog: autorisation,
          inputs: [
            {
              name: 'matricule',
              placeholder: 'Immatriculation',
              type: 'text',
            },
            {
              name: 'code_interne',
              placeholder: 'Code interne',
              type: 'text',
            },
            {
              name: 'n_autorisation',
              placeholder: 'N° d\'autorisation',
              type: 'text'
            },
            {
              name: 'objet',
              placeholder: 'Objet',
              type: 'text',
            },
            {
              name: 'start_date',
              placeholder: 'date début',
              type: 'date'
            },
            {
              name: 'end_date',
              placeholder: 'date fin',
              type: 'date'
            },
          ],
          extraInputs: [
            {
              name: 'marque',
              placeholder: 'Marque',
              type: 'select',
              options: this.brandOptions
            },
            {
              name: 'truck_type',
              placeholder: 'Type',
              type: 'select',
              options: this.typeOptions
            }
          ]
        };
      case 'Taxe Essieu':
      return {
        type: 'TAXE_ESSIEU',
        dialog: taxe,
        inputs: [
          {
            name: 'matricule',
            placeholder: 'Immatriculation',
            type: 'text',
          },
          {
            name: 'code_interne',
            placeholder: 'Code interne',
            type: 'text',
          },
          {
            name: 'n_taxe',
            placeholder: 'N° de taxe',
            type: 'text'
          },
          {
            name: 'start_date',
            placeholder: 'date début',
            type: 'date'
          },
          {
            name: 'end_date',
            placeholder: 'date fin',
            type: 'date'
          },
          {
            name: 'marque',
            placeholder: 'Marque',
            type: 'text',
          },
        ],
        extraInputs: [
          {
            name: 'truck_type',
            placeholder: 'Type',
            type: 'text',
          }
        ]
      };
      default:
        return {
          type: 'ASSURANCE',
          dialog: AddDialogComponent,
          inputs: [
            {
              name: 'matricule',
              placeholder: 'Immatriculation',
              type: 'text',
            },
            {
              name: 'code_interne',
              placeholder: 'Code interne',
              type: 'text',
            },
            {
              name: 'n_police',
              placeholder: 'N° police',
              type: 'text'
            },
            {
              name: 'start_date',
              placeholder: 'date début',
              type: 'date'
            },
            {
              name: 'end_date',
              placeholder: 'date fin',
              type: 'date'
            },
            {
              name: 'rappel',
              placeholder: 'Rappel',
              type: 'date',
            },
          ],
          extraInputs: [
            {
              name: 'echeance',
              placeholder: 'Echéance',
              type: 'text',
            },
            {
              name: 'montant',
              placeholder: 'Montant',
              type: 'text',
            },
          ]
        };
    }
  }

  diffrenceDate(end_date){
    // Define the two dates
    const date1 = moment();
    const date2 = moment(end_date);

    // Calculate the date difference in days
    const dateDifferenceInDays = date2?.diff(date1, 'days');

    // console.log('Date Difference in Days:', dateDifferenceInDays);
    return (dateDifferenceInDays)
  }

  filtrer($event){
    this.spinner = true;
    console.log("FILTER RDV", $event)
    switch(this.type) {
      case 'Assurance': {
        // this.documents = res.filter(document => document.type == "ASSURANCE");

        this.vehiculeService.documentByType($event, 'ASSURANCE').subscribe((res:any)=>{
          console.log("data", res)
          this.documents = res
          this.spinner = false
          console.log("documents", this.documents)
        })
         break;
      }
      case 'Vignette': {
        // this.documents = res.filter(document => document.type == "VIGNETTE");
        this.vehiculeService.documentByType($event, 'VIGNETTE').subscribe((res:any)=>{
          console.log("data", res)
          this.documents = res
          this.spinner = false
          console.log("documents", this.documents)
        })
         break;
      }
      case 'Viste technique': {
        // this.documents = res.filter(document => document.type == "VISITE_TECHNIQUE");
        this.vehiculeService.documentByType($event, 'VISITE_TECHNIQUE').subscribe((res:any)=>{
          console.log("data", res)
          this.documents = res
          this.spinner = false
          console.log("documents", this.documents)
        })
         break;
      }
      case 'Carte grise': {
        // this.documents = res.filter(document => document.type == "CARTE_GRISE");
        this.vehiculeService.documentByType($event, 'CARTE_GRISE').subscribe((res:any)=>{
          console.log("data", res)
          this.documents = res
          this.spinner = false
          console.log("documents", this.documents)
        })
         break;
      }
      case 'Carnet tachygraphe': {
        // this.documents = res.filter(document => document.type == "CARNET_TACHYGRAPHIQUE");
        this.vehiculeService.documentByType($event, 'CARNET_TACHYGRAPHIQUE').subscribe((res:any)=>{
          console.log("data", res)
          this.documents = res
          this.spinner = false
          console.log("documents", this.documents)
        })
         break;
      }
      case 'Autorisation de circulation': {
        // this.documents = res.filter(document => document.type == "AUTORISATION");
        this.vehiculeService.documentByType($event, 'AUTORISATION').subscribe((res:any)=>{
          console.log("data", res)
          this.documents = res
          this.spinner = false
          console.log("documents", this.documents)
        })
         break;
      }
      case 'Taxe Essieu': {
        // this.documents = res.filter(document => document.type == "TAXE_ESSIEU");
        this.vehiculeService.documentByType($event, 'TAXE_ESSIEU').subscribe((res:any)=>{
          console.log("data", res)
          this.documents = res
          this.spinner = false
          console.log("documents", this.documents)
        })
         break;
      }
      default: {
         //statements;
         break;
      }
  }
  }

  editTruckDocument(mode, item){
    // const dialogRef = this.dialog.open(AddDialogComponent, {
    //   disableClose: true,
    //   width: '831px',
    //   data: { mode, item },
    // });
    const dialogRef = this.dialog.open(this.documentDialog, {
      disableClose: true,
      width: '831px',
      data: { mode, item },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.spinner = true;
        this.vehiculeService.documentByType(null,this.documentType).subscribe((res:any)=>{
          console.log("data", res)
          this.documents = res;
          this.spinner = false;
          console.log("documents", this.documents)
        })
      }
    });
  }

  deletTruckDocument(uuid) {
    console.log('delete');
    console.log(uuid);
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer ce document ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(deleteVehiculeDocuments({ uuid }));
      }
    });
  }

  openDialog(vehicule = null) {
    const dialogRef = this.dialog.open(this.documentDialog, {
      disableClose: true,
      width: '831px',
      data: { vehicule },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.spinner = true;
        this.vehiculeService.documentByType(null, this.documentType).subscribe((res:any)=>{
          console.log("data", res)
          this.documents = res
          this.spinner = false
          console.log("documents", this.documents)
        })
      }
    })
  }

  exportExcel(){
    const data = [];
    console.log("export");
    switch(this.type) {
      case 'Assurance': {
        for (var i = 0; i < this.documents.length; i++) {
          let document = this.documents[i];
          // console.log("DOCUMENT", document)
          let object = {
            N_police: document.n_police,
            Date_début: this.datepipe?.transform(document.start_date, 'dd/MM/yyy'),
            Date_fin: this.datepipe?.transform(document.end_date, 'dd/MM/yyy'),
            Echeance: document.end_date ? this.diffrenceDate(document.end_date) +'j' : '',
            Rappel: document.rappel ? document.rappel + 'j' : '',
            Montant: document.montant ? document.montant + ' DH' : '',
            Fournisseur: document.prestataire?.name,
            Code_Interne: document.truck?.code_interne,
            Immatriculation: document.truck?.matricule,
            Marque: document.truck?.brand?.name,
            Type: document.truck?.truck_type?.name,
          };
          data.push(object);
        }
         break;
      }
      case 'Vignette': {
        for (var i = 0; i < this.documents.length; i++) {
          let document = this.documents[i];
          // console.log("DOCUMENT", document)
          let object = {
            Puissance_fiscale: document.truck?.puissance_fiscale ? document.truck?.puissance_fiscale + ' CV' : '',
            Date_début: this.datepipe?.transform(document.start_date, 'dd/MM/yyy'),
            Date_fin: this.datepipe?.transform(document.end_date, 'dd/MM/yyy'),
            Echeance: document.end_date ? this.diffrenceDate(document.end_date) +'j' : '',
            Rappel: document.rappel ? document.rappel + 'j' : '',
            Montant: document.montant ? document.montant + ' DH' : '',
            Code_Interne: document.truck?.code_interne,
            Immatriculation: document.truck?.matricule,
            Marque: document.truck?.brand?.name,
            Type: document.truck?.truck_type?.name,
          };
          data.push(object);
        }
         break;
      }
      case 'Viste technique': {
        for (var i = 0; i < this.documents.length; i++) {
          let document = this.documents[i];
          // console.log("DOCUMENT", document)
          let object = {
            Date_début: this.datepipe?.transform(document.start_date, 'dd/MM/yyy'),
            Date_fin: this.datepipe?.transform(document.end_date, 'dd/MM/yyy'),
            Echeance: document.end_date ? this.diffrenceDate(document.end_date) +'j' : '',
            Rappel_avant: document.rappel ? document.rappel + 'j' : '',
            Montant: document.montant,
            Fournisseur: document.prestataire?.name,
            Code_Interne: document.truck?.code_interne,
            Immatriculation: document.truck?.matricule,
            Marque: document.truck?.brand?.name,
            Type: document.truck?.truck_type?.name,
          };
          data.push(object);
        }
         break;
      }
      case 'Carte grise': {
        for (var i = 0; i < this.documents.length; i++) {
          let document = this.documents[i];
          // console.log("DOCUMENT", document)
          let object = {
            N_chassis: document.n_chassis,
            Date_debut: this.datepipe?.transform(document.start_date, 'dd/MM/yyy'),
            Date_fin: this.datepipe?.transform(document.end_date, 'dd/MM/yyy'),
            Echeance: document.end_date ? this.diffrenceDate(document.end_date) +'j' : '',
            Rappel_avant: document.rappel ? document.rappel + 'j' : '',
            N_carte_grise: document.n_carte_grise,
            Code_Interne: document.truck?.code_interne,
            Immatriculation: document.truck?.matricule,
            Marque: document.truck?.brand?.name,
            Type: document.truck?.truck_type?.name,
          };
          data.push(object);
        }
         break;
      }
      case 'Carnet tachygraphe': {
        for (var i = 0; i < this.documents.length; i++) {
          let document = this.documents[i];
          // console.log("DOCUMENT", document)
          let object = {
            N_ordre: document.n_ordre,
            Date_debut: this.datepipe?.transform(document.start_date, 'dd/MM/yyy'),
            Date_fin: this.datepipe?.transform(document.end_date, 'dd/MM/yyy'),
            Echeance: document.end_date ? this.diffrenceDate(document.end_date) +'j' : '',
            Rappel_avant: document.rappel ? document.rappel + 'j' : '',
            Code: document.code,
            Code_Interne: document.truck?.code_interne,
            Immatriculation: document.truck?.matricule,
            Marque: document.truck?.brand?.name,
            Type: document.truck?.truck_type?.name,
          };
          data.push(object);
        }
         break;
      }
      case 'Autorisation de circulation': {
        for (var i = 0; i < this.documents.length; i++) {
          let document = this.documents[i];
          // console.log("DOCUMENT", document)
          let object = {
            Objet: document.objet,
            Date_debut: this.datepipe?.transform(document.start_date, 'dd/MM/yyy'),
            Date_fin: this.datepipe?.transform(document.end_date, 'dd/MM/yyy'),
            Echeance: document.end_date ? this.diffrenceDate(document.end_date) +'j' : '',
            Rappel_avant: document.rappel ? document.rappel + 'j' : '',
            N_autorisation: document.n_autorisation,
            Code_Interne: document.truck?.code_interne,
            Immatriculation: document.truck?.matricule,
            Marque: document.truck?.brand?.name,
            Type: document.truck?.truck_type?.name,

          };
          data.push(object);
        }
         break;
      }
      case 'Taxe Essieu': {
        for (var i = 0; i < this.documents.length; i++) {
          let document = this.documents[i];
          // console.log("DOCUMENT", document)
          let object = {
            N_taxe: document.n_taxe,
            Date_debut: this.datepipe?.transform(document.start_date, 'dd/MM/yyy'),
            Date_fin: this.datepipe?.transform(document.end_date, 'dd/MM/yyy'),
            Echeance: document.end_date ? this.diffrenceDate(document.end_date) +'j' : '',
            Rappel_avant: document.rappel ? document.rappel + 'j' : '',
            Montant: document.montant,
            Code_Interne: document.truck?.code_interne,
            Immatriculation: document.truck?.matricule,
            Marque: document.truck?.brand?.name,
            Type: document.truck?.truck_type?.name,
          };
          data.push(object);
        }
         break;
      }
      default: {
         //statements;
         break;
      }
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
    this.saveExcelFile(excelBuffer, this.type);
  }

  saveExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  formatNumber(value) {
    return value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
}
