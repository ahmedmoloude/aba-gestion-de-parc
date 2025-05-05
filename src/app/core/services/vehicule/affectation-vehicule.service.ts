import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';

@Injectable({
  providedIn: 'root'
})
export class AffectationVehiculeService {
  http: HttpClient;
  
    constructor(http: HttpClient) {
      this.http = http;
    }

    addAffectation(affecation_conducteur: FormData){
      return this.http.post(Config.api.vehicule.affectation_conducteur, affecation_conducteur);
    }
}
