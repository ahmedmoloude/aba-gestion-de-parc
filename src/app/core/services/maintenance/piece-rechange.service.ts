import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { AnyResponse } from 'app/core/models/facturation/response-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PieceRechangeService {
  url = Config.api.maintenance.piecesRechange;

  constructor(private httpClient: HttpClient) { }

  getPiecesRechange(){
    return this.httpClient.post(this.url.getPiecesRechange, null);
  }
  getInventoryList(reference: string, name: any, per_page:number, page: number){
    let params = new HttpParams();
    if(reference) params = params.set('reference', reference.toString());
    if(name) params = params.set('name', name.toString());
    params = params.set('page', page.toString());
    params = params.set('per_page', per_page.toString());
    return this.httpClient.get(this.url.getInventoryList, {params});
  }

  addInventory(data){
    return this.httpClient.post(this.url.addInventory, data);
  }

  getInventoryHistoric(id: number){
    return this.httpClient.get(`${this.url.getInventoryHistoric}/${id}`);
  }
  searchPieceName(): Observable<AnyResponse> {
    return this.httpClient.get<AnyResponse>(this.url.searchPieceName);
  }

}
