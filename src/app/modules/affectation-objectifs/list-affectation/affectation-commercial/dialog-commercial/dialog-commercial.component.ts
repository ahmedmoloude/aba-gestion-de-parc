
import { ParametreService } from 'app/core/services/parametre.service';
import { ToastService } from 'app/services';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PersonelService } from 'app/core/services/personel.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-commercial',
  templateUrl: './dialog-commercial.component.html',
  styleUrls: ['./dialog-commercial.component.css']
})
export class DialogCommercialComponent implements OnInit {

  createAffectation = new FormGroup({});
  commercials : any = [];
  objectif : any;
  mode : any;
  item : any;
  form_btn = "Ajouter";

  constructor(
    public dialog: MatDialog,
    private parametreService: ParametreService,
    private _toast: ToastService,
    private personelService: PersonelService,
    public dialogRef: MatDialogRef<DialogCommercialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    console.log("GET", this.data["objectif"])
    this.objectif = this.data["objectif"]
    this.mode = this.data["mode"]
    console.log("MODE", this.mode)
    this.item = this.data["item"]
    console.log("MODE", this.item)
    if(this.mode == "add"){
      this.form_btn = "Ajouter"
      this.createAffectation = new FormGroup({
        commercial_id: new FormControl("", Validators.required),
        objectif_id: new FormControl(this.objectif.id, Validators.required),
        annee: new FormControl(new Date(), Validators.required), //TO Do get current year
        janvier: new FormControl("", Validators.required),
        fevrier: new FormControl("", Validators.required),
        mars: new FormControl("", Validators.required),
        avril: new FormControl("", Validators.required),
        mai: new FormControl("", Validators.required),
        juin: new FormControl("", Validators.required),
        juillet: new FormControl("", Validators.required),
        aout: new FormControl("", Validators.required),
        septembre: new FormControl("", Validators.required),
        octobre: new FormControl("", Validators.required),
        novembre: new FormControl("", Validators.required),
        decembre: new FormControl("", Validators.required),
        agence_id : new FormControl(this.data['agence_id'] ?? '')
      })
    }else{
      this.form_btn = "Modifier"
      this.createAffectation = new FormGroup({
        commercial_id: new FormControl(this.item.commercial_id, Validators.required),
        objectif_id: new FormControl(this.objectif.id, Validators.required),
        annee: new FormControl(this.item.annee, Validators.required), //TO Do get current year
        janvier: new FormControl(this.item.janvier, Validators.required),
        fevrier: new FormControl(this.item.fevrier, Validators.required),
        mars: new FormControl(this.item.mars, Validators.required),
        avril: new FormControl(this.item.avril, Validators.required),
        mai: new FormControl(this.item.mai, Validators.required),
        juin: new FormControl(this.item.juin, Validators.required),
        juillet: new FormControl(this.item.juillet, Validators.required),
        aout: new FormControl(this.item.aout, Validators.required),
        septembre: new FormControl(this.item.septembre, Validators.required),
        octobre: new FormControl(this.item.octobre, Validators.required),
        novembre: new FormControl(this.item.novembre, Validators.required),
        decembre: new FormControl(this.item.decembre, Validators.required),
  
      })
    }


    this.personelService.personnelbyFunction(null, 'COMMERCIAL').subscribe(
      (data: any) => {
        console.log('data Commerciale', data);
        this.commercials = data.response;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  affecter(){
    console.log("AFFECTER", this.createAffectation.value)
    if(this.mode == "add"){
      this.parametreService.addAffectationObjectif(this.createAffectation.value).subscribe(
        (data) => {
          // console.log('data', data),
            this._toast.success('Objectif affecter avec succés!');
            this.dialogRef.close(data["response"]);
        },
        (error) => {
          console.log('error', error);
          this._toast.error('Une erreur est survenue lors de l\'affectation de l\'Objectif !');
        });
    }else{
      this.parametreService.editAffectationObjectif(this.createAffectation.value, this.item.uuid).subscribe(
        (data) => {
          // console.log('data', data),
            this._toast.success('Objectif affecter avec succés!');
            this.dialogRef.close(data["response"]);
        },
        (error) => {
          console.log('error', error);
          this._toast.error('Une erreur est survenue lors de l\'affectation de l\'Objectif !');
        });
    }

  }

}
