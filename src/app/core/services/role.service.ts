import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { Observable } from 'rxjs';
import { AnyResponse } from '../models/facturation/response-data.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  url = Config.api.parametre.role;

  constructor(private httpClient: HttpClient) { }

  getRoles(): Observable<AnyResponse> {
    return this.httpClient.get<AnyResponse>(this.url.getRoles);
  }

  addRole(data: any): Observable<AnyResponse> {
    return this.httpClient.post<AnyResponse>(this.url.addRole, data);
  }

  getRoleHabilities(idRole: number): Observable<AnyResponse> {
    return this.httpClient.get<AnyResponse>(`${this.url.getRoleHabilities}/${idRole}`);
  }

  addRoleHabilities(data: any): Observable<AnyResponse> {
    return this.httpClient.post<AnyResponse>(this.url.addRoleHabilities, data);
  }

}
