import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  httpHeaders = new HttpHeaders().set('Content-Type','application/json');
  opts:any;
  constructor(private httpClient: HttpClient) { }

  getClient(filter: any) : Observable<any> {
    return this.httpClient.get(`${Config.api.customers.search}?query=${filter}`).pipe(map((res:any)=>{
      return res || {}
    }));
 }

 getData() {
  return this.opts.length ?
    of(this.opts) :
    this.httpClient.get('https://jsonplaceholder.typicode.com/users').pipe(tap(data => this.opts = data));
 }

}
