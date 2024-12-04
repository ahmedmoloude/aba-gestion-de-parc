import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { ToastService } from 'app/core';
import { selectTrucks, selectDrivers, selectCiterne } from 'app/core/store/resources/resources.selectors';
import { PersonelService } from 'app/core/services/personel.service';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { RessouresService } from 'app/core/services/ressoures.service';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dialog-plein',
  templateUrl: './dialog-plein.component.html',
  styleUrls: ['./dialog-plein.component.css'],
})
export class DialogPleinComponent implements OnInit {
  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;



  citernes : any;
  citer : any;
  drivers : any;
  trucks : any;
  km : any;
  vehicules : any;
  file : any;

  plein : FormGroup;
  spinner : boolean=false
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}

  isLoading = true;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
              private store: Store<AppState>,
              public dialog: MatDialog,
              private vehiculeService : VehiculeService,
              public dialogRef: MatDialogRef<DialogPleinComponent>,
              private _toast: ToastService,
              private personelService : PersonelService,
              private ressourceService: RessouresService,
              private boGridService: BoGridService,) { }

  ngOnInit(): void {


    console.log('dialog data' , this.dialogData)


    // Define the observables for API calls
    const allCiterne$ = this.vehiculeService.allCiterne();
    const personnelByFunction$ = this.personelService.personnelbyFunction(null, 'DRIVER');
    const getTrucks$ = this.ressourceService.getTrucks();

    // Combine the observables using forkJoin
    forkJoin([allCiterne$, personnelByFunction$, getTrucks$]).subscribe(
      ([citerneData, personnelData, trucksData]) => {
        console.log('Citerne data:', citerneData);
        console.log('Personnel data:', personnelData);
        console.log('Trucks data:', trucksData);

        this.citernes = citerneData['response'];
        this.drivers = personnelData['response'];
        // this.drivers = this.drivers.filter((d) => d.disponible['status'] == true);


        console.log('drivers ... ' , this.drivers)
        this.vehicules = trucksData['response'];

        if (this.dialogData['editMode']) {
          this.setForm(
            this.dialogData['quantite'],
            this.dialogData['fuel_coupon_number'],
            this.dialogData['citerne_id'],
            this.dialogData['kilometrage'],
            this.dialogData['truck_id'],
            this.dialogData['driver_id'],
            null,
            this.dialogData['carburant_base']
          );

          setTimeout(() => {
            this.searchComponents.toArray()[0].selectObject(this.dialogData['citerne']);
            this.searchComponents.toArray()[1].selectObject(this.dialogData['driver']);
            this.searchComponents.toArray()[2].selectObject(this.dialogData['truck']);
            let vehicle = this.vehicules?.find(e => e.id == this.dialogData['truck_id']);
            if (vehicle)
            this.truckSelected(vehicle)
          });
        } else {
          this.setForm();
        }

        this.isLoading = false;
      },
      (error) => {
        console.log('Error:', error);
        this.isLoading = false;
      }
    );
  }

  filterMatricule(event : any){
    // this.image = false
    if(event.target.value.length > 4){
      this.boGridService.matriculeFilter(event.target.value.toUpperCase()).subscribe((data) => {
        this.trucks = data;
        // this.trucks = this.trucks.filter(tv=> tv.matricule != this.oldVehicule.matricule)
        console.log("filter matriculeFilter", this.trucks)
      },
      (error) => {
        console.log('error', error);
      });
    }
  }

  reservoir = 0;
  truckSelected(event){
    console.log("EVENT VEHICULE", event)
    var vehicule = event;
    this.reservoir = vehicule.taille_reservoir;
    console.log("vehivule", vehicule)
    this.plein.controls['truck_id'].setValue(vehicule.id);
    console.log(vehicule.code_interne, "code")
    this.plein.controls['code'].setValue(vehicule.code_interne);
    console.log(vehicule.taille_reservoir, "taille_reservoir")
    this.plein.controls['taille_reservoir'].setValue(vehicule.taille_reservoir);
    this.plein.controls['quantite'].setValidators([Validators.required,Validators.max(+vehicule.taille_reservoir)]);
    console.log(vehicule.qte_carburant_reel, "qte_carburant_reel")
    this.plein.controls['qte_carburant_reel'].setValue(vehicule.qte_carburant_reel);
    console.log(vehicule.brand?.name, "MARQUE")
    this.plein.controls['brand'].setValue(vehicule.brand?.name);
    console.log(vehicule.tonnage?.name, "TONNAGE")
    this.plein.controls['tonnage'].setValue(vehicule.tonnage?.name);
    this.km = vehicule.km_reel
    console.log(this.km, "km")
    this.plein.controls['old_km'].setValue(this.km);
  }

  setForm(quantite = "" , fuel_coupon_number = "" ,  citerne_id = "" , kilometrage = "" ,  truck_id = "" , driver_id = "" , type = "", carburant_base="" ){
    this.plein = new FormGroup({
      quantite: new FormControl(quantite, Validators.required),
      fuel_coupon_number: new FormControl(fuel_coupon_number, Validators.required),
      citerne_id: new FormControl(citerne_id, Validators.required),
      kilometrage: new FormControl(kilometrage, Validators.required),
      old_km: new FormControl({ value: '', disabled: true }),
      code: new FormControl({ value: '', disabled: true }),
      carburant_base: new FormControl(carburant_base),
      brand: new FormControl({ value: '', disabled: true }),
      tonnage: new FormControl({ value: '', disabled: true }),
      taille_reservoir: new FormControl({ value: '', disabled: true }),
      qte_carburant_reel: new FormControl({ value: '', disabled: true }),
      truck_id: new FormControl(truck_id, Validators.required),
      driver_id: new FormControl(driver_id, Validators.required),
      type: new FormControl("CONSOMMATION", Validators.required),
    })
    console.log('plein');
    console.log(this.plein);

  }

  filterCiterne(event){
    if(event){
      console.log("citerne", event)
      this.citer = event;
      console.log(this.citer, "citer")
      this.plein.controls['citerne_id'].setValue(event.id);
    }
  }

  filterConducteur(event){
    if(event){
      var id = event.id;
      this.plein.controls['driver_id'].setValue(id);
    }
  }

  // vehiculeKM($event){
  //   console.log("vehicule_id", $event.value)
  //   console.log("vehicule", this.trucks.find(t => t.id == $event.value))
  //   var v = this.trucks.find(t => t.id == $event.value);
  //   console.log("vehivule", v)
  //   console.log("vehivule", v.froute)
  //   console.log("vehivule", v.froute.length)
  //   if(v.froute.length != 0){
  //     console.log("froute")
  //     this.km = v.froute['0'].km_depart
  //   }else{
  //     console.log("depart")
  //     this.km = v.km_initial ?? 0
  //   }
  //   // this.km = this.trucks.find(t => t.id == $event.value).froute['0']?.km_depart ?? this.trucks.find(t => t.id == $event.value).kilometrage ;
  //   console.log(this.km, "km")
  //   this.plein.controls['old_km'].setValue(this.km);
  //   this.plein.controls['code'].setValue(this.km);
  // }

  onSelectImage(event){
    console.log(event.target.files[0], "file")
    this.file = (event.target.files[0])
    console.log("images", this.file)
  }
  add(){

    if(this.plein.invalid){
      console.log("invalid")
      this._toast.warn('Remplir tous les champs obligatoires')
    }else{
      // console.log(this.citer.qte_reel, this.citer.capacite, this.plein.get("quantite").value)
      var qte = Number(this.citer.qte_reel) - Number(this.plein.get("quantite").value);
      // console.log("somme", qte)
      if(qte < this.citer.stock_min){
        this._toast.warn("Vous avez dépassé le stock minimum de la citerne ");
      }else{
        console.log("km pour plein", this.plein.get("kilometrage").value)
        console.log("km initial", this.km)
        if(Number(this.plein.get("kilometrage").value) < Number(this.km)){
          console.log("juste")
        }
        if(Number(this.plein.get("kilometrage").value) < Number(this.km)){
          console.log("passé")
          this._toast.warn("Le kilometrage doit être supérieur au kilometrage de depart");
        }
        else if(this.plein.get('quantite').hasError('max')){
          this._toast.warn("La quantité alimentée ne doit pas dépasser la taille de réservoir");
        }else{
          this.spinner = true
          console.log(this.plein.value);
          const formData = new FormData();
          for (var key in this.plein.value) {
            if(this.plein.value[key]){
              formData.append(key , this.plein.value[key])
            }
          }
          if(this.file){
            formData.append('file', this.file)
          }
          formData.forEach(x=>console.log('form data', x)
          )
          console.log('this.plein', this.plein);

          if (this.dialogData['editMode']) {
            this.vehiculeService.editMouvement(formData, this.dialogData['id'] ).subscribe(
              (data) => {
                console.log('data', data);
                this._toast.success("Plein modifié avec succés");
                this.spinner = false;
                this.dialogRef.close(data["response"]);
              },
              (error) => {
                console.log('error', error);
                this.spinner = false;
                this._toast.error("Une erreur est survenue");
            });
          }else{
            this.vehiculeService.addMouvement(formData).subscribe(
              (data) => {
                console.log('data', data);
                this._toast.success("Plein ajouté avec succés");
                this.spinner = false;
                this.dialogRef.close(data["response"]);
              },
              (error) => {
                console.log('error', error);
                this.spinner = false;
                this._toast.error("Une erreur est survenue");
            });
          }

          // console.log("taille reservoir", this.plein.get("taille_reservoir").value)
          // console.log("qte carburant", this.plein.get("qte_carburant_reel").value)
          // console.log("qte à alimenter", this.plein.get("quantite").value)
          // var sum = Number(this.plein.get("qte_carburant_reel").value) + Number(this.plein.get("quantite").value)
          // console.log("sum", sum)
          // if(sum > Number(this.plein.get("taille_reservoir").value)){
          //   this._toast.warn("Vous avez dépassé la taille de résérvoir");
          // }else{
          //   if(sum < 500 ){
          //     this._toast.warn("Vous n'avez pas encore arrivée au plein");
          //   }else{
          //     this.spinner = true
          //     console.log(this.plein.value)
          //     this.vehiculeService.addMouvement(this.plein.value).subscribe(
          //       (data) => {
          //         console.log('data', data);
          //         this._toast.success("Plein ajouté avec succés");
          //         this.spinner = false;
          //         this.dialogRef.close(data["response"]);
          //       },
          //       (error) => {
          //         console.log('error', error);
          //         this.spinner = false;
          //         this._toast.error("Une erreur est survenue");
          //     });
          //   }
          // }
        }
      }


    }
  }
}
