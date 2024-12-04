import { TypeRdvComponent } from './../type-rdv.component';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ParametreService } from 'app/core/services/parametre.service';
import { ToastService } from '../../../../core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-type-rdv',
  templateUrl: './add-type-rdv.component.html',
  styleUrls: ['./add-type-rdv.component.css']
})
export class AddTypeRdvComponent implements OnInit {

  typeRdv : FormGroup;
  spinner: boolean = false;
  mode : any;
  item : any;
  form_btn : any;

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<TypeRdvComponent>,
      private parameterService: ParametreService,
      private _toast: ToastService,) { }

  ngOnInit(): void {
    this.mode = this.data["mode"]
    this.item = this.data["item"]
    console.log("MODE", this.mode)
    console.log("ITEM", this.item)

    if(this.mode == "add"){
      this.form_btn = "Ajouter"
      this.typeRdv = new FormGroup({
        type: new FormControl("_RDV", Validators.required),
        libelle: new FormControl("", Validators.required),
        valeur: new FormControl("10", Validators.required),
      })
    }else{
      this.form_btn = "Modifier"
      this.typeRdv = new FormGroup({
        type: new FormControl("_RDV", Validators.required),
        libelle: new FormControl(this.item.libelle, Validators.required),
        valeur: new FormControl("10", Validators.required),
      })
    }
  }

  addType(){
    this.spinner = true;
    if(this.mode == "add"){
      console.log("MODE AJOUt")
      console.log("data", this.typeRdv.value)
      this.parameterService.addGlobalConfig( this.typeRdv.value ).subscribe((data) => {
        this.spinner = false;
        this.dialogRef.close(data);
        this._toast.success("Type ajouter avec succés !")
      },
      (error) => {
        this.spinner = false;
        console.log('error', error);
        this._toast.error("Une erreur est survenue lors de l'ajout de type  !");
      });
  }else{
    console.log("MODE EDIT")
    this.parameterService.editGlobalConfig( this.typeRdv.value, this.item.uuid ).subscribe((data) => {
    this.spinner = false;
    this.dialogRef.close(data);
    this._toast.success("Type ajouter avec succés !")
  },
  (error) => {
    this.spinner = false;
    console.log('error', error);
    this._toast.error("Une erreur est survenue lors de l'ajout de type  !");
  });
  }
}

}
