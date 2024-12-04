import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { AnyResponse } from 'app/core/models/facturation/response-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  url = Config.api.maintenance.planning;

  constructor(private httpClient: HttpClient) { }

  getPlannings(data: any): Observable<AnyResponse> {
    return this.httpClient.post<AnyResponse>(this.url.getPlannings, data);
  }

  addPlanning(data: any): Observable<AnyResponse> {
    return this.httpClient.post<AnyResponse>(this.url.addPlanning, data);
  }
  accomplishPlanning(data: any): Observable<AnyResponse> {
    return this.httpClient.post<AnyResponse>(this.url.accomplishPlanning, data);
  }

  updatePlanning(data: any): Observable<AnyResponse> {
    return this.httpClient.post<AnyResponse>(this.url.updatePlanning, data);
  }

  deletePlanning(uuid: string): Observable<AnyResponse> {
    return this.httpClient.delete<AnyResponse>(`${this.url.deletePlanning}/${uuid}`);
  }
}
