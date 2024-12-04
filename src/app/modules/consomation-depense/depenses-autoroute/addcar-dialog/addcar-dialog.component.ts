import { Component, OnInit } from '@angular/core';
import { selectTrucks } from 'app/core/store/resources/resources.selectors';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { ToastService } from 'app/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { RessouresService } from 'app/core/services/ressoures.service';

@Component({
  selector: 'app-addcar-dialog',
  templateUrl: './addcar-dialog.component.html',
  styleUrls: ['./addcar-dialog.component.css']
})
export class AddcarDialogComponent implements OnInit {

  radio = 'CARBURANT';
  vehicules : any;
  cartes : any;
  cards : any;
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
  cartesCarburant: any;
  cartesAutoroute: any;

  constructor(public dialog: MatDialog,
              private boGridService: BoGridService,
              private store: Store<AppState>,
              public dialogRef: MatDialogRef<AddcarDialogComponent>,
              private vehiculeService : VehiculeService,
              private ressourceService: RessouresService,
              private toast : ToastService) { }

  ngOnInit(): void {
    this.vehiculeService.allCarte().subscribe(
      (data) => {
        console.log('data', data);
        this.cartes = data["response"]
        this.cartesCarburant =this.cartes.filter(e =>( e.type == "EASY_ONE" || e.type == "GAZOILE"));
        this.cartesAutoroute =this.cartes.filter(e =>( e.type == "AUTOROUTE" || e.type == "JAWAZ"));
      },
      (error) => {
        console.log('error', error);
    });

    this.ressourceService.getTrucks().subscribe(
      (data:any) => {
        console.log("data conducteur", data)
        this.vehicules = data.response;
      }
    );

    // this.store.select(selectTrucks).subscribe((res) => {
    //   console.log("res", res)
    //   this.vehicules = res;
    //   console.log("vehicule", this.vehicules)
    // });

    this.setForm();
  }

  setForm(){
    if(this.radio == 'CARBURANT' ){
      this.createCarburant = new FormGroup({
        type: new FormControl("CARBURANT"),
        truck_id: new FormControl("", Validators.required),
        // type_carte: new FormControl({ value: "", disabled: true }),
        type_carte: new FormControl("", Validators.required),
        carte_id: new FormControl("", Validators.required),
        quantite: new FormControl("", Validators.required),
        montant: new FormControl(""),
        station: new FormControl(""),
        kilometrage: new FormControl("", Validators.required),
        old_km: new FormControl({ value: '', disabled: true }),
        type_recharge: new FormControl("CONSOMMATION", Validators.required),
      })
    }else{
      this.createAutoroute = new FormGroup({
        type: new FormControl("AUTOROUTE"),
        truck_id: new FormControl("", Validators.required),
        // type_carte: new FormControl({ value: "", disabled: true }),
        type_carte: new FormControl("", Validators.required),
        carte_id: new FormControl("", Validators.required),
        montant: new FormControl(""),
        type_recharge: new FormControl("CONSOMMATION", Validators.required),
      })
    }
  }

  filterMatricule(event : any){
    if(event.target.value?.length > 4){
      this.boGridService.matriculeFilter(event.target.value.toUpperCase()).subscribe((data) => {
        this.vehicules = data;
        console.log("filter matriculeFilter", this.vehicules)
      },
      (error) => {
        console.log('error', error);
      });
    }
  }

  truckSelected(event){
    console.log("vehicule_id", event)
    var vehicule = event
    console.log("vehivule", vehicule)
    if(this.radio == 'CARBURANT' ){
      this.createCarburant.controls['truck_id'].setValue(vehicule.id);
      this.createCarburant.controls['old_km'].setValue(vehicule.km_reel);
    }else{
      this.createAutoroute.controls['truck_id'].setValue(vehicule.id);
    }
  }

  typeCarte($event){
    console.log("type", $event.value)
    this.type = $event.value;
    this.createCarburant.controls['carte_id'].setValue('');

    console.log("type222=>", this.type)
    console.log("carte", this.cartes)
      this.carte = this.cartes.filter(c => c.type == $event.value);
      console.log("type", this.carte)

  }

  idCarte($event){
    console.log("id carte", $event.value)
    if(this.cartes?.length != 0 ){
      this.c = this.cartes.find(c => c.id == $event.value);
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

  typeChange($event) {
    console.log($event.value);
    this.radio = $event.value;
    this.setForm();
    // this.addSinistre.controls['type'].setValue($event.value);
  }

  add(){
    console.log("radio", this.radio)

    if(this.radio == 'CARBURANT' ){
      if(this.createCarburant.invalid){
        this.toast.warn("Remplir tous les champs obligatoires")
      }else{
        console.log("carburant", this.createCarburant.value)
        console.log("old sole", this.c.solde)
        console.log("new sole", this.createCarburant.get("montant").value)
        var sum = Number(this.c.solde) - Number(this.createCarburant.get("montant").value)
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
            if(this.images?.length < 1){
              this.spinner = false;
              this.toast.warn("Remplir l'image")
            }else{
              this.vehiculeService.addDepense(formData).subscribe(
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
      }

    }else{
      if(this.createAutoroute.invalid){
        this.toast.warn("Remplir tous les champs obligatoires")
      }else{
        console.log("autoroute", this.createAutoroute.value)
        console.log("old sole", this.c.solde)
        console.log("new sole", this.createAutoroute.get("montant").value)
        var sum = Number(this.c.solde) - Number(this.createAutoroute.get("montant").value)
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

          if(this.images2?.length < 1){
            this.spinner = false;
            this.toast.warn("Remplir l'image")
          }else{
            this.spinner = true;
            this.vehiculeService.addDepense(formDataAutoroute).subscribe(
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
    }
  }

}
