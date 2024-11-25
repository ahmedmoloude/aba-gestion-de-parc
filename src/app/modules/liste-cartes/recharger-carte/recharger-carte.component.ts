import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { MatDialogRef } from '@angular/material/dialog';
import { selectEnvcarteIsLoading, selectEnvcarteStatus } from 'app/core/store/carte/carte.selectors';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { addcarte, updatecarte } from 'app/core/store/carte/carte.actions';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { ToastService } from '../../../core';

@Component({
  selector: 'app-recharger-carte',
  templateUrl: './recharger-carte.component.html',
  styleUrls: ['./recharger-carte.component.css']
})
export class RechargerCarteComponent implements OnInit {
  updateCartee = new FormGroup({});
  carte : any;
  services : any;
  form_btn : any;
  spinnerAdd : boolean;
  images = []

  constructor(private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RechargerCarteComponent>,
    private vehiculeService : VehiculeService,
    private _toast: ToastService,) {}

  ngOnInit(): void {
    this.carte = this.data["item"];
    console.log("item recu", this.carte, this.carte.uuid)

    this.setForm();
  }

  formatNumber(value) {
    // console.log("value", value)
    // console.log("123456789".toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "))
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  
  onSelectImage(event)
  {
    // this.file  = (event.target as HTMLInputElement).files[0];
    console.log(event.target.files[0], "file")
    this.images.push(event.target.files[0])
    console.log("images", this.images)
  }

  setForm(){
      this.updateCartee = new FormGroup({
        type: new FormControl(this.carte.type),
        n_carte: new FormControl(this.carte.n_carte),
        libelle: new FormControl(this.carte.libelle),
        solde: new FormControl(this.carte.solde),
        plafond: new FormControl(this.carte.plafond),
        type_affectation: new FormControl(this.carte.type_affectation),
        status: new FormControl(this.carte.status),
        montant: new FormControl("", Validators.required),
        type_paiement: new FormControl("", Validators.required),
        // date_update: new FormControl("", Validators.required),
        // type_recharge: new FormControl("ALIMENTATION", Validators.required),
        service_id: new FormControl(this.carte.service_id),
        fournisseur: new FormControl(this.carte.fournisseur),
        start_date: new FormControl(this.carte.start_date),
        end_date: new FormControl(this.carte.end_date),
        parc_id: new FormControl(this.carte.parc_id),
      })

  }

  editCarte(){
    console.log("form", this.updateCartee.value)

    if(this.updateCartee.invalid){
      console.log("invalid")
    }else{
      console.log("capacite", this.carte.plafond)
      console.log("old qte", this.carte.solde)
      var numberValue = Number(this.carte.solde);
      console.log(numberValue, "numberValue")
      console.log("new qte", this.updateCartee.get("montant").value)
      var qte = Number(this.carte.solde) + Number(this.updateCartee.get("montant").value);
      console.log("somme", qte)
      if(qte > this.carte.plafond){
        this._toast.success("Vous avez dépassé le plafond de la carte ");
      }else{
        this.spinnerAdd = true
        const formDataAutoroute = new FormData();
        formDataAutoroute.append('montant' , this.updateCartee.value['montant'])
        formDataAutoroute.append('type_paiement' , this.updateCartee.value['type_paiement'])
        formDataAutoroute.append('carte_id' , this.carte.id)
        formDataAutoroute.append('type_recharge' , 'ALIMENTATION')
  
        for (var i = 0; i < this.images.length; i++) { 
          console.log("for image", this.images[i])
          formDataAutoroute.append("images[]", this.images[i]);
        }
  
        if(this.images.length < 1){
          this.spinnerAdd = false;
          this._toast.warn("Remplir l'image")
        }else{
          this.spinnerAdd = true;
          this.vehiculeService.addDepense(formDataAutoroute).subscribe(
            (data) => {
              console.log('data', data);
              this._toast.success("Carte rechargée avec succés");
              this.dialogRef.close(data["response"])
              this.spinnerAdd = false
            },
            (error) => {
              this.spinnerAdd = false
              console.log('error', error);
          });
        }

        // console.log(this.updateCartee.value)
        // this.vehiculeService.updateCarte(this.updateCartee.value, this.carte.uuid).subscribe(
        //   (data) => {
        //     console.log('data', data);
        //     this._toast.success("Carte rechargée avec succés");
        //     this.spinnerAdd = false;
        //     this.dialogRef.close('data');
        //   },
        //   (error) => {
        //     console.log('error', error);
        //     this.spinnerAdd = false;
        //     this._toast.error("Une erreur est survenue");
        // });
      }
      
    }

    // this.store.dispatch(updatecarte({ data: this.updateCartee.value, uuid : this.carte.uuid}));
    //   this.store.select(selectEnvcarteIsLoading).subscribe((res) => {
    //     // console.log("spinnerAdd", res);
    //     this.spinnerAdd = res
    //   });
    //   this.store.select(selectEnvcarteStatus).subscribe((res) => {
    //     // console.log("status", res);
    //     if(res == 'SUCCESS'){
    //       this.dialogRef.close();
    //     }
    //   });

  }

}
