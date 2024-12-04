import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import {
  selectAxes,
  selectCitiesAndCategories,
  selectDrivers,
  selectTrucks,
} from 'app/core/store/resources/resources.selectors';
import { ToastService } from 'app/services';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';
import { DialogParametreDestinationComponent } from './dialog-parametre-destination/dialog-parametre-destination.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  selectEnvPayloadAxe,
  selectEnvIsLoadingAxe,
} from 'app/core/store/axe/axe.selectors';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-parametre-destination',
  templateUrl: './parametre-destination.component.html',
  styleUrls: ['./parametre-destination.component.css'],
})
export class ParametreDestinationComponent implements OnInit {
  createPlanifiedCovoyage: FormGroup;
  axes: any[] = [];
  planifiedPassage: any[] = [];
  spinner: boolean = false;
  spinnerAdd: boolean = false;
  //  "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"
  jours = [
    { index: 0, name: 'Dimanche' },
    { index: 1, name: 'Lundi' },
    { index: 2, name: 'Mardi' },
    { index: 3, name: 'Mercredi' },
    { index: 4, name: 'Jeudi' },
    { index: 5, name: 'Vendredi' },
    { index: 6, name: 'Samedi' },
  ];

  headerColumuns = ["Axe d'acheminement", 'Heure de départ', "Heure d'arrivée"];
  page: number = 1;
  voyageItems = {
    axe: null,
    items: [{
      day: null, depart: null, arrive: null
    }]
  };
  constructor(
    private boGridService: BoGridService,
    private store: Store<AppState>,
    private _toast: ToastService,
    public dialog: MatDialog,
    public permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    // this.store.select(selectAxes).subscribe(res => this.axes = res)
    // console.log("axe destination",this.axes)
    this.setForm();
    this.store.select(selectEnvPayloadAxe).subscribe((res) => {
      this.axes = res;
      console.log(' axe ========>', this.axes);
    });
    // this.boGridService.getAllAxe().subscribe((data) => {
    //   this.axes = data['response'];
    //   console.log(this.axes);
    //   //this.spinner = true;
    // },(error) => {
    //   this._toast.error(
    //     'Une erreur est survenue lors de la récupération des axes !'
    //   );
    //   console.log('error', error);
    // });
    this.getConvoyage();
  }
  addLigne(){
    this.voyageItems.items.push({
      day: '',
      depart: '',
      arrive: '',
    })
  }
  getConvoyage() {
    this.spinner = true;
    this.boGridService.allPlanifiedCovoyage().subscribe(
      (data) => {
        var planifiedPassage = data['response'];
        this.spinner = false;
        this.planifiedPassage['0'] = planifiedPassage['0'];
        this.planifiedPassage['1'] = planifiedPassage['1'];
        this.planifiedPassage['2'] = planifiedPassage['2'];
        this.planifiedPassage['3'] = planifiedPassage['3'];
        this.planifiedPassage['4'] = planifiedPassage['4'];
        this.planifiedPassage['5'] = planifiedPassage['5'];
        this.planifiedPassage['6'] = planifiedPassage['6'];
        console.log(this.planifiedPassage);
      },
      (error) => {
        this._toast.error(
          'Une erreur est survenue lors de la récupération des covoyages planifié !'
        );
        console.log('error', error);
      }
    );
  }

  jour(id) {
    return this.jours.find((jour) => jour.index == id);
  }

  
  setForm() {
    this.createPlanifiedCovoyage = new FormGroup({
      start_hour: new FormControl('', Validators.required),
      end_hour: new FormControl('', Validators.required),
      day: new FormControl('', Validators.required),
      axe_id: new FormControl('', Validators.required),
    });
  }

  addPlanifiedCovoyage() {

    console.log('ITEMS ', this.voyageItems)

    // if (this.createPlanifiedCovoyage.invalid) {
    //   console.log('invalide');
    //   return;
    // }
    this.spinnerAdd = true;
    console.log(this.planifiedPassage);
    this.boGridService
      .addPlanifiedCovoyage(this.voyageItems)
      .subscribe(
        (data) => {
          console.log(data);
          this.spinnerAdd = false;
          this._toast.success('Covoyage crée avec succée');
          this.getConvoyage()
          console.log(this.planifiedPassage);
        },
        (error) => {
          this._toast.error(
            'Une erreur est survenue lors de la création du convoyage !'
          );
          console.log('error', error);
        }
      );
  }

  deleteLigne(index){
    this.voyageItems.items.splice(index, 1)
  }

  deletePlanifiedCovoyage(covoyage) {
    console.log(covoyage.uuid);
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer covoyage ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.boGridService.deletePlanifiedCovoyage(covoyage.uuid).subscribe(
          (data) => {
            console.log(data);
            this._toast.success('Covoyage supprimé avec succès!');
            this.planifiedPassage[covoyage.day] = this.planifiedPassage[
              covoyage.day
            ].filter((c) => c.id != covoyage.id);
          },
          (error) => {
            this._toast.error(
              'Une erreur est survenue lors de la suppression de covoyage !'
            );
          }
        );
      } else {
      }
    });
  }

  editPlanifiedCovoyage(covoyage, axes) {
    const dialogRef = this.dialog.open(DialogParametreDestinationComponent, {
      disableClose: true,
      width: '831px',
      data: { covoyage, axes },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.planifiedPassage[covoyage.day] = this.planifiedPassage[
          covoyage.day
        ].filter((covoyage) => covoyage.id != covoyage.id);
        if (this.planifiedPassage[data['response'].day]) {
          this.planifiedPassage[data['response'].day].push(data['response']);
        } else {
          this.planifiedPassage[data['response'].day] = [data['response']];
        }
      }
    });
  }
}
