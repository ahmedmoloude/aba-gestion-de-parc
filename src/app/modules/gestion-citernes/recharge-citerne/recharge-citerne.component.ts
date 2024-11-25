import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { selectParc } from 'app/core/store/resources/resources.selectors';
import { selectEnvparcPayload } from 'app/core/store/parc/parc.selectors';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { ToastService } from '../../../core';
import { selectEnvprestatairePayload } from 'app/core/store/prestataire/prestataire.selectors';

@Component({
  selector: 'app-recharge-citerne',
  templateUrl: './recharge-citerne.component.html',
  styleUrls: ['./recharge-citerne.component.css']
})
export class RechargeCiterneComponent implements OnInit {

  citerne : any;
  parcs : any;
  file : any;

  fuel_suppliers = []
  recharge : FormGroup;
  spinner : boolean = false
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private store: Store<AppState>,
  public dialog: MatDialog,
  private vehiculeService : VehiculeService,
  public dialogRef: MatDialogRef<RechargeCiterneComponent>,
  private _toast: ToastService,) { }

  ngOnInit(): void {
    this.citerne = this.data["item"];
    console.log("data get recharge", this.citerne)

    this.store.select(selectEnvprestatairePayload).subscribe((res) => {
      this.fuel_suppliers = res.filter(d => d.type == 'FUEL')

      console.log('fuel_suppliers', this.fuel_suppliers)
    })

    this.store.select(selectEnvparcPayload).subscribe((res) => {
      // console.log(" parc========>", res)
      this.parcs = res
    });

    this.setForm();
  }

  setForm(){
    this.recharge = new FormGroup({

      carNumberPart1 :  new FormControl("" , Validators.maxLength(4)),
      carNumberPart2 :  new FormControl("" , [Validators.maxLength(1), Validators.pattern('^[A-Za-z\u0600-\u06FF]$')]),
      carNumberPart3 :  new FormControl("" , Validators.maxLength(2)),
      supplier_id :  new FormControl(""),
      supplier_driver_cin :  new FormControl(""),
      bl :  new FormControl(""),
      supplier_driver :  new FormControl(""),
      n_citerne: new FormControl({ value: this.citerne.n_citerne, disabled: true }),
      name: new FormControl({ value: this.citerne.name, disabled: true }),
      capacite: new FormControl({ value: this.citerne.capacite, disabled: true }),
      qte_reel: new FormControl({ value: this.citerne.qte_reel, disabled: true }),
      date_installation: new FormControl({ value: this.citerne.date_installation, disabled: true }),
      parc_id: new FormControl({ value: this.citerne.parc_id, disabled: true }),
      stock_min: new FormControl({ value: this.citerne.stock_min, disabled: true }),
      citerne_id: new FormControl(this.citerne.id),
      montant: new FormControl(""),
      compteur: new FormControl(""),
      quantite: new FormControl("", Validators.required),
      type: new FormControl("ALIMENTATION", Validators.required),
    })
  }

  limitInputLength(event: any): void {
    const inputValue: string = event.target.value;

    // Limitez la longueur à 4 caractères
    if (inputValue.length > 4) {
      event.target.value = inputValue.slice(0, 3);
    }
    console.log('carNumberPart1',this.recharge.controls.carNumberPart1.value);

  }
  limitInputOneLength(event: any): void {
    const inputValue: string = event.target.value;

    // Limitez la longueur à 4 caractères
    if (inputValue.length > 2) {
      event.target.value = inputValue.slice(0,1);
    }
    console.log('carNumberPart3',this.recharge.controls.carNumberPart3.value);

  }

  recharger(){

    if(this.recharge.invalid){
      console.log("invalid")
    }else{
      var qte = Number(this.citerne.qte_reel) + Number(this.recharge.get("quantite").value);
      console.log("somme", qte)
      if(qte > this.citerne.capacite){
        this._toast.success("Vous avez dépassé la capacité de la citerne ");
      }else{
        this.spinner = true
        console.log(this.recharge.value)
        const formData = new FormData();
        for (var key in this.recharge.value) {
          if(this.recharge.value[key]){
            formData.append(key , this.recharge.value[key])
          }
        }
        if(this.file){
          formData.append('file', this.file)
        }
        this.vehiculeService.addMouvement(formData).subscribe(
          (data) => {
            console.log('data', data);
            this._toast.success("Citerne rechargée avec succés");
            this.spinner = false;
            this.dialogRef.close('data');
          },
          (error) => {
            console.log('error', error);
            this.spinner = false;
            this._toast.error("Une erreur est survenue");
        });
      }
    }
  }

  onSelectImage(event)
  {
    console.log(event.target.files[0], "file")
    this.file = (event.target.files[0])
    console.log("images", this.file)
  }

}
