import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';

@Injectable({
  providedIn: 'root'
})
export class ReparatorService {
  url = Config.api.maintenance.reparator;

  constructor(private httpClient: HttpClient) { }

 getReparators(){
  return this.httpClient.get(this.url.getReparators);
}
}
