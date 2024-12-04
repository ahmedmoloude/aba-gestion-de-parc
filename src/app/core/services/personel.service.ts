import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Personel } from '../models/personel.class';
import { Observable, throwError } from 'rxjs';
import { Epis } from '../models/epis.model';
@Injectable({
  providedIn: 'root',
})
export class PersonelService {
  constructor(private http: HttpClient) {}
  getPersonnels(filter=null, page:number = 1): Observable<Personel[]> {
    let params = new URLSearchParams(filter).toString()
    console.log('FILTER: ', params)
    return this.http.get<Personel[]>(Config.api.personnels.personnels + `?page=${page}&${params}`);
  }
  addUser(data: Personel): Observable<any> {
    return this.http.post(Config.api.personnels.personnels, data);
    // .pipe(catchError(this.handleError));
  }
  EditPersonnel(data: Personel): Observable<any> {
    return this.http.post(Config.api.personnels.personnelsUpdate, data);
    // .pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\n Message: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  getPersonnelByUiid(id) {
    return this.http.get(Config.api.personnels.getPersonnel + '/' + id);
  }
  getPersonnelByUiid2(id) {
    return this.http.get(Config.api.personnels.getPersonnel2 + '/' + id);
  }
  getPersonnelEpis(id){
    return this.http.get(Config.api.epis.epis +  '/' + id);
  }
  addEpisToPersonnel(data){
    return this.http.post(Config.api.personnels.addEpisToPersonnel,data);
  }
  exportPersonnels() {
    return this.http.get(Config.api.personnels.export, {
      observe: 'body',
      responseType: 'blob',
    });
  }
  deletePersonnel(id) {
    return this.http.delete(Config.api.personnels.personnels+'/'+id);
  }
  getPersonnelByFilter(filter:any){
    return this.http.post(Config.api.personnels.filter , filter)
  }
  getConduteurDispo(page:number = 1){
    return this.http.get(Config.api.personnels.disponibilite + `?page=${page}`)
  }
  availablity(data){
    return this.http.post(Config.api.personnels.availablity, data)
  }
  getTonnage(){
    return this.http.get(Config.api.personnels.tonnage)
  }

  personnelbyFunction(filters: any = null, fonction : string) {
    let params = new HttpParams();
    params =  params.set('function', fonction.toString());
    for (const property in filters) {
      params =  params.set(property , filters[property])
    }

    return this.http.get(Config.api.personnels.personnelbyFunction, { params });
    // let queryParams = `?function=${$function}`
    //   if (filters.code) queryParams += `&code=${filters.code}`;
    //   if (filters.last_name) queryParams += `&last_name=   ${filters.last_name}`;
    //   if (filters.zone_id) queryParams += `&zone_id=${filters.zone_id}`;

    // return this.http.get(Config.api.personnels.personnelbyFunction + queryParams);
  }

  personnelbyUuid($uuid) {
    return this.http.get(Config.api.personnels.personnelbyUuid + '/' + $uuid);
  }

  getParc(){
    return this.http.get(Config.api.personnels.parc)
  }
  getPersonnelDispWithFiltre(filter:any){
    return this.http.post(Config.api.personnels.getPersonnelDispWithFiltre , filter);
  }
  getAllCities(){
    return this.http.get(Config.api.personnels.cities)
  }
  getEpisAllOfPersonnel(uuid){
    return this.http.get(Config.api.personnels.getEpisAll+'/'+`${uuid}`)
  }
  getEpisWithFiltre(data:any){
    return this.http.post(Config.api.personnels.getEpisWithFiltre, data)
  }
  getConducteurDisponible(){
    return this.http.get(Config.api.personnels.Conducteur_disponible)
  }
  getTruckDispoCount(){
    return this.http.get(Config.api.personnels.getTruckDispoCount)
  }


  export(){

    return this.http.get(Config.api.personnels.export , {
      observe: 'body',
      responseType: 'blob',
    })

  }
}
