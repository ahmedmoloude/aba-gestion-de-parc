import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as L from 'leaflet';
import { ToastService } from '../../../core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoTourService } from 'app/core/services/admin-bo/bo-tours.service';
@Component({
  selector: 'app-details-tournees',
  templateUrl: './details-tournees.component.html',
  styleUrls: ['./details-tournees.component.css'],
})
export class DetailsTourneesComponent implements OnInit {
  uuid: any;
  spinner: boolean = false;
  tournee: any = null;
  map = null;
  tourneeItems: any[] = [];
  statut_index = 3;
  polyline: any;
  mapCenter: any;
  centerr: any;

  public markerPosition: any;
  constructor(
    private location: Location,
    private boTourService: BoTourService,
    private _toast: ToastService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.spinner = true;
    this.uuid = this._activatedRoute.snapshot.paramMap.get('uuid');
    this.boTourService.getTourDetails(this.uuid).subscribe(
      (data: any) => {
        console.log(data);
        this.tournee = data.response;
        this.tourneeItems = this.tournee.items;
        this.spinner = false;
      },
      (err) => {
        this.spinner = false;
        if (err.error.status == 403)
          this._toast.warn('Tournée en cours de traitement !');
        else this._toast.error('Tournée introuvable !');
        this._router.navigate([`/tournees`]);
      }
    );
  }

  goBack() {
    this.location.back();
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
    this.map = map;
    let coordinates = [];
    const iconConfig = {
      iconUrl: './assets/icons/icon.png',

      // iconSize: [25, 41],
      // iconAnchor: [12, 41],
      // popupAnchor: [1, -34],
      // tooltipAnchor: [16, -28],
      // shadowSize: [41, 41],
    };

    for (let item of this.tourneeItems) {
      if (item.status === 'INIT') {
        (iconConfig.iconUrl = './assets/icons/icon.png'),
          L.marker(
            [
              item.pickup_adresse.position.coordinates[1],
              item.pickup_adresse.position.coordinates[0],
            ],
            { icon: L.icon(iconConfig) }
          ).addTo(map);
      }

      if (item.status === 'STARTED') {
        (iconConfig.iconUrl = './assets/icons/icon3.png'),
          L.marker(
            [
              item.pickup_adresse.position.coordinates[1],
              item.pickup_adresse.position.coordinates[0],
            ],
            { icon: L.icon(iconConfig) }
          ).addTo(map);
      }

      if (item.status === 'DONE') {
        (iconConfig.iconUrl = './assets/icons/icon2.png'),
          L.marker(
            [
              item.pickup_adresse.position.coordinates[1],
              item.pickup_adresse.position.coordinates[0],
            ],
            { icon: L.icon(iconConfig) }
          ).addTo(map);
      }

      coordinates.push([
        item.pickup_adresse.position.coordinates[1],
        item.pickup_adresse.position.coordinates[0],
      ]);
    }

    if (this.tourneeItems.length)
      coordinates.push([
        this.tourneeItems[0].pickup_adresse.position.coordinates[1],
        this.tourneeItems[0].pickup_adresse.position.coordinates[0],
      ]);
    this.polyline = L.polyline(coordinates);
    this.polyline.addTo(this.map);
  }
}
