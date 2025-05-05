import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from 'app/config';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getEntities() {
    return this.http.get(Config.api.entity.getAll);
  }

  deletEntity(uuid: any) {
    return this.http.delete(Config.api.entity.delete + '/' + uuid);
  }

  addEntity(entity: FormData){
    return this.http.post(Config.api.entity.create, entity);
  }

  editEntity(entity: FormData, uuid){
    return this.http.put(Config.api.entity.create + '/' +uuid,entity);
  }
}
