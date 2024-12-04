import { selectEnvprestatairePayload } from './../../../../core/store/prestataire/prestataire.selectors';
import { AppState } from 'app/core/store/app.states';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material/dialog';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { ToastService } from 'app/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { PHONE_REGEX, phoneValidator } from 'app/shared/validators/validators';
@Component({
  selector: 'app-add-gps',
  templateUrl: './add-gps.component.html',
  styleUrls: ['./add-gps.component.css']
})
export class AddGpsComponent implements OnInit {

  createGps = new FormGroup({});
  gps : any;
  prestataires : any = [];
  form_btn : any;
  type : any;
  spinnerAdd : boolean;
  start_time: any;

  constructor(private store: Store<AppState>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<AddGpsComponent>,
        private vehiculeService : VehiculeService,
        private _toast: ToastService,) {}

  ngOnInit(): void {
    this.setForm()
    this.type = this.data["type"]
    console.log("type ngoniti====>", this.type)

    this.store.select(selectEnvprestatairePayload).subscribe((res) => {
      console.log(' prestatires ========>', res);
      this.data = res;
      this.prestataires = this.data.filter(d => d.type == 'GPS')
    });
  }

  setForm(){
    console.log("type setform====>", this.data["type"])
    if(this.data["type"] == "add"){
      this.form_btn = "Ajouter"

      this.createGps = new FormGroup({
        imei_gps: new FormControl("", Validators.required),
        date_acquisition_gps: new FormControl("", Validators.required),
        prestataire_id: new FormControl("", Validators.required),
        sonde: new FormControl("", Validators.required),
        operateur: new FormControl("", Validators.required),
        status: new FormControl("", Validators.required),
        date_mise_en_service: new FormControl("", Validators.required),
        phone: new FormControl("", [Validators.required, Validators.pattern(PHONE_REGEX), phoneValidator()]),
        montant: new FormControl("", Validators.required),
        observation: new FormControl(""),

      })
    }else{
      this.gps = this.data["item"]
      console.log("item recu", this.gps)
      this.form_btn = "Modifier"
      this.createGps = new FormGroup({
        imei_gps: new FormControl(this.gps.imei_gps, Validators.required),
        date_acquisition_gps: new FormControl(this.gps.date_acquisition_gps, Validators.required),
        prestataire_id: new FormControl(this.gps.prestataire_id, Validators.required),
        sonde:new FormControl(this.gps.sonde, Validators.required),
        operateur: new FormControl(this.gps.operateur, Validators.required),
        status: new FormControl(this.gps.status, Validators.required),
        date_mise_en_service: new FormControl(this.gps.date_mise_en_service, Validators.required),
        phone: new FormControl(this.gps.phone, [Validators.required, Validators.pattern(PHONE_REGEX), phoneValidator()]),
        montant: new FormControl(this.gps.montant, Validators.required),
        observation: new FormControl(this.gps.observation),
      })
    }
  }

  setDateDebut(e) {
    console.log("DATE DEBUT", e.target.value)
    this.start_time = e.target.value;
  }

  addGps(){
    console.log("gps", this.createGps.value)

      switch(this.type){
          case "add":
            console.log("add")
            console.log("type form add")
            this.spinnerAdd = true
            this.vehiculeService.addGps(this.createGps.value).subscribe(
              (data) => {
                console.log('data', data);
                this._toast.success("GPS ajouté avec succés");
                this.spinnerAdd = false;
                this.dialogRef.close(data["response"]);
              },
              (error) => {
                console.log('error', error);
                this.spinnerAdd = false;
                this._toast.error("Une erreur est survenue");
            });
              break;
          case "edit":
            console.log("edit")
            console.log("type form edit")
            this.spinnerAdd = true
            this.vehiculeService.editGps(this.createGps.value, this.gps.uuid).subscribe(
              (data) => {
                console.log('data', data);
                this._toast.success("Gps modifié avec succés");
                this.spinnerAdd = false;
                this.dialogRef.close(data["response"]);
              },
              (error) => {
                console.log('error', error);
                this.spinnerAdd = false;
                this._toast.error("Une erreur est survenue");
            });
              break;

          default :
          console.log("rien")
      }
  }

}
