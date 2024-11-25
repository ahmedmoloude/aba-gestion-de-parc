import Swal from 'sweetalert2';
import { ToastService } from 'app/core';
import { Router } from '@angular/router';
import { VehiculeService } from './../../../core/services/vehicule.service';
import { AddGpsComponent } from './add-gps/add-gps.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-parametre-gps',
  templateUrl: './parametre-gps.component.html',
  styleUrls: ['./parametre-gps.component.css'],
})
export class ParametreGpsComponent implements OnInit {

  gps :any = [];
  links: any = [];
  spinner: boolean;

  constructor(
    public dialog: MatDialog,
    // private store: Store<AppState>,
    // private boGridService: BoGridService,
    private vehiculeService: VehiculeService,
    public route: Router,
    private _toast: ToastService,
    public permissionService: PermissionService
  ) {}

  ngOnInit(): void {
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

  openDialogAdd(type, item): void {
    const dialogRef = this.dialog.open(AddGpsComponent, {
      disableClose: true,
      width: '562px',
      data: { type, item },
    });

    dialogRef.afterClosed().subscribe((data) => {
      // console.log("type", type)
      // console.log("item", item)
      if (data) {
        if( type == 'edit'){
          this.gps = this.gps.filter(function(obj) {
            return obj.uuid !== item.uuid;
          });
          this.gps.unshift(data);
        }else{
          // console.log('get apres create', data);
          this.gps.unshift(data);
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


  getTheNext(link){
    this.spinner = true
    console.log("page 38", link.url.substr(38))
    console.log("page 39", link.url.substr(39))
    console.log("page 40", link.url.substr(40))
    console.log("page 41", link.url.substr(41))
    console.log("page 42", link.url.substr(42))
    console.log("page 43", link.url.substr(43))
    console.log("page 44", link.url.substr(44))
    console.log("page 45", link.url.substr(45))
    const page = link.url.substr(38)
    this.vehiculeService.getGps(page).subscribe(
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

  delet(uuid){
    console.log("uuid", uuid)
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer GPS ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.vehiculeService.deletGps(uuid).subscribe(
          (data) => {
            console.log('delet', data),
              this._toast.success('GPS supprimé avec succès!');
              this.gps = this.gps.filter(function(obj) {
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
