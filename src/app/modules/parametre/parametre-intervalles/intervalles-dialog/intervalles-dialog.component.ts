import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { addLimitation, fetchLimitation, updateLimitation } from 'app/core/store/limitation/limitation.actions';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ToastService } from '../../../../core';
import { selectEnvIsLoadingLimitation, selectEnvStatusLimitation } from 'app/core/store/limitation/limitation.selectors';
@Component({
  selector: 'app-intervalles-dialog',
  templateUrl: './intervalles-dialog.component.html',
  styleUrls: ['./intervalles-dialog.component.css']
})
export class IntervallesDialogComponent implements OnInit {
  createLimitation : FormGroup;
  types = [ 
    {"name" : "_NB_BL", "libelle" : "BL"},
    {"name" : "_NB_FA", "libelle" : "Facture"},
    {"name" : "_REGL_M", "libelle" : "Reglement"},
    {"name" : "_NB_COLIS", "libelle" : "Colis"},
    {"name" : "_NB_POIDS", "libelle" : "Poids"},
    {"name" : "STATEMENT", "libelle" : "Déclaration"},
    {"name" : "PHONE", "libelle" : "Téléphone"},
    {"name" : "AGENCY_CODE", "libelle" : "Code agence"},
    {"name" : "DECLARED_VALUE", "libelle" : "Val.Déc"},
    {"name" : "PS", "libelle" : "PS"},
    {"name" : "ENC", "libelle" : "Encombrement"}
  ];
    spinner : boolean ;
    limitation : any;
    button : string;
  constructor(private store: Store<AppState>,
    private _toast: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<IntervallesDialogComponent>) { }

  ngOnInit(): void {
    this.limitation = this.data["limitation"];
    // console.log("limit", this.limitation)
    this.setForm();
  }

  setForm(){
    // console.log(this.data["type"]);
    this.button = "Ajouter"
    if(this.data["type"] == "add"){
      this.createLimitation = new FormGroup({
        min: new FormControl("", Validators.required),
        max: new FormControl("", Validators.required),
        type: new FormControl("", Validators.required),
        accepted_value_type: new FormControl(""),
        valeur_type :  new FormControl("" , Validators.required),
      })
    }else{
      this.button = "Modifier"
      var jsonObject : any = JSON.parse(this.limitation.valeur)
      // console.log(jsonObject)
      this.createLimitation = new FormGroup({
        min: new FormControl(jsonObject.min, Validators.required),
        max: new FormControl(jsonObject.max, Validators.required),
        type: new FormControl(this.limitation.type, Validators.required),
        accepted_value_type: new FormControl(this.limitation.accepted_value_type),
        valeur_type: new FormControl(this.limitation.valeur_type , Validators.required ),
        
      })
    }
    
  }

  addLimitation(){
    this.store.select(selectEnvIsLoadingLimitation).subscribe((res) => {  
      this.spinner= res
      console.log("spinner", this.spinner)
    });
    // if(this.createLimitation.get("max").value < this.createLimitation.get("min").value){
    //   this._toast.warn("La valeur maximal doit etre maximale ou égale la valeur minimale");
    //   return ;
    // }
    if(this.data["type"] == "add"){
      this.store.dispatch(addLimitation({ data: this.createLimitation.value }));
      this.store.select(selectEnvStatusLimitation).subscribe((res) => {
        console.log("status", res);
        if(res == 'SUCCESS'){
          // this.store.dispatch(fetchLimitation());
          this.dialogRef.close();
        }
      });
    }else{
      this.store.dispatch(updateLimitation({data: this.createLimitation.value,uuid: this.limitation.uuid}));
      this.store.select(selectEnvStatusLimitation).subscribe((res) => {
        console.log("status", res);
        if(res == 'SUCCESS'){
          // this.store.dispatch(fetchLimitation());
          this.dialogRef.close();
        }
      });
    }
  }

}
