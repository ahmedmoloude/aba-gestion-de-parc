import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AffretementService } from 'app/core/services/affretement.service';
import { Customer } from 'app/core/services/customer.service';
import { CustomerService } from 'app/core/services/facturation/customer.service';
import { RessouresService } from 'app/core/services/ressoures.service';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { selectAllCity } from 'app/core/store/resources/resources.selectors';
import { ToastService } from 'app/services';
import { SearchService } from 'app/services/search.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-new-demande-light',
  templateUrl: './new-demande-light.component.html',
  styleUrls: ['./new-demande-light.component.css'],
})
export class NewDemandeLightComponent implements OnInit {
  loading = true;

  detail_taxation: any = {};

  submitting = false;

  trucks = [];

  drivers = [];

  options = [];


  uuid = null;

  new_amount = null;

  old_amount = null;

  constructor(
    private toast: ToastService,
    private ressourceService: RessouresService,
    private truckService: VehiculeService,
    private customerService: Customer,
    private store: Store,
    private serachServcie: SearchService,
    private affretmentService: AffretementService,
    private router : Router,
    private _activatedRoute : ActivatedRoute
  ) {}

  to_fill(val: any, name: string) {
    // this.newOffer.patchValue({
    //   customer_id: val,
    //   client: name
    // });
  }

  cities = [];

  modelChangeFn(query: string) {
    if (query !== '') {
      this.serachServcie.getClient(query).subscribe((res) => {
        this.options = res.response;
      });
    } else {
      this.options = [];
    }
  }

  customers = [];
  demandeLightFormGroup: FormGroup = new FormGroup({
    date_debut: new FormControl('', [Validators.required]),
    date_fin: new FormControl('', [Validators.required]),
    affretment_type_id: new FormControl('', [Validators.required]),
    expediteur_id: new FormControl('', [Validators.required]),
    orgin_city_id: new FormControl('', [Validators.required]),
    dest_city_id: new FormControl('', [Validators.required]),
    tonnage_id: new FormControl('', [Validators.required]),
    type_camion_id: new FormControl('', [Validators.required]),

    truck_id: new FormControl('', [Validators.required]),
    driver_id: new FormControl('', [Validators.required]),

    unloading_points: new FormArray([
      new FormGroup({
        dest_id: new FormControl('', [Validators.required]),
        city_dest_id: new FormControl('', [Validators.required]),
        adresse_id: new FormControl('', [Validators.required]),
        nb_palette: new FormControl('', [Validators.required]),
        declared_value: new FormControl('', [Validators.required]),
        dec_code: new FormControl('',),
      }),
    ]),
  });

  addUnloadingPoint(): void {
    let formArray = this.demandeLightFormGroup.get(
      'unloading_points'
    ) as FormArray;

    formArray.push(
      new FormGroup({
        dest_id: new FormControl('', [Validators.required]),
        city_dest_id: new FormControl('', [Validators.required]),
        adresse_id: new FormControl('', [Validators.required]),
        nb_palette: new FormControl('', [Validators.required]),
        declared_value: new FormControl('', [Validators.required]),
        dec_code: new FormControl('', [Validators.required]),
      })
    );
  }

  onOriginChange(e) {
    if (e) {
      this.demandeLightFormGroup.controls.orgin_city_id.setValue(e?.id);
    }
  }

  onDestChange(e) {
    if (e) {
      this.demandeLightFormGroup.controls.dest_city_id.setValue(e?.id);
    }
  }

  onExpChange(e) {
    if (e) {
      this.demandeLightFormGroup.controls.expediteur_id.setValue(e?.id);
    }
  }

  onDestinatireChange(e, i) {
    if (e) {

      let formArray = this.demandeLightFormGroup.get('unloading_points') as FormArray;


      formArray.at(i).get('dest_id').setValue(e?.id)
      
    }
  }

  onDestinatireCityChange(e, i) {
    if (e) {
      let formArray = this.demandeLightFormGroup.get(
        'unloading_points'
      ) as FormArray;

      formArray.at(i).get('city_dest_id').setValue(e?.id);
    }
  }

  affretment_types = [];

  date_debut: any;
  todayDate: any;

  truck_types = [];

  selectTruck(e) {
    if (e) {

      console.log('e ' ,e)
      this.demandeLightFormGroup.controls.truck_id.setValue(e?.id);
    }
  }

  selectDriver(e) {
    if (e) {
      console.log('e ' ,e)
      this.demandeLightFormGroup.controls.driver_id.setValue(e?.id);
    }
  }

  ngOnInit(): void {
    const drivers$ = this.ressourceService.getDrivers();
    const truckTypes$ = this.truckService.getTruckType();
    const customers$ = this.customerService.getCustomers();
    const trucks$ = this.affretmentService.getListVehicules();
    const affretmentTypes$ = this.affretmentService.getAffretementTypes();

    this.store.select(selectAllCity).subscribe((c) => {
      this.cities = c;
    });

    forkJoin([
      drivers$,
      truckTypes$,
      customers$,
      trucks$,
      affretmentTypes$,
    ]).subscribe(
      ([
        driversData,
        truckTypesData,
        customerData,
        trucksData,
        affretmentTypesData,
      ]) => {
        console.log('driver data ', driversData);
        console.log('truckTypesData data ', truckTypesData);
        console.log('cutomer ', customerData);
        console.log('trucksData ... ', trucksData);

        this.drivers = driversData.response;
        this.truck_types = truckTypesData['response'];
        this.customers = customerData.response;
        this.trucks = trucksData.response;
        this.affretment_types = affretmentTypesData;

        let uuid = this._activatedRoute.snapshot.paramMap.get('uuid');



        if (uuid) {
          
          this.uuid = uuid;

          console.log('router url ' , this.router.url)      

          this.affretmentService.getDemandeLightTaxationDetails(uuid).subscribe((res : any) => {

            this.loading = false;

            let transport = {
              total_ht : res?.response?.ht,
              total_ttc : res?.response?.ttc
            }

            this.detail_taxation.transport = transport

            this.old_amount  = this.detail_taxation?.transport?.total_ht;

            this.new_amount = this.old_amount

          })

        }

        else{

          this.loading = false;

        }

      }
    );

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    this.todayDate = formattedDate;
    //this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    console.log(this.todayDate); // Output: '2023-06-06'
  }

  setDateDebutReservation(date) {
    console.log('DATE début', date);
    this.date_debut = date;
  }

  get tonnages() {
    let type_camion_id = this.demandeLightFormGroup.get('type_camion_id').value;

    if (type_camion_id) {
      return this.truck_types.find((c) => c.id == type_camion_id)?.tonnages;
    } else return [];
  }

  get getTrucks() {
    let type_camion_id = this.demandeLightFormGroup.get('type_camion_id').value;

    let tonnage_id = this.demandeLightFormGroup.get('tonnage_id').value;

    if (type_camion_id && tonnage_id) {


      return this.trucks.filter(
        (v) => v.tonnage_id == tonnage_id && v.truck_type_id == type_camion_id
      );
    }

    return [];
  }

  submit() {

    this.submitting = true;

    this.affretmentService
      .createDemandeLight(this.demandeLightFormGroup.value)
      .subscribe((res: any) => {
        this.submitting = false;

        this.toast.success('La demande est créée avec succès');

        this.detail_taxation = res?.response?.taxation_detail;

        this.old_amount  = this.detail_taxation?.transport?.total_ht;


        this.new_amount = this.old_amount
        this.uuid = res?.response?.demande?.uuid;

      });
  }

  deliveryAdresseByDest(i) {
    console.log('index ,,,' , i)

    let formArray = this.demandeLightFormGroup.get(
      'unloading_points'
    ) as FormArray;


    console.log('form array ' , formArray);

    
    let dest_id = formArray.at(i).get('dest_id').value;
    let city_dest_id = formArray.at(i).get('city_dest_id').value;





    if (dest_id && city_dest_id) {
      let delivery_adresses = this?.customers?.find(
        (customer) => customer.id == dest_id
      )?.address_delivery;

      return delivery_adresses.filter(
        (ad) => ad?.sector?.zone.city_id == city_dest_id
      );
    } else {
      return [];
    }
  }

  onDestinatireAdresseChange(e, i) {
    if (e) {
      let formArray = this.demandeLightFormGroup.get(
        'unloading_points'
      ) as FormArray;

      formArray.at(i).get('adresse_id').setValue(e?.id);
    }
  }




  updateAmountDemandeLight(){


    let body = {


      'new_amount' : this.new_amount,
      'uuid' : this.uuid
    }



    if (this.new_amount > this.old_amount) {
      this.affretmentService.updateAmountDemandeLight(body).subscribe((res) => {

        this.toast.success('Le nouveau montant a été mis à jour avec succès');

        this.router.navigate(['/listedemandesLight'])
      })
    }
    else{
       this.toast.warn('Le nouveau montant doit être supérieur à l\'ancien montant')
    }
   
  }
}
