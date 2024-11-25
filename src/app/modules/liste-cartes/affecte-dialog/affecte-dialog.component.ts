import { Component, OnInit } from '@angular/core';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { PersonelService } from 'app/core/services/personel.service';
import { ToastService } from 'app/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { selectTrucks } from 'app/core/store/resources/resources.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { RessouresService } from 'app/core/services/ressoures.service';

@Component({
  selector: 'app-affecte-dialog',
  templateUrl: './affecte-dialog.component.html',
  styleUrls: ['./affecte-dialog.component.css']
})
export class AffecteDialogComponent implements OnInit {
  createAffectation = new FormGroup({});
  carte : any
  vehicules : any;
  drivers : any;
  affect : any;
  spinnerAdd : boolean;
  todayDate = moment().format("yyyy-MM-DD");
  start_time : any
  end_time : any;

  setDateDebut(value){
    console.log("DATE DEBUT", value)
    this.start_time= value;
  }

  setDateFin(value){
    console.log("DATE FIN", value)
    this.end_time= value;
  }

  constructor(private vehiculeService : VehiculeService,
              private personelService : PersonelService,
              private ressourceService: RessouresService,
              private _toast: ToastService,
              private store: Store<AppState>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AffecteDialogComponent>,) { }

  ngOnInit(): void {
    console.log("today", this.todayDate)
    this.carte = this.data["item"]
    console.log(this.data["id"], "id================>")

    // this.store.select(selectTrucks).subscribe((res) => {
    //   console.log(" vehicules========>", res)
    //   this.vehicules = res
    // });

    this.ressourceService.getTrucks().subscribe(
      (data:any) => {
        // console.log("data conducteur", data)
        this.vehicules = data.response;
        // setTimeout(() => {
        //   this.searchComponents.toArray()[0]?.selectObject(this.item?.truck)
        // });
      }
    );

    this.createAffectation = new FormGroup({
      carte_id : new FormControl(this.carte.id),
      type_affectation : new FormControl("", Validators.required),
      truck_id : new FormControl(""),
      driver_id : new FormControl(""),
      start_date : new FormControl("", Validators.required),
      end_date : new FormControl("", Validators.required),

    })

    this.personelService.personnelbyFunction(null,'DRIVER').subscribe(
      (data:any) => {
        console.log("data conducteur", data)
        this.drivers = data.response;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  filterConducteur(event){
    if(event){
      var id = event.id;
      this.createAffectation.controls['driver_id'].setValue(id);
    }
  }

  filterVehicule(event){
    if(event){
      var id = event.id;
      this.createAffectation.controls['truck_id'].setValue(id);
    }
  }

  affectation($event){
    this.affect = $event.value
    console.log("affectation", this.affect);
    this.createAffectation.controls.truck_id.clearValidators();
    this.createAffectation.controls.truck_id.updateValueAndValidity();
    this.createAffectation.controls.driver_id.clearValidators();
    this.createAffectation.controls.driver_id.updateValueAndValidity();
    if(this.affect =='CONDUCTEUR') {
      this.createAffectation.controls.driver_id.setValidators(Validators.required);
    }else{
      this.createAffectation.controls.truck_id.setValidators(Validators.required);
    }
  }

  addAffectation(){
    if(this.createAffectation.invalid) return;
    this.spinnerAdd = true;
    console.log(this.createAffectation.value)
    this.vehiculeService.affecterCarte(this.createAffectation.value).subscribe(
      (data) => {
        this.spinnerAdd = false;
        console.log("data affectation", data)
        this._toast.success("Carte affectée avec succée ")
        this.dialogRef.close('data')
      },
      (error) => {
        this.spinnerAdd = false;
        this._toast.error("Une erreur est survenue")
        console.log('error', error);
      }
    );
  }

}
