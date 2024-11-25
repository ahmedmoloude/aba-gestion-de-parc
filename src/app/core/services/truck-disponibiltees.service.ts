import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TruckDisponibilteesService {

  constructor(private http: HttpClient) { }

  // getTruckDispo(page:number = 1){
  //   return this.http.get(Config.api.vehicule.disponibilite+`?page=${page}`);
  // }

  // getParcs(){
  //   return this.http.get(Config.api.vehicule.parcs);
  // }

  // getParcsFiltre(filtre:any, page:number=1){
  //   return this.http.post(Config.api.vehicule.disponibilite_filtre +`?page=${page}`, filtre);
  // }
}
