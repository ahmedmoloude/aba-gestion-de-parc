import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { TypeOfEpi } from '../models/type-of-epi.model';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TypeOfEpiServiceService {
  constructor(private http: HttpClient) {}
  getAll() {
     return this.http.get<TypeOfEpi[]>(Config.api.TypeOfEpis.TypeOfEpis);
  }
}
