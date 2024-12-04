import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'app/config';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GeofencingService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  addEntity(data: any) : Observable<any>{
    return this.http.post(Config.api.geofencing.addEntity, data);
  }
  addPolygon(data: any) : Observable<any>{
    return this.http.post(Config.api.geofencing.addPolygon, data);
  }
  addCentre(data: any) : Observable<any>{
    return this.http.post(Config.api.geofencing.addCentre, data);
  }
  editPolygons(data: any) : Observable<any>{
    return this.http.post(Config.api.geofencing.editPolygons, data);
  }
}
