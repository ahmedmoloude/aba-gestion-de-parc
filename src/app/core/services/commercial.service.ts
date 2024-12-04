import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config/connection.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommercialService {

  constructor(private http: HttpClient) {}


  getCommercialKPIS(uuid , year? , customer_id?) :Observable<any>{
    
    let params = new HttpParams();
    
    if (year) {
      params = params.set('year', year);
    }
    if (customer_id) {
      params = params.set('customer_id', customer_id);
    }
    return this.http.get(Config.api.commercial.getCommercialKPIS + '/' + uuid , {params})
  }

  getCommercialLinkedCustomers(uuid) :Observable<any>{
    return this.http.get(Config.api.commercial.getLinkedCustomers + '/' + uuid)
  }
}
