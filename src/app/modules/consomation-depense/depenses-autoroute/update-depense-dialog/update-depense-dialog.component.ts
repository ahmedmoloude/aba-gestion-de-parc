import { SearchComponent } from '../../../../global/search/search.component';
import { Component, Inject, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { selectTrucks } from 'app/core/store/resources/resources.selectors';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { ToastService } from 'app/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { RessouresService } from 'app/core/services/ressoures.service';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-update-depense-dialog',
  templateUrl: './update-depense-dialog.component.html',
  styleUrls: ['./update-depense-dialog.component.css']
})
export class updateDepenseDialogComponent implements OnInit {
  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;

  vehicules : any = [];
  cartes : any;
  carte : any;
  c : any;
  type = 'AUTOROUTE';
  createAutoroute : FormGroup;
  createCarburant : FormGroup;
  spinner : boolean = false;
  images = []
  images2 = []
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  depense = this.data['item'];
  isLoading: boolean = true;
  cartesCarburant: any;
  cartesAutoroute: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public dialog: MatDialog,
              private boGridService: BoGridService,
              private store: Store<AppState>,
              public dialogRef: MatDialogRef<updateDepenseDialogComponent>,
              private vehiculeService : VehiculeService,
              private ressourceService: RessouresService,
              private toast : ToastService) { }

  ngOnInit(): void {
        // Define the observables for API calls
        const allCartes$ = this.vehiculeService.allCarte();
        const getTrucks$ = this.ressourceService.getTrucks();
        console.log((this.depense));


        // Combine the observables using forkJoin
        forkJoin([allCartes$, getTrucks$]).subscribe(
          ([carteData, trucksData]) => {
            console.log('carte data:', carteData);
            console.log('Trucks data:', trucksData);

            this.cartes = carteData['response'];
            this.cartesCarburant =this.cartes.filter(e =>( e.type == "EASY_ONE" || e.type == "GAZOILE"));
            this.cartesAutoroute =this.cartes.filter(e =>( e.type == "AUTOROUTE" || e.type == "JAWAZ"));
            this.vehicules = trucksData['response'];
            setTimeout(() => {
              this.searchComponents.toArray()[0].selectObject(this.depense.truck);
            });
            this.setForm();

            this.typeCarte(this.depense.carte?.type);
            this.selectCardById(this.depense.carte?.id)

            this.isLoading = false;
          },
          (error) => {
            console.log('Error:', error);
            this.isLoading = false;
          }
        );
  }

  ngAfterViewInit(){
    // this.searchComponents.toArray()[0]?.selectObject(this.depense.truck);
    // if(this.vehicules.length)
    // this.searchComponents.toArray()[0]?.selectObject(this.vehicules.find(v => v.id == this.depense.truck.id));
  }

  setForm(){
    if(this.depense.type == 'CARBURANT' ){
      this.createCarburant = new FormGroup({
        type: new FormControl("CARBURANT"),
        truck_id: new FormControl(this.depense.truck_id, Validators.required),
        type_carte: new FormControl(this.depense.carte?.type, Validators.required),
        carte_id: new FormControl(this.depense.carte_id, Validators.required),
        quantite: new FormControl(this.depense.quantite, Validators.required),
        montant: new FormControl(this.depense.montant, Validators.required),
        station: new FormControl(this.depense.station),
        kilometrage: new FormControl(this.depense.kilometrage, Validators.required),
        old_km: new FormControl({ value: this.depense.truck?.km_reel, disabled: true }),
        type_recharge: new FormControl("CONSOMMATION", Validators.required),
      })
    }else{
      this.createAutoroute = new FormGroup({
        type: new FormControl("AUTOROUTE"),
        truck_id: new FormControl(this.depense.truck_id, Validators.required),
        type_carte: new FormControl(this.depense.carte?.type, Validators.required),
        carte_id: new FormControl(this.depense.carte?.id, Validators.required),
        montant: new FormControl(this.depense.montant, Validators.required),
        type_recharge: new FormControl("CONSOMMATION", Validators.required),
      })
    }
  }

  truckSelected(event){
    console.log("vehicule_id", event)
    var vehicule = event
    console.log("vehivule", vehicule)
    if(this.depense.type == 'CARBURANT' ){
      this.createCarburant.controls['truck_id'].setValue(vehicule.id);
      this.createCarburant.controls['old_km'].setValue(vehicule.km_reel);
    }else{
      this.createAutoroute.controls['truck_id'].setValue(vehicule.id);
    }
  }

  typeCarte($event){
    console.log("type", $event.value || $event)
    this.type = $event.value?$event.value: $event
    console.log("type222=>", this.type)
    console.log("carte", this.cartes)
    if(this.cartes?.length != 0 ){
      this.carte = this.cartes.filter(c => c.type == this.type);
      console.log("type", this.carte)
    }
  }

  selectCardById($event){
    console.log("id carte", $event.value || $event)
    let id = $event.value?$event.value: $event

    if(this.cartes?.length != 0 ){
      this.c = this.cartes.find(c => c.id == id);
      console.log("carte id =====>", this.carte)
    }
  }

  onSelectImage(event)
  {
    // this.file  = (event.target as HTMLInputElement).files[0];
    console.log(event.target.files[0], "file")
    this.images.push(event.target.files[0])
    console.log("images", this.images)
  }

  onSelectImage2(event)
  {
    // this.file  = (event.target as HTMLInputElement).files[0];
    console.log(event.target.files[0], "file===============>")
    this.images2.push(event.target.files[0])
    console.log("images", this.images2)
  }

  updateDepense(){
    console.log("radio", this.depense.type)

    if(this.depense.type == 'CARBURANT' ){
      if(this.createCarburant.invalid){
        this.toast.warn("Remplir tous les champs obligatoires")
      }else{
        console.log(this.c);

        console.log("carburant", this.createCarburant.value)
        console.log("old sole", this.c?.solde)
        console.log("new sole", this.createCarburant.get("montant").value)
        var sum = Number(this.c?.solde) - Number(this.createCarburant.get("montant").value)
        console.log("sum", sum)
        if(sum < 0){
          this.toast.warn("Solde insuffisant")
        }else{
          if(this.createCarburant.get("old_km").value > this.createCarburant.get("kilometrage").value){
            this.toast.warn("Le kilométrage doit dépasser le dernier kilométrage")
          }else{
            this.spinner = true;
            const formData = new FormData();
            for (var key in this.createCarburant.value) {
              if(this.createCarburant.value[key]){
                formData.append(key , this.createCarburant.value[key])
              }
            }

            for (var i = 0; i < this.images?.length; i++) {
              console.log("for image", this.images[i])
              formData.append("images[]", this.images[i]);
            }

            this.vehiculeService.updateDepense(formData, this.depense.uuid).subscribe(
              (data) => {
                console.log('data', data);
                this.dialogRef.close(data["response"])
                this.spinner = false
              },
              (error) => {
                this.spinner = false
                console.log('error', error);
            });

          }
        }
      }

    }else{
      if(this.createAutoroute.invalid){
        this.toast.warn("Remplir tous les champs obligatoires")
      }else{
        console.log("autoroute", this.createAutoroute.value)
        console.log("old sole", this.c?.solde)
        console.log("new sole", this.createAutoroute.get("montant").value)
        var sum = Number(this.c?.solde) - Number(this.createAutoroute.get("montant").value)
        console.log("sum", sum)
        if(sum < 0){
          this.toast.warn("Solde insuffisant")
        }else{
          const formDataAutoroute = new FormData();
          for (var key in this.createAutoroute.value) {
            if(this.createAutoroute.value[key]){
              formDataAutoroute.append(key , this.createAutoroute.value[key])
            }
          }

          for (var i = 0; i < this.images2?.length; i++) {
            console.log("for image", this.images2[i])
            formDataAutoroute.append("images[]", this.images2[i]);
          }

          // if(this.images2?.length < 1){
          //   this.spinner = false;
          //   this.toast.warn("Remplir l'image")
          // }else{
            this.spinner = true;
            this.vehiculeService.updateDepense(formDataAutoroute, this.depense.uuid).subscribe(
              (data) => {
                console.log('data', data);
                this.dialogRef.close(data["response"]);
                this.spinner = false
              },
              (error) => {
                this.spinner = false
                console.log('error', error);
            });
          // }
        }
      }
    }
  }

}
