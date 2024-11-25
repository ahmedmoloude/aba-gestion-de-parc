import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from 'app/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParametreService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  addPV(form_data: FormData) {
    return this.http.post(Config.api.parametre.addPV, form_data);
  }

  getTva() {
    return this.http.get(Config.api.parametre.getTva);
  }

  getPV() {
    return this.http.get(Config.api.parametre.getPV);
  }

  getTypeRdv() {
    return this.http.get(Config.api.parametre.getTypeRdv);
  }

  getMotif() {
    return this.http.get(Config.api.parametre.motif);
  }

  addMotif(data: any) {
    return this.http.post(Config.api.parametre.motif, data);
  }

  editMotif(data: any, uuid : any) {
    return this.http.post(Config.api.parametre.motif + '/' + uuid, data);
  }

  deleteMotif(uuid: any) {
    return this.http.delete(Config.api.parametre.motif + '/' + uuid);
  }

  getTaxe() {
    return this.http.get(Config.api.parametre.getTaxe);
  }

  addGlobalConfig(data: any) {
    return this.http.post(Config.api.parametre.addGlobalConfig, data);
  }

  editGlobalConfig(data: any, uuid : any) {
    return this.http.post(Config.api.parametre.addGlobalConfig + '/' + uuid, data);
  }

  deleteGlobalConfig(uuid: any) {
    return this.http.delete(Config.api.parametre.deletGlobalConfig + '/' + uuid);
  }

  addRubric(data: any) {
    return this.http.post(Config.api.parametre.rubric, data);
  }

  getrubrics() {
    return this.http.get(Config.api.parametre.getrubrics);
  }

  allBasisCalcul() {
    return this.http.get(Config.api.parametre.allBasisCalcul);
  }

  addAxe(data: any) {
    return this.http.post(Config.api.axes.axe, data);
  }

  updateAxe(data: any) {
    return this.http.post(Config.api.axes.updateAxe, data);
  }

  getAllAxe() {
    return this.http.get(Config.api.axes.axe);
  }

  addAgence(data :any) {
    return this.http.post(Config.api.agences.create, data);
  }

  allAgence() {
    return this.http.get(Config.api.agences.create);
  }

  deleteAgence(uuid: any) {
    return this.http.delete(Config.api.agences.create + '/' + uuid);
  }

  updateAgence(data :any) {
    return this.http.post(Config.api.agences.update, data);
  }

  addLimitation(data: any) {
    return this.http.post(Config.api.parametre.addLimitation, data);
  }

  getLimitation() {
    return this.http.get(Config.api.parametre.addLimitation);
  }

  addObjectif(data: any) {
    return this.http.post(Config.api.parametre.objectif, data);
  }

  getObjectif() {
    return this.http.get(Config.api.parametre.objectif);
  }

  getObjectifCommercial() {
    return this.http.get(Config.api.parametre.objectif_commercial);
  }

  getObjectifAgence() {
    return this.http.get(Config.api.parametre.objectif_agence);
  }

  deletObjectif(uuid: any) {
    return this.http.delete(Config.api.parametre.objectif + '/' + uuid);
  }

  editObjectif(data: any, uuid: any) {
    return this.http.post(Config.api.parametre.objectif + '/' + uuid, data);
  }

  DeleteLimitation(uuid: any) {
    return this.http.delete(Config.api.parametre.deleteLimitation + '/' + uuid);
  }

  updateLimitation(data: any, uuid: any) {
    return this.http.post(Config.api.parametre.updateLimitation + '/' + uuid, data);
  }

  addAffectationObjectif(data: any) {
    return this.http.post(Config.api.objectif.AffectationObjectif, data);
  }

  editAffectationObjectif(data: any, uuid : any) {
    return this.http.post(Config.api.objectif.AffectationObjectif + '/' + uuid, data);
  }

  getAffectationObjectif() {
    return this.http.get(Config.api.objectif.AffectationObjectif);
  }

  DeleteAffectationObjectif(uuid: any) {
    return this.http.delete(Config.api.objectif.AffectationObjectif + '/' + uuid);
  }


  addAffectationObjectifBySector(data: any) {
    return this.http.post(Config.api.objectif.createWithSector, data);
  }

  addAffectationYear(data: any) {
    return this.http.post(Config.api.objectif.AffectationYear, data);
  }


  getAsscoiatedObjectifes(filters: any = null) : Observable<any>{
    let params = new HttpParams();
    for (const property in filters) {
      params =  params.set(property , filters[property])
    }

    return this.http.get(Config.api.objectif.getAsscoiatedObjectifes, { params });
  }

  editAffectationObjectifBySector(data: any , uuid) {
    return this.http.post(Config.api.objectif.editWithSector + '/' + uuid, data);
  }
  

  getDefaultDrivers(params?: any): Observable<any> {
    let httpParams = new HttpParams();
    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    return this.http.get(Config.api.defaultDrivers.base, { params: httpParams });
  }

  getDefaultDriverById(id: number): Observable<any> {
    return this.http.get(`${Config.api.defaultDrivers.base}/${id}`);
  }

  addDefaultDriver(data: any): Observable<any> {
    return this.http.post(Config.api.defaultDrivers.base, data);
  }

  updateDefaultDriver(id: number, data: any): Observable<any> {
    return this.http.put(`${Config.api.defaultDrivers.base}/${id}`, data);
  }

  deleteDefaultDriver(id: number): Observable<any> {
    return this.http.delete(`${Config.api.defaultDrivers.base}/${id}`);
  }
}
