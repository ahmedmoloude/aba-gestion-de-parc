import { Component, OnInit } from '@angular/core';
import { DialogColorComponent } from './dialog-color/dialog-color.component';
import { MatDialog } from '@angular/material/dialog';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { Router } from '@angular/router';
import { ToastService } from 'app/services';
import Swal from 'sweetalert2';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-parametre-colors',
  templateUrl: './parametre-colors.component.html',
  styleUrls: ['./parametre-colors.component.css']
})
export class ParametreColorsComponent implements OnInit {
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
    this.vehiculeService.getColor().subscribe(
      (data) => {
        console.log("data", data)
        this.colors = data['response'];
        // this.links = data['response'].links;
        console.log('colors', this.colors);
        this.spinner = false;
      },
      (error) => {
        console.log('error', error);
      });
  }

  openDialogAjoutertype(type = "add", item = null): void {
    const dialogRef = this.dialog.open(DialogColorComponent, {
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
        this.vehiculeService.deletColor(uuid).subscribe(
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
