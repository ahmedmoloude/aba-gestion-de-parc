import { DialogCommercialComponent } from './../../affectation-commercial/dialog-commercial/dialog-commercial.component';
import { PersonelService } from 'app/core/services/personel.service';
import { ToastService } from 'app/services';
import { ParametreService } from 'app/core/services/parametre.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { RessouresService } from 'app/core/services/ressoures.service';

@Component({
  selector: 'app-dialog-client',
  templateUrl: './dialog-client.component.html',
  styleUrls: ['./dialog-client.component.css']
})
export class DialogClientComponent implements OnInit {

  createAffectation = new FormGroup({});
  // commercials : any = [];
  agence : any;
  mode : any;
  type : any;
  objectif : any;
  item : any;
  // item : any;
  form_btn = "Ajouter";
  sectors = []


  dialog_type;
  commercials = []

  constructor(
    public dialog: MatDialog,
    private parametreService: ParametreService,
    private _toast: ToastService,
    private personelService: PersonelService,
    private ressourceService : RessouresService,
    public dialogRef: MatDialogRef<DialogCommercialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.agence = this.data["agence"]
    this.mode = this.data["mode"]
    this.type = this.data["type"]
    this.objectif = this.data["objectif"]
    this.item = this.data["item"]

    this.dialog_type = this.data["dialog_type"]
    console.log("agence", this.data["agence"])
    console.log("mode", this.data["mode"])
    console.log("type", this.data["type"])
    console.log("objectif", this.data["objectif"])
    console.log("item", this.data["item"])

    this.objectif = this.data["objectif"]

    console.log('objectif', this.objectif)
    


    this.personelService.personnelbyFunction(null, 'COMMERCIAL').subscribe(
      (data: any) => {
        console.log('data Commerciale', data);
        this.commercials = data.response;
      },
      (error) => {
        console.log('error', error);
      }
    );
    this.ressourceService.getSectors().subscribe((res)=>{

      this.sectors = res
    })

    // this.agence = this.data["agence"]
    this.mode = this.data["mode"]
    // this.type = this.data["type"]

    // console.log("agence", this.data["agence"])
    // console.log("mode", this.data["mode"])
    // console.log("type", this.data["type"])

    if(this.mode == "add"){
      this.form_btn = "Ajouter"


      if (this.dialog_type == "agence-simple"){ 
        this.createAffectation = new FormGroup({
          agence_id: new FormControl(this.agence, Validators.required),
          objectif_id: new FormControl(this.objectif.id, Validators.required),
          type: new FormControl(this.type, Validators.required),
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
        })
      }
      else if (this.dialog_type == 'agence-sector-commercial'){

        this.createAffectation = new FormGroup({  
          commercial_id: new FormControl("", Validators.required),
          annee: new FormControl(new Date()),
          agence_id: new FormControl(this.agence, Validators.required),

          objectif_id: new FormControl(this.objectif.id, Validators.required),
          sectors : new FormArray([])
        })

        this.addNewSector();
      }
      else {
        this.createAffectation = new FormGroup({  
          commercial_id: new FormControl("", Validators.required),
          annee: new FormControl(new Date()),
          objectif_id: new FormControl(this.objectif.id, Validators.required),
          sectors : new FormArray([])
        })

        this.addNewSector();

      }
     

      console.log('form group' , this.createAffectation.value)
    }else{
      this.form_btn = "Modifier"

      if (this.dialog_type == "agence-simple"){ 
        this.createAffectation = new FormGroup({
          agence_id: new FormControl(this.item.agence_id, Validators.required),
          objectif_id: new FormControl(this.objectif.id, Validators.required),
          type: new FormControl(this.type, Validators.required),
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

      else{
        this.createAffectation = new FormGroup({
          commercial_id: new FormControl(this.data['commercial_id'], Validators.required),
          objectif_id: new FormControl(this.objectif.id, Validators.required),
          annee: new FormControl(new Date()),
          sectors : new FormArray([ ]),
        })

          this.data["sectors"]?.forEach((sec) => {
            console.log('sect' , sec);
            this.addNewSector(sec?.sector?.id,  sec?.janvier , sec?.fevrier , sec?.mars , sec?.avril , sec?.mai , sec?.juin , sec?.juillet , sec?.aout , sec?.septembre , sec?.octobre , sec?.novembre , sec?.decembre );
          });
        
      }



    
     
    }
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




  addNewSector(sector_id  = '' , janvier = '', fevrier = '', mars = '', avril = '', mai = '', juin = '', juillet = '', aout = '', septembre = '', octobre = '', novembre = '', decembre = ''): void {
    const sectors = this.createAffectation.get('sectors') as FormArray;

    console.log('juin' , juin )
    console.log('decembre' , decembre )

    const newSector = new FormGroup({
      annee: new FormControl(new Date()),
      sector_id : new FormControl(sector_id, Validators.required),
      janvier: new FormControl(janvier, Validators.required),
      fevrier: new FormControl(fevrier, Validators.required),
      mars: new FormControl(mars, Validators.required),
      avril: new FormControl(avril, Validators.required),
      mai: new FormControl(mai, Validators.required),
      juin: new FormControl(juin, Validators.required),
      juillet: new FormControl(juillet, Validators.required),
      aout: new FormControl(aout, Validators.required),
      septembre: new FormControl(septembre, Validators.required),
      octobre: new FormControl(octobre, Validators.required),
      novembre: new FormControl(novembre, Validators.required),
      decembre: new FormControl(decembre, Validators.required),
    });
    sectors.push(newSector);
  }
  


  submit(){

    console.log('form is valid ' , this.createAffectation.valid)
    if (!this.createAffectation.valid) {
      return;
    }


    if (this.dialog_type == 'agence-simple') {
       return this.affecter()
    }
    

    let payload = {...this.createAffectation.value , customer_type : this.data?.customer_type}

    if(this.mode == "add") {
      this.parametreService.addAffectationObjectifBySector(payload).subscribe((res) => {
        this.dialogRef.close();
        console.log('res.....'  , res);
      })
    }
    else{ 
      this.parametreService.editAffectationObjectifBySector(payload , this.item.id).subscribe((res) => {
        this.dialogRef.close();
        console.log('res.....'  , res);
      })
    }
  }
}
