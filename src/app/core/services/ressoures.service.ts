import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config/connection.config';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RessouresService {

  constructor(private http: HttpClient) { }

  getCategroiesProducts(): Observable<any> {
    return this.http.get(Config.api.ressources.categories_products)
  }

  getCitiesAndCategroies(): Observable<any> {
    return this.http.get(Config.api.ressources.cities_categories)
  }

  getAxes(): Observable<any> {
    return this.http.get(Config.api.ressources.axes)
  }

  getRubrics(): Observable<any> {
    return this.http.get(Config.api.ressources.rubrics_calcul_basis)
  }

  getSectors(): Observable<any> {
    return this.http.get(Config.api.ressources.sectors)
  }

  getZones(): Observable<any> {
    return this.http.get(Config.api.ressources.zones)
  }

  getDrivers(): Observable<any> {
    return this.http.get(Config.api.ressources.drivers)
  }

  getTrucks(filters: any = null): Observable<any> {
    let params = new HttpParams();
    // params =  params.set('page', page.toString());
    for (const property in filters) {
      params =  params.set(property , filters[property])
    }
    return this.http.get(Config.api.ressources.trucks, { params });
    // return this.http.get(Config.api.ressources.trucks)
  }


  getEdges(): Observable<any> {
    return this.http.get(Config.api.ressources.get_edges)
  }
}
