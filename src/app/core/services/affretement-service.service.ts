import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AffretementServiceService {

  url = environment.URL
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  addAffretementDevis(data: any) {
    console.log(data)
    return this.http.post(Config.api.affretementDevis.saveAffretementDevis, data);
  }
  getServices() {
    return this.http.get(this.url+'get-rubrics');
  }
  getServicesCamion() {
    return this.http.get(this.url+'get-rubrics-camion');
  }
  getTypeAffretement() {
    return this.http.get(this.url+'get-type-affretement');
  }
  saveTypeAffretement(body){
    return this.http.post(this.url+'save-type-affretement', body);
  }
  getAffretementProductCategories() {
    return this.http.get(this.url+'get-affretement-product-categories');
  }
  getFuelPrices() {
    return this.http.get(this.url+'get-fuel-prices');
  }
  saveFuelPrice(body) {
    return this.http.post(this.url+'save-fuel-price', body);
  }
  getPourcentageRetour() {
    return this.http.get(this.url+'get-pourcentage-retour');
  }
  savePourcentageRetour(body) {
    return this.http.post(this.url+'save-pourcentage-retour', body);
  }
  getOffer(uuid , is_offer){
    return this.http.get(this.url+'get-affretement-offer/'+uuid , {
      params : {
        is_offer 
      }
    });
  }



  deleteTransportConditions(data: any) {
    console.log(data)
    return this.http.post(Config.api.deleteTransportConditionsAffretment, data);
  }
}
