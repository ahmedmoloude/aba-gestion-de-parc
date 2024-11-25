import { DialogObjectifComponent } from './dialog-objectif/dialog-objectif.component';
import Swal from 'sweetalert2';
import { ToastService } from 'app/core';
import { Router } from '@angular/router';
import { ParametreService } from './../../../core/services/parametre.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-parametre-objectif',
  templateUrl: './parametre-objectif.component.html',
  styleUrls: ['./parametre-objectif.component.css']
})
export class ParametreObjectifComponent implements OnInit {

  objectifs :any = [];
  links: any = [];
  spinner: boolean;

  constructor(
    public dialog: MatDialog,
    // private store: Store<AppState>,
    // private boGridService: BoGridService,
    // private vehiculeService: VehiculeService,
    private parametreService: ParametreService,
    public route: Router,
    private _toast: ToastService,
    public permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.spinner = true;
    this.parametreService.getObjectif().subscribe(
      (data) => {
        console.log("data", data)
        this.objectifs = data['response'];
        // this.links = data['response'].links;
        console.log('objectifs', this.objectifs);
        this.spinner = false;
      },
      (error) => {
        console.log('error', error);
      });
  }

  openDialogAdd(mode, item): void {
    const dialogRef = this.dialog.open(DialogObjectifComponent, {
      disableClose: true,
      width: '562px',
      data: { mode, item },
    });

    dialogRef.afterClosed().subscribe((data) => {
      // console.log("type", type)
      // console.log("item", item)
      if (data) {
        if( mode == 'edit'){
          this.objectifs = this.objectifs.filter(function(obj) {
            return obj.uuid !== item.uuid;
          });
          this.objectifs.unshift(data);
        }else{
          // console.log('get apres create', data);
          this.objectifs.unshift(data);
          // console.log(this.gps);
        }

      }
    });
  }

  formatNumber(value) {
    // console.log("value", value)
    // console.log("123456789".toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "))
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  delet(uuid){
    console.log("uuid", uuid)
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer Objectif ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.parametreService.deletObjectif(uuid).subscribe(
          (data) => {
            console.log('delet', data),
              this._toast.success('Objectif supprimé avec succès!');
              this.objectifs = this.objectifs.filter(function(obj) {
                return obj.uuid !== uuid;
              });
          },
          (error) => {
            console.log('error', error);
            this._toast.error('Une erreur est survenue lors de la suppression de l\'Objectif !');
          });
      }
    });
  }

}
