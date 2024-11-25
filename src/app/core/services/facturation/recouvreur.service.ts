import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { RecouvreursResponse } from 'app/core/models/facturation/response-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecouvreurService {

  constructor(private httpClient: HttpClient) { }

  getRecouvreurs(): Observable<RecouvreursResponse> {
    return this.httpClient.get<RecouvreursResponse>(Config.api.recouvreur.getRecouvreurs);
  }
}
