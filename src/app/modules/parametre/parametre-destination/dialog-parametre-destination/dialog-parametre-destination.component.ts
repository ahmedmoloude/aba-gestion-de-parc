import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectAxes, selectCitiesAndCategories, selectDrivers, selectTrucks } from 'app/core/store/resources/resources.selectors';
import { ToastService } from 'app/services';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-parametre-destination',
  templateUrl: './dialog-parametre-destination.component.html',
  styleUrls: ['./dialog-parametre-destination.component.css']
})
export class DialogParametreDestinationComponent implements OnInit {
  editPlanifiedCovoyage : FormGroup;
  planifiedPassage: any;
  jours = [ 
  {"index" : 0,"name" : "Dimanche"},
  {"index" : 1,"name" : "Lundi"},
  {"index" : 2,"name" : "Mardi"},
  {"index" : 3,"name" : "Mercredi"},
  {"index" : 4,"name" : "Jeudi"},
  {"index" : 5,"name" : "Vendredi"},
  {"index" : 6,"name" : "Samedi"}];
  axes: any[] = [];
  spinnerAdd: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private boGridService: BoGridService,
    private _toast: ToastService,
    public dialogRef: MatDialogRef<DialogParametreDestinationComponent>,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.planifiedPassage = this.data["covoyage"];
    this.axes = this.data["axes"];
    console.log("covoyage recuperer", this.planifiedPassage);
    // console.log("axes recuperer", this.axes);
    this.setForm();
  }

  setForm(){
    this.editPlanifiedCovoyage = new FormGroup({
      start_hour: new FormControl(this.planifiedPassage.start_hour, Validators.required),
      end_hour: new FormControl(this.planifiedPassage.end_hour, Validators.required),
      day: new FormControl(this.planifiedPassage.day, Validators.required),
      axe_id: new FormControl(this.planifiedPassage.axe_id, Validators.required),
    })
    console.log("day", this.planifiedPassage.day)
  }

  updatePlanifiedCovoyage(){
    this.spinnerAdd = true;
    this.boGridService.updatePlanifiedCovoyage(this.editPlanifiedCovoyage.value, this.planifiedPassage.uuid).subscribe((data) => {
      console.log(data);
      this.spinnerAdd = false;
      this.dialogRef.close(data);
    },(error) => {
      this._toast.error(
        'Une erreur est survenue lors de la modification de voyage automatique !'
      );
      console.log('error', error);
    });
  }
}
