import { Component, OnInit, Input, ViewChildren, QueryList  } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { ToastService } from 'app/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { addtonnage, updatetonnage } from 'app/core/store/tonnage/tonnage.actions';
import { MatDialogRef } from '@angular/material/dialog';
import { selectEnvtonnageStatus, selectEnvtonnageIsLoading } from 'app/core/store/tonnage/tonnage.selectors';
import { addVehiculeDocuments, updateVehiculeDocuments } from 'app/core/store/vehiculedocument/vehiculedocument.actions';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { selectEnvVehiculeDocumentStatus, selectEnvVehiculeDocumentIsLoading } from 'app/core/store/vehiculedocument/vehiculedocument.selectors';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';
import { selectTrucks, selectAllCityAgence } from 'app/core/store/resources/resources.selectors';
import { selectEnvprestatairePayload } from './../../../../core/store/prestataire/prestataire.selectors';
import { RessouresService } from 'app/core/services/ressoures.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  spinnerAdd :boolean = false;
  createVisite : FormGroup;
  vehicule :any;
  file_visite :any;
  cities : any
  prestataires: any = [];
  trucks : any;
  start_time : any
  end_time : any;
  is_truck : boolean = false
  mode : any;
  item : any;

  setDateDebut(e){
    console.log("DATE DEBUT", e.target.value)
    this.start_time= e.target.value;
  }

  setDateFin(e){
    console.log("DATE FIN", e.target.value)
    this.end_time= e.target.value;
  }

  onTruckChange(event){
    if(event){
      console.log("EVENT", event)
      this.vehicule = event
      this.createVisite.controls['truck_id'].setValue(event.id);
    }
  }

  constructor(
    private store: Store<AppState>,
    private boGridService: BoGridService,
    private ressourceService: RessouresService,
    private _toast: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddDialogComponent>,
  ) { }

  ngAfterViewInit(){
    if(this.data["mode"] == "edit"){
      this.searchComponents.toArray()[0]?.selectObject(this.item?.truck)
    }
  }

  ngOnInit(): void {
    this.mode = this.data['mode'];
    this.item = this.data['item'];
    this.setForm();
    this.vehicule = this.data['vehicule'];

    console.log(' truck ', this.vehicule);
    console.log(' item ', this.item);
    console.log(' mode ', this.mode);
    if(this.vehicule){
      this.is_truck = true
      this.createVisite.controls['truck_id'].setValue(this.vehicule.id);
    }

    this.store.select(selectAllCityAgence).subscribe((res) => (this.cities = res));

    this.store.select(selectEnvprestatairePayload).subscribe((res) => {
      console.log(' prestatires ========>', res);
      this.data = res;
      this.prestataires = this.data.filter(d => d.type == 'VISITE')
    });
    this.ressourceService.getTrucks().subscribe(
      (data:any) => {
        console.log("data conducteur", data)
        this.trucks = data.response;
        setTimeout(() => {
          this.searchComponents.toArray()[0]?.selectObject(this.item?.truck)
        });
      }
    );
  }


  setForm(){
    if(this.mode == 'edit'){
      this.createVisite = new FormGroup({
        truck_id: new FormControl(this.item.truck_id, Validators.required),
        type: new FormControl('VISITE_TECHNIQUE', Validators.required),
        prestataire_id: new FormControl(this.item.prestataire_id, Validators.required),
        start_date: new FormControl(this.item.start_date, Validators.required),
        end_date: new FormControl(this.item.end_date, Validators.required),
        rappel: new FormControl(this.item.rappel, Validators.required),
        city_id: new FormControl(this.item.city_id),
        montant: new FormControl(this.item.montant),
      })
    }else{
      this.createVisite = new FormGroup({
        truck_id: new FormControl("", Validators.required),
        type: new FormControl('VISITE_TECHNIQUE', Validators.required),
        prestataire_id: new FormControl('', Validators.required),
        start_date: new FormControl('', Validators.required),
        end_date: new FormControl('', Validators.required),
        rappel: new FormControl('', Validators.required),
        city_id: new FormControl(''),
        montant: new FormControl(''),
      })
    }

  }

  filterCity(event : any){
    console.log(event.target.value);
    if(event.target.value.length > 2){
      this.boGridService.citiesFilter(event.target.value.toUpperCase()).subscribe((data) => {
        this.cities = data;
        console.log("filter citiesFilterDepart", this.cities)
      },
      (error) => {
        console.log('error', error);
      });
    }
  }

  villeSelected(event){
    if(event){
      console.log("city id", event.id)
      // var id = this.cities.find(city => city.name == $event.option.value).id;
      // console.log(id);
      this.createVisite.controls['city_id'].setValue(event.id);
    }

  }

  onSelectImageVisite(event)
  {
    this.file_visite  = (event.target as HTMLInputElement).files[0];
    console.log(this.file_visite, "file")
  }

  addVisite(){
    console.log(this.createVisite.value)

    const formData = new FormData();
    for (var key in this.createVisite.value) {
      if(this.createVisite.value[key]){
        formData.append(key , this.createVisite.value[key])
      }
    }
    if(this.mode == 'edit'){
      if (this.file_visite) {
        formData.append('file', this.file_visite);
      }
      this.store.dispatch(updateVehiculeDocuments({ data: formData, uuid: this.item.uuid }));
      this.store.select(selectEnvVehiculeDocumentIsLoading).subscribe((res) => {
        console.log('spinnerAdd', res);
        this.spinnerAdd = res;
      });
      this.store.select(selectEnvVehiculeDocumentStatus).subscribe((res) => {
        console.log('res', res);
        if (res == 'SUCCESS') {
          this.dialogRef.close('data');
        }
      });
    }else{
      if (this.file_visite) {
        formData.append('file', this.file_visite);
        this.store.dispatch(addVehiculeDocuments({ data: formData }));
        this.store.select(selectEnvVehiculeDocumentIsLoading).subscribe((res) => {
          console.log('spinnerAdd', res);
          this.spinnerAdd = res;
        });
        this.store.select(selectEnvVehiculeDocumentStatus).subscribe((res) => {
          console.log('res', res);
          if (res == 'SUCCESS') {
            this.dialogRef.close('data');
          }
        });
      } else {
        this._toast.error('Remplir le document !');
      }
    }
  }

}
