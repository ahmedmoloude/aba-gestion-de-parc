import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from 'app/config';

@Injectable({
  providedIn: 'root'
})
export class ExtincteurService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getVolume(){
    return this.http.get(Config.api.vehicule.volume);
  }

  addVolume(data: any){
    return this.http.post(Config.api.vehicule.volume, data);
  }

  updateVolume(data: any, uuid: any) {
    return this.http.post(Config.api.vehicule.volume + '/' + uuid, data);
  }

  deletVolume(uuid: any) {
    return this.http.delete(Config.api.vehicule.volume + '/' + uuid);
  }

  getTypeExtincteur(){
    return this.http.get(Config.api.vehicule.typeExtincteur);
  }

  addTypeExtincteur(data: any){
    return this.http.post(Config.api.vehicule.typeExtincteur, data);
  }

  updateTypeExtincteur(data: any, uuid: any) {
    return this.http.post(Config.api.vehicule.typeExtincteur + '/' + uuid, data);
  }

  deletTypeExtincteur(uuid: any) {
    return this.http.delete(Config.api.vehicule.typeExtincteur + '/' + uuid);
  }

  updateExtincteur(data: any, uuid: any) {
    return this.http.post(Config.api.vehicule.extincteur + '/' + uuid, data);
  }

  rechargerExtincteur(data: any) {
    return this.http.post(Config.api.vehicule.recharger_extincteur, data);
  }

  deletExtincteur(uuid: any) {
    return this.http.delete(Config.api.vehicule.extincteur + '/' + uuid);
  }

  getExtincteur(filters: any = null, page:number = 1){
    let params = new HttpParams();
    params =  params.set('page', page.toString());
    for (const property in filters) {
      params =  params.set(property , filters[property])
    }

    return this.http.get(Config.api.vehicule.extincteur, { params });
    // return this.http.get(Config.api.vehicule.extincteur + `?page=${page}`);
  }

  addExtincteur(data: any){
    return this.http.post(Config.api.vehicule.extincteur, data);
  }
  
}
