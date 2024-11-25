import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PermissionService } from 'app/core/services/permission.service';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { ToastService } from 'app/services';
import Swal from 'sweetalert2';
import { DialogCountryComponent } from './dialog-country/dialog-country.component';

@Component({
  selector: 'app-parametre-country',
  templateUrl: './parametre-country.component.html',
  styleUrls: ['./parametre-country.component.css']
})
export class ParametreCountryComponent implements OnInit {
  headerColumuns = ['Couleur'];
  colors : any;
  spinner : boolean = false;
  p: number = 1;

  constructor(
          public dialog: MatDialog,
          private vehiculeService: VehiculeService,
          public route: Router,
          private _toast: ToastService,
          public permissionService: PermissionService) { }

  ngOnInit(): void {
    this.spinner = true;
    this.vehiculeService.getCountries().subscribe(
      (data) => {
        console.log("data", data)
        this.colors = data;
        // this.links = data['response'].links;
        console.log('colors', this.colors);
        this.spinner = false;
      },
      (error) => {
        console.log('error', error);
      });
  }

  openDialogAjoutertype(type = "add", item = null): void {
    const dialogRef = this.dialog.open(DialogCountryComponent, {
      disableClose: true,
      width: '582px',
      data: { type, item },
    });

    dialogRef.afterClosed().subscribe((data) => {
      // console.log("type", type)
      // console.log("item", item)
      if (data) {
        console.warn("DATA COLOR", data)
        if( type == 'edit'){
          this.colors = this.colors.filter(function(obj) {
            return obj.uuid !== item.uuid;
          });
          this.colors.unshift(data);
        }else{
          // console.log('get apres create', data);
          this.colors.unshift(data);
          // console.log(this.gps);
        }

      }
    });
  }

  delet(uuid){
    console.log("uuid", uuid)
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer la couleur ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.vehiculeService.deleteCountry(uuid).subscribe(
          (data) => {
            console.log('delet', data),
              this._toast.success('Couleur supprimé avec succès!');
              this.colors = this.colors.filter(function(obj) {
                return obj.uuid !== uuid;
              });
          },
          (error) => {
            console.log('error', error);
            this._toast.error('Une erreur est survenue lors de la suppression de Carte !');
          });
      }
    });
  }
}
