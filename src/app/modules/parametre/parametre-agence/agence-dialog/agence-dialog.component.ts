import { Component, OnInit, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastService } from '../../../../core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import * as L from 'leaflet';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { addAgence, updateAgence } from 'app/core/store/agence/agence.actions';
import {
  selectEnvIsLoadingAgence,
  selectEnvStatusAgence,
} from 'app/core/store/agence/agence.selectors';
import { selectAllCityAgence } from 'app/core/store/resources/resources.selectors';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';
// import { selectZones, se } from 'app/core/store/resources/resources.selectors';
@Component({
  selector: 'app-agence-dialog',
  templateUrl: './agence-dialog.component.html',
  styleUrls: ['./agence-dialog.component.css'],
})
export class AgenceDialogComponent implements OnInit {
  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;

  createAgence: FormGroup;
  spinner: boolean = false;
  spinnergetCities: boolean = false;
  spinnergetZones: boolean = false;
  spinnergetSecteurs: boolean = false;
  cities: any;
  zones: any;
  secteurs: any;
  agence: any;
  citiesFilter: any;
  form_btn: string = null;
  markerPosition: any;
  map: any;
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<AgenceDialogComponent>,
    private boGridService: BoGridService,
    private _toast: ToastService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.agence = this.data['agence'];
    this.setForm();

    this.store .select(selectAllCityAgence) .subscribe((res) =>
    {
      (this.cities = res),
      setTimeout(() => {
        this.searchComponents.toArray()[0].selectObject(this.agence?.city)
      });
    });
  }

  setForm() {
    if (this.data['type'] == 'add') {
      this.form_btn = 'Ajouter';
      this.createAgence = new FormGroup({
        name: new FormControl('', Validators.required),
        nameUser: new FormControl('', Validators.required),
        city_id: new FormControl('', Validators.required),
        city: new FormControl(''),
        sector_id: new FormControl('', Validators.required),
        zone_id: new FormControl('', Validators.required),
        adress: new FormControl('', Validators.required),
        has_agency_delivery: new FormControl(false),
        has_home_delivery: new FormControl(false),
        is_hub: new FormControl(false),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
      });
    } else {
      this.spinnergetCities = true;
      this.spinnergetSecteurs = true;
      this.spinnergetZones = true;
      this.form_btn = 'Modifier';
      console.log('edit 111', this.agence);
      this.createAgence = new FormGroup({
        name: new FormControl(this.agence.name, Validators.required),
        nameUser: new FormControl(
          this.agence.users['0']?.name,
          Validators.required
        ),
        city_id: new FormControl(this.agence?.city.id, Validators.required),
        city: new FormControl(this.agence?.city.name),
        sector_id: new FormControl(this.agence?.sector_id, Validators.required),
        zone_id: new FormControl(
          this.agence.sector?.zone?.id,
          Validators.required
        ),
        adress: new FormControl(this.agence.adress, Validators.required),
        has_agency_delivery: new FormControl(this.agence?.has_agency_delivery),
        has_home_delivery: new FormControl(this.agence?.has_home_delivery),
        is_hub: new FormControl(this.agence?.is_hub),
        email: new FormControl(this.agence.users['0']?.email, [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
      });

      this.zones = this.agence.city.zones;
      this.secteurs = this.zones.find(
        (z) => z.id == this.agence?.sector?.zone?.id
      ).sectors;
    }
  }

  changeTextToUppercase(field) {
    const obj = {};
    obj[field] = this.createAgence.controls[field].value.toUpperCase();
    this.createAgence.patchValue(obj);
  }

  filterCity(event: any) {
    // console.log(event)
    this.citiesFilter = [];
    console.log(event.target.value);
    if (event.target.value.length > 2) {
      this.boGridService
        .citiesFilter(event.target.value.toUpperCase())
        .subscribe(
          (data) => {
            console.log(data);
            this.citiesFilter = data;
            console.log('filter', this.citiesFilter);
          },
          (error) => {
            console.log('error', error);
          }
        );
    } else {
    }
  }

  addAgence() {
    if (this.createAgence.invalid) {
      this._toast.warn('Veuillez remplir tous les champs obligatoires');
    } else {
      if (
        this.createAgence.get('password').value ==
        this.createAgence.get('confirmPassword').value
      ) {
        if (this.data['type'] == 'add') {
          console.log('add');
          console.log('markerPosition', this.markerPosition);
          let agence = this.createAgence.value;
          agence.position_lat = this.markerPosition._latlng.lat;
          agence.position_long = this.markerPosition._latlng.lng;
          // this.spinner = true;
          console.log(this.createAgence.value);
          this.store.dispatch(addAgence({ data: this.createAgence.value }));
          this.store.select(selectEnvIsLoadingAgence).subscribe((res) => {
            this.spinner = res;
          });
          this.store.select(selectEnvStatusAgence).subscribe((res) => {
            console.log('status', res);
            if (res == 'SUCCESS') {
              this.dialogRef.close();
            }
          });
        } else {
          console.log('edit service');
          let agence = this.createAgence.value;
          agence['uuidAgence'] = this.agence.uuid;
          console.log('markerPosition', this.markerPosition);
          agence.position_lat = this.markerPosition._latlng.lat;
          agence.position_long = this.markerPosition._latlng.lng;
          if (this.agence.users['0']) {
            agence['uuidUser'] = this.agence.users['0']?.uuid;
          } else {
            agence['uuidUser'] = '';
          }
          console.log('data envoyer update', agence);

          this.store.dispatch(updateAgence({ data: this.createAgence.value }));
          this.store.select(selectEnvIsLoadingAgence).subscribe((res) => {
            this.spinner = res;
          });
          this.store.select(selectEnvStatusAgence).subscribe((res) => {
            console.log('status', res);
            if (res == 'SUCCESS') {
              this.dialogRef.close();
            }
          });
        }
      } else {
        this._toast.warn('Le password et confirm password doivent etre égaux');
      }
    }
  }

  cityChange(event) {
    if(event){
      this.spinnergetCities = false;
      this.spinnergetSecteurs = false;
      this.spinnergetZones = false;
      this.createAgence.controls['city_id'].setValue(event.id);
      //   this.citiesFilter.find((city) => city.name == $event.option.value).id
      // );
      console.log('city id', event.id);
      this.zones = this.cities.find(
        (city) => city.id == event.id
      ).zones;
      console.log(this.zones);
      this.spinnergetZones = true;
    }
  }

  zoneChange($event) {
    console.log('zone id', $event.value);
    this.secteurs = this.zones.find((zone) => zone.id == $event.value).sectors;
    this.spinnergetSecteurs = true;
    console.log('secteurs', this.secteurs);
  }

  options = {
    layers: [
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png',
        {
          maxZoom: 18,
          attribution: '...',
        }
      ),
    ],
    zoom: 13,
    center: L.latLng(33.573, -7.639),
  };

  onMapReady(map: L.Map) {
    const iconConfig = {
      iconUrl: './assets/icons/icon3.png',
      // iconSize: [25, 41],
      // iconAnchor: [12, 41],
      // popupAnchor: [1, -34],
      // tooltipAnchor: [16, -28],
      // shadowSize: [41, 41],
    };
    const isDraggable = true;
    this.markerPosition = L.marker([33.573, -7.639], {
      draggable: isDraggable,
      icon: L.icon(iconConfig),
    });
    this.markerPosition.addTo(map);

    // console.log(this.markerPosition,"marker")
  }

  // ngAfterViewInit(): void {
  //   this.initMap();
  // }
  // private initMap(): void {
  //   const center =[33.573, -7.639];
  //   console.log(center);

  //   const tiles = L.tileLayer(
  //     'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  //     { maxZoom: 20, minZoom: 5 }
  //   );
  //   this.setupMarkerIcon();
  //   // this.map = L.map('map', { center, zoom: 13, scrollWheelZoom: false });
  //   // tiles.addTo(this.map);

  //   const isDraggable = true;
  //   console.log('isDraggable', isDraggable);
  //   this.markerPosition = L.marker(center, {
  //     draggable: isDraggable,
  //   });
  //   this.markerPosition.addTo(this.map);
  //   console.log('markerPosition', this.markerPosition);
  // }

  // private setupMarkerIcon() {
  //   const iconRetinaUrl = './assets/icons/icon3.png';
  //   const iconUrl = './assets/icons/icon3.png';
  //   const shadowUrl = './assets/icons/icon3.pngg';
  //   const iconDefault = L.icon({
  //     iconRetinaUrl,
  //     iconUrl,
  //     shadowUrl,
  //     iconSize: [25, 41],
  //     iconAnchor: [12, 41],
  //     popupAnchor: [1, -34],
  //     tooltipAnchor: [16, -28],
  //     shadowSize: [41, 41],
  //   });
  //   L.Marker.prototype.options.icon = iconDefault;
  // }
}
