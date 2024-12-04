import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { Observable } from 'rxjs';
import { Message } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  getListMessages(filter: any = null): Observable<Message[]> {
    return this.http.get<Message[]>(Config.api.messages.list, {
      params: filter,
    });
  }

  create(data: any): Observable<any> {
    return this.http.post(Config.api.messages.create, data);
  }
}
