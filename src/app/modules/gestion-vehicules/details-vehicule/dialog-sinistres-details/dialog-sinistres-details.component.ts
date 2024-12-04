import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { selectEnvVehiculePayload, selectEnvVehiculeIsLoading } from 'app/core/store/vehicule/vehicule.selectors';
import { selectDrivers, selectAllCity } from 'app/core/store/resources/resources.selectors';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { ToastService } from 'app/services';
import { addVehiculeSinistres } from 'app/core/store/vehiculesinistre/vehiculesinistre.actions';
import { selectEnvVehiculeSinistresStatus, selectEnvVehiculeSinistresIsLoading } from 'app/core/store/vehiculesinistre/vehiculesinistre.selectors';
import { selectEnvVehiculeDocumentPayload } from 'app/core/store/vehiculedocument/vehiculedocument.selectors';
import { selectTrucks } from 'app/core/store/resources/resources.selectors';
import { PersonelService } from 'app/core/services/personel.service';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { selectEnvprestatairePayload } from '../../../../core/store/prestataire/prestataire.selectors';
import Swal from 'sweetalert2';
import { RessouresService } from 'app/core/services/ressoures.service';
@Component({
  selector: 'app-dialog-sinistres-details',
  templateUrl: './dialog-sinistres-details.component.html',
  styleUrls: ['./dialog-sinistres-details.component.css'],
})
export class DialogSinistresDetailsComponent implements OnInit {
  filteredOptions: Observable<string[]>;
  addSinistre = new FormGroup({});
  uuid : any;
  type : any;
  radio = 'ACCIDENT';
  vehicule: any;
  file : any;
  form_btn : any;
  cities : any;
  drivers : any;
  spinnerAdd : boolean;
  image_src: string;
  picture_name: string;
  display_img: boolean = false;
  paye : boolean = true;
  documents: any;
  asurances: any;
  asureur: any;
  missions : any;
  typeMission : any;
  prestataires: any = [];
  trucks;
  existTruck = false;
  images : any = [];
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private store: Store<AppState>,
              public dialogRef: MatDialogRef<DialogSinistresDetailsComponent>,
              private ressourceService: RessouresService,
              private personelService : PersonelService,
              private vehiculeService: VehiculeService,
              private _toast: ToastService) {}

  ngOnInit() {
    this.type = this.data["type"];
    this.setForm();

    if(this.vehicule){
      this.existTruck = true;
      this.addSinistre.controls['truck_id'].setValue(this.vehicule.id);
    }

    this.ressourceService.getTrucks().subscribe(
      (data:any) => {
        console.log("data conducteur", data)
        this.trucks = data.response;
        setTimeout(() => {
          // this.searchComponents.toArray()[0]?.selectObject(this.item?.truck)
        });
      }
    );

    this.store.select(selectEnvprestatairePayload).subscribe((res) => {
      console.log(' prestatires ========>', res);
      this.data = res;
      this.prestataires = this.data.filter(d => d.type == 'ASSURANCE')
    });

    this.store.select(selectAllCity).subscribe((res) => {
      console.log("cities", res)
      this.cities = res
    });

    this.store.select(selectEnvVehiculeDocumentPayload).subscribe((res) => {
    this.documents = res.filter(document => document.truck_id == this.vehicule.id);
      // console.log(" documents ========>", this.documents)
    this.asurances = this.documents.filter(assurance => assurance.type == "ASSURANCE");
    console.log(" asurances ========>", this.asurances)
    if(this.asurances.length > 0){
      console.log("fournisseur assurance", this.asurances["0"].prestataire.name, this.asurances["0"].prestataire.id)
      this.asureur = this.asurances["0"].prestataire.id
      console.log("prestataire_id", this.asureur)
      this.addSinistre.controls['prestataire_id'].setValue(this.asureur);
      this.addSinistre.controls['prestataire_id'].disable();
    }
    });

    this.personelService.personnelbyFunction(null, 'DRIVER').subscribe(
      (data:any) => {
        console.log("data conducteur", data)
        this.drivers = data.response;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  setForm(){
    if(this.data["mode"] == "add"){
      this.form_btn = "Ajouter"
      console.log("form set")
      this.addSinistre = new FormGroup({
        truck_id: new FormControl("", Validators.required),
        type_prelevement: new FormControl(""),
        adresse: new FormControl("", Validators.required),
        responsabilite: new FormControl(""),
        type: new FormControl(this.type, Validators.required),
        motif: new FormControl("", Validators.required),
        description: new FormControl(""),
        date_sinistre: new FormControl("", Validators.required),
        driver_id: new FormControl("", Validators.required),
        prestataire_id: new FormControl(""),
        montant: new FormControl("", [Validators.min(0)]),
        type_constat: new FormControl(""),
        reference_constat: new FormControl(""),
        paye: new FormControl(""),
        nature_paiement: new FormControl(""),
        payeur: new FormControl(""),
        date_echeance: new FormControl(""),
        rappel: new FormControl(""),
        city_id: new FormControl("", Validators.required),
        missionable_id: new FormControl("", Validators.required),
        type_image : new FormControl(""),
      });
    }
  }


  filterCity(event : any){
    if(event){
      console.log(event.id);
      this.addSinistre.controls['city_id'].setValue(event.id);
    }
  }

  villeSelected($event){
    console.log("city id", $event.option.value)
    var id = this.cities.find(city => city.name == $event.option.value).id;
    console.log(id);
    this.addSinistre.controls['city_id'].setValue(id);
  }

  payeSelected($event){
    console.log("paye selected", $event.value)
    if($event.value == 1){
      this.paye = true
    }else{
      this.paye = false
    }
  }
  onSelectImage(fileInputEvent: any)
  {
    this.file = fileInputEvent.target.files[0];
    this.picture_name = this.file.name;
    var reader = new FileReader();
    reader.readAsDataURL(fileInputEvent.target.files[0]);
    reader.onload = (event: any) => {
      this.image_src = event.target.result;
      this.display_img = true;
      this.file["file"] = event.target.result;
    };
    this.images.push(this.file);
    console.log("IMAGES []", this.images)
  }

  removeImage(i){
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer l\'image ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.images.splice(i, 1);
      }
    });

  }

  imgInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }

  typeChange($event) {
    console.log($event.source.name, $event.value);
    this.radio = $event.value;
    this.addSinistre.controls['type'].setValue($event.value);
  }

  modeleSelected($event) {
    console.log("modele choisi =======>", $event.value);
    switch($event.value) {
      case 'Tour': {
        this.typeMission = "App\\Modules\\Tour\\Models\\Tour"
         break;
      }
      case 'Covoyage': {
        this.typeMission = "App\\Modules\\Covoyage\\Models\\Covoyage"
         break;
      }
      case 'Transfert': {
        this.typeMission = "App\\Modules\\Transfert\\Models\\Transfert"
         break;
      }
      default: {
         //statements;
         break;
      }
   }
    console.log("type mission", this.typeMission)
    this.vehiculeService.missionInfraction($event.value).subscribe((res:any)=>{
      console.log("result", res)
      this.missions = res.response;
    })

  }

  onTruckChange(event){
    if(event){
      console.log("EVENT", event)
      this.vehicule = event;
      this.addSinistre.controls['truck_id'].setValue(event.id);
    }
  }

  addSinistreForm(){
    console.log("data", this.addSinistre.value)
    const formData = new FormData();
    for (var key in this.addSinistre.value) {
      if(this.addSinistre.value[key]){
        formData.append(key , this.addSinistre.value[key])
      }
    }
    formData.append('missionable_type' , this.typeMission)
    if(this.radio == 'ACCIDENT'){
      formData.append('prestataire_id', this.addSinistre.get("prestataire_id").value)
    }
    if (this.images.length){
      // formData.append('image', this.file)
      for(var i=0; i<this.images.length; i++){
        console.log('images[]', this.images[i])
        formData.append('images[]', this.images[i])
      }

      this.store.dispatch(addVehiculeSinistres({ data: formData }));
      this.store.select(selectEnvVehiculeSinistresIsLoading).subscribe((res) => {
        console.log("spinnerAdd", res)
        this.spinnerAdd = res;
      });
      this.store.select(selectEnvVehiculeSinistresStatus).subscribe((res) => {
        console.log("res", res)
        if(res == 'SUCCESS'){
          this.dialogRef.close();
        }
      });
    }
    else{
      this._toast.error("Remplir le document !")
    }
  }
}
