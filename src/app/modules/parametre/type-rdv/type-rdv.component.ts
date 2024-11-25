import { AddMotifComponent } from './add-motif/add-motif.component';
import { ParametreService } from 'app/core/services/parametre.service';
import { AddTypeRdvComponent } from './add-type-rdv/add-type-rdv.component';
import { selectEnvprestatairePayload, selectEnvprestataireIsLoading } from './../../../core/store/prestataire/prestataire.selectors';
import { AppState } from 'app/core/store/app.states';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { ToastService } from 'app/core';
import { Router } from '@angular/router';
import { VehiculeService } from './../../../core/services/vehicule.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-type-rdv',
  templateUrl: './type-rdv.component.html',
  styleUrls: ['./type-rdv.component.css']
})
export class TypeRdvComponent implements OnInit {

  types :any = [];
  motifs :any = [];
  spinner: boolean;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private vehiculeService: VehiculeService,
    public route: Router,
    private parameterService: ParametreService,
    private _toast: ToastService,
    public permissionService: PermissionService ) {}

  ngOnInit(): void {
    this.spinner = true;
    console.log("TYPES")
    this.parameterService.getTypeRdv().subscribe((data) => {
      this.spinner = false;
      this.types = data["response"];
      console.log("TYPES", this.types)
    },
    (error) => {
      this.spinner = false;
      console.log('error', error);
      this._toast.error("Une erreur est survenue lors de la récupération des types !");
    });

    this.parameterService.getMotif().subscribe((data) => {
      this.spinner = false;
      this.motifs = data["response"];
      console.log("MOTIFS", this.motifs)
    },
    (error) => {
      this.spinner = false;
      console.log('error', error);
      this._toast.error("Une erreur est survenue lors de la récupération des types !");
    });
  }

  addDialog(item, mode="add"): void {
    const dialogRef = this.dialog.open(AddTypeRdvComponent, {
      disableClose: true,
      width: '600px',
      data: { item, mode },
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.warn('input data', data);
      if (data) {
        if( mode == 'edit'){
          this.types = this.types.filter(function(obj) {
            return obj.uuid !== item.uuid;
          });
          this.types.unshift(data["response"]);
        }else{
          this.types.unshift(data["response"]);
        }
        // console.log('types', data);
        // this.types.push(data["response"]) ;
      }
    });
  }

  addDialogMotif(item, mode="add"): void {
    const dialogRef = this.dialog.open(AddMotifComponent, {
      disableClose: true,
      width: '600px',
      data: { item, mode },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.warn('input data', data);
        if( mode == 'edit'){
          this.motifs = this.motifs.filter(function(obj) {
            return obj.uuid !== item.uuid;
          });
          this.motifs.unshift(data["response"]);
        }else{
          this.motifs.unshift(data["response"]);
        }
        // console.log('types', data);
        // this.motifs.push(data["response"]) ;
      }
    });
  }

  deletMotif(uuid){
    console.log("UUID", uuid)
    Swal.fire({
      title: "Êtes-vous sûr(e) de vouloir supprimer le prestataire ?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.parameterService.deleteMotif(uuid ).subscribe((data) => {
          this.motifs = this.motifs.filter(function(obj) {
            return obj.uuid !== uuid;
          });
          this._toast.success("Motif supprimer avec succés !")
        },
        (error) => {
          this.spinner = false;
          console.log('error', error);
          this._toast.error("Une erreur est survenue lors de la suppression de motif  !");
        });
      } else {
      }
    });

  }

  delet(uuid){
    console.log("UUID", uuid)
    Swal.fire({
      title: "Êtes-vous sûr(e) de vouloir supprimer le prestataire ?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.parameterService.deleteGlobalConfig(uuid ).subscribe((data) => {
          this.types = this.types.filter(function(obj) {
            return obj.uuid !== uuid;
          });
          this._toast.success("Type supprimer avec succés !")
        },
        (error) => {
          this.spinner = false;
          console.log('error', error);
          this._toast.error("Une erreur est survenue lors de la suppression de type  !");
        });
      } else {
      }
    });

  }

}
