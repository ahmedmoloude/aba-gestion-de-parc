import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { AnyResponse } from 'app/core/models/facturation/response-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandePieceService {

  url = Config.api.maintenance.demandePiece;

  constructor(private httpClient: HttpClient) { }

  getDemandePiecesList(data: any) : Observable<AnyResponse> {
    return this.httpClient.post<AnyResponse>(this.url.getDemandePiecesList, data);
    // let queryString = {
    //   include:{"attachements":true,"chiefComplaintConsultations":{"include":{"chiefComplaint":true}},"medicationConsultations":{"include":{"medication":true}},"imagingConsultations":{"include":{"imaging":true}},"analyseConsultations":{"include":{"analyse":true}},"doctor":{"include":{"user":true,"speciality":true}}},
    //   where: {"patientId":parseInt(data),"NOT":{"endTime":null}},
    //   orderBy: {"createdAt":"desc"},
    // }
    // //@ts-ignore
    // queryString.include = JSON.stringify(queryString.include)
    // //@ts-ignore
    // queryString.where = JSON.stringify(queryString.where)
    // //@ts-ignore
    // queryString.orderBy = JSON.stringify(queryString.orderBy);
    // //@ts-ignore
    // const q = new URLSearchParams(queryString).toString()
    // return this.httpClient.get<AnyResponse>(this.url.getDemandePiecesList+'?'+q);
  }

  getDemandePiecesHistoric(data: any) : Observable<AnyResponse> {
    return this.httpClient.get<AnyResponse>(this.url.getDemandePiecesHistoric);
  }

  getDemandePiecesDetail(id: number) : Observable<AnyResponse> {
    return this.httpClient.get<AnyResponse>(`${this.url.getDemandePiecesDetail}/${id}`);
  }

  getDemandePiecesBonCommande(id: number) : Observable<AnyResponse> {
    return this.httpClient.get<AnyResponse>(`${this.url.getDemandePiecesBonCommande}/${id}`);
  }

  getDemandePiecesBon(data: {reference: string, type: string}) : Observable<AnyResponse> {
    return this.httpClient.post<AnyResponse>(this.url.getDemandePiecesBon, data);
  }

  generateDemandePiecesBonAchat(id: number) : Observable<AnyResponse> {
    return this.httpClient.get<AnyResponse>(`${this.url.generateDemandePiecesBonAchat}/${id}`);
  }

  getDemandePiecesBonSortie(data: any) : Observable<AnyResponse> {
    return this.httpClient.post<AnyResponse>(this.url.getDemandePiecesBonSortie, data);
  }

  CompleteDemandePiecesCommande(id: number) : Observable<AnyResponse> {
    return this.httpClient.get<AnyResponse>(`${this.url.CompleteDemandePiecesCommande}/${id}`);
  }

  addDemandePiecesattachment(data: FormData) : Observable<AnyResponse> {
    return this.httpClient.post<AnyResponse>(this.url.addDemandePiecesattachment, data);
  }

}
