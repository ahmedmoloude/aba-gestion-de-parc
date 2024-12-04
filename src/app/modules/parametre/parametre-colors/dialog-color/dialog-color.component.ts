import { addcarte } from 'app/core/store/carte/carte.actions';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { AppState } from 'app/core/store/app.states';
import { ToastService } from 'app/services';

@Component({
  selector: 'dialog-color',
  templateUrl: './dialog-color.component.html',
  styleUrls: ['./dialog-color.component.css']
})
export class DialogColorComponent implements OnInit {
  createCouleur = new FormGroup({});
  color : any;
  prestataires : any = [];
  form_btn : any;
  type : any;
  spinnerAdd : boolean;

  constructor(private store: Store<AppState>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<DialogColorComponent>,
        private vehiculeService : VehiculeService,
        private _toast: ToastService,) {}

  ngOnInit(): void {
    this.setForm()
    this.type = this.data["type"]
    console.log("type ====>", this.type)
  }

  setForm(){
    console.log("type setform====>", this.data["type"])
    if(this.data["type"] == "add"){
      this.form_btn = "Ajouter"

      this.createCouleur = new FormGroup({
        name: new FormControl("", Validators.required),
      })
    }else{
      this.color = this.data["item"]
      console.log("item recu", this.color)
      this.form_btn = "Modifier"
      this.createCouleur = new FormGroup({
        name: new FormControl(this.color.name, Validators.required),
      })
    }
  }

  addCouleur(){
    console.log("gps", this.createCouleur.value)

      switch(this.type){
          case "add":
            console.log("add")
            console.log("type form add")
            this.spinnerAdd = true
            this.vehiculeService.addColor(this.createCouleur.value).subscribe(
              (data) => {
                console.log('data', data);
                this._toast.success("Couleur ajouté avec succés");
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
            this.vehiculeService.editColor(this.createCouleur.value, this.color.uuid).subscribe(
              (data) => {
                console.log('data', data);
                this._toast.success("Couleur modifié avec succés");
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
