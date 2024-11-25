import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { AccountCustomersResponse } from 'app/core/models/facturation/response-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAccountCustomers(): Observable<AccountCustomersResponse>{
    return this.http.get<AccountCustomersResponse>(Config.api.customers.accountCustomers);
  }
  getUnpaidCustomers(): Observable<AccountCustomersResponse>{
    return this.http.get<AccountCustomersResponse>(Config.api.customers.unpaidCustomers);
  }

  
}
