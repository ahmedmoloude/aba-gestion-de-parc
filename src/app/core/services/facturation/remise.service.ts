import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { DiscountTypesResponse } from 'app/core/models/facturation/response-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemiseService {

  constructor(private http: HttpClient) { }

  getDiscountTypes(): Observable<DiscountTypesResponse> {
    return this.http.get<DiscountTypesResponse>(Config.api.discount.getDiscountTypes);
  }

  createDiscount(discount ): Observable<any> {
    return this.http.post(Config.api.discount.createDiscount, discount);
  }

  validateRemise(remise:any, status: any) {
    return this.http.put(Config.api.discount.validateRemise + '/' + remise.uuid + '/validate', {status:status});
  }
}
