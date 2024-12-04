import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root',
})
export class Customer {

  constructor(private http: HttpClient) {}



  customersPagaineted(page : number = 1  , merchant_uuid) : Observable<any> {

    if (merchant_uuid) {
      return this.http.get<any>(Config.api.customer.customersPagaineted + `?page=${page}` + `&merchant_uuid=${merchant_uuid}`);
    }else
    return this.http.get<any>(Config.api.customer.customersPagaineted + `?page=${page}`);
  }

  // headers = new HttpHeaders()
  // .set('content-type', 'multipart/form-data')
  getType(): Observable<any> {
    return this.http.get<any>(Config.api.motport.getmotport);
  }

  getCustomer(filters: any = null, page : number = 1  , merchant_uuid: string  , per_page : number = 10) : Observable<any> {
    let params = new HttpParams();
    params =  params.set('page', page.toString());
    params = params.set('per_page', per_page.toString());
    if (merchant_uuid) {
      params =  params.set('merchant_uuid' , merchant_uuid)
    }
    for (const property in filters) {
      params =  params.set(property , filters[property])
    }
    return this.http.get(Config.api.customer.getcustomer ,  { params });

  }


  createCustomer(body) : Observable<any> {
    return this.http.post<any>(Config.api.customer.createCustomer , body);
  }

  editCustomer(body , uuid) : Observable<any> {
    console.log('uuid' , uuid)
    return this.http.post<any>(`${Config.api.customer.updateCustomer}/${uuid}` , body);
  }
  getCustomerByFiltre(filtres:any = null){
    return this.http.post<any>(Config.api.customer.filtre , filtres);
  }

  getOneCustomer(uuid) : Observable<any> {
    return this.http.get<any>(Config.api.customer.customer  + uuid);
  }


// services customers for affretement (same as app client) :
createProspect(data: any): Observable<any> {
  return this.http.post(Config.api.prospect.addProspect, data);
}




  search(query: string): Observable<any> {
    return this.http.get(`${Config.api.customer.search}?query=${query}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(Config.api.customer.create, data);
  }



  getCustomers(): Observable<any> {
    return this.http.get<any>(Config.api.customer.list);
  }

  getCustomersByNameAndType(
    type: string,
    searchValue?: string
  ): Observable<any> {
    return this.http.get(
      `${Config.api.customer.by_type}?type=${type}&searchValue=${searchValue}`
    );
  }






}
