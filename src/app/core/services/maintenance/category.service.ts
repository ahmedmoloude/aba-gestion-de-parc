import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { AnyResponse } from 'app/core/models/facturation/response-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = Config.api.maintenance.category;

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<AnyResponse> {
    return this.httpClient.get<AnyResponse>(this.url.getCategories);
  }

  addCategory(data: any): Observable<AnyResponse> {
    return this.httpClient.post<AnyResponse>(this.url.addCategory, data);
  }

  updateCategory(data: any): Observable<AnyResponse> {
    return this.httpClient.post<AnyResponse>(this.url.updateCategory, data);
  }

  deleteCategory(uuid: string): Observable<AnyResponse> {
    return this.httpClient.delete<AnyResponse>(`${this.url.deletePlanning}/${uuid}`);
  }
}
