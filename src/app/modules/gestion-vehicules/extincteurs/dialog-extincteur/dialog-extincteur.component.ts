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
import * as moment from 'moment';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';

@Component({
  selector: 'app-dialog-extincteur',
  templateUrl: './dialog-extincteur.component.html',
  styleUrls: ['./dialog-extincteur.component.css']
})
export class DialogExtincteurComponent implements OnInit {
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
  date_fin_validite : any;
  date_affectation : any
  currentDate : any;
  buttonDisabled = false;
  createExtincteur : FormGroup;
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}

  constructor(private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogExtincteurComponent>,
    private boGridService: BoGridService,
    private personelService : PersonelService,
    private vehiculeService : VehiculeService,
    private ressourceService: RessouresService,
    private _toast: ToastService) {}


  ngOnInit(): void {
    this.currentDate = moment().format('YYYY-MM-DD');
    // console.log("DATE NOW", this.currentDate)
    this.item = this.data["item"];
    this.type = this.data["type"];
    console.log("type item", this.type, this.item);
    this.affect = this.item?.affectee;
    this.setForm();

    // this.store.select(selectDrivers).subscribe((res) => {
    //   console.log(" drivers========>", res)
    //   this.drivers = res
    // });

    this.personelService.personnelbyFunction(null, 'DRIVER').subscribe(
      (data:any) => {
        // console.log("data conducteur", data)
        this.drivers = data.response;
        setTimeout(() => {
          if(this.affect === 'CONDUCTEUR')
          this.searchComponents.toArray()[1]?.selectObject(this.item?.driver)
        });
      },
      (error) => {
        console.log('error', error);
      });


    this.ressourceService.getTrucks().subscribe(
      (data:any) => {
        // console.log("data conducteur", data)
        this.vehicules = data.response;
        setTimeout(() => {
          if(this.affect === 'VEHICULE')
          this.searchComponents.toArray()[1]?.selectObject(this.item?.truck)
        });
      }
    );

    this.store.select(selectEnvprestatairePayload).subscribe((res) => {
      console.log(' prestatires ========>', res);
      this.data = res;
      this.prestataires_achats = this.data.filter(d => d.type == 'ACHAT_EXTINCTEUR')
      this.prestataires_recharges = this.data.filter(d => d.type == 'RECHARGE_EXTINCTEUR')
    });

    this.store.select(selectEnvPayloadvolume).subscribe((res) => {
      console.log(" volume========>", res)
      this.volumes = res
    });

    this.store.select(selectEnvPayloadtypeExtincteur).subscribe((res) => {
      console.log(" type========>", res)
      this.types = res
    });

    this.store.select(selectEnvPayloadAgence).subscribe((res) => {
      this.agences = res;
      console.log(' agence========>', this.agences);
      if(this.affect === 'AGENCE'){
        setTimeout(() => {
          this.searchComponents.toArray()[1]?.selectObject(this.item?.agence)
        });
      }
    });

  }

  ngAfterViewInit(){
    if(this.type == "edit" ){
      console.log('this.searchComponents.toArray()');
      console.log(this.searchComponents.toArray());
      this.searchComponents.toArray()[0]?.selectObject({name: this.item?.affectee})
      this.searchComponents.toArray()[2]?.selectObject(this.item?.prestataire_achat)
      this.searchComponents.toArray()[3]?.selectObject(this.item?.type)
      this.searchComponents.toArray()[4]?.selectObject(this.item?.volume)
      // if(this.affect === 'CONDUCTEUR'){
      //   this.searchComponents.toArray()[1]?.selectObject(this.item?.driver)
      // }
      // if(this.affect === 'VEHICULE'){
      //   setTimeout(() => {
      //     this.searchComponents.toArray()[1]?.selectObject(this.item?.truck)
      //   });
      // }
      // if(this.affect === 'AGENCE'){
      //   setTimeout(() => {
      //     this.searchComponents.toArray()[1]?.selectObject(this.item?.agence)
      //   });
      // }
    }
  }

  affectation($event){
    this.affect = $event
    this.createExtincteur.get('driver_id').clearValidators();
    this.createExtincteur.get('driver_id').updateValueAndValidity();
    this.createExtincteur.get('truck_id').clearValidators();
    this.createExtincteur.get('truck_id').updateValueAndValidity();
    this.createExtincteur.get('agence_id').clearValidators();
    this.createExtincteur.get('agence_id').updateValueAndValidity();
    console.log("affectation", this.affect)
    if(this.affect === 'CONDUCTEUR'){
      console.log("affectation CONDUCTEUR")
      this.createExtincteur.get('driver_id').setValidators(Validators.required)
    }
    if(this.affect === 'VEHICULE'){
      console.log("affectation DRIVER")
      this.createExtincteur.get('truck_id').setValidators(Validators.required)
    }
    if(this.affect === 'AGENCE'){
      console.log("affectation Agence")
      this.createExtincteur.get('agence_id').setValidators(Validators.required)
    }
  }

  setForm(){
    if(this.type== "add"){
      this.form_btn = "Ajouter"
      console.log("form set")

      this.createExtincteur = new FormGroup({
        matricule: new FormControl("", Validators.required),
        n_extincteur: new FormControl("", Validators.required),
        date_achat: new FormControl("", Validators.required),
        date_fin_validite: new FormControl("", Validators.required),
        date_affectation: new FormControl("", Validators.required),
        prestataire_achat_id: new FormControl("", Validators.required),
        affectee: new FormControl("", Validators.required),
        driver_id: new FormControl(""),
        truck_id: new FormControl(""),
        agence_id: new FormControl(""),
        montant: new FormControl("", Validators.required),
        type_id: new FormControl("", Validators.required),
        volume_id: new FormControl("", Validators.required),
      })
    }else{
      this.form_btn = "Modifier"
      this.createExtincteur = new FormGroup({
        // code - N° d'extincteur - date d'achat - date de fin de validité - date fin d'affectation - affecté à -  véhicule ou conducteur - prestataire - type - volume
        matricule: new FormControl(this.item.matricule, Validators.required),
        n_extincteur: new FormControl(this.item.n_extincteur, Validators.required),
        date_achat: new FormControl(this.item.date_achat, Validators.required),
        date_fin_validite: new FormControl(this.item.date_fin_validite, Validators.required),
        date_affectation: new FormControl(this.item.date_affectation, Validators.required),
        prestataire_achat_id: new FormControl(this.item.prestataire_achat_id, Validators.required),
        affectee: new FormControl(this.item.affectee, Validators.required),
        type_id: new FormControl(this.item.type_id, Validators.required),
        volume_id: new FormControl(this.item.volume_id, Validators.required),
        driver_id: new FormControl(this.item.driver_id),
        truck_id: new FormControl(this.item.truck_id),
        agence_id: new FormControl(this.item.agence_id),
        montant: new FormControl(this.item.montant),
      })
      this.affectation(this.item?.affectee);
    }
  }

  setDateAchat(value){
    // this.createExtincteur.get('date_fin_validite').clearValidators();
    // this.createExtincteur.get('date_fin_validite').updateValueAndValidity();

    // this.createExtincteur.get('date_affectation').clearValidators();
    // this.createExtincteur.get('date_affectation').updateValueAndValidity();
    // console.log("DATE ACHAT", value)
    // this.createExtincteur.controls.date_fin_validite.setValidators(Validators.required)
    // this.createExtincteur.get('date_fin_validite').setValidators(Validators.min(value))
    // this.createExtincteur.get('date_affectation').updateValueAndValidity();

    // this.createExtincteur.get('date_affectation').setValidators(Validators.min(value))
    // this.createExtincteur.get('date_affectation').setValidators(Validators.required)
    // this.createExtincteur.get('date_fin_validite').updateValueAndValidity();


    this.date_achat = value;
    this.createExtincteur.get('date_fin_validite').setValue('');
    this.createExtincteur.get('date_affectation').setValue('');

  }

  setDateFinValidite(value){
    this.date_fin_validite = value;
    this.createExtincteur.get('date_affectation').setValue('');
    console.log("DATE Fin VALIDITE", value)
    console.log("DATE CURRENT", this.currentDate)
    if(value < this.currentDate){
      this.buttonDisabled = true;
      console.log("DISALED ")
      this.createExtincteur.controls['affectee'].disable();
      this.createExtincteur.controls['affectee'].setValue(null);
      this.createExtincteur.controls['truck_id'].setValue(null);
      this.createExtincteur.controls['driver_id'].setValue(null);
      this.createExtincteur.controls['agence_id'].setValue(null);
    }else{
      this.buttonDisabled = false;
      console.log("ENABLE ")
      this.createExtincteur.controls['affectee'].enable();
      if(this.item){
        this.createExtincteur.controls['affectee'].setValue(this.item.affectee);
        this.createExtincteur.controls['truck_id'].setValue(this.item.truck_id);
        this.createExtincteur.controls['driver_id'].setValue(this.item.driver_id);
        this.createExtincteur.controls['agence_id'].setValue(this.item.agence_id);
      }
      // this.createExtincteur.get('date_affectation').clearValidators();
      // this.createExtincteur.get('date_affectation').updateValueAndValidity();
      // this.createExtincteur.get('date_affectation').setValidators([Validators.max(this.date_fin_validite), Validators.min(this.date_achat)])
    }
  }

  setDateAffectation(value){
    this.date_affectation = value
    console.log("DATE affectation", value)
    if(this.date_affectation < this.date_achat || this.date_affectation > this.date_fin_validite){
      this.buttonDisabled = true;
      console.log("DISALED ")
      this.createExtincteur.controls['affectee'].disable();
      this.createExtincteur.controls['affectee'].setValue(null);
      this.createExtincteur.controls['truck_id'].setValue(null);
      this.createExtincteur.controls['driver_id'].setValue(null);
      this.createExtincteur.controls['agence_id'].setValue(null);
    }else{
      this.buttonDisabled = false;
      console.log("ENABLE ")
      this.createExtincteur.controls['affectee'].enable();
      if(this.item){
        this.createExtincteur.controls['affectee'].setValue(this.item.affectee);
        this.createExtincteur.controls['truck_id'].setValue(this.item.truck_id);
        this.createExtincteur.controls['driver_id'].setValue(this.item.driver_id);
        this.createExtincteur.controls['agence_id'].setValue(this.item.agence_id);
      }
    }
  }

  addExtincteur(){
    console.log("data a envoyer", this.createExtincteur.value);
    if(this.createExtincteur.invalid){
      this._toast.warn("Veuillez remplir tous les champs obligatoires!")
      return;
    }
    if (
      !(
        this.createExtincteur.controls.truck_id.value ||
        this.createExtincteur.controls.driver_id.value
      )
    ) {
      this._toast.warn('Veuillez remplir le conducteur ou le véhicule!');
      return;
    }
    if(this.type== "add"){
      console.log("mode AJOUT")
      this.store.dispatch(addextincteur({ data: this.createExtincteur.value}));
      this.store.select(selectEnvExtincteurIsLoading).subscribe((res) => {
        console.log("spinner", res);
        this.spinnerAdd = res
      });
      this.store.select(selectEnvExtincteurStatus).subscribe((res) => {
        console.log("status", res);
        if(res == 'SUCCESS'){
          this.dialogRef.close();
        }
      });
    }else{
      console.log("mode update")
      this.store.dispatch(updateextincteur({ data: this.createExtincteur.value, uuid: this.item.uuid}));
      this.store.select(selectEnvExtincteurIsLoading).subscribe((res) => {
        console.log("spinner", res);
        this.spinnerAdd = res
      });
      this.store.select(selectEnvExtincteurStatus).subscribe((res) => {
        console.log("status", res);
        if(res == 'SUCCESS'){
          this.dialogRef.close();
        }
      });
    }
  }

  filterVolume(event){
    if(event){
      this.createExtincteur.controls['volume_id'].setValue(event.id);
    }
  }

  filterType(event){
    if(event){
      this.createExtincteur.controls['type_id'].setValue(event.id);
    }
  }

  filterPrestataireAchat(event){
    if(event){
      this.createExtincteur.controls['prestataire_achat_id'].setValue(event.id);
    }
  }

  filterAgence(event){
    if(event){
      this.createExtincteur.controls['agence_id'].setValue(event.id);
    }
  }

  filterTruck(event){
    if(event){
      this.createExtincteur.controls['truck_id'].setValue(event.id);
    }
  }

  filterDriver(event){
    if(event){
      this.createExtincteur.controls['driver_id'].setValue(event.id);
    }
  }

  FilterAffected(event) {
    if(event){
      console.log('event', event);

      this.createExtincteur.controls['affectee'].setValue(event.name);
      this.affectation(event.name)
    }
  }
}
