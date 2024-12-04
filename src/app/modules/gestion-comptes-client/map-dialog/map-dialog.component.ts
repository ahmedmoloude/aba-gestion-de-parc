import { Component, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AdressService } from 'app/core/services/adress.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css'],
})
export class MapDialogComponent implements AfterViewInit {
  private map: any;
  public markerPosition: any;


  cities: any = [];
  zones: any = [];
  sectors: any = [];
  disable = true;
  address = ''
  sector;

  constructor(
    public dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private addreseService : AdressService
  ) {}

  ngAfterViewInit(): void {
    this.initMap();
    console.log(this.dialogData);

    

    this.markerPosition.on('dragend', (e) => {
      if(this.dialogData && this.dialogData.from && this.dialogData.from == 'ACTIVITY'){
        this.disable = false
        this.addreseService.getAdressefromCoordiantes(this.markerPosition._latlng.lng , this.markerPosition._latlng.lat).subscribe((data) => {
          console.log('data.......' , data)
          this.address = data.display_name
        })
        return
      }
      this.addreseService.getSectorByPosition(e, this.markerPosition).then(sector => {
        if(sector){
          this.disable = false;
          this.sector = sector;
          this.addreseService.getAdressefromCoordiantes(this.markerPosition._latlng.lng , this.markerPosition._latlng.lat).subscribe((data) => {
            console.log('data.......' , data)
            this.address = data.display_name
          })
        } 
        else this.disable = true;
      })
    });
  }

  private initMap(): void {
    const center : any =
      this.dialogData?.position?.long && this.dialogData?.position?.lat
        ? [this.dialogData.position.lat, this.dialogData.position.long]
        : [33.573, -7.639]; // casablanca location

    const tiles = L.tileLayer(
      'https://mt.google.com/vt/lyrs=m&gl=ma&x={x}&y={y}&z={z}',
      // 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { maxZoom: 20, minZoom: 5 }
    );
    this.setupMarkerIcon();
    this.map = L.map('map', { center, zoom: 13 });
    tiles.addTo(this.map);

    const isDraggable = !this.dialogData.isPreviewMode;
    this.markerPosition = L.marker(center, {
      draggable: isDraggable,
      //autoPan: true,
    });
    this.markerPosition.addTo(this.map);
  }

  private setupMarkerIcon() {
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
    });
    L.Marker.prototype.options.icon = iconDefault;
  }

  onSavePosition() {
    if(this.dialogData && this.dialogData.from && this.dialogData.from == 'ACTIVITY'){
      this.dialogRef.close({address : this.address});
      return
    }
    this.dialogRef.close({position : this.markerPosition._latlng , sector : this.sector , zone : this.sector.zone_name , address : this.address , sector_id : this.sector.id ,
       zone_id : this.sector.zone_id});
    console.log('CLOSE', this.markerPosition._latlng)
  }
}
