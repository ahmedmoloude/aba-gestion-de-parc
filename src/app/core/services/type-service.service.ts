import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Service } from '../models/service.model';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TypeServiceService {

  constructor(private http: HttpClient) { }
  getAllServices(filter: any = null): Observable<Service[]> {
    return this.http.get<Service[]>(Config.api.services.services);
  }
}
