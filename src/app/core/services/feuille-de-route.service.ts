import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FeuilleDeRouteService {

  constructor(private http: HttpClient) { }

  getAllRoadmap(filters: any = null, page: number = 1, per_page: number = 10) {
    let params = new HttpParams();
    for (const property in filters) {
      params =  params.set(property , filters[property])
    }
    params = params.set('per_page', per_page.toString());
    params = params.set('page', page.toString());
    return this.http.get(Config.api.roadmap.getAll, { params });
  }

  getRoadMap(uuid) {
    return this.http.get(Config.api.roadmap.getAll+'/' + uuid);
  }

  filtreRoadMap(range:any){
    return this.http.post(Config.api.roadmap.filtre,range);
  }
}
