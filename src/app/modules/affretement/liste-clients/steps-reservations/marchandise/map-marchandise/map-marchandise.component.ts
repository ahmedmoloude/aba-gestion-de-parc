import { Component, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AdressService } from 'app/core/services/adress.service';
import { AppState } from 'app/core/store/app.states';
import {
  selectCities,
  selectZones,
} from 'app/core/store/location/location.selectors';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-marchandise',
  templateUrl: './map-marchandise.component.html',
  styleUrls: ['./map-marchandise.component.css'],
})
export class MapMarchandiseComponent implements AfterViewInit {
  private map: any;
  public markerPosition: any;

  cities: any = [];
  zones: any = [];
  sectors: any = [];
  foundedSector = null;
  disable = true;

  address = '';
  sector;

  constructor(
    public dialogRef: MatDialogRef<MapMarchandiseComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private store: Store<AppState>,
     private adresseService: AdressService
  ) {}

  ngAfterViewInit(): void {
    this.initMap();
    console.log(this.dialogData);

    // this.markerPosition.on('dragend', (e) => {
    //   this.sharedService
    //     .getSectorByPosition(e, this.markerPosition)
    //     .then((sector) => {
    //       if (sector) this.disable = false;
    //       else this.disable = true;
    //     });
    // });
    console.log('this.markerPosition ngAfterViewInit', this.markerPosition);

    this.markerPosition.on('dragend', (e) => {
      if (
        this.dialogData &&
        this.dialogData.from &&
        this.dialogData.from == 'ACTIVITY'
      ) {
        this.disable = false;
        this.adresseService
          .getAdressefromCoordiantes(
            this.markerPosition._latlng.lng,
            this.markerPosition._latlng.lat
          )
          .subscribe((data) => {
            console.log('data.......', data);
            this.address = data.display_name;
          });
      }

      this.adresseService
        .getSectorByPosition(e, this.markerPosition)
        .then((sector) => {
          console.log('==========>getSectorByPosition', sector);
          if (sector) {
            this.disable = false;
            this.sector = sector;
            this.adresseService
              .getAdressefromCoordiantes(
                this.markerPosition._latlng.lng,
                this.markerPosition._latlng.lat
              )
              .subscribe((data) => {
                console.log('data.......', data);
                this.address = data.display_name;
              });
          } else this.disable = true;
        });
    });
  }

  initMap(): void {
    console.log(this.dialogData);
    const center: any = [
      this.dialogData?.dataAdress?.position?.coordinates?.[1],
      this.dialogData?.dataAdress?.position?.coordinates?.[0],
    ] || [-7.619555, 33.573876]; // casablanca location

    const tiles = L.tileLayer(
      'https://mt.google.com/vt/lyrs=m&gl=ma&x={x}&y={y}&z={z}',
      //'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { maxZoom: 20, minZoom: 5 }
    );

    this.setupMarkerIcon();
    this.map = L.map('map', { center, zoom: 14 });
    tiles.addTo(this.map);

    const isDraggable = this.dialogData.isPreviewMode;
    this.markerPosition = L.marker(center, {
      // if you wanna fixe the marker put isDraggable to false
      draggable: isDraggable,
      //autoPan: true,
    });

    this.markerPosition.addTo(this.map);
  }

  setupMarkerIcon() {
    const iconRetinaUrl = './assets/marker-icon-2x.png';
    const iconUrl = './assets/marker-icon.png';
    const shadowUrl = './assets/marker-shadow.png';

    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
      className: 'marker',
    });

    L.Marker.prototype.options.icon = iconDefault;
  }

  onSavePosition() {
    if (
      this.dialogData &&
      this.dialogData.from &&
      this.dialogData.from == 'ACTIVITY'
    ) {
      this.dialogRef.close({
        position: this.markerPosition._latlng,
        sector: this.sector.name,
        zone: this.sector.zone_name,
        address: this.address,
        sector_id: this.sector.id,
        zone_id: this.sector.zone_id,
        city_id: this.sector.city.id,
      });
      return;
    } else {
      this.dialogRef.close();
    }

    /* this.dialogRef.close({
      position: this.markerPosition._latlng,
      sector: this.sector,

      address: this.address,
      sector_id: 19,
    });*/
  }
}
