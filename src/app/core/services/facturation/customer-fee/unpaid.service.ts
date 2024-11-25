import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { UnpaidFilter } from 'app/core/models/facturation/filters/unpaid-filter.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnpaidService {

  constructor(private httpClient: HttpClient) { }

  getUnpaids(data: UnpaidFilter): Observable<any> {
    return this.httpClient.post(Config.api.unpaid.getUnpaids, data);
  }

  createUnpaid(data: any): Observable<any> {
    return this.httpClient.post(Config.api.unpaid.createUnpaid,data);
  }
}
