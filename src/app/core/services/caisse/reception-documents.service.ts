import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { DocumentFilter } from 'app/core/models/caisse/filter/document-filter.model';
import { AnyResponse, DocumentsResponse, confirmDocumentsReceptionResponse } from 'app/core/models/facturation/response-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceptionDocumentseService {

  receptionDocumentsUrl = Config.api.caisse.receptionDocuments;
  constructor(private httpClient: HttpClient) { }

  getDocuments(data: DocumentFilter): Observable<DocumentsResponse>  {
    return this.httpClient.post<DocumentsResponse>(this.receptionDocumentsUrl.getDocuments, data);
  }

  getChecks(data: DocumentFilter): Observable<DocumentsResponse>  {
    return this.httpClient.post<DocumentsResponse>(this.receptionDocumentsUrl.getChecksTraits, data);
  }

  confirmdocumentsReception(data: {documents: Array<number>}): Observable<confirmDocumentsReceptionResponse>  {
    return this.httpClient.post<confirmDocumentsReceptionResponse>(this.receptionDocumentsUrl.confirmDocumentsReception, data);
  }

}
