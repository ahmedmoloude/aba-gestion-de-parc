import { ParametreService } from 'app/core/services/parametre.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'app/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-dialo-edit-details-objectif',
  templateUrl: './dialo-edit-details-objectif.component.html',
  styleUrls: ['./dialo-edit-details-objectif.component.css']
})
export class DialoEditDetailsObjectifComponent implements OnInit {

  details : any = [];
  editDetailsObjectif : FormGroup;
  name : string;
  spinnerAdd : boolean = false;

  constructor(private store: Store<AppState>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DialoEditDetailsObjectifComponent>,
              private boGridService: BoGridService,
              private parametreService: ParametreService,
              private _toast: ToastService) {}

  ngOnInit(): void {
    this.details = this.data["details"];
    console.log("DETAILS OBJECTIF", this.details)

    if(this.details.objectifable_type == 'Agency'){
      this.name = this.details.objectifable?.name
    }else{
      this.name = this.details.objectifable?.last_name + ' ' + this.details.objectifable?.first_name;
    }

    this.editDetailsObjectif = new FormGroup({
      objectif_id: new FormControl(this.details.objectif_id),
      attendu: new FormControl(this.details.attendu),
      date_debut: new FormControl(this.details.date_debut),
      date_fin: new FormControl(this.details.date_fin),
      objectifable_type: new FormControl(this.details.objectifable_type),
      objectifable_id: new FormControl(this.details.objectifable_id),
      zone_id: new FormControl(this.details.zone_id),
      objectif: new FormControl({ value: this.details.objectif.name, disabled: true }),
      zone: new FormControl({ value: this.details.zone.name, disabled: true }),
      city: new FormControl({ value: this.details.zone.city.name, disabled: true }),
      mois: new FormControl({ value: this.translate(this.details.date_debut), disabled: true }),
      name: new FormControl({ value: this.name , disabled: true }),
    })
  }

  translate(date) {
    var fr = moment().locale('fr');
    var month = fr.localeData().months(moment(date)).toString();
    // console.log("DATE FR", month)
    var result = month.charAt(0).toUpperCase() + month.slice(1);
    // console.log("DATE FR", result)
    return result;
  }

  editObjectif(){
    this.spinnerAdd = true;
    this.parametreService.editAffectationObjectif(this.editDetailsObjectif.value, this.details.uuid).subscribe(
      (data) => {
        console.log('data', data);
        this._toast.success("Objectif modifié avec succés");
        this.spinnerAdd = false;
        this.dialogRef.close(data["response"]);
      },
      (error) => {
        console.log('error', error);
        this.spinnerAdd = false;
        this._toast.error("Une erreur est survenue");
    });
  }

}
