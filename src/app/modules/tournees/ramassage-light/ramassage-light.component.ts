import { Component, OnInit } from '@angular/core';
import { ToastService } from './../../../core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectAllCity } from 'app/core/store/resources/resources.selectors';
import { selectEnvPayload, selectEnvIsLoading, selectEnvError, appSelectCustomer } from 'app/core/store/customer/customer.selectors';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-ramassage-light',
  templateUrl: './ramassage-light.component.html',
  styleUrls: ['./ramassage-light.component.css'],
})
export class RamassageLightComponent implements OnInit {

  clients: any;
  cities: any;
  addresses:any;
  adresseSpinner : boolean =false;
  spinner : boolean =false;
  spinnerAdd : boolean =false;
  createRamassage : FormGroup;
  constructor(private store: Store<AppState>,
    private boGridService: BoGridService,
    private _toast: ToastService,
    public permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.store.select(selectEnvPayload).subscribe((res) => {  
      this.clients = res
      console.log(" client========>", this.clients)
    });
    this.store.select(selectAllCity).subscribe((res) => {  
      this.cities = res;
      console.log(" cities========>", this.cities)
    });
    // this.spinner = true;
    // this.boGridService.getCustomer().subscribe((data) => {
    //   this.clients = data["response"];
    //   console.log("allClient", this.clients);
    //   this.boGridService.getAllCities().subscribe((data) => {
    //     console.log(data);
    //     this.cities = data;
    //     console.log("cities", this.cities);
    //     this.spinner = false;
    //   },
    //   (error) => {
    //     console.log('error', error);
    //   });
    // },
    // (error) => {
    //   console.log('error', error);
    // });
  }

  setForm(){
    this.createRamassage = new FormGroup({
      id_customer: new FormControl("", Validators.required),
      id_adresse_expedition: new FormControl("", Validators.required),
      type: new FormControl("", Validators.required),
      number: new FormControl("",[ Validators.required, Validators.min(0)]),
      weight: new FormControl("", [Validators.required, Validators.min(0)]),
      volume: new FormControl("", [Validators.required, Validators.min(0)]),
      comment: new FormControl(""),
      destination_city_id: new FormControl("", Validators.required),
    })
  }


  clientChange($event) {
    console.log(this.clients);
    console.log($event.value);
    if (!this.clients.find((client) =>  client.id == $event.value ).pick_up_adresses?.length) {
      //this.addresses = this.clients[$event.value].pick_up_adresses;
      this.adresseSpinner = false;
      this._toast.error("Ce client n'a aucune adresse de ramassage !");
    } else {
      this.addresses =this.clients.find((client) => client.id == $event.value).pick_up_adresses
      this.adresseSpinner = true;
    }
    
  }

  addRamassage(){
    this.spinnerAdd = true;
    console.log("data envoye",this.createRamassage.value);
    this.boGridService.addRamassageLight(this.createRamassage.value).subscribe(
      (data) => {
        console.log('ramassage cree ', data);
        this._toast.success("Ramassage crée avec succée !");
        this.spinnerAdd = false;
      },
      (error) => {
        console.log(error)
        this._toast.error("Une erreur est survenue lors de l'ajout de ramassage !");
      }
    );
  }

  imgInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }
}
