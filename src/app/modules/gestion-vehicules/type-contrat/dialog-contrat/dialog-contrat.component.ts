import { phoneValidator, PHONE_REGEX } from './../../../../shared/validators/validators';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { selectEnvVehiculePayload, selectEnvVehiculeIsLoading } from 'app/core/store/vehicule/vehicule.selectors';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { ToastService } from 'app/services';
import { addVehiculeContrat, updateVehiculeContrat } from 'app/core/store/vehiculecontrat/vehiculecontrat.actions';
import { selectEnvVehiculeContratStatus, selectEnvVehiculeContratIsLoading } from 'app/core/store/vehiculecontrat/vehiculecontrat.selectors';
import { selectTrucks } from 'app/core/store/resources/resources.selectors';
import { selectEnvprestatairePayload } from 'app/core/store/prestataire/prestataire.selectors';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';
@Component({
  selector: 'app-dialog-contrat',
  templateUrl: './dialog-contrat.component.html',
  styleUrls: ['./dialog-contrat.component.css'],
})
export class DialogContratComponent implements OnInit {
  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;

  filteredOptions: Observable<string[]>;
  addContrat = new FormGroup({});
  type : any;
  typeContrat = 'ACHAT';
  spinnerAdd : boolean;
  vehicule: any;
  paiements = ['VIREMENT', 'ESPECE']
  createContart : FormGroup;
  file : any;
  form_btn : any;
  item : any;
  start_time : any
  end_time : any;
  prestataires: any = [];
  locations : any = [];
  leasings : any =[];
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private store: Store<AppState>,
              public dialogRef: MatDialogRef<DialogContratComponent>,
              private boGridService: BoGridService,
              private vehiculeService: VehiculeService,
              private _toast: ToastService,) {}


  ngOnInit() {
    this.vehicule = this.data["vehicule"];
    console.log(" vehicule", this.vehicule)
    this.item = this.data["item"];
    console.log("item ", this.item)
    this.type = this.data["type"];
    console.log("type vehicule", this.type)
    this.setForm();
    this.store.select(selectEnvprestatairePayload).subscribe((res) => {
      console.log(' prestataires ========>', res);
      this.data = res;
      this.prestataires = this.data.filter(d => d.type == 'CONTRAT')
      this.locations = this.data.filter(d => d.type == 'LOCATION')
      console.log('SOCIETE_LOCATION', this.locations);
      this.leasings = this.data.filter(d => d.type == 'LEASING')
      console.log('SOCIETE_LEASING', this.leasings);
      setTimeout(() => {
        this.searchComponents.toArray()[0]?.selectObject(this.item?.prestataire)
        this.searchComponents.toArray()[1]?.selectObject(this.item?.societe)
        // this.searchComponents.toArray()[0].selectObject(this.item?.prestataire)
      });
    });
  }

  setForm(){
    if(this.type == "add" ){
      this.form_btn = "Ajouter"
      this.createContart = new FormGroup({
        truck_id: new FormControl("", Validators.required),
        type: new FormControl(this.typeContrat, Validators.required),
        date_contrat: new FormControl("", Validators.required),
        num_contract: new FormControl("", Validators.required),
        matriculeVehicule: new FormControl({ value: "", disabled: true }),
        codeVehicule: new FormControl({ value: "", disabled: true }),
        prestataire_id: new FormControl(""),
        contact: new FormControl({ value: "", disabled: true }),
        phone: new FormControl({ value: "", disabled: true }, [Validators.pattern(PHONE_REGEX), phoneValidator()]),
        // date_entree: new FormControl("", Validators.required),
        // kilometrage: new FormControl({ value: "", disabled: true }),
        kilometrage: new FormControl({ value: "", disabled: true }),
        type_paiement: new FormControl(""),
        montant_ht: new FormControl("", [Validators.min(0)]),
        montant_ttc: new FormControl({ value: "", disabled: false },  Validators.min(0)),
        tva: new FormControl("", Validators.min(0)),
        date_expiration: new FormControl(""),
        date_fin_garantie: new FormControl(""),
        date_prelevement: new FormControl(""),
        ste_id: new FormControl(""),
        rappel_jour: new FormControl("", Validators.min(0)),
        validite_jour: new FormControl("", Validators.min(0)),
        rappel_km: new FormControl("", Validators.min(0)),
        validite_km: new FormControl("", Validators.min(0)),
        durée_location: new FormControl("", Validators.min(0)),
      })
    }
    else{
      this.typeContrat = this.item.type;
      console.log("typeContrat", this.typeContrat)
      this.form_btn = "Modifier"
      this.createContart = new FormGroup({
        truck_id: new FormControl(this.item.truck_id, Validators.required),
        type: new FormControl(this.typeContrat, Validators.required),
        date_contrat: new FormControl(this.item.date_contrat, Validators.required),
        num_contract: new FormControl(this.item.num_contract, Validators.required),
        matriculeVehicule: new FormControl({ value: "", disabled: true }),
        codeVehicule: new FormControl({ value: "", disabled: true }),
        prestataire_id: new FormControl(this.item.prestataire_id),
        contact: new FormControl({ value: this.item.contact , disabled: true }),
        phone: new FormControl({ value: this.item.phone, disabled: true }, [Validators.pattern(PHONE_REGEX), phoneValidator()]),
        // date_entree: new FormControl(this.item.date_entree, Validators.required),
        // kilometrage: new FormControl({ value: "", disabled: true }),
        kilometrage: new FormControl({ value: "", disabled: true }),
        type_paiement: new FormControl(this.item.type_paiement),
        montant_ht: new FormControl(this.item.montant_ht),
        montant_ttc: new FormControl(this.item.montant_ttc),
        tva: new FormControl(this.item.tva),
        date_expiration: new FormControl(this.item.date_expiration),
        date_fin_garantie: new FormControl(this.item.date_fin_garantie),
        date_prelevement: new FormControl(this.item.date_prelevement),
        date_prolongement: new FormControl(this.item.date_prolongement),
        ste_id: new FormControl(this.item.ste_id),
        rappel_jour: new FormControl(this.item.rappel_jour),
        validite_jour: new FormControl(this.item.validite_jour),
        rappel_km: new FormControl(this.item.rappel_km),
        validite_km: new FormControl(this.item.validite_km),
        durée_location: new FormControl(this.item.durée_location),
      })
    }
    this.setValidators(this.typeContrat);
    this.createContart.controls['truck_id'].setValue(this.vehicule.id);
    this.createContart.controls['matriculeVehicule'].setValue(this.vehicule.matricule);
    this.createContart.controls['codeVehicule'].setValue(this.vehicule.code_interne);
    this.createContart.controls['kilometrage'].setValue(this.vehicule.km_initial);
    console.log('enable: ', this.createContart.controls.montant_ttc);
  }

  setDateDebut(e){
    console.log("DATE DEBUT", e)
    this.start_time= e;
  }

  setDateFin(e){
    console.log("DATE FIN", e)
    this.end_time= e;
  }

  getPrices(prixHT) {
    const prixTTC: number = prixHT * 1.2;
    const tva: number = prixTTC - prixHT;
    return {prixTTC: prixTTC.toFixed(2), tva: tva.toFixed(2)}
  }

  setMontantHt(event) {
    console.log('setMontantHt', event);

    let prices = this.getPrices(event);
    this.createContart.controls.tva.setValue(prices.tva);
    this.createContart.controls.montant_ttc.setValue(prices.prixTTC);
    this.createContart.controls.tva.disable();
  }

  onprestataireChange(event){
    if(event){
      console.log("EVENT", event)
      this.vehicule = event
      this.createContart.controls['prestataire_id'].setValue(event.id);
      this.createContart.controls['contact'].setValue(event.contact);
      this.createContart.controls['phone'].setValue(event.gsm_contact);
    }
  }

  onSteLocationChange(event){
    if(event){
      console.log("EVENT", event)
      this.createContart.controls['ste_id'].setValue(event.id);
    }
  }

  onSteLeasingChange(event){
    if(event){
      console.log("EVENT", event)
      this.createContart.controls['ste_id'].setValue(event.id);
    }
  }

  typeChange($event) {
    this.setForm();
    console.log($event.source.name, $event.value);
    this.typeContrat = $event.value;
    console.log("type", this.typeContrat)
    this.createContart.controls['type'].setValue($event.value);
    this.setValidators(this.typeContrat);
  }

  setValidators(type: string) {
    this.createContart.controls.date_expiration.clearValidators();
    this.createContart.controls.date_expiration.updateValueAndValidity();
    this.createContart.controls.date_fin_garantie.clearValidators();
    this.createContart.controls.date_fin_garantie.updateValueAndValidity();
    this.createContart.controls.date_prelevement.clearValidators();
    this.createContart.controls.date_prelevement.updateValueAndValidity();
    switch (type) {
      case 'ACHAT':
        this.createContart.controls.date_fin_garantie.setValidators(Validators.required)
        break;
      case 'LOCATION':
        this.createContart.controls.date_expiration.setValidators(Validators.required)
        break;
      case 'LEASING':
        this.createContart.controls.date_prelevement.setValidators(Validators.required)
        break;
    }
  }

  onSelectImage(event)
  {
    this.file  = (event.target as HTMLInputElement).files[0];
    console.log(this.file, "file")
  }

  addContratForm(){
    console.log("form", this.createContart)
    console.log("form", this.createContart.value)
    console.log("type", this.type)
    if(this.createContart.invalid){
      this._toast.error("Merci de remplir tous les champs  !")
      return;
    }
    const formData = new FormData();
    let value = this.createContart.getRawValue()
    for (var key in value) {
      if(value[key]){
        formData.append(key , value[key])
      }
    }
    if(this.type == "add"){
      console.log("add============================")
      // formData.append('kilometrage' , this.vehicule.km_initial)
      if(this.file){
        formData.append('file', this.file)
        this.store.dispatch(addVehiculeContrat({ data: formData }));
        this.store.select(selectEnvVehiculeContratIsLoading).subscribe((res) => {
          console.log("spinnerAdd", res)
          this.spinnerAdd = res;
        });
        this.store.select(selectEnvVehiculeContratStatus).subscribe((res) => {
          console.log("res", res)
          if(res == 'SUCCESS'){
            this.dialogRef.close();
          }
        });
      }else{
        this._toast.error("Remplir le document !")
      }
    }else{
      console.log("edit============================")

      // formData.append('kilometrage' , this.vehicule.km_initial)
      if(this.file){
        formData.append('file', this.file)
      }
      this.store.dispatch(updateVehiculeContrat({ data: formData, uuid:this.item.uuid }));
      this.store.select(selectEnvVehiculeContratIsLoading).subscribe((res) => {
        // console.log("spinnerAdd", res)
        this.spinnerAdd = res;
      });
      this.store.select(selectEnvVehiculeContratStatus).subscribe((res) => {
        // console.log("res", res)
        if(res == 'SUCCESS'){
          this.dialogRef.close();
        }
      });
    }
  }
}
