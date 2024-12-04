import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { AnyResponse } from 'app/core/models/facturation/response-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidationVersementService {

  validationVersementUrl = Config.api.caisse.validationVersement;

  constructor(private httpClient: HttpClient) { }

  getVersementsToValidate(data): Observable<AnyResponse>  {
    return this.httpClient.post<AnyResponse>(this.validationVersementUrl.getVersementsToValidate, data);
  }

  validateVersement(data): Observable<AnyResponse>  {
    return this.httpClient.post<AnyResponse>(this.validationVersementUrl.validateVersement, data);
  }

  annulateVersement(data): Observable<AnyResponse>  {
    return this.httpClient.post<AnyResponse>(this.validationVersementUrl.annulateVersement, data);
  }

}
