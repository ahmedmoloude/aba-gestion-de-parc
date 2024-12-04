import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { AnyResponse, CarteResponse, CartesResponse } from 'app/core/models/facturation/response-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  expenseUrl = Config.api.expense;

  constructor(private httpClient: HttpClient) { }

  getExpenseSuppliers(): Observable<any>  {
    return this.httpClient.get<any>(this.expenseUrl.getSuppliers);
  }

  getExpenseNatures(): Observable<any>  {
    return this.httpClient.get<any>(this.expenseUrl.getNatures);
  }

  addExpenseSupplier(data: any): Observable<any>  {
    return this.httpClient.post<any>(this.expenseUrl.addSupplier, data);
  }

  addExpenseNature(data: any): Observable<any>  {
    return this.httpClient.post<any>(this.expenseUrl.addNature, data);
  }


  updateExpenseSupplier(data: any, uuid: string): Observable<any>  {
    return this.httpClient.post<any>(this.expenseUrl.addSupplier + '/' + uuid, data);
  }

  updateExpenseNature(data: any, uuid: string): Observable<any>  {
    return this.httpClient.post<any>(this.expenseUrl.addNature + '/' + uuid, data);
  }

  deleteExpenseNature(uuid: string): Observable<AnyResponse>  {
    return this.httpClient.delete<AnyResponse>(`${this.expenseUrl.deleteNature}/${uuid}`);
  }

  deleteExpenseSupplier(uuid: string): Observable<AnyResponse>  {
    return this.httpClient.delete<AnyResponse>(`${this.expenseUrl.deleteSupplier}/${uuid}`);
  }

}
