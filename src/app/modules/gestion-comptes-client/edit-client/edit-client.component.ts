import { PersonelService } from 'app/core/services/personel.service';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ValidationErrors, AbstractControl, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Customer } from 'app/core/services/customer.service';
import { RessouresService } from 'app/core/services/ressoures.service';
import { AppState } from 'app/core/store/app.states';
import { selectPublicGrids } from 'app/core/store/grids/grids.selectors';
import { selectMotPorture } from 'app/core/store/mot_porture/motporture.selectors';
import { selectCitiesAndCategories, selectZones } from 'app/core/store/resources/resources.selectors';
import { ToastService } from 'app/services';
import { SearchService } from 'app/services/search.service';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

import { BoGridService } from "app/core/services/admin-bo/bo-grids.service";
import { fromEvent } from 'rxjs';
import { debounceTime, pairwise, startWith, take } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { ActivityService } from 'app/core/services/activity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { selectEnvPayloadAgence } from 'app/core/store/agence/agence.selectors';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';



  export const addressType = {
    BILLING: 'BILLING',
    PICKUP: 'PICKUP',
    DELIVERY: 'DELIVERY',
    EXPEDITION: 'EXPEDITION',
    HEADQUARTERS: 'HEADQUARTERS',
    FACTURATION: 'FACTURATION',
    RETURN : 'RETURN',
  }
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {



  banques = [ "Attijariwafa Bank",  "Banque Centrale Populaire",  "Banque Marocaine du Commerce et de l'Industrie",  "BMCE Bank",  "Crédit Agricole du Maroc",  "Crédit du Maroc",  "Société Générale Marocaine de Banques",  "Banque Populaire",  "Banque Marocaine pour le Commerce et l'Industrie",  "CIH Bank"];

  phonePattern = "^0[5-9][0-9]{8}$"

  @ViewChild('myForm') form: NgForm;

  @ViewChild('searchCityComponent') searchCityComponent: SharedAutcompleteComponent;

  addressType = addressType;
  spinner : boolean = false;
  CustomerFormGroup: FormGroup;
  mode_ports : any[];
  isLoading  = false;
  fromProspect = false;

  active_grid :any = {};
  cities: any[];
  display: boolean = false;
  options: any = [];

  preview;
  document;

  logo_image;
  logo_image_preview;

  zones = []

  identity_image;
  RIB_image;
  identity_image_preview;

  sectors = [];
  activities = [];

  merchants = [];

  data :any  = {}
   
  allAgencies = [];
 constructor(
  private domSanitizer : DomSanitizer,
  private route : ActivatedRoute,
  private location: Location,
  private elementRef: ElementRef,
  private _router : Router,
  public dialog: MatDialog,
  private personelService: PersonelService,
  private activityService: ActivityService,
  private el: ElementRef , public  boGridService : BoGridService ,  public ressourceService : RessouresService,    public search: SearchService, public formBuilder: FormBuilder,private _toaster: ToastService,private http: HttpClient, private customerservice: Customer,private store:Store<AppState>,){
  }


  get address_pickup() {
    return this.CustomerFormGroup.controls['address_pickup'] as FormArray;
  }


  oncityChange(city){
    if(city){
      var id = city.id;
      this.CustomerFormGroup.controls['city_id'].setValue(id);
    }
  }


  fill(customer , id) {
    
    let allowedSenders = this.CustomerFormGroup.get('allowedSenders') as FormArray
    if (allowedSenders?.value?.findIndex((x) => x.id === id) === -1) {
      allowedSenders.push(new FormGroup({
        id :new FormControl(customer.id),
        name : new FormControl(customer.name) 
      }));
    }
    this.display = false;
  }

  
   setFormValues(formGroup: FormGroup, data: any) {
    Object.keys(data).forEach(key => {
      const control = formGroup.get(key);
      if (control) {
        const value = data[key];
        if ( control instanceof FormArray) {
        
        } else if (value instanceof Object && control instanceof FormGroup) {
          // Handle nested FormGroup
          this.setFormValues(control, value);
        } else {
          console.log('control instance' , control)
          console.log('key' , key)

          console.log('value' , value)

          if (value) {
            control.setValue(value);
          }
        }
      }
    });

  }
  


  ngOnInit(): void {
    // this.spinner = true;
    this.store.select(selectEnvPayloadAgence).subscribe((res) => {
      this.allAgencies = res;
    });

    this.fromProspect =  this.data.from_prospect
    this.boGridService.fetchListActivity().subscribe(data => {
      this.activities = data;
    }, error => {
      console.log("error", error);
    })

    // this.activityService.UserCommercial().subscribe((res) => {
    //   this.merchants = res['response'];
    // });

    this.personelService.personnelbyFunction(null, 'COMMERCIAL').subscribe(
      (data:any) => {
        this.merchants = data.response;
        console.log("this.user", this.merchants)
        // this.nbUser = this.user.length;
      },
      (error) => {
        console.log('error', error);
      }
    );


    this.ressourceService.getSectors().subscribe((sectors) => {this.sectors = sectors})

    this.store.select(selectCitiesAndCategories).subscribe((res) => (this.cities = res.filter(function(x) { return x.type !== 'area_size'})));

    this.store.select(selectMotPorture).subscribe((res) => {this.mode_ports = res })
    this.setForm();

    this.store.select(selectPublicGrids).subscribe((res) => {
      this.active_grid = res.find(function(x) { return x.is_activated})
      this.CustomerFormGroup.controls['grid_id'].setValue(this.active_grid?.id);

    })

    let uuid = this.route.snapshot.params.uuid;


    this.customerservice.getOneCustomer(uuid).subscribe((res) => {
        this.data = res.response;

        console.log('api response' , res)
        

        if (this.data.adresse_siege) {
          this.data.adresse_siege.position = { long : this.data.adresse_siege.position.coordinates[0] , lat : this.data.adresse_siege.position.coordinates[1]}   
        }
        if (this.data.adresse_facturation) {
          this.data.adresse_facturation.position =  { long : this.data.adresse_facturation.position.coordinates[0] , lat : this.data.adresse_facturation.position.coordinates[1]} 
  
        }
        if( this.data.adresse_return_document_and_fond) this.data.adresse_return_document_and_fond.position = { long : this.data.adresse_return_document_and_fond.position.coordinates[0] , lat : this.data.adresse_return_document_and_fond.position.coordinates[1]} 
        

        if (this.data?.city) {
          setTimeout(() => this.searchCityComponent?.selectObject(this.data?.city))
        }
      
        this.setFormValues(this.CustomerFormGroup , this.data) 


        console.log('data response', this.data)



        if (this.data?.interlocutors) {
          
          for (const item of this.data?.interlocutors) {
  
            this.addInterlocutor(item.last_name , item.first_name , item.fonction , item.phone , item.email)
          }
          
        }


        if (this.data?.address_delivery) {
          
          for (const item of this.data?.address_delivery) {
  
            this.addAddress(addressType.DELIVERY , item.adress , item.id , item.position.coordinates)
          }
        }

        


        if (this.data?.pick_up_adresses) {
          for (const item of this.data?.pick_up_adresses) {
            this.addAddress(addressType.PICKUP , item.adress , item.id , item.position.coordinates)
          }
    
        }

        if (this.data?.notifications) {
          for (const item of this.data?.notifications) {
  
            this.addNotification(item.phone , item.process)
          }
        }


        if (this.address_pickup.length === 0) this.addAddress(addressType.PICKUP);
        if (this.address_delivery.length === 0) this.addAddress(addressType.DELIVERY);
        if (this.notifications.length === 0) this.addNotification('' , '');
        if (this.interlocutors.length === 0) this.addInterlocutor();

        this.spinner = true;
    })
    
    const selcted_recipes: FormArray = this.CustomerFormGroup.get('selcted_recipes') as FormArray;

    this.data?.recipes_ports?.forEach(element => {

      selcted_recipes.push(new FormControl(element.pivot.mode_port_id));
    });


    const selected_send: FormArray = this.CustomerFormGroup.get('selected_send') as FormArray;

    this.data?.send_ports?.forEach(element => {
      selected_send.push(new FormControl(element.pivot.mode_port_id));
    });
    

    const selected_receive: FormArray = this.CustomerFormGroup.get('selected_receive') as FormArray;

    this.data?.receive_ports?.forEach(element => {
      selected_receive.push(new FormControl(element.pivot.mode_port_id));
    });

    this.data?.authorized_customers_in_send?.forEach(element => {
        this.fill(element , element.id )
    });

  



    this.CustomerFormGroup.controls.type.valueChanges.subscribe(type => {
      
      switch (type) {
       case 'entity':
         this.CustomerFormGroup.controls.identity_number.setValidators(
           [Validators.required, Validators.minLength(14)]);

         this.CustomerFormGroup.controls.identity_number.updateValueAndValidity();  
         break;

       case 'individual':
         this.CustomerFormGroup.controls.identity_number.setValidators([Validators.required, 
           Validators.minLength(8)]);

         this.CustomerFormGroup.controls.identity_number.updateValueAndValidity();  
       default:
         break;
      }
   })

    this.CustomerFormGroup.controls.type.valueChanges.subscribe(type => {
      
       switch (type) {
        case 'entity':
          this.CustomerFormGroup.controls.identity_number.setValidators(
            [Validators.required, Validators.minLength(14)]);

          this.CustomerFormGroup.controls.identity_number.updateValueAndValidity();  
          break;

        case 'individual':
          this.CustomerFormGroup.controls.identity_number.setValidators([Validators.required, 
            Validators.minLength(8)]);

          this.CustomerFormGroup.controls.identity_number.updateValueAndValidity();  
        default:
          break;
       }
    })


    this.CustomerFormGroup.get('type').valueChanges.subscribe(value => {
      if (value == 'entity') {
        this.CustomerFormGroup.get('legal_status').setValidators([Validators.required]);
        this.CustomerFormGroup.get('legal_status').updateValueAndValidity();

        this.CustomerFormGroup.get('commercial_register').setValidators([Validators.required]);
        this.CustomerFormGroup.get('commercial_register').updateValueAndValidity();


        this.CustomerFormGroup.get('activity_id').setValidators([Validators.required]);
        this.CustomerFormGroup.get('activity_id').updateValueAndValidity();

        

        this.CustomerFormGroup.get('reference').setValidators([Validators.required]);
        this.CustomerFormGroup.get('reference').updateValueAndValidity();

      } else {
        this.CustomerFormGroup.get('legal_status').setValidators([]);
        this.CustomerFormGroup.get('legal_status').updateValueAndValidity();

        this.CustomerFormGroup.get('commercial_register').setValidators([]);
        this.CustomerFormGroup.get('commercial_register').updateValueAndValidity();


        this.CustomerFormGroup.get('reference').setValidators([]);
        this.CustomerFormGroup.get('reference').updateValueAndValidity();
        
        this.CustomerFormGroup.get('activity_id').setValidators([]);
        this.CustomerFormGroup.get('activity_id').updateValueAndValidity();
      }
    });

  


    console.log('address_pickup' , this.address_pickup)


    this.CustomerFormGroup.get('return_fund_management').valueChanges.subscribe(value => {
      if (value == 'bank_transfer') {
        this.CustomerFormGroup.get('RIB').setValidators([Validators.required]);
        this.CustomerFormGroup.get('RIB').updateValueAndValidity();

      } else {
        this.CustomerFormGroup.get('RIB').setValidators([]);
        this.CustomerFormGroup.get('RIB').updateValueAndValidity();
      }
    });
    this.CustomerFormGroup.get('return_fund_management').updateValueAndValidity();


    
    
    this.CustomerFormGroup.get('email_notifcation').get('mail_crbt_active').valueChanges.subscribe(value => {
      if (value == false) {
        this.CustomerFormGroup.get('email_notifcation').get('crbt').disable();
      } else {
        this.CustomerFormGroup.get('email_notifcation').get('crbt').enable();
      }
    });
    this.CustomerFormGroup.get('email_notifcation').get('mail_crbt_active').updateValueAndValidity();

        
    this.CustomerFormGroup.get('email_notifcation').get('mail_suffering_active').valueChanges.subscribe(value => {
      if (value == false) {
        this.CustomerFormGroup.get('email_notifcation').get('suffering').disable();
      } else {
        this.CustomerFormGroup.get('email_notifcation').get('suffering').enable();
      }
    });
    this.CustomerFormGroup.get('email_notifcation').get('mail_suffering_active').updateValueAndValidity();


    this.CustomerFormGroup.get('email_notifcation').get('mail_facture_active').valueChanges.subscribe(value => {
      if (value == false) {
        this.CustomerFormGroup.get('email_notifcation').get('facture').disable();
      } else {
        this.CustomerFormGroup.get('email_notifcation').get('facture').enable();
      }
    });
    this.CustomerFormGroup.get('email_notifcation').get('mail_facture_active').updateValueAndValidity();

    this.CustomerFormGroup.get('email_notifcation').get('mail_exploitation_active').valueChanges.subscribe(value => {
      if (value == false) {
        this.CustomerFormGroup.get('email_notifcation').get('exploitation').disable();
      } else {
        this.CustomerFormGroup.get('email_notifcation').get('exploitation').enable();
      }
    });
    this.CustomerFormGroup.get('email_notifcation').get('mail_exploitation_active').updateValueAndValidity();

    this.CustomerFormGroup.get('notification_sms_activated').valueChanges.subscribe(value => {
      if (value == false) {
        this.CustomerFormGroup.get('notifications').disable();
      } else {
        this.CustomerFormGroup.get('notifications').enable();
      }
    });
    this.CustomerFormGroup.get('notification_sms_activated').updateValueAndValidity();



     this.CustomerFormGroup.get('adresse_siege').get('adress').valueChanges
     .pipe(startWith(1), pairwise()).subscribe(
      ([prevValue, value]) => {
      if (value) {
         if (this.CustomerFormGroup.get('adresse_return_document_and_fond').get('adress').value.length == 0 || this.CustomerFormGroup.get('adresse_return_document_and_fond').get('adress').value == prevValue) {
          this.CustomerFormGroup.get('adresse_return_document_and_fond').get('adress').setValue(value)
         }
         if (this.CustomerFormGroup.get('adresse_facturation').get('adress').value.length == 0
         || this.CustomerFormGroup.get('adresse_facturation').get('adress').value == prevValue
         ) {
          this.CustomerFormGroup.get('adresse_facturation').get('adress').setValue(value)
         }



         let address_delivery = this.CustomerFormGroup.get('address_delivery') as FormArray;
         let first_delivery_address =  address_delivery.at(0)?.get('adress');
         if (first_delivery_address?.value?.length == 0 || first_delivery_address?.value == prevValue) {
           first_delivery_address.setValue(value)
         }

         let address_pickup = this.CustomerFormGroup.get('address_pickup') as FormArray;
         let first_pickup=  address_pickup.at(0)?.get('adress');
         if (first_pickup?.value?.length == 0 || first_pickup?.value == prevValue) {
          first_pickup.setValue(value)
         }
      }
    });
    this.CustomerFormGroup.get('adresse_siege').get('adress').updateValueAndValidity();

  }

  get  filterAgencies(){
    let city_id = this.CustomerFormGroup.controls.city_id.value;
    if (city_id) {
      return this.allAgencies?.filter(a => a.city_id === city_id)
    } 
    return []
  }


  // filterZones(){
  //   let city_id = this.CustomerFormGroup.controls.city_id.value;
  //   if (city_id) {
  //     return this.zones?.filter(a => a.city_id === city_id)
  //   } 
  //   return []
  // }




  // Map location dialog
  openDialog(
    isPreviewMode: boolean,
    type: string,
    index: number,
    position: { long: string; lat: string }
  ): void {

    console.log('openDialog', isPreviewMode , type , index , position)
    const dialogRef = this.dialog.open(MapDialogComponent, {
      disableClose: true,
      width: '1000px',
      data: { isPreviewMode, type, index, position },
    });
    dialogRef.afterClosed().subscribe((output) => {
      let addresses: any;
      if (!isPreviewMode && output) {
        
        if (type === addressType.HEADQUARTERS) {

          this.f.adresse_siege.get('position').get('lat').setValue(
            output.lat
          );
          this.f.adresse_siege.get('position').get('long').setValue(
            output.lng
          );
          return;

        }
        else if (type === addressType.FACTURATION) {

          this.f.adresse_facturation.get('position').get('lat').setValue(
            output.lat
          );
          this.f.adresse_facturation.get('position').get('long').setValue(
            output.lng
          );
          return;

        }
        else if (type === addressType.RETURN) {

          this.f.adresse_return_document_and_fond.get('position').get('lat').setValue(
            output.lat
          );
          this.f.adresse_return_document_and_fond.get('position').get('long').setValue(
            output.lng
          );
          return;

        }
        else if (type === addressType.PICKUP) addresses = this.address_pickup;
        else if (type === addressType.DELIVERY) addresses = this.address_delivery;
        else return;

        // update form controls
        addresses.controls[index].controls['position'].controls['lat'].setValue(
          output.lat
        );
        addresses.controls[index].controls['position'].controls[
          'long'
        ].setValue(output.lng);
      }
    });
  }


  addAddress(type: string, address = '', id = null, geoLoc = null) {
    let addresses: FormArray;
    // if (type === addressType.BILLING) addresses = this.address_billing;
     if (type === addressType.PICKUP) addresses = this.address_pickup;
    else if (type === addressType.DELIVERY) addresses = this.address_delivery;
    else return;

    addresses.push(
      new FormGroup({
        id: new FormControl(id),
        adress: new FormControl(address, [
          Validators.required,
          // Validators.minLength(3),
        ]),
        type: new FormControl(type),
        position: new FormGroup({
          long: new FormControl(geoLoc ? geoLoc[0] : null, [
            Validators.required,
          ]),
          lat: new FormControl(geoLoc ? geoLoc[1] : null, [
            Validators.required,
          ]),
        }),
      })
    );
    addresses.updateValueAndValidity()

  }

  addNotification(phone : string , process: string , send_to_exp : boolean = false , send_to_dest : boolean = false) {

    let notifications =  this.CustomerFormGroup.controls['notifications'] as FormArray;
    notifications.push(
      new FormGroup({
        process: new FormControl(process),
        phone : new FormControl(phone),
        send_to_exp : new FormControl(send_to_exp),
        send_to_dest : new FormControl(send_to_dest)
      })
    );
  }

  addInterlocutor( last_name :string ='' , first_name :string  ='', fonction : string ='' , phone : string ='', email: string ='') {

    let interlocutors =  this.CustomerFormGroup.controls['interlocutors'] as FormArray;
    interlocutors.push(
      new FormGroup({
        last_name : new FormControl(last_name , Validators.required),
        first_name : new FormControl(first_name , Validators.required),
        fonction : new FormControl(fonction ,Validators.required),
        phone: new FormControl(phone, Validators.required),
        email : new FormControl(email , Validators.required)
      })
    );
  }



  transform(url) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

   get getSrcLogo(){

    if (this.logo_image) {
      let urlCreator = window.URL || window.webkitURL;
      let imageUrl = urlCreator.createObjectURL(this.logo_image);
      return  this.transform(imageUrl);
    }
    return  environment.STORAGE + '/logo/' + this.data?.id + '/' + this.data?.logo_path
   }

   get srcIdentityImage(){
    return  environment.STORAGE + '/identity_image/' + this.data?.id + '/' + this.data?.identity_image_path
   }

   get srcRIBImage(){
    return  environment.STORAGE + '/RIB_image/' + this.data?.id + '/' + this.data?.RIB_image_path
   }

  removeInterlocutor(index :number ){
    this.interlocutors.removeAt(index)
  }

  setForm()
  {
    this.CustomerFormGroup = new FormGroup({

      analytique_libelle : new FormControl(""),
      prepaid_card : new FormControl(""),
      email : new FormControl("", Validators.required),
      banque : new FormControl(""),
      pays : new FormControl(""),
      handled_by_bo : new FormControl(false , Validators.required),
      // minimum with periodes 
      min_poids : new FormControl('' , Validators.required),
      min_poids_period : new FormControl('' , Validators.required),
      min_exp : new FormControl('' , Validators.required),
      min_exp_period : new FormControl('' , Validators.required),
      min_vol : new FormControl('' , Validators.required),  
      min_vol_period : new FormControl('' , Validators.required),
      min_colis : new FormControl('' , Validators.required),
      min_colis_period : new FormControl('' , Validators.required),
      min_ca : new FormControl('' ,  Validators.required),
      min_ca_period : new FormControl('' , Validators.required),


      //facturation 
      compte : new FormControl('' , Validators.required),
      compte_analytique : new FormControl('' , Validators.required),
      RIB : new FormControl('') ,
      payment_deadline: new FormControl('',[Validators.required]),
      delay_invoice: new FormControl('',[Validators.required]),
      refund_delay: new FormControl('',[Validators.required]),
      return_fond_and_documents_delay : new FormControl('',[Validators.required]),
      facture_nb_exemplaire : new FormControl('',[Validators.required]),
      type_edition_facture : new FormControl('' , [Validators.required]),
      recouvreur_id : new FormControl(''),
      envoi_facutre_electronique : new FormControl(false ,  Validators.required),

      // email notification 
      email_notifcation : new FormGroup({

        mail_crbt_active: new FormControl(false),
        mail_suffering_active: new FormControl(false),
        mail_facture_active: new FormControl(false),
        mail_exploitation_active: new FormControl(false),


        crbt : new FormGroup({
          mail_crbt: new FormControl(''),
          mail_crbt_for_exp: new FormControl(false),
          mail_crbt_for_des: new FormControl(false),
        }),
        suffering : new FormGroup({
          mail_suffering: new FormControl(''),
          mail_suffering_for_exp: new FormControl(false),
          mail_suffering_for_des: new FormControl(false),
        }),
        facture : new FormGroup({
          mail_facture: new FormControl(''),
          mail_facture_for_exp: new FormControl(false),
          mail_facture_for_des: new FormControl(false),
        }),
        exploitation : new FormGroup({
          mail_exploitation: new FormControl(''),
          mail_exploitation_for_exp: new FormControl(false),
          mail_exploitation_for_des: new FormControl(false),
        }),

      }),
      

      // potentiel
      potentiel_ca: new FormControl('' , Validators.required),
      periode_potentiel_ca: new FormControl('' , Validators.required),
      colis_potentiel: new FormControl('' , Validators.required),
      periode_colis_potentiel: new FormControl('' , Validators.required),
      poids_potentiel: new FormControl('' , Validators.required),
      periode_poids_potentiel: new FormControl('' , Validators.required),
      nb_exp_potentiel: new FormControl('' , Validators.required),
      periode_nb_exp_potentiel: new FormControl('' , Validators.required),
      volume_potentiel: new FormControl('' , Validators.required),
      periode_volume_potentiel: new FormControl('' , Validators.required),
        
      is_visible :  new FormControl(false , Validators.required),
      return_fund_management : new FormControl('' , Validators.required),
      reference : new FormControl('' , Validators.required),
      agency_id : new FormControl('' , Validators.required),
      commercial_register : new FormControl('' , Validators.required),
      legal_status : new FormControl('' , Validators.required),
      code : new FormControl('' , Validators.required),
      interlocutors : new FormArray([]),
      notifications : new FormArray([]),
      notification_email_activated: new FormControl(false , Validators.required),
      notification_sms_activated: new FormControl(false , Validators.required),
      adresse_siege : new FormGroup({
        id: new FormControl(''),
        adress: new FormControl('',
          Validators.required),
        position: new FormGroup({
          long: new FormControl('', [
            Validators.required,
          ]),
          lat: new FormControl('', [
            Validators.required,
          ]),
        }),
      } , Validators.required),
      adresse_facturation : new FormGroup({
        id: new FormControl(''),
        adress: new FormControl('', [
          Validators.required
        ]),
        position: new FormGroup({
          long: new FormControl('', [
            Validators.required,
          ]),
          lat: new FormControl('', [
            Validators.required,
          ]),
        }),
      }),
      adresse_return_document_and_fond : new FormGroup({
        id: new FormControl(''),
        adress: new FormControl('', [
          Validators.required
        ]),
        position: new FormGroup({
          long: new FormControl('', [
            Validators.required,
          ]),
          lat: new FormControl('', [
            Validators.required,
          ]),
        }),
      }),
      address_delivery : new FormArray([]),
      address_pickup: new FormArray([]),
      commercial_id : new FormControl(''),
      senderPriority : new FormControl(false , Validators.required),
      receiverPriority : new FormControl(false , Validators.required),
      allowedSenders :  this.formBuilder.array([]),
      name : new FormControl('' , Validators.required),
      phone: new FormControl('', [Validators.required , Validators.min(10)]),
      is_active: new FormControl(false),
      subject_to_TVA: new FormControl(false),
      customer_type : new FormControl('guichet',Validators.required),
      type : new FormControl('entity', [Validators.required]),
      city_id : new FormControl('', [Validators.required]),
      activity_id : new FormControl('', [Validators.required]),
      identity_number: new FormControl('', [Validators.required, Validators.minLength(14)]),
      GMS:new FormControl(false),
      market_customer:new FormControl(false),
      grid_id : new FormControl('', [Validators.required]),
      selcted_recipes : this.formBuilder.array([]),
      selected_send : this.formBuilder.array([]),
      selected_receive : this.formBuilder.array([]),
      use_grid : new FormControl(false),
      use_prepaid_card : new FormControl(false)
    });
  }

  onRecieveChange(e) {
    const checkArray: FormArray = this.CustomerFormGroup.get('selected_receive') as FormArray;
    if (e.checked) {
      checkArray.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.source.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onRecepiesChange(e) {
    
    const checkArray: FormArray = this.CustomerFormGroup.get('selcted_recipes') as FormArray;
    if (e.checked) {
      checkArray.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.source.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onSendChange(e) {
    const checkArray: FormArray = this.CustomerFormGroup.get('selected_send') as FormArray;

    console.log('e' , e)
    if (e.checked) {
      checkArray.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.source.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  

  get address_delivery(){
    return this.CustomerFormGroup.controls['address_delivery'] as FormArray;
  }

  get notifications(){
    return this.CustomerFormGroup.controls['notifications'] as FormArray;
  }


  get interlocutors(){
    return this.CustomerFormGroup.controls['interlocutors'] as FormArray;
  }
  

  onSubmit()
  {


    this.markFormGroupTouched(this.CustomerFormGroup)

    const flattenedGroup = this.flattenFormGroup(this.CustomerFormGroup)
    
    console.log('fflattenedGroup ' , flattenedGroup);

  
  
    if (!this.CustomerFormGroup.valid) {      
      const firstInvalidInput = this.elementRef.nativeElement.querySelector('.ng-invalid');
      if (firstInvalidInput) {
        firstInvalidInput.scrollIntoView({ behavior: 'smooth' });
      }
      this.getFormValidationErrors(this.CustomerFormGroup)
      return;
    }
    this.isLoading = true;

    let formData = new FormData();
    for (var key in flattenedGroup) {
      formData.append(key, flattenedGroup[key] );
    }

    formData.append('information_file' , this.document || '');
    formData.append('logo_image' , this.logo_image || '');
    formData.append('identity_image' , this.identity_image || '');
    formData.append('RIB_image' , this.RIB_image || '');



  }

  getFormValidationErrors(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.getFormValidationErrors(control);
      } else {
        const controlErrors: ValidationErrors = control.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log(`Control: ${key}, Error: ${keyError}, Value: ${controlErrors[keyError]}`);
          });
        }
      }
    });
  }
  

  filterModePortsReceive() {
    
     if (this.CustomerFormGroup.controls.customer_type.value == 'en_compte') {
      return this.mode_ports.filter((mode_port) => mode_port.for_receive === true)
    }
     else if (this.CustomerFormGroup.controls.customer_type.value == 'guichet'){
        return this.mode_ports.filter((mode_port) => mode_port.for_compte === false &&  mode_port.for_receive === true)
     }
    
    
  }

  filterModePorts() {
      if (this.CustomerFormGroup.controls.customer_type.value == 'en_compte') {
         return this.mode_ports
      }
      else if (this.CustomerFormGroup.controls.customer_type.value == 'guichet'){
         return this.mode_ports.filter((mode_port) => mode_port.for_compte === false)
      }
    
  }

  modelChangeFn(query: string) {
    this.display = !this.display
    if (query !== '') {
      this.search.getClient(query).subscribe(res => {
        this.options = res.response;
        console.log('response' , res)
      })
    } else {
      this.options = [];
    }
  }



  get f(): { [key: string]: AbstractControl } {
    return this.CustomerFormGroup.controls;
  }


  isSelected(type , id) : boolean {
    let  recipes_ports = this.data?.recipes_ports
    let send_ports =  this.data?.send_ports
    let receive_ports = this.data?.receive_ports

    switch (type) {
      case 'recipes':
        if (recipes_ports?.filter(function(e) { return e.id === id }).length > 0) {
          return true
        }
        else
        return false        
      case 'send':
        if (send_ports?.filter(function(e) { return e.id === id }).length > 0) {
          return true
        }
        else
        return false 
      case 'receive':
        if (receive_ports?.filter(function(e) { return e.id === id }).length > 0) {
          return true
        }
        else
        return false 
      default:
        return false
    }
  }


  removeAddress(type: string, idx: number) {
    // if (type === addressType.BILLING) this.address_billing.removeAt(idx);
    if (type === addressType.DELIVERY) this.address_delivery.removeAt(idx);
    if (type === addressType.PICKUP) this.address_pickup.removeAt(idx);
  }

  removeSmsNotification(idx: number){
    this.notifications.removeAt(idx)
  }



  filterSectors(city_id){
    return this.sectors.filter((s) => {
        return s?.zone?.city?.id == parseInt(city_id);
    });
  }


  getMsgErrors(controlName: string, validators: string[]) {

    const errorMsg = {
      required: 'Ce champ est obligatoire !',
      minlength: `Ce champ doit contenir au moins @ chiffres !`,
      maxlength: 'Ce champ ne doit pas depasser 14 chiffres!',
      email: 'Ce champ doit etre une adresse mail !',
    }

    const fieldForm = this.CustomerFormGroup.get(controlName);
    if (fieldForm.touched && !fieldForm.valid) {
      for (const v of validators) {
        const errors = fieldForm.errors[v]
        if (errors) {

          if (fieldForm.errors?.minlength) {
             errorMsg.minlength  = errorMsg.minlength.replace("@", fieldForm.errors?.minlength.requiredLength);            
          }
          return errorMsg[v];
        }
      }
    }
  }



  markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
  

	selectFile(event: any , type?: string) {
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		// if (mimeType.match(/image\/*/) == null) {
		// 	return;
		// }
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {

      if (type == 'LOGO') {
        this.logo_image = event.target.files[0]
        this.logo_image_preview = reader.result
        return;
      }
      else if (type == 'IDENTITY'){
        this.identity_image = event.target.files[0]
        this.identity_image_preview = reader.result
        return;

      }
      else if(type == 'RIB'){
        this.RIB_image = event.target.files[0]
        return;
      }

      // this.preview = reader.result
      // this.document = event.target.files[0]
		}
	}


  get information_file(){
   return  environment.STORAGE + '/customer_information_file/' + this.data.id + '/' +  this.data.information_file   
  }

  

  download(type){

    
    let image;
    if (type == 'RIB') {      
      window.open(this.srcRIBImage, '_blank');
    }
    else if (type == 'INFO_FILE'){
      window.open(this.information_file , '_blank')
    }
    else{
      window.open(this.srcIdentityImage, '_blank');
    }

  }



  isNumber(val: any) {
    return Number.isInteger(val);
  }


  flattenFormGroup(formGroup: FormGroup): { [key: string]: string } {
    const flattenedGroup = {};
  
    for (const controlName in formGroup.controls) {
      const control = formGroup.controls[controlName];
  
      if (control instanceof FormControl) {
        if (typeof control.value === 'boolean') {
          flattenedGroup[controlName] = control.value ? '1' : '0';
        } else {
          flattenedGroup[controlName] = control.value != null ? control.value.toString() : '';
        }
      } else if (control instanceof FormArray || control instanceof FormGroup) {
        flattenedGroup[controlName] = control.value != null ? JSON.stringify(control.value) : '';
      }
    }
  
    return flattenedGroup;
  }


}
