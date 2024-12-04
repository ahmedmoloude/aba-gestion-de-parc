import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { AnyResponse } from 'app/core/models/facturation/response-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RetourCrbtService {

  retourCrbtUrl = Config.api.caisse.retourCrbt;

  constructor(private httpClient: HttpClient) { }

  getTRetoursCrbtToValidate(data): Observable<AnyResponse>  {
    return this.httpClient.post<AnyResponse>(this.retourCrbtUrl.getTRetoursCrbtToValidate, data);
  }

  validateTRetourCrbt(data): Observable<AnyResponse>  {
    return this.httpClient.post<AnyResponse>(this.retourCrbtUrl.validateTRetourCrbt, data);
  }

  annulateTRetourCrbt(data): Observable<AnyResponse>  {
    return this.httpClient.post<AnyResponse>(this.retourCrbtUrl.annulateTRetourCrbt, data);
  }

}
