import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { ToastService } from 'app/core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { selectTruckService } from 'app/core/store/resources/resources.selectors';
import { selectEnvparcPayload } from 'app/core/store/parc/parc.selectors';
import { environment } from 'environments/environment';
import { addremplacement } from 'app/core/store/remplacement/remplacement.actions';
import { selectEnvRemplacementIsLoading, selectEnvRemplacementStatus } from 'app/core/store/remplacement/remplacement.selectors';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';
import {
  selectTrucks,
  selectAllCityAgence,
} from 'app/core/store/resources/resources.selectors';
import * as moment from 'moment';

@Component({
  selector: 'app-dialog-remplacer',
  templateUrl: './dialog-remplacer.component.html',
  styleUrls: ['./dialog-remplacer.component.css']
})
export class DialogRemplacerComponent implements OnInit {
  cities: any;
  zones : any;
  trucks : any;
  vehicule : any;
  parcs : any;
  services : any;
  oldVehicule : any;
  file :any;
  image : boolean = false;
  images = [];
  oldimages = []
  spinnerAdd :boolean = false;
  url = environment.STORAGE + '/vehicule/';
  createRemplacement : FormGroup;
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  start_time: any;
  end_time: any;
  selected='Immatricule';

  constructor(
    private store: Store<AppState>,
    private boGridService: BoGridService,
    private _toast: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogRemplacerComponent>,
  ) { }

  ngOnInit(): void {
    this.oldVehicule = this.data["item"];
    console.log(this.oldVehicule);
    this.oldVehicule.images?.forEach((image) => {
      this.oldimages.push(this.url + this.oldVehicule.id + '/' + image.file);
    });
    this.setForm();
    this.store.select(selectEnvparcPayload).subscribe((res) => {
      // console.log(" parc========>", res)
      this.parcs = res
    });
    this.store.select(selectAllCityAgence).subscribe((res) => {
      console.log("cities", res)
      this.cities = res
    });
    // this.store.select(selectTruckService).subscribe((res) => {
    //   // console.log(" services========>", res)
    //   this.services = res
    // });

  }

  setForm(){
    this.createRemplacement = new FormGroup({
      city_id: new FormControl("", Validators.required),
      parc_id: new FormControl({ value: "", disabled: true }, Validators.required),
      service_id: new FormControl("", Validators.required),
      zone_id: new FormControl({ value: "", disabled: true }, Validators.required),
      old_truck_id: new FormControl(this.oldVehicule.id, Validators.required),
      new_truck_id: new FormControl("", Validators.required),
      motif: new FormControl("", Validators.required),
      km_depart: new FormControl({ value: "", disabled: true }),
      modele: new FormControl({ value: "", disabled: true }),
      category: new FormControl({ value: "", disabled: true }),
      tonnage: new FormControl({ value: "", disabled: true }),
      start_date: new FormControl("", Validators.required),
      end_date: new FormControl("", Validators.required),
      restitution_date: new FormControl("", Validators.required),
      date_demande: new FormControl("", Validators.required),
      distance: new FormControl("", Validators.required),
    })
  }

  setDateDebut(value) {
    console.log("DATE DEBUT", value)
    this.start_time = value;
  }

  setDateFin(value) {
    console.log("DATE Fin", value)
    this.end_time = value;
  }

  filterCity(event : any){
    if(event?.target?.value?.length > 2){
      this.boGridService.citiesFilter(event.target.value.toUpperCase()).subscribe((data) => {
        this.cities = data;
        console.log("filter citiesFilterDepart", this.cities)
      },
      (error) => {
        console.log('error', error);
      });
    }
  }

  filterMatricule(event : any){
    this.image = false
    if(event?.target?.value?.length > 2){
      this.boGridService.matriculeFilter(event.target.value.toUpperCase()).subscribe((data) => {
        this.trucks = data;
        this.trucks = this.trucks?.filter(tv=> tv.matricule != this.oldVehicule.matricule)
        console.log("filter matriculeFilter", this.trucks)
      },
      (error) => {
        console.log('error', error);
      });
    }
  }

  onSelectImage(event)
  {
    this.file  = (event.target as HTMLInputElement).files[0];
    console.log(this.file, "file")
  }

  filterZone(event){
    // var id = this.cities.find(city => city.name == $event.option.value).id;
    if(event){
      this.createRemplacement.controls['city_id']?.setValue(event.id);
      this.zones = this.cities?.find(city => city.id == event.id).zones;
    }

  }

  truckSelected($event){
    this.image = true;
    this.vehicule = this.trucks.find(v => v.matricule == $event.option?.value);
    console.log("vehicule", this.vehicule);
    this.createRemplacement.controls['new_truck_id']?.setValue(this.vehicule.id);
    this.createRemplacement.controls['km_depart']?.setValue(this.vehicule.km_initial);
    this.createRemplacement.controls['modele']?.setValue(this.vehicule.modele?.name);
    this.createRemplacement.controls['category']?.setValue(this.vehicule.truck_category?.name);
    this.createRemplacement.controls['tonnage']?.setValue(this.vehicule.tonnage?.name);
    this.createRemplacement.controls['parc_id']?.setValue(this.vehicule.parc?.name);
    this.createRemplacement.controls['zone_id']?.setValue(this.vehicule.zone?.name);
    this.services = this.vehicule.services;
    this.vehicule.images?.forEach((image) => {
      this.images.push(this.url + this.vehicule.id + '/' + image.file);
    });
  }

  addRemplacement(){
    console.log("data envoyer", this.createRemplacement.value)
    console.log("km", this.createRemplacement.get("km_depart")?.value)
    const formData = new FormData();
    // const formValue = this.createRemplacement.getRawValue();
    // for (var key in formValue) {
    //   if (formValue[key]) {
    //     formData.append(key, formValue[key]);
    //   }
    // }
    for (var key in this.createRemplacement.value) {
      formData.append(key , this.createRemplacement.value[key])
    }
    formData.append('km_depart', this.createRemplacement.get("km_depart").value)
    formData.append('parc_id', this.vehicule.parc?.id)
    formData.append('zone_id', this.vehicule.zone?.id)
    if(this.file){
      formData.append('file', this.file)
    }
    this.store.dispatch(addremplacement({ data: formData }));
    this.store.select(selectEnvRemplacementIsLoading).subscribe((res) => {
      console.log("spinner", res);
      this.spinnerAdd = res
    });
    this.store.select(selectEnvRemplacementStatus).subscribe((res) => {
      console.log("status", res);
      if(res == 'SUCCESS'){
        this.dialogRef.close();
      }
    });
  }

}
