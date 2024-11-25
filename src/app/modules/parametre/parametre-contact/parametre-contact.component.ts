import { ContactService } from './../../../core/services/contact.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogFonctionComponent } from './dialog-fonction/dialog-fonction.component';
import { DialogDepartementComponent } from './dialog-departement/dialog-departement.component';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastService } from 'app/services';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-parametre-contact',
  templateUrl: './parametre-contact.component.html',
  styleUrls: ['./parametre-contact.component.css']
})
export class ParametreContactComponent implements OnInit {

  departements : any = [];
  fonctions : any = [];
  spinner : boolean = false;

  constructor(public dialog: MatDialog,
              private contactService: ContactService,
              private _toast: ToastService,
              public permissionService: PermissionService) { }

  ngOnInit(): void {

    this.spinner = true;
    this.contactService.getContactDepartement().subscribe(
      (data) => {
        console.log("departement", data)
        this.departements = data['response'];
      },
      (error) => {
        console.log('error', error);
    });

    this.contactService.getContactFonction().subscribe(
      (data) => {
        this.spinner = false;
        console.log("fonction", data)
        this.fonctions = data['response'];
      },
      (error) => {
        console.log('error', error);
    });

  }

  openDialogAjouterDepartement(item, mode = "add"): void {
    const dialogRef = this.dialog.open(DialogDepartementComponent, {
      disableClose: true,
      width: '682px',
      data: { item, mode },
    });

    dialogRef.afterClosed().subscribe((data) => {
      // console.log("type", type)
      // console.log("item", item)
      if (data) {
        // this.departements.unshift(data);
        if( mode == 'edit'){
          this.departements = this.departements.filter(function(obj) {
            return obj.uuid !== item.uuid;
          });
          this.departements.unshift(data);
        }else{
          // console.log('get apres create', data);
          this.departements.unshift(data);
          // console.log(this.gps);
        }

      }
    });
  }

  openDialogAjouterFonction(item, mode = "add"): void {
    const dialogRef = this.dialog.open(DialogFonctionComponent, {
      disableClose: true,
      width: '682px',
      data: { item, mode },
    });

    dialogRef.afterClosed().subscribe((data) => {
      // console.log("type", type)
      // console.log("item", item)
      if (data) {
        // this.fonctions.unshift(data);
        if( mode == 'edit'){
          this.fonctions = this.fonctions.filter(function(obj) {
            return obj.uuid !== item.uuid;
          });
          this.fonctions.unshift(data);
        }else{
          // console.log('get apres create', data);
          this.fonctions.unshift(data);
          // console.log(this.gps);
        }

      }
    });
  }

  deletDepartement(uuid){
    console.log("UUID", uuid)
    Swal.fire({
      title: "Êtes-vous sûr(e) de vouloir supprimer département ?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.contactService.deletContactDepartement(uuid ).subscribe((data) => {
          this.departements = this.departements.filter(function(obj) {
            return obj.uuid !== uuid;
          });
          this._toast.success("Département supprimer avec succés !")
        },
        (error) => {
          this.spinner = false;
          console.log('error', error);
          this._toast.error("Une erreur est survenue lors de la suppression de département  !");
        });
      } else {
      }
    });
  }

  deletFonction(uuid){
    console.log("UUID", uuid)
    Swal.fire({
      title: "Êtes-vous sûr(e) de vouloir supprimer la fonction ?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.contactService.deletContactFonction(uuid ).subscribe((data) => {
          this.fonctions = this.fonctions.filter(function(obj) {
            return obj.uuid !== uuid;
          });
          this._toast.success("Fonction supprimer avec succés !")
        },
        (error) => {
          this.spinner = false;
          console.log('error', error);
          this._toast.error("Une erreur est survenue lors de la suppression de fonction  !");
        });
      } else {
      }
    });
  }

}
