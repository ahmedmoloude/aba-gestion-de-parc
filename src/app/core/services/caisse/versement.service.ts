import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { VersementFilter } from 'app/core/models/caisse/filter/versement-filter.model';
import { AnyResponse, VersementResponse } from 'app/core/models/facturation/response-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersementService {

  versementUrl = Config.api.caisse.versement;

  constructor(private httpClient: HttpClient) { }

  getVersements(data: VersementFilter): Observable<VersementResponse>  {
    return this.httpClient.post<VersementResponse>(this.versementUrl.getVersements, data);
  }

  emettreVersement(data): Observable<AnyResponse>  {
    return this.httpClient.post<AnyResponse>(this.versementUrl.emettreVersement, data);
  }

  validateVersement(data): Observable<AnyResponse>  {
    return this.httpClient.post<AnyResponse>(this.versementUrl.validateVersements, data);
  }
}
