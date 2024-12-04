import { ToastService } from './../../../../core/services/toast.service';
import { ParametreService } from 'app/core/services/parametre.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-motif',
  templateUrl: './add-motif.component.html',
  styleUrls: ['./add-motif.component.css']
})
export class AddMotifComponent implements OnInit {

  motif : FormGroup;
  spinner: boolean = false;
  mode : any;
  item : any;
  form_btn : any;

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<AddMotifComponent>,
      private parameterService: ParametreService,
      private _toast: ToastService,) { }

  ngOnInit(): void {

    this.mode = this.data["mode"]
    this.item = this.data["item"]
    console.log("MODE", this.mode)
    console.log("ITEM", this.item)
    if(this.mode == "add"){
      this.form_btn = "Ajouter"
      this.motif = new FormGroup({
        name: new FormControl("", Validators.required),
      })
    }else{
      this.form_btn = "Modifier"
      this.motif = new FormGroup({
        name: new FormControl(this.item.name, Validators.required),
      })
    }
  }

  addMotif(){
    this.spinner = true;
    if(this.mode == "add"){
      console.log("MODE AJOUt")
      console.log("data", this.motif.value)
      this.parameterService.addMotif( this.motif.value ).subscribe((data) => {
        this.spinner = false;
        this.dialogRef.close(data);
        this._toast.success("Motif ajouter avec succés !")
      },
      (error) => {
        this.spinner = false;
        console.log('error', error);
        this._toast.error("Une erreur est survenue lors de l'ajout de Motif  !");
      });
    }else{
      console.log("MODE EDIT")
      this.parameterService.editMotif( this.motif.value, this.item.uuid ).subscribe((data) => {
        this.spinner = false;
        this.dialogRef.close(data);
        this._toast.success("Motif modifier avec succés !")
      },
      (error) => {
        this.spinner = false;
        console.log('error', error);
        this._toast.error("Une erreur est survenue lors de la modification de type  !");
      });
    }
  }
}
