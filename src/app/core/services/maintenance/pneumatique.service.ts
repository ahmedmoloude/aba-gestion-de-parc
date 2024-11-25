import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { AnyResponse, PneuAffectationResponse, PneuResponse, PneusResponse } from 'app/core/models/facturation/response-data.model';
import { AffectationRequest, Pneu } from 'app/core/models/maintenance/pneu.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PneumatiqueService {

  url = Config.api.maintenance.pneumatique;

  constructor(private httpClient: HttpClient) { }

  getPneus(data: any, per_page:number, page: number): Observable<PneusResponse> {
    let params = new HttpParams();
    params =  params.set('page', page.toString());
    params = params.set('per_page', per_page.toString());
    return this.httpClient.post<PneusResponse>(this.url.getPneus, data, {params});
  }

  createPneu(data: Pneu): Observable<PneuResponse> {
    return this.httpClient.post<PneuResponse>(this.url.createPneu, data);
  }

  getPneu(id: number): Observable<PneuResponse> {
    return this.httpClient.get<PneuResponse>(`${this.url.getPneu}/${id}`);
  }

  affectPneu(data: AffectationRequest): Observable<PneuAffectationResponse> {
    return this.httpClient.post<PneuAffectationResponse>(this.url.affectPneu, data);
  }

  desaffectPneu(data: {pneu_id: number}): Observable<PneuAffectationResponse> {
    return this.httpClient.post<PneuAffectationResponse>(this.url.desaffectPneu, data);
  }

  updatePneu(data: any): Observable<PneuResponse> {
    return this.httpClient.post<PneuResponse>(this.url.updatePneu, data);
  }

  deletePneu(id: number): Observable<AnyResponse> {
    return this.httpClient.delete<AnyResponse>(`${this.url.deletePneu}/${id}`);
  }
}
