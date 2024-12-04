import { Component, OnInit } from '@angular/core';
import { selectEnvtonnagePayload } from 'app/core/store/tonnage/tonnage.selectors';
import { selectDrivers, selectTrucks } from 'app/core/store/resources/resources.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { ToastService } from 'app/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BoCovoyageService } from 'app/core/services/admin-bo/bo-covoyage.service';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { PersonelService } from 'app/core/services/personel.service';

@Component({
  selector: 'app-dialog-affectation',
  templateUrl: './dialog-affectation.component.html',
  styleUrls: ['./dialog-affectation.component.css']
})
export class DialogAffectationComponent implements OnInit {






  get get_accompanguters (){



    let current_driver_id = this.affectation.get('driver_id')?.value;



    if (current_driver_id) {
      return this.all_accompanguters.filter((d) => d.id != current_driver_id)
    }
    return this.all_accompanguters

  }

  all_accompanguters = []
loading = true;
vehicules = new Array();
// allRDVTask = new Array();
drivers = new Array();
tonnages : any;
affectation : FormGroup;
spinner : boolean = false;
type : any;
item : any;
  constructor(private store: Store<AppState>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private boGridService: BoGridService,
              private vehiculeService: VehiculeService,
              private _toaster: ToastService,
              public dialogRef: MatDialogRef<DialogAffectationComponent>,
              private boCovoyageService: BoCovoyageService,
            
              private personelService : PersonelService
            ) { }

  ngOnInit(): void {
    this.type = this.data["type"];
    this.item = this.data["item"];
    console.log("morph", this.type, this.item)


    this.personelService.personnelbyFunction(null, 'ACCOMPAGNATEUR').subscribe(
      (data:any) => {
        console.log("Accompagnetures data.... ", data)


        this.all_accompanguters = data?.response;



      },
      (error) => {
        console.log('error', error);
      });
    this.vehiculeService.getTonnage().subscribe(
      (data: any) => {
        console.log("data tonnage", data)
        this.tonnages = data.response

        this.loading = false
      },
      (error) => {
        // this.spinner = false;
        this._toaster.error('Une erreur est survenue !');
      });

    this.affectation = new FormGroup({
      driver_id: new FormControl("", Validators.required),
      truck_id: new FormControl("", Validators.required),
      tonnage_id: new FormControl("", Validators.required),
      is_affected: new FormControl(1),
      accompagnateur_id  : new FormControl(""),
    })
  }

  tonnage($event){
    console.log("id tonnage", $event.value)

    // console.log("vehicules==========>", this.tonnages.find(t => t.id == $event.value ).trucks)
    var v = this.tonnages.find(t => t.id == $event.value ).trucks
    console.log(" all vehicules with this tonnage", v)
    var disponible = v.filter(d => d.disponible['status'] == true )
    console.log("vehicule disponible", disponible);
    // console.log( this.vehicules.services);
    // console.log("type", this.type)
    for(var i=0; i < disponible.length; i++){
      for(var j=0; j < disponible[i].services.length; j++){
        // console.log(disponible[i].services[j].name, "disponible[i].services[j].name");
        if(disponible[i].services[j].name == this.type){
          // console.log(disponible[i], "vvvvv")
          this.vehicules.push(disponible[i]);
        }
      }
    }
    console.log( "vehicules disponible with service",this.vehicules);


    console.log("all drivers with this tonnage", this.tonnages.find(t => t.id == $event.value ).personnels)
    var d = this.tonnages.find(t => t.id == $event.value ).personnels
    var drivers = d.filter(d => d.disponible['status'] == true )
    console.log("drivers disponible", drivers)
    for(var i=0; i < drivers.length; i++){
      for(var j=0; j < drivers[i].service.length; j++){
        // console.log(disponible[i].services[j].name, "disponible[i].services[j].name");
        if(drivers[i].service[j].name == this.type){
          // console.log(disponible[i], "vvvvv")
          this.drivers.push(drivers[i]);
          this.all_accompanguters.push(drivers[i])
        }
      }
    }



    console.log( "drivers disponible with service",this.drivers);
  }

  affecter(){
    console.log("form", this.affectation.value)
    if(this.affectation.invalid){
      this._toaster.warn("Remplir tous les champs obligatoires");
      return;
    }
    switch (this.type) {
      case 'Ramassage': {
        this.spinner = true
        this.boGridService.affecterTour(this.affectation.value, this.item.id ).subscribe(
          (data: any) => {
            console.log("data", data)
            this.dialogRef.close(data["response"]);
          },
          (error) => {
            this.spinner = false;
            this._toaster.error('Une erreur est survenue !');
          });
        break;
      }
      case 'Covoyage': {
        this.spinner = true
        this.boCovoyageService.affecterCovoyage(this.affectation.value, this.item.uuid ).subscribe(
          (data: any) => {
            console.log("data", data)
            this.dialogRef.close(data["response"]);
          },
          (error) => {
            this.spinner = false;
            this._toaster.error('Une erreur est survenue !');
          });
        break;
      }
      case 'Livraison': {
        this.spinner = true
        this.boGridService.affecterTour(this.affectation.value, this.item.id ).subscribe(
          (data: any) => {
            console.log("data", data)
            this.dialogRef.close(data["response"]);
          },
          (error) => {
            this.spinner = false;
            this._toaster.error('Une erreur est survenue !');
          });
        break;
      }
      case 'Transfert': {
        this.spinner = true
        this.boGridService.affecterTransfert(this.affectation.value, this.item.id ).subscribe(
          (data: any) => {
            console.log("data", data)
            this.dialogRef.close(data["response"]);
          },
          (error) => {
            this.spinner = false;
            this._toaster.error('Une erreur est survenue !');
          });
        break;
      }
      default: {
        break;
      }
    }
  }

}
