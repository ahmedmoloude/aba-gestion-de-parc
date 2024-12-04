import { ParametreService } from 'app/core/services/parametre.service';
import { ToastService } from 'app/services';
import { DialogCommercialComponent } from './dialog-commercial/dialog-commercial.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-affectation-commercial',
  templateUrl: './affectation-commercial.component.html',
  styleUrls: ['./affectation-commercial.component.css']
})
export class AffectationCommercialComponent implements OnInit {

  @Output() submited = new EventEmitter<any>();

  panelOpenState = false;
  spinner = false;
  // objectifs_commercials = [];
  headerColumuns = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ];
  constructor(
    public dialog: MatDialog,
    private parametreService: ParametreService,
    private _toast: ToastService,
    public permissionService: PermissionService
  ) {}

  @Input() objectif = [];

  ngOnInit(): void {
    console.log("AFFECTATION COMMERCIAL", this.objectif)
    // this.getData();
  }

  addcommercial(objectif, mode, item): void {
    const dialogRef = this.dialog.open(DialogCommercialComponent, {
      disableClose: true,
      width: '1041px',
      data: { objectif, mode, item },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        // console.log("AFTER CLOSE AFFECTATION COMMERCIAL", data)
        // console.log("OBJECTIF", this.objectifs)
        // this.getData();
        this.submited.emit()
      }
    });
  }

  // getData(){
  //   // this.spinner = true;
  //   this.parametreService.getObjectifCommercial().subscribe(
  //     (data) => {
  //       this.spinner = false
  //       console.log('GET AFFECTATION OBJECTIF COMMERCIAL', data["response"]);
  //       this.objectifs_commercials = data["response"]
  //   });


  // }

  delet(uuid){
    console.log("uuid details", uuid)
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
        this.parametreService.DeleteAffectationObjectif(uuid).subscribe(
          (data) => {
            console.log('delet', data),
              this._toast.success('Affectation objectif supprimer avec succés!');
              // this.getData();
          },
          (error) => {
            console.log('error', error);
            this._toast.error('Une erreur est survenue lors de la suppression de l\'Objectif !');
          });
      }
    });
  }

}
