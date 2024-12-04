import { VehiculeService } from 'app/core/services/vehicule.service';
import { ToastService } from './../../../../core/services/toast.service';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RessouresService } from 'app/core/services/ressoures.service';
import { PersonelService } from 'app/core/services/personel.service';

@Component({
  selector: 'app-association-gps',
  templateUrl: './association-gps.component.html',
  styleUrls: ['./association-gps.component.css']
})
export class AssociationGpsComponent implements OnInit {

  gps: any;
  associerGps: FormGroup;
  vehicules: any;
  drivers: any;
  spinnerAdd = false;
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<AssociationGpsComponent>,
      private vehiculeService: VehiculeService,
      private ressourceService: RessouresService,
      private personelService : PersonelService,
      private _toast: ToastService) {}

  ngOnInit(): void {
    this.gps = this.data["item"];
    console.log("GPS====>", this.gps)
    this.ressourceService.getTrucks().subscribe(
      (data:any) => {
        console.log("data vehicule", data.response)
        this.vehicules = data.response;
      }
    );

    this.personelService.personnelbyFunction(null, 'DRIVER').subscribe(
      (data:any) => {
        console.log("data conducteur", data)
        this.drivers = data.response;
      },
      (error) => {
        console.log('error', error);
      }
    );

    this.associerGps = new FormGroup({
      vehicule_id: new FormControl('', Validators.required),
      agent_id: new FormControl('', Validators.required),
      gps_id: new FormControl(this.gps.id),
      date_association: new FormControl(''),
      date_dissociation: new FormControl(''),
      observation: new FormControl('', Validators.required),
      statut: new FormControl('ASSOCIE', Validators.required),
    });

    // if(this.gps.last_association?.statut == 'ASSOCIE'){
    //   this.associerGps.get('date_dissociation').setValidators(Validators.required)
    //   this.associerGps.controls['statut'].setValue("DISSOCIE");
    // }else{
    //   this.associerGps.get('date_association').setValidators(Validators.required)
    //   this.associerGps.controls['statut'].setValue("ASSOCIE");
    // }

    if(this.gps.last_association?.statut == 'DISSOCIE' || this.gps.last_association == null){
      this.associerGps.get('date_association').setValidators(Validators.required)
      this.associerGps.controls['statut'].setValue("ASSOCIE");
    }else{
      this.associerGps.get('date_dissociation').setValidators(Validators.required)
      this.associerGps.controls['statut'].setValue("DISSOCIE");
      this.associerGps.controls['vehicule_id'].setValue(this.gps.last_association?.vehicule_id);
    }
  }

  filterTruck(event){
    if(event){
      console.log("EVENT", event)
      this.associerGps.controls['vehicule_id'].setValue(event.id);
    }
  }

  filterPersonnel(event){
    if(event){
      console.log("EVENT", event)
      this.associerGps.controls['agent_id'].setValue(event.id);
    }
  }

  associer(){
    console.log(this.associerGps.value)
    this.spinnerAdd = true;
    this.vehiculeService.associerGps(this.associerGps.value).subscribe( (data : any) => {
      console.log("ASSOCIER", data.response)
      if(this.gps.last_association?.statut == 'DISSOCIE' || this.gps.last_association == null){
        this._toast.success("GPS associé avec succés!");
      }else{
        this._toast.success("GPS dissocié avec succés!");
      }
      this.dialogRef.close(data.response)
      this.spinnerAdd = false
    },
    (error) => {
      console.log('error', error);
      this._toast.error("Une erreur est survenue lors de l'association de GPS!");
    })
  }

}
