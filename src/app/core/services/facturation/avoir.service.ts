import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { AvoirFilter } from 'app/core/models/facturation/filters/avoir-filter.model';
import { AnyResponse, AvoirResponse, AvoirsResponse, FactureResponse, RapportAvoirResponse } from 'app/core/models/facturation/response-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvoirService {

  constructor(private http: HttpClient) { }

  getAvoirs(data: AvoirFilter, per_page: number, page: number): Observable<AvoirsResponse>{
    let params = new HttpParams();
    params =  params.set('page', page.toString());
    params = params.set('per_page', per_page.toString());
    return this.http.post<AvoirsResponse>(Config.api.avoir.getAvoirs, data, {params});
  }

  getAvoir(uuid: string): Observable<AvoirResponse>{
    return this.http.get<AvoirResponse>(Config.api.avoir.getAvoir + `/${uuid}`);
  }

  createAvoir(avoir: FormData): Observable<AvoirResponse>{
    return this.http.post<AvoirResponse>(Config.api.avoir.createAvoir, avoir);
  }

  updateAvoir(avoir): Observable<AvoirResponse>{
    return this.http.post<AvoirResponse>(Config.api.avoir.updateAvoir, avoir);
  }

  deleteAvoir(uuid): Observable<AvoirResponse>{
    return this.http.delete<AvoirResponse>(`${Config.api.avoir.deleteAvoir}/${uuid}`);
  }

  getFactureAvoir(reference): Observable<FactureResponse>{
    return this.http.get<FactureResponse>(`${Config.api.avoir.getFactureAvoir}/${reference}`);
  }

  getMontantAvoir(uuid: any) {
    return this.http.get<AnyResponse>(`${Config.api.avoir.getMontantAvoir}/${uuid}`);
  }

  exportAvoirs() {
    return this.http.get<AnyResponse>(`${Config.api.avoir.exportAvoir}`);
  }

  exportPdfAvoir(id: number) {
    return this.http.get<AnyResponse>(`${Config.api.avoir.exportPdfAvoir}/${id}`);
  }

  getRapportAvoir(): Observable<RapportAvoirResponse> {
    return this.http.get<RapportAvoirResponse>(`${Config.api.avoir.rapportAvoir}`);
  }
}
