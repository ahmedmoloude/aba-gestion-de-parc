import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import {HttpClient} from '@angular/common/http';
import { AppState } from '../store/app.states';
import { Store } from '@ngrx/store';
import { selectAllCity } from '../store/resources/resources.selectors';

import * as L from 'leaflet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdressService {


  cities: any = [];
  zones: any = [];
  sectors: any = [];
  foundedSector = null;
  constructor(private store: Store<AppState> , private http:HttpClient)  {
    this.store.select(selectAllCity).subscribe((res) => {
      this.cities = JSON.parse(JSON.stringify(res));
      // console.log(' cities========>', this.cities);
    });
  }


  getAllCities(): Observable<any> {
    return this.http.get(Config.api.adresses.cities);
  }

  getAllZones(): Observable<any> {
    return this.http.get(Config.api.adresses.zones);
  }

  getCustomerAdressesById(customer_id): Observable<any> {
    return this.http.get(
      Config.api.adresses.get_customer_addresses_by_id + '/' + customer_id
    );
  }

  create(data: any): Observable<any> {
    return this.http.post(Config.api.adresses.create, data);
  }


  delete(uuid: string) {
    return this.http.delete(Config.api.adresses.delete + '/' + uuid);
  }


  getAdressefromCoordiantes(lng , lat) : Observable<any> {
    return this.http.get("https://nominatim.openstreetmap.org/reverse.php" , {
      params : {
        lat: lat,
        lon: lng,
        format: "jsonv2",
      }
    });
  }

  public async getSectorByPosition(draggedEvent, marker = null) : Promise<any>{
    return new Promise((resolve, reject) => {
      this.foundedSector = null;
      this.locationsSeeder().then(() => {
        this.getFoundedSector(draggedEvent).then(() => {
          if(marker){
            if(this.foundedSector){

              console.log('founded sector', this.foundedSector)
              marker.bindTooltip(`Secteur: ${this.foundedSector.name} , Zone : ${this.foundedSector.zone_name} `, {permanent: true, direction: 'top'}).openTooltip();
            }
            else
              marker.bindTooltip('Malheureusement, cette adresse n\'est pas éligible pour effectuer une opération', {permanent: true, direction: 'top'}).openTooltip();
          }
          resolve(this.foundedSector)
        })
      })
    })
  }

  async locationsSeeder() : Promise<void>{
    return new Promise((resolve, reject) => {
      this.cities.forEach(city => {
        if(city.polygons){
          this.zones.push.apply(this.zones, city.zones)
          this.zones.forEach(zone => {
            if(zone.polygons){
              this.sectors.push.apply(this.sectors, zone.sectors.map(obj => ({ ...obj, zone_name: zone.name , zone_id : zone.id  ,  city: city,})))
            }
          });
        }
      });
      resolve();
    })
  }

  async getFoundedSector(marker: L.Marker ) : Promise<void> {
    return new Promise((resolve, reject) => {
      for(let sector of this.sectors){
        if(sector.polygons){
          // @ts-ignore
          if(this.getSectorByMarker(marker.target, sector)){
            this.foundedSector = sector
            break;
          }
        }
      }
      resolve();
    })
  }

  getSectorByMarker(marker, sector) {
    var inside = false;
    var x = marker.getLatLng().lat, y = marker.getLatLng().lng;
    sector.polygons.coordinates.forEach(element => {
      let poly = new L.Polygon(element);
      for (var ii=0;ii<poly.getLatLngs().length;ii++){
        var polyPoints = poly.getLatLngs()[ii];

        // @ts-ignore
        for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
            var xi = polyPoints[i].lat, yi = polyPoints[i].lng;
            var xj = polyPoints[j].lat, yj = polyPoints[j].lng;

            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
      }
    });
    return inside;
  };
  getAllAdress(){
    return this.http.get(Config.api.adresses.all)
  }

  getAllCountries(): Observable<any> {
    return this.http.get(Config.api.allCountries);
  }

}
