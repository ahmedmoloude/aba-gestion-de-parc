import { updateDepenseDialogComponent } from './update-depense-dialog/update-depense-dialog.component';
import { AddcarDialogComponent } from './addcar-dialog/addcar-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { ToastService } from '../../../core';
import { environment } from 'environments/environment';
import { PermissionService } from 'app/core/services/permission.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-depenses-autoroute',
  templateUrl: './depenses-autoroute.component.html',
  styleUrls: ['./depenses-autoroute.component.css'],
})
export class DepensesAutorouteComponent implements OnInit {
  p: number = 1;
  filters: any;
  inputsFiler = [
    {
      name: 'code',
      placeholder: 'Code',
      type: 'text'
    },
    {
      name: 'matricule',
      placeholder: 'Immatriculation',
      type: 'text'
    },
    {
      name: 'type_carte',
      placeholder: 'Type de carte',
      type: 'select',
      options: [
        {
          text: 'GAZOILE',
          value: 'GAZOILE'
        },
        {
          text: 'EASY_ONE',
          value: 'EASY_ONE'
        },
        {
          text: 'AUTOROUTE',
          value: 'AUTOROUTE'
        },
        {
          text: 'JAWAZ',
          value: 'JAWAZ'
        }
      ]
    },
    {
      name: 'n_carte',
      placeholder: 'N° de carte',
      type: 'text',
    },
    {
      name: 'station',
      placeholder: 'Station',
      type: 'select',
      options: [
        {
          text: 'Afriquia',
          value: 'Afriquia'
        },
        {
          text: 'Shell',
          value: 'Shell'
        },
        {
          text: 'Total',
          value: 'Total'
        }
      ]
    }
  ];
  depenses : any;
  links : any;
  spinner : boolean = false;
  url = environment.STORAGE + '/depense/';

  constructor(public dialog: MatDialog,
              private vehiculeService : VehiculeService,
              private toast : ToastService,
              public permissionService: PermissionService,
              private _toast: ToastService) {}

  ngOnInit(): void {
    this.spinner = true;
    this.vehiculeService.getDepense('CONSOMMATION').subscribe(
      (data) => {
        this.depenses = data['response'].data;
        this.links = data['response'].links;
        console.log('depenses', this.depenses, this.links);
        this.spinner = false
      },
      (error) => {
        console.log('error', error);
    });
  }
  formatNumber(value) {
    // console.log("value", value)
    // console.log("123456789".toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "))
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  getTheNext(event){
    this.spinner = true
    this.vehiculeService.getDepense('CONSOMMATION',null, event).subscribe((res:any)=>{
      console.log("data", res.response.data)
      this.depenses = res.response.data
      this.links = res.response.links
      this.spinner = false
    })
  }


  addcar(): void {
    const dialogRef = this.dialog.open(AddcarDialogComponent, {
      width: '811px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log('get apres create', data);
        this.depenses.unshift(data);
        console.log(this.depenses)
      }
    });

  }

  updateDepenseComponent(item): void {
    const dialogRef = this.dialog.open(updateDepenseDialogComponent, {
      width: '811px',
      data: {item},
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log('get after create', data);
        this.spinner = true
        this.vehiculeService.getDepense('CONSOMMATION').subscribe((res:any)=>{
          console.log("data", res.response.data)
        this.depenses = res.response.data
        this.links = res.response.links
        this.spinner = false
      })
      }
    });

  }

  deleteDepense(uuid, type){
    console.log("uuid", uuid)
    Swal.fire({
      title: `Êtes-vous sûr(e) de vouloir supprimer ${type} ?`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.vehiculeService.deleteDepense(uuid).subscribe(
          (data) => {
            console.log('delete', data),
              this._toast.success(type + ' supprimé avec succès!');
              this.spinner =true;
              this.vehiculeService.getDepense('CONSOMMATION').subscribe((res:any)=>{
                console.log("data", res.response.data)
                this.depenses = res.response.data
                this.links = res.response.links
                this.spinner = false
              })
          },
          (error) => {
            console.log('error', error);
            this._toast.error('Une erreur est survenue lors de la suppression de ' + type + ' !');
          });
      }
    });
  }

  filtrer($event){
    console.log("FILTER RDV", $event);
    this.filters = $event;
    this.spinner = true;
    this.vehiculeService.getDepense('CONSOMMATION', this.filters).subscribe(
      (data) => {
        this.depenses = data['response'].data;
        this.links = data['response'].links;
        console.log('depenses', this.depenses, this.links);
        this.spinner = false;
      },
      (error) => {
        console.log('error', error);
    });
  }
}
