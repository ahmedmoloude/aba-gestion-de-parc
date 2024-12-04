import { ExtincteurService } from './../../../../core/services/extincteur.service';
import { VehiculeService } from './../../../../core/services/vehicule.service';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectDrivers } from 'app/core/store/resources/resources.selectors';
import { selectEnvVehiculePayload } from 'app/core/store/vehicule/vehicule.selectors';
import { selectEnvPayloadvolume } from 'app/core/store/volume/volume.selectors';
import { selectEnvPayloadtypeExtincteur } from 'app/core/store/typeExtincteur/typeExtincteur.selectors';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { addextincteur, updateextincteur } from 'app/core/store/extincteur/extincteur.actions';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'app/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {
  selectEnvExtincteurStatus,
  selectEnvExtincteurIsLoading,
} from 'app/core/store/extincteur/extincteur.selectors';
import { selectTrucks } from 'app/core/store/resources/resources.selectors';
import { PersonelService } from 'app/core/services/personel.service';
import { RessouresService } from 'app/core/services/ressoures.service';
import { selectEnvprestatairePayload } from 'app/core/store/prestataire/prestataire.selectors';
import { selectEnvPayloadAgence } from 'app/core/store/agence/agence.selectors';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';

@Component({
  selector: 'app-recharge-extincteur',
  templateUrl: './recharge-extincteur.component.html',
  styleUrls: ['./recharge-extincteur.component.css']
})
export class RechargeExtincteurComponent implements OnInit {
  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;

  item: any;
  type: any;
  drivers: any;
  vehicules: any;
  agences : any
  types: any;
  volumes: any;
  prestataires_achats: any;
  prestataires_recharges: any;
  form_btn : any;
  spinnerAdd : boolean;
  affect : any;
  date_achat : any;
  createExtincteur : FormGroup;
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}

  constructor(private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RechargeExtincteurComponent>,
    private boGridService: BoGridService,
    private personelService : PersonelService,
    private extincteurService : ExtincteurService,
    private ressourceService: RessouresService,
    private _toast: ToastService) {}

    // ngAfterViewInit(){
    //   if(this.type == "edit" ){
    //     this.searchComponents.toArray()[0].selectObject(this.item?.prestataire_achat)
    //   }
    // }

  ngOnInit(): void {
    this.item = this.data["item"];
    this.type = this.data["type"];
    console.log("type item", this.type, this.item)
    this.setForm();

    this.store.select(selectEnvprestatairePayload).subscribe((res) => {
      console.log(' prestatires ========>', res);
      this.data = res;
      // this.prestataires_achats = this.data.filter(d => d.type == 'ACHAT_EXTINCTEUR')
      this.prestataires_recharges = this.data.filter(d => d.type == 'RECHARGE_EXTINCTEUR')
    });
  }

  filterPrestataireRecharge(event){
    if(event){
      this.createExtincteur.controls['prestataire_recharge_id'].setValue(event.id);
    }
  }

  setForm(){
      this.createExtincteur = new FormGroup({
        matricule: new FormControl({ value: this.item.matricule, disabled: true }),
        n_extincteur: new FormControl({ value: this.item.n_extincteur, disabled: true }),
        date_achat: new FormControl({ value: this.item.date_achat, disabled: true }),
        date_fin_validite: new FormControl({ value: this.item.date_fin_validite, disabled: true }),
        date_affectation: new FormControl({ value: this.item.date_affectation, disabled: true }),
        prestataire_achat_id: new FormControl({ value: this.item.prestataire_achat_id, disabled: true }),
        affectee: new FormControl({ value: this.item.affectee, disabled: true }),
        driver_id: new FormControl({ value: this.item.driver_id, disabled: true }),
        truck_id: new FormControl({ value: this.item.truck_id, disabled: true }),
        agence_id: new FormControl({ value: this.item.agence_id, disabled: true }),
        montant: new FormControl({ value: this.item.montant, disabled: true }),
        type_id: new FormControl({ value: this.item.type_id, disabled: true }),
        volume_id: new FormControl({ value: this.item.volume_id, disabled: true }),
        date_recharge: new FormControl("", Validators.required),
        prestataire_recharge_id: new FormControl("", Validators.required),
        motif: new FormControl(""),
        description: new FormControl(""),
        montant_recharge: new FormControl(""),
        extincteur_id: new FormControl(this.item.id),
      })
      console.log('disabled', this.createExtincteur.controls['matricule'].disabled);

  }

  setDateAchat(value){
    console.log("DATE ACHAT", value)
    this.date_achat = value
  }

  rechargerExtincteur(){
    this.spinnerAdd = true
    console.log(this.createExtincteur.value)
    this.extincteurService.rechargerExtincteur(this.createExtincteur.value).subscribe( (data : any) => {
      console.log("ASSOCIER", data.response)
      this._toast.success("Extincteur rechargé avec succés!");
      this.dialogRef.close(data.response)
      this.spinnerAdd = false;
    },
    (error) => {
      console.log('error', error);
      this._toast.error("Une erreur est survenue lors de recharge de l\'extincteur !");
    })
  }
}
