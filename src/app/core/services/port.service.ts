import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class PortService {
  constructor(private http: HttpClient) {}

  getListPort(): Observable<any> {
    return this.http.get(Config.api.ports.list);
  }
}
