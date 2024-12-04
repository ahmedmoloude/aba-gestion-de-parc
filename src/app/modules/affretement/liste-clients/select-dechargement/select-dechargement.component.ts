import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'app/services';
import { Store } from '@ngrx/store';
import {
  selectAuthAndProfil,
  selectProfil,
} from 'app/core/store/profil/profil.selectors';
import { Observable } from 'rxjs';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { City } from 'app/core/models/location.model';
import Swal from 'sweetalert2';
import { MapMarchandiseComponent } from '../steps-reservations/marchandise/map-marchandise/map-marchandise.component';
import { AdressService } from 'app/core/services/adress.service';
import { AppState } from 'app/core/store/app.states';
import { selectAllCity, selectZones } from 'app/core/store/resources/resources.selectors';

@Component({
  selector: 'app-select-dechargement',
  templateUrl: './select-dechargement.component.html',
  styleUrls: ['./select-dechargement.component.css'],
})
export class SelectDechargementComponent implements OnInit {
  toggleAddressList: boolean = true;
  isOpend: boolean = false;
  adresses: Array<any>;
  filtredAddress: any[];
  searchAddress: any = null;
  isSpinner = true;
  addAddressForm: FormGroup;
  @Output() addressdechargeEvent = new EventEmitter<any>();
  addressChange!: any;
  @ViewChild('clicDiv', { static: false }) clicDiv: ElementRef;
  cities: City[];
  zones: any[];
  countries = [];
  @Input() customer_id: any;

  information: any = {};
  isLoading: boolean;
  constructor(
    private _toast: ToastService,
    private store: Store<AppState>,
    public dialog: MatDialog,
    private adresseService: AdressService,
    private renderer: Renderer2
  ) {}
  checkInfoLength(): boolean {
    //return Object.keys(this.adresses).length > 0 ? true : false;
    return true;
  }

  profil$: Observable<any> = this.store.select(selectProfil);

  ngOnInit(): void {

    console.log('customer id .... ' , this.customer_id)

    this.adresseService.getAllCountries().subscribe((data) => {
      this.countries = data;
    });
    console.log(' this.addressChange init', this.addressChange);

    // get addresses by type and city_id ----------------------------
    // this.addressService.getByType('PICKUP', null).subscribe((data) => {
    //   this.pickupAdresses = data.response;
    //   this.isLoading = false;
    //   console.log('PICKUP address data', this.pickupAdresses);
    // });

    // get addresses from the profil adresses----------------------------

    // this.profil$.subscribe((data) => {
    //   //  this.adresses = data.adresses;
    //   this.customer_id = data.id;
    //   //this.isSpinner = false;
    //   //console.log('address profildata', this.adresses);
    // });

    //get addresses by customer_id and type ---------------------------

    this.adresseService
      .getCustomerAdressesById(this.customer_id)
      .subscribe((data) => {
        const myAdresses: any[] = data.response;
        this.adresses = myAdresses.filter((e) => e.type === 'DELIVERY');
        this.isSpinner = false;
        console.log('address Delivery byid', this.adresses);
      });

    this.addAddressForm = new FormGroup({
      type: new FormControl('DELIVERY', [Validators.required]),
      //location: new FormControl('', [Validators.required]),
      city_id: new FormControl('', [Validators.required]),
      country_id: new FormControl('', [Validators.required]),
      zone_id: new FormControl('', [Validators.required]),
      sector_id: new FormControl('', [Validators.required]),
      position_long: new FormControl('', []),
      position_lat: new FormControl('', []),
      adress: new FormControl('', [Validators.required]),
    });

    this.store.select(selectAllCity).subscribe((res) => {
      this.cities = res;
      console.log('all cities==============>', this.cities);
      // this.cities.sort((a, b) => {
      //   return a.name.localeCompare(b.name);
      // });
    });
    this.store.select(selectZones).subscribe((res) => {
      this.zones = res;
      console.log('all zones==============>', this.zones);
      // this.cities.sort((a, b) => {
      //   return a.name.localeCompare(b.name);
      // });
    });

    //  this.onAddressChange(data[0]);
  }

  onChangeCityAgence(event) {
    console.log('selected city_id :', event);
    console.log(this.cities);

    const array = this.cities.map((e: any) => e.zone);
    console.log('array zone', array);
    this.cities.find((e) => {
      if (e.id === event) {
        console.log(e);
      }
    });
  }

  onChangeZoneAgence(event) {
    console.log('selected zone_id :', event);
    console.log(this.zones);
    const selectedZone = this.zones.find((e) => e.id === event);
    console.log(selectedZone);
  }

  filteredSectors(zoneId) {
    let sectors = this.zones?.find((a) => a.id === zoneId)?.sectors || [];

    // console.log('sectors', sectors)

    return sectors;
  }

  toogleisOpen() {
    this.isOpend = !this.isOpend;
    if (this.isOpend) {
      this.renderer.addClass(this.clicDiv.nativeElement, 'z-absolute');
      this.filtredAddress = this.adresses;
    } else {
      this.renderer.removeClass(this.clicDiv.nativeElement, 'z-absolute');
    }
  }

  filteredAddress() {
    const searchAddressWithoutSpaces = this.searchAddress.replace(/\s/g, '');
    this.filtredAddress =
      searchAddressWithoutSpaces === ''
        ? this.adresses
        : this.adresses.filter((address) => {
            return address.adress
              .toLowerCase()
              .includes(this.searchAddress.toLowerCase());
          });

    console.log(this.filtredAddress);
  }

  onAddressChange(address) {
    console.log('onaddressChange child', address);
    this.addressChange = {
      adresseData: address,
      adresse_id: address.id || address.adresse_id,
      adress_decharge: address.adress || address.adress_decharge,
      //type: address.type,
      customer_id: address.id_customer || address.customer_id,
      // city_id: address.sector_id, //address doesnt have city_id in the fields ==> city_id should be remplaced by sector_id
      city_id: address?.sector?.zone?.city.id || address.city_id,
      ville: address?.sector?.zone?.city.name || address.ville,
      lat: address?.position?.coordinates[0],
      lng: address?.position?.coordinates[1],
      country: address.sector?.zone?.city?.country?.name,
    };

    this.isOpend = false;

    this.addressdechargeEvent.emit(this.addressChange);

    console.log('onaddressChange emited child', this.addressChange);
  }

  currentPosition: any;
  sector_id: any;
  openDialogMaps(form: string, isPreviewMode: boolean, data?: any) {
    const dataAdress =
      data !== undefined
        ? data
        : { position: { type: 'Point', coordinates: [-7.619555, 33.573876] } };
    const dialogRef = this.dialog.open(MapMarchandiseComponent, {
      width: '1000px',
      data: { from: form, dataAdress, isPreviewMode: isPreviewMode },
    });

    dialogRef.afterClosed().subscribe((output) => {
      console.log(output);
      // this.myform.get('location').setValue(output.address);

      this.currentPosition = output?.position;
      this.sector_id = output?.sector_id;
      const myAddress = output?.address;
      // Extract the first three strings before commas
      if (myAddress) {
        const firstCommaIndex = myAddress.indexOf(',');
        const secondCommaIndex = myAddress.indexOf(',', firstCommaIndex + 1);
        const thirdCommaIndex = myAddress.indexOf(',', secondCommaIndex + 1);
        const fourthCommaIndex = myAddress.indexOf(',', thirdCommaIndex + 1);
        const fifthCommaIndex = myAddress.indexOf(',', fourthCommaIndex + 1);
        const sixthCommaIndex = myAddress.indexOf(',', fifthCommaIndex + 1);
        const lastCommaIndex = myAddress.lastIndexOf(',');
        const adress = myAddress.substring(0, thirdCommaIndex);
        const addressDetails = myAddress.substring(
          thirdCommaIndex + 1,
          sixthCommaIndex
        );

        const pays = myAddress.substring(lastCommaIndex + 1).trim();
        const secondToLastCommaIndex = myAddress.lastIndexOf(
          ',',
          lastCommaIndex - 1
        );
        const zipcode = myAddress.substring(
          secondToLastCommaIndex + 1,
          lastCommaIndex
        );
        const thirdLastCommaIndex = myAddress.lastIndexOf(
          ',',
          secondToLastCommaIndex - 1
        );
        const region = myAddress
          .substring(thirdLastCommaIndex + 1, secondToLastCommaIndex)
          .trim();

        this.addAddressForm
          .get('adress')
          .setValue(adress + ',' + region + ',' + pays);

        this.addAddressForm.get('sector_id').setValue(output?.sector_id);
        this.addAddressForm.get('zone_id').setValue(output?.zone_id);
        this.addAddressForm.get('city_id').setValue(output?.city_id);
      }
    });
  }

  onSubmitNewAddress() {
    console.log(this.addAddressForm);

    const newAdress = {
      adress: this.addAddressForm.get('adress').value,
      city_id: this.addAddressForm.get('city_id').value,
      zone_id: this.addAddressForm.get('zone_id').value,
      sector_id: this.addAddressForm.get('sector_id').value,
      id_customer: this.customer_id,
      position_lat: this.currentPosition?.lat,
      position_long: this.currentPosition?.lng,
      type: this.addAddressForm.get('type').value,
      //sector_id: this.sector_id, from the map service
    };
    console.log(newAdress);

    Swal.fire({
      //title: 'Êtes-vous sûr(e) de vouloir ajouter ce client ?',
      text: 'Êtes-vous sûr(e) de vouloir ajouter cette address ?',
      icon: 'warning',
      iconColor: 'yellow',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'green',
      cancelButtonColor: 'black',
      /*customClass: {
    title: 'my-title-class',
  },*/
    }).then((result) => {
      if (result.value) {
        // this.store.dispatch();
        this.adresseService.create(newAdress).subscribe(
          (data) => {
            console.log(data);
            this.toggleAddressList = true; // hide add form and  back to the list
            this.isOpend = false; // close the toggleClientList and add form
            this._toast.success('Address ajoutée avec succès !');
            this.onAddressChange(data.response);
          },
          (error) => {
            console.log('error', error);
            this._toast.error("Une erreur est survenue lors de l'ajout !");
          }
        );
      } else {
      }
    });
  }

  get citiesByCountry() {
    let country_id = this.addAddressForm.get('country_id').value;
    if (!country_id) return [];
    return this.cities.filter((c) => c.country_id === country_id);
  }

  get zoneByCity() {
    let city_id = this.addAddressForm.get('city_id').value;
    if (!city_id) return [];
    return this.zones.filter((c) => c.city_id === city_id);
  }


  onCityChange(city){
    if (city) {
      this.addAddressForm.controls.city_id.setValue(city?.id)
    }  
  }
}
