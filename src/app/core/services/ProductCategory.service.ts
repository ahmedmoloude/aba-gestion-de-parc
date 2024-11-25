import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {

  constructor(private http: HttpClient) {}

  getListProductNature(filter:string[]): Observable<any> {
    console.log(filter.length,'filter');
    if(filter.length == 1) {
      return this.http.get<any>(`${Config.api.prod_category.list}?type[0]=${filter[0]}`);
    }else {
      
      return this.http.get<any>(`${Config.api.prod_category.list}?type[0]=${filter[0]}&type[1]=${filter[1]}`);
    }
   
  }

  getProductType(): Observable<any> {
    return this.http.get<any>(Config.api.prod_category.type);
  }

  getProductNature() : Observable<any> {
    return this.http.get<any>(Config.api.prod_category.get);
  }

  createProductType(data) : Observable<any> {
    return this.http.post(Config.api.prod_category.create,data);
  }

  updateNatureProduct(data: any, uuid: any) {
    console.log(uuid);
    return this.http.post(Config.api.prod_category.update + '/' + uuid, data);
  }

  deleteNatureProduct(uuid: any) {
    return this.http.delete(Config.api.prod_category.delete + '/' + uuid);
  }



  
}
