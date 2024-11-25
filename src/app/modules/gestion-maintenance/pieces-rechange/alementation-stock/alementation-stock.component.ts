import { Item } from 'app/core/models/facturation/item.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { AppState } from 'app/core/store/app.states';
import { ToastService } from 'app/services';
import { selectEnvprestatairePayload } from 'app/core/store/prestataire/prestataire.selectors';

@Component({
  selector: 'app-alementation-stock',
  templateUrl: './alementation-stock.component.html',
  styleUrls: ['./alementation-stock.component.css']
})
export class AlementationStockComponent implements OnInit {

  piece : any;
  file : any;
  prestataires : any;
  recharge : FormGroup;
  spinner : boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private store: Store<AppState>,
              public dialog: MatDialog,
              private vehiculeService : VehiculeService,
              public dialogRef: MatDialogRef<AlementationStockComponent>,
              private _toast: ToastService) { }

  ngOnInit(): void {
    this.piece = this.data["item"];
    console.log("PIECE TO CHARGE ", this.piece)
    this.setForm();

    this.store.select(selectEnvprestatairePayload).subscribe((res) => {
      console.log(' prestatires ========>', res);
      this.prestataires = res.filter(d => d.type == 'PIECE_RECHANGE')
    });
  }

  setForm(){
    this.recharge = new FormGroup({
      uuid: new FormControl(this.piece?.uuid, Validators.required),
      prix_unitaire: new FormControl("", Validators.required),
      quantite: new FormControl("", Validators.required),
      montant_ht: new FormControl({value:"", disabled: true}, Validators.required),
      montant_ttc: new FormControl({value:"", disabled: true}, Validators.required),
      tva: new FormControl({value:"", disabled: true}, Validators.required),
      prestataire_id: new FormControl("", Validators.required),
    })

      // Subscribe to value changes of prix_unitaire and quantite
    this.recharge.get('prix_unitaire').valueChanges.subscribe(() => {
      this.calculateMontant();
    });

    this.recharge.get('quantite').valueChanges.subscribe(() => {
      this.calculateMontant();
    });
  }

    // Function to calculate montant_ht
    calculateMontant() {
      const prixUnitaire = this.recharge.get('prix_unitaire').value;
      const quantite = this.recharge.get('quantite').value;

      // Perform the calculation and update the montant_ht control
      const montantHt = prixUnitaire * quantite;
      const montantTTc = montantHt * 1.2;
      const tva = montantTTc - montantHt;
      this.recharge.get('montant_ht').setValue(montantHt.toFixed(2));
      this.recharge.get('tva').setValue(tva.toFixed(2));
      this.recharge.get('montant_ttc').setValue(montantTTc.toFixed(2));
    }

  onSelectImagePiece(event){
    this.file = (event.target as HTMLInputElement).files[0];
  }

  recharger(){

    if(this.recharge.invalid){
      console.log("invalid")
    }else{

      this.spinner = true
      const formData = new FormData();
      const formValue = this.recharge.getRawValue();
      for (var key in formValue) {
        if(formValue[key]){
          formData.append(key , formValue[key])
        }
      }
      if(this.file){
        formData.append('file', this.file)
      }

      this.vehiculeService.alimenterPieceRechange(formData).subscribe(
        (data) => {
          console.log('data', data);
          this._toast.success("Stock piéce alimenté avec succés");
          this.spinner = false;
          this.dialogRef.close(data["response"]);
        },
        (error) => {
          console.log('error', error);
          this.spinner = false;
          this._toast.error("Une erreur est survenue");
      });
    }
  }

}
