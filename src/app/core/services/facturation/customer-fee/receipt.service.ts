import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { ReceiptFilter } from 'app/core/models/facturation/filters/receipt-filter.model';
import { ReceiptResponse, ReceiptsResponse } from 'app/core/models/facturation/response-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(private http: HttpClient) { }

  getReceipts(object: ReceiptFilter, per_page: number, page: number):Observable<ReceiptsResponse> {
    let params = new HttpParams();
    params =  params.set('page', page.toString());
    params = params.set('per_page', per_page.toString());
    return this.http.post<ReceiptsResponse>(Config.api.receipt.getReceipts, object, {params});
  }

  createReceipt(data: any):Observable<ReceiptResponse> {
    return this.http.post<ReceiptResponse>(Config.api.receipt.createReceipt, data);
  }

}
