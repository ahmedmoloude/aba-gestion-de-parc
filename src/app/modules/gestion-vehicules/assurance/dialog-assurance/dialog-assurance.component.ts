import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectEnvtonnagePayload} from 'app/core/store/tonnage/tonnage.selectors';
import { selectEnvVehiculePayload, selectEnvVehiculeIsLoading } from 'app/core/store/vehicule/vehicule.selectors';
import { addVehiculeDocuments } from 'app/core/store/vehiculedocument/vehiculedocument.actions';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { selectEnvVehiculeDocumentStatus, selectEnvVehiculeDocumentIsLoading } from 'app/core/store/vehiculedocument/vehiculedocument.selectors';
import { ToastService } from 'app/core';
import { selectTrucks } from 'app/core/store/resources/resources.selectors';
import { VehiculeService } from 'app/core/services/vehicule.service';

@Component({
  selector: 'app-dialog-assurance',
  templateUrl: './dialog-assurance.component.html',
  styleUrls: ['./dialog-assurance.component.css'],
})
export class DialogAssuranceComponent implements OnInit {
  createDocument = new FormGroup({});
  uuid : any;
  type : any;
  form_btn : any;
  vehicule: any;
  tonnages : any;
  file_assurance : any;
  file_vignette : any;
  file_visite : any;
  file_carte_grise : any;
  file_autorisation : any;
  file_tachygraphe : any;
  file_essieu : any;
  cities : any;
  spinnerAdd : boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private boGridService: BoGridService,
              private store: Store<AppState>,
              public dialogRef: MatDialogRef<DialogAssuranceComponent>,
              private vehiculeService: VehiculeService,
              private _toast: ToastService) {}

  ngOnInit(): void {
    this.uuid = this.data["uuid"];
    this.type = this.data["type"];
    console.log(this.type, this.uuid, "type")
    this.store.select(selectEnvtonnagePayload).subscribe((res) => {
      this.tonnages = res
      console.log("tonnage", this.tonnages)
    });
    // this.store.select(selectTrucks).subscribe((res) => {
    //   console.log("res", res)
    //   this.vehicule = res.find(vehicule => vehicule.uuid == this.uuid);
    //   console.log("vehicule", this.vehicule)
    // });

    this.vehiculeService.truckByUuid(this.uuid).subscribe((res: any) => {
      console.log("truch", res);
      this.vehicule = res.response;

      this.createDocument.controls['truck_id'].setValue(this.vehicule.id);
      this.createDocument.controls['matricule'].setValue(this.vehicule.matricule);
      this.createDocument.controls['codeVehicule'].setValue(this.vehicule.code_interne);
      this.createDocument.controls['tonnage_id'].setValue(this.vehicule.tonnage_id);
      this.createDocument.controls['puissance_fiscale'].setValue(this.vehicule.puissance_fiscale);
    });

    this.setForm();
  }

  setForm(){
    if(this.data["type"] == "add"){
      this.form_btn = "Ajouter"
      // console.log("form set", this.vehicule.code_interne)
      // console.log("form set", this.vehicule.matricule)

      this.createDocument = new FormGroup({
        codeVehicule: new FormControl({ value: "", disabled: true }),
        matricule: new FormControl({ value: "", disabled: true }),
        truck_id: new FormControl("", Validators.required),
        start_date_assurance: new FormControl("", Validators.required),
        end_date_assurance: new FormControl("", Validators.required),
        start_date_vignette: new FormControl("", Validators.required),
        end_date_vignette: new FormControl("", Validators.required),
        start_date_visite: new FormControl("", Validators.required),
        end_date_visite: new FormControl("", Validators.required),
        start_date_carte_grise: new FormControl("", Validators.required),
        end_date_carte_grise: new FormControl("", Validators.required),
        start_date_autorisation: new FormControl("", Validators.required),
        end_date_autorisation: new FormControl("", Validators.required),
        start_date_tachygraphe: new FormControl("", Validators.required),
        end_date_tachygraphe: new FormControl("", Validators.required),
        start_date_essieu: new FormControl("", Validators.required),
        end_date_essieu: new FormControl("", Validators.required),
        rappel_assurance: new FormControl("", Validators.required),
        montant_assurance: new FormControl("", Validators.required),
        montant_visite: new FormControl("", Validators.required),
        n_police: new FormControl("", Validators.required),
        rappel_vignette: new FormControl("", Validators.required),
        rappel_visite: new FormControl("", Validators.required),
        rappel_carte_grise: new FormControl("", Validators.required),
        rappel_autorisation: new FormControl("", Validators.required),
        rappel_tachygraphe: new FormControl("", Validators.required),
        rappel_essieu: new FormControl("", Validators.required),
        fournisseur: new FormControl("", Validators.required),
        prestataire: new FormControl("", Validators.required),
        // tonnage_id: new FormControl("", Validators.required),
        tonnage_id: new FormControl({ value: "", disabled: true }),
        puissance_fiscale: new FormControl({ value: "", disabled: true }),
        montant_vignette: new FormControl("", Validators.required),
        montant_essieu: new FormControl("", Validators.required),
        city_id: new FormControl("", Validators.required),
        n_chassis: new FormControl({ value: "", disabled: true }, Validators.required),
        n_carte_grise: new FormControl("", Validators.required),
        n_autorisation: new FormControl("", Validators.required),
        objet: new FormControl("", Validators.required),
        n_ordre: new FormControl("", Validators.required),
        code: new FormControl("", Validators.required),
        n_taxe: new FormControl("", Validators.required),
      })

      console.log(this.createDocument.value)
    }

  }

  onSelectImageAssurance(event)
  {
    this.file_assurance  = (event.target as HTMLInputElement).files[0];
    console.log(this.file_assurance, "file")
  }

  onSelectImageVignette(event)
  {
    this.file_vignette  = (event.target as HTMLInputElement).files[0];
    console.log(this.file_vignette, "file_vignette")
  }

  onSelectImageVisite(event)
  {
    this.file_visite  = (event.target as HTMLInputElement).files[0];
    console.log(this.file_visite, "file")
  }

  onSelectImageGrise(event)
  {
    this.file_carte_grise  = (event.target as HTMLInputElement).files[0];
    console.log(this.file_carte_grise, "file")
  }

  onSelectImageAutorisation(event)
  {
    this.file_autorisation  = (event.target as HTMLInputElement).files[0];
    console.log(this.file_autorisation, "file")
  }

  onSelectImageTachygraphe(event)
  {
    this.file_tachygraphe  = (event.target as HTMLInputElement).files[0];
    console.log(this.file_tachygraphe, "file")
  }

  onSelectImageEssieu(event)
  {
    this.file_essieu  = (event.target as HTMLInputElement).files[0];
    console.log(this.file_essieu, "file")
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

  villeSelected($event){
    console.log("city id", $event.option.value)
    var id = this.cities.find(city => city.name == $event.option.value).id;
    // console.log(id);
    this.createDocument.controls['city_id'].setValue(id);
  }

  addDocumentForm(){
    if(this.createDocument.invalid){
      console.log("=================>invalid")
    }else{
      console.log("==================>valid")
    }
    console.log(this.createDocument.value)
    var arr = [];
    const finalFormData = new FormData();

    finalFormData.append('assurance[truck_id]', this.createDocument.value["truck_id"]);
    finalFormData.append('assurance[type]', "ASSURANCE");
    finalFormData.append('assurance[rappel]', this.createDocument.value["rappel_assurance"]);
    finalFormData.append('assurance[end_date]', this.createDocument.value["end_date_assurance"]);
    finalFormData.append('assurance[start_date]', this.createDocument.value["start_date_assurance"]);
    finalFormData.append('assurance[fournisseur]', this.createDocument.value["fournisseur"]);
    finalFormData.append('assurance[n_police]', this.createDocument.value["n_police"]);
    finalFormData.append('assurance[montant]', this.createDocument.value["montant_assurance"]);
    if(this.file_assurance){
      finalFormData.append('assurance[file]', this.file_assurance);
    }

    finalFormData.append('vignette[truck_id]', this.createDocument.value["truck_id"]);
    finalFormData.append('vignette[type]', "VIGNETTE");
    finalFormData.append('vignette[rappel]', this.createDocument.value["rappel_vignette"]);
    finalFormData.append('vignette[end_date]', this.createDocument.value["end_date_vignette"]);
    finalFormData.append('vignette[start_date]', this.createDocument.value["start_date_vignette"]);
    finalFormData.append('vignette[puissance_fiscale]', this.createDocument.get("puissance_fiscale").value);
    finalFormData.append('vignette[tonnage_id]', this.createDocument.get("tonnage_id").value);
    finalFormData.append('vignette[montant]', this.createDocument.value["montant_vignette"]);
    if(this.file_vignette){
      finalFormData.append('vignette[file]', this.file_vignette);
    }

    finalFormData.append('visite[truck_id]', this.createDocument.value["truck_id"]);
    finalFormData.append('visite[type]', "VISITE_TECHNIQUE");
    finalFormData.append('visite[rappel]', this.createDocument.value["rappel_vignette"]);
    finalFormData.append('visite[end_date]', this.createDocument.value["end_date_vignette"]);
    finalFormData.append('visite[start_date]', this.createDocument.value["start_date_vignette"]);
    finalFormData.append('visite[city_id]', this.createDocument.value["city_id"]);
    finalFormData.append('visite[fournisseur]', this.createDocument.value["fournisseur"]);
    finalFormData.append('visite[montant]', this.createDocument.value["montant_visite"]);
    if(this.file_visite){
      finalFormData.append('visite[file]', this.file_visite);
    }

    finalFormData.append('carteGrise[truck_id]', this.createDocument.value["truck_id"]);
    finalFormData.append('carteGrise[type]', "CARTE_GRISE");
    finalFormData.append('carteGrise[rappel]', this.createDocument.value["rappel_vignette"]);
    finalFormData.append('carteGrise[end_date]', this.createDocument.value["end_date_vignette"]);
    finalFormData.append('carteGrise[start_date]', this.createDocument.value["start_date_vignette"]);
    finalFormData.append('carteGrise[n_chassis]', this.createDocument.value["n_chassis"]);
    finalFormData.append('carteGrise[n_carte_grise]', this.createDocument.value["n_carte_grise"]);
    if(this.file_carte_grise){
      finalFormData.append('carteGrise[file]', this.file_carte_grise);
    }

    finalFormData.append('autorisation[truck_id]', this.createDocument.value["truck_id"]);
    finalFormData.append('autorisation[type]', "AUTORISATION");
    finalFormData.append('autorisation[rappel]', this.createDocument.value["rappel_vignette"]);
    finalFormData.append('autorisation[end_date]', this.createDocument.value["end_date_vignette"]);
    finalFormData.append('autorisation[start_date]', this.createDocument.value["start_date_vignette"]);
    finalFormData.append('autorisation[n_autorisation]', this.createDocument.value["n_autorisation"]);
    finalFormData.append('autorisation[objet]', this.createDocument.value["objet"]);
    if(this.file_autorisation){
      finalFormData.append('autorisation[file]', this.file_autorisation);
    }

    finalFormData.append('tachygraphe[truck_id]', this.createDocument.value["truck_id"]);
    finalFormData.append('tachygraphe[type]', "CARNET_TACHYGRAPHIQUE");
    finalFormData.append('tachygraphe[rappel]', this.createDocument.value["rappel_vignette"]);
    finalFormData.append('tachygraphe[end_date]', this.createDocument.value["end_date_vignette"]);
    finalFormData.append('tachygraphe[start_date]', this.createDocument.value["start_date_vignette"]);
    finalFormData.append('tachygraphe[n_ordre]', this.createDocument.value["n_ordre"]);
    finalFormData.append('tachygraphe[code]', this.createDocument.value["code"]);
    if(this.file_tachygraphe){
      finalFormData.append('tachygraphe[file]', this.file_tachygraphe);
    }

    finalFormData.append('essieu[truck_id]', this.createDocument.value["truck_id"]);
    finalFormData.append('essieu[type]', "TAXE_ESSIEU");
    finalFormData.append('essieu[rappel]', this.createDocument.value["rappel_vignette"]);
    finalFormData.append('essieu[end_date]', this.createDocument.value["end_date_vignette"]);
    finalFormData.append('essieu[start_date]', this.createDocument.value["start_date_vignette"]);
    finalFormData.append('essieu[montant]', this.createDocument.value["montant_essieu"]);
    finalFormData.append('essieu[n_taxe]', this.createDocument.value["n_taxe"]);
    if(this.file_essieu){
      finalFormData.append('essieu[file]', this.file_essieu);
    }

    if(!this.file_assurance || !this.file_vignette || !this.file_autorisation || !this.file_tachygraphe || !this.file_carte_grise || !this.file_visite || !this.file_essieu)
    {
      this._toast.warn("Remplir tous les fichier")
    }else{
      this.store.dispatch(addVehiculeDocuments({ data: finalFormData }));
      this.store.select(selectEnvVehiculeDocumentIsLoading).subscribe((res) => {
        console.log("spinnerAdd", res)
        this.spinnerAdd = res;
      });
      this.store.select(selectEnvVehiculeDocumentStatus).subscribe((res) => {
        console.log("res", res)
        if(res == 'SUCCESS'){
          this.dialogRef.close();
        }
      });


      // this.spinnerAdd = true
      // // console.log(this.createCiterne.value)
      // this.vehiculeService.addTruckDocument(finalFormData).subscribe(
      //   (data) => {
      //     console.log('data', data["response"]);
      //     this._toast.success("Documents ajouté avec succés");
      //     this.spinnerAdd = false;
      //     this.dialogRef.close(data["response"]);
      //   },
      //   (error) => {
      //     console.log('error', error);
      //     this.spinnerAdd = false;
      //     this._toast.error("Une erreur est survenue");
      // });
    }
  }
}
