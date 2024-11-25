import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { RecouvrementFilter } from 'app/core/models/facturation/filters/recouvrement-filter.model';
import { AnyResponse } from 'app/core/models/facturation/response-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecouvrementService {

  constructor(private httpClient: HttpClient) { }

  getCreanceClientStatistics(): Observable<any> {
    return this.httpClient.get(Config.api.creance.getCreanceClientStatistics);
  }

  getCreanceClientList(data: RecouvrementFilter, per_page : number, page : number): Observable<any> {
    let params = new HttpParams();
    params =  params.set('page', page.toString());
    params = params.set('per_page', per_page.toString());
    return this.httpClient.post(Config.api.creance.getCreanceClientList, data, {params});
  }

  getCreanceClientdetail(id: number): Observable<any> {
    return this.httpClient.get(`${Config.api.creance.getCreanceClientdetail}/${id} `);
  }
  getCreanceByRange(range:string) {
    return this.httpClient.get(`${Config.api.creance.getCreanceByRange}/${range} `);
  }

  getModeReglementList(): Observable<AnyResponse> {
    return this.httpClient.get<AnyResponse>(`${Config.api.reglement.getModeReglementList}`);
  }

}
