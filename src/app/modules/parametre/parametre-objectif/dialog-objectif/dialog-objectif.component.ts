import { selectEnvprestataireStatus } from './../../../../core/store/prestataire/prestataire.selectors';
import { MatDialogRef } from '@angular/material/dialog';
import { ParametreService } from 'app/core/services/parametre.service';
import { ToastService } from 'app/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { selectEnvprestatairePayload, selectEnvprestataireIsLoading } from '../../../../core/store/prestataire/prestataire.selectors';
import { addprestataire } from '../../../../core/store/prestataire/prestataire.actions';
import { AppState } from 'app/core/store/app.states';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-dialog-objectif',
  templateUrl: './dialog-objectif.component.html',
  styleUrls: ['./dialog-objectif.component.css']
})
export class DialogObjectifComponent implements OnInit {

  createObjectif= new FormGroup({});
  form_btn : any;
  objectif : any;
  mode : any;
  spinnerAdd : boolean;
  relations = [
    { name: 'RDV', libelle: 'rendez-vous' },
    { name: 'TACHE', libelle: 'Tâche' },
    { name: 'DEVIS', libelle: 'Devis' },
    { name: 'CLIENT', libelle: 'Client' },
    { name: 'PROSPECT', libelle: 'Prospect' },
    { name: 'FACTURE', libelle: 'Facture' },
    { name: 'OFFRE_COMMERCIALE', libelle: 'Offre commerciale' },
    { name: 'CHIFFRE_AFFAIRE', libelle: 'chiffre d\'affaire' },
  ];

  constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private store: Store<AppState>,
        public dialogRef: MatDialogRef<DialogObjectifComponent>,
        private parametreService : ParametreService,
        private _toast: ToastService,) {}

  ngOnInit(): void {
    this.mode = this.data["mode"]
    this.setForm()
  }

  setForm(){
    if(this.data["mode"] == "add"){
      this.form_btn = "Ajouter"
      this.createObjectif = new FormGroup({
        name: new FormControl("", Validators.required),
        type: new FormControl("", Validators.required),
        relation: new FormControl("", Validators.required),
        is_comercial: new FormControl(false),
        is_agence: new FormControl(false),
        is_secteur: new FormControl(false),
      })
    }else{
      this.objectif = this.data["item"]
      this.form_btn = "Modifier"
      this.createObjectif = new FormGroup({
        name: new FormControl(this.objectif.name , Validators.required),
        type: new FormControl(this.objectif.type, Validators.required),
        relation: new FormControl(this.objectif.relation, Validators.required),
        is_comercial: new FormControl(this.objectif.is_comercial, Validators.required),
        is_agence: new FormControl(this.objectif.is_agence, Validators.required),
        is_secteur: new FormControl(this.objectif.is_secteur, Validators.required),
      })
    }

  }

  addObjectif(){
    console.log("gps", this.createObjectif.value)
    console.log("is_secteur", this.createObjectif.get("is_secteur").value)
    console.log("is_comercial", this.createObjectif.get("is_comercial").value)
    if(this.createObjectif.get("is_secteur").value == true && this.createObjectif.get("is_comercial").value == false){
      this._toast.error("Le secteur doit être choisi obligatoirement avec le commercial !");
      return;
    }

      switch(this.mode){
          case "add":
            console.log("add")
            console.log("type form add")
            this.spinnerAdd = true
            this.parametreService.addObjectif(this.createObjectif.value).subscribe(
              (data) => {
                console.log('data', data);
                this._toast.success("Objectif ajouté avec succés");
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
            this.parametreService.editObjectif(this.createObjectif.value, this.objectif.uuid).subscribe(
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
              break;
          
          default :
          console.log("rien")
      }
  }



}
