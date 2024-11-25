import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from 'app/config';
import { Observable } from 'rxjs';

@Injectable()
export class BoOfferService {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }


  upload_attached_piece(data) : Observable<any>{
    return this.http.post(Config.api.offers.upload_attached_piece , data)
  }

  fetchListOffers( filters :  any  ,page: number = 1 , merchant_uuid): Observable<any> {

    let url = Config.api.offers.list;
    let params = new HttpParams();
    params =  params.set('page', page.toString());

    if(merchant_uuid){
      params = params.set('merchant_uuid',merchant_uuid)
    }



    for (const property in filters) {
        params =  params.set(property , filters[property])
    }

    return this.http.get( url, {params});

  }

  fetchAllOffers(): Observable<any> {
    return this.http.get(Config.api.offers.all);
  }

  getOffer(uuid: string) {
    return this.http.get(Config.api.offers.get + '/' + uuid);
  }

  createOffer(data: any): Observable<any> {
    return this.http.post(Config.api.offers.create, data);
  }

  // get groupped conditions of offer (services or transport)
  getOfferDetails(uuid: string, isTransport: number) {
    return this.http.get(Config.api.offers.get + `/${uuid}?isTransport=${isTransport}`);
  }

  // update offer tree details
  updateOfferDetails(uuid: string, params: any) {
    return this.http.put(Config.api.offers.update + '/' + uuid, params);
  }

  download(id: number): Observable<any> {
    return this.http.get(`${Config.api.offers.download}/${id}`, {
      observe: 'body',
      responseType: 'blob',
    });
  }

  // get ungroupped conditions of template or offer
  getGridConditions(typeGrid: 'Grid' | 'Offer', id: number, rubricId: number) {
    return this.http.get(Config.api.offers.get_grid_conditions + `?type=${typeGrid}&id=${id}&rubrique_id=${rubricId}`);
  }

  inheritCondition(params: any) {
    return this.http.post(Config.api.offers.inherit_condition, params);
  }

   // update offer tree details
   updateOfferDetailsAffertment(uuid: string, params: any) {
    return this.http.put(Config.api.offers.affretment_update + '/' + uuid, params);
  }


  createSpecialOffer(customer_id , type_affretement_id ,  start_date , end_date) : Observable<any>{
    return this.http.post(Config.api.offers.create_special_offer, {
      type_affretement_id , customer_id , start_date , end_date
    });

  }


  createSpecialOfferDetails(offerId: string, details: any): Observable<any> {
    return this.http.post(`${Config.api.offers.store_special_offers_details}/${offerId}`,  {
      details
    });
  }


  getSpecialOfferDetails(offerUuid: string): Observable<any> {
    return this.http.get(`${Config.api.offers.get_special_offers_details}/${offerUuid}`);
  }


  
  getSpecialOffers() : Observable<any>{
    return this.http.get(Config.api.offers.special_offers)
    
  }
}
