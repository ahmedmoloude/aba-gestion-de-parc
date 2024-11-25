import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { AlimentCarte } from 'app/core/models/caisse/aliment-carte.model';
import { Carte } from 'app/core/models/caisse/carte.model';
import { CarteFilter } from 'app/core/models/caisse/filter/carte-filter.model';
import { AnyResponse, CarteResponse, CartesResponse } from 'app/core/models/facturation/response-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarteService {

  caisseCarteUrl = Config.api.caisse.caisseCarte;

  constructor(private httpClient: HttpClient) { }

  getCaisseCartes(data: CarteFilter, per_page : number, page : number): Observable<CartesResponse>  {
    let params = new HttpParams();
    params =  params.set('page', page.toString());
    params = params.set('per_page', per_page.toString());
    return this.httpClient.post<CartesResponse>(this.caisseCarteUrl.getCaisseCartes, data, {params});
  }

  addCaisseCarte(data: Carte): Observable<CarteResponse>  {
    return this.httpClient.post<CarteResponse>(this.caisseCarteUrl.addCaisseCarte, data);
  }

  alimenterCaisseCarte(data: FormData): Observable<AnyResponse>  {
    return this.httpClient.post<AnyResponse>(this.caisseCarteUrl.alimenterCaisseCarte, data);
  }

  affecterCaisseCarte(data: {carte_id: number, agency_id: number, start_date: string}): Observable<CarteResponse>  {
    return this.httpClient.post<CarteResponse>(this.caisseCarteUrl.affecterCaisseCarte, data);
  }

  desaffecterCaisseCarte(data: string): Observable<CarteResponse>  {
    return this.httpClient.delete<CarteResponse>(`${this.caisseCarteUrl.desaffecterCaisseCarte}/${data}`);
  }

  getMouvementCaisseCarte(data): Observable<AnyResponse>  {
    return this.httpClient.get<AnyResponse>(`${this.caisseCarteUrl.getMouvementCaisseCarte}/${data}`);
  }

  deleteCaisseCarte(data: string): Observable<AnyResponse>  {
    return this.httpClient.delete<AnyResponse>(`${this.caisseCarteUrl.deleteCaisseCarte}/${data}`);
  }

}
