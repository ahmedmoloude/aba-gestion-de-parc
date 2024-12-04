import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonelService } from '../../../app/core/services/personel.service';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import Swal from 'sweetalert2';
import { DialogLeavePersonnelComponent } from './dialog-leave-personnel/dialog-leave-personnel.component';
import { MatDialog } from '@angular/material/dialog';
import {selectEnvPersonnelPayload} from  'app/core/store/personnels/personnel.selectors'
import { PermissionService } from 'app/core/services/permission.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { RoleState, StateEnum } from 'app/core/store/role/role.reducer';
import { loadRoles } from 'app/core/store/role/role.actions';
import { TypeServiceService } from 'app/core/services/type-service.service';
import { selectEnvparcPayload } from 'app/core/store/parc/parc.selectors';
@Component({
  selector: 'app-gestion-personnel',
  templateUrl: './gestion-personnel.component.html',
  styleUrls: ['./gestion-personnel.component.css'],
})
export class GestionPersonnelComponent implements OnInit {
  page: number = 1;
  // Nom - prénom - Code interne - direction - département - service - parc - fonction - type de contrat
  inputsFiler = [
    {
      name: 'last_name',
      placeholder: 'Nom ',
      type: 'text'
    },
    {
      name: 'first_name',
      placeholder: 'Prénom',
      type: 'text',
    },
    {
      name: 'code',
      placeholder: 'Code interne',
      type: 'text'
    },
    {
      name: 'direction',
      placeholder: 'Direction',
      type: 'select',
      options: [
        {
          text: 'Gestion de parc',
          value: 'Gestion de parc'
        }
      ]
    },
    {
      name: 'departement',
      placeholder: 'Département',
      type: 'select',
      options: [
        {
          text: 'Logistique',
          value: 'Logistique'
        }
      ]
    },
    {
      name: 'service',
      placeholder: 'Service',
      type: 'select',
      options:[]
    }
  ];
  extraInputsFiler = [
    {
      name: 'parc',
      placeholder: 'Parc',
      type: 'select',
      options:[]
    },
    {
      name: 'function',
      placeholder: 'Fonction',
      type: 'select',
      options:[
        {
          text: 'Conducteur',
          value: 'DRIVER'
        },
        {
          text: 'Pointeur',
          value: 'POINTER'
        },
        {
          text: 'Pompiste',
          value: 'POMPISTE'
        },
        {
          text: 'Commercial',
          value: 'COMMERCIAL'
        },
        {
          text: 'Caissier',
          value: 'CAISSIER'
        },
        {
          text: 'Super viseur caissier',
          value: 'SEUPERVISORCAISSIER'
        },
        {
          text: 'Reparateur',
          value: 'REPARATOR'
        },
      ]
    },
    {
      name: 'type_contrat',
      placeholder: 'Type de contrat ',
      type: 'select',
      options:[
        {
          text: 'Interim',
          value: 'Interim'
        },
        {
          text: 'CDI',
          value: 'cdi'
        },
        {
          text: 'CDD',
          value: 'cdd'
        },
      ]
    },
  ]
  isLoading: boolean = false;
  uuid: any;
  noData: boolean = false;
  personels: any = [];
  cities: any;
  links: any = [];
  previousPageIndex: number = 0;
  totale: number = 0;
  totaleRecords: number = 0;
  itemsPerPage: number = 1;
  filtres = {
    first_name: '',
    last_name: '',
    tel: '',
    email: '',
  };
  PersonnelsArray;

  parcs = [];
  services = [];

  constructor(
    private _router: Router,
    private personelservice: PersonelService,
    private store: Store<AppState>,
    public dialog: MatDialog,
    public permissionService: PermissionService,
    private typeServiceService: TypeServiceService,
  ) {}

  ngOnInit(): void {
    this.getAllPersonnels();
    this.store.dispatch(loadRoles());
    this.getServicesandParcs();
  }
  getAllPersonnels(filter = null) {
    let Array = [];
    this.isLoading = true;
    this.personelservice.getPersonnels(filter).subscribe((response: any) => {
      response.response.data.forEach((element) => {
        {
          Array.push({
            uuid: element?.uuid,
            last_name: element?.last_name,
            first_name: element?.first_name,
            function: element?.function,
            code: element?.code,
            email: JSON.parse(element?.contact)?.email,
            gsm_personnel: JSON.parse(element?.contact)?.gsm_personnel,
            availablity: element?.availablity,
            parc: element?.parc?.name,
            departement: element?.departement,
            service: element?.service,
            direction: element?.direction,
            contract_type: element?.contract_type,
          });
        }
      });
      this.PersonnelsArray = Array;
      this.links = response.response.links;
      this.isLoading = false;
    });
  }

    getServicesandParcs(){
      this.typeServiceService.getAllServices().subscribe((res) => {
        this.services = res;
        for (const item of this.services) {
              this.inputsFiler["5"].options.push({
              'text' : item.name,
              'value' : item.id,
            })
          }
      }
    );
    this.store.select(selectEnvparcPayload).subscribe((res) => {
      // console.log(" parc========>", res)
      this.parcs = res;
      for (const item of this.parcs) {
        this.extraInputsFiler["0"].options.push({
          'text' : item.name,
          'value' : item.id,
        })
      }
    });
  }

  getPersonnel() {
    this.isLoading = true;
    let Array = [];
    this.personelservice
      .getPersonnelByFilter(this.filtres)
      .subscribe((response: any) => {
        response.response.data.forEach((element) => {
          {
            Array.push({
              uuid: element?.uuid,
              last_name: element?.last_name,
              first_name: element?.first_name,
              function: element?.function,
              code: element?.code,
              email: JSON.parse(element?.contact).email,
              gsm_personnel: JSON.parse(element?.contact).gsm_personnel,
              availablity: element?.availablity,
              parc: element?.parc.name,
              departement: element?.departement,
              service: element?.service,
              direction: element?.direction,
              contract_type: element?.contract_type,
            });
          }
        });
        this.PersonnelsArray = Array;
        this.links = response.response.links;
        this.isLoading = false;
      });
  }

  getTheNext(event) {
    this.isLoading = true;
    let Array = [];
    this.personelservice.getPersonnels(event).subscribe((response: any) => {
      response.response.data.forEach((element) => {
        Array.push({
          uuid: element?.uuid,
          last_name: element?.last_name,
          first_name: element?.first_name,
          function: element?.function,
          code: element?.code,
          email: JSON.parse(element?.contact)?.email,
          gsm_personnel: JSON.parse(element?.contact)?.gsm_personnel,
          availablity: element?.availablity,
          parc: element?.parc?.name,
          departement: element?.departement,
          service: element?.service,
          direction: element?.direction,
          contract_type: element?.contract_type,
        });
      });
      this.PersonnelsArray = Array;
      this.links = response.response.links;
      this.isLoading = false;
    });
  }

  AjoutPers() {
    this._router.navigate(['addpersonnel']);
  }
  detailsPers(uuid: any) {
    this._router.navigate([`detailpersonnel`, uuid]);
  }
  editPersonnel(uuid: any) {
    this._router.navigate([`editpersonnel`, uuid]);
  }
  deletePersonnel(uuid: any) {
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer le personnel  ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.isLoading = true;
        this.personelservice.deletePersonnel(uuid).subscribe((res: any) => {
          this.isLoading = false;
          this.getAllPersonnels();
        });
      }
    });
  }
  openDialog(personel) {
    this.dialog.open(DialogLeavePersonnelComponent, {
      disableClose: true,
      width: '554px',
      data: { personel },
    });
  }
  filtrer($event){
    // this.spinner = true;
    console.log("FILTER RDV", $event)
    this.getAllPersonnels($event)

  }
  mappingFunction = [
    { "DRIVER": "Conducteur" },
    { "POINTER": "Pointeur" },
    { "POMPISTE": "Pompiste" },
    { "COMMERCIAL": "Commercial" },
    { "CAISSIER": "Caissier" },
    { "SEUPERVISORCAISSIER": "Superviseur caissier" },
    { "REPARATOR": "Réparateur" },
  ];

   translateToFrench(term: string): string | undefined {
    const translationObj = this.mappingFunction.find(entry => entry[term]);
    return translationObj ? translationObj[term] : term;
  }

  concatenateNames(arr) {
    const names = arr.map(service => service.name);
    return names.join(', ');
  }

  exportExcel() {


    this.isLoading = true

    this.personelservice.export().subscribe(
      (res: any) => {
        const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        this.isLoading = false

        saveAs(blob, 'personnels export.xlsx');
        
      },
      (error) => {
        this.isLoading = false


        console.error('Error downloading file:', error);
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

  formatNumber(value) {
    return value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, " ") || '';
  }
}
