import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from 'app/config';

@Injectable()
export class BoQuoteService {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  /* quotes actions */
  getListQuotes(filters: any = null, page: number = 1 , merchant_uuid: string , per_page = 10) {

    console.log('filters' , filters);
    let url = Config.api.quotes.list
    let params = new HttpParams();
    params =  params.set('page', page.toString());
    
    if (merchant_uuid) {
      params =  params.set('merchant_uuid' , merchant_uuid)
    }

    for (const property in filters) {
      if (property == 'statut') {
        params =  params.set('quote_status' , filters[property].quote_status)
        params =  params.set('workflow_step', filters[property].workflow_step)
      }
      else{
        params =  params.set(property , filters[property])
      }
    }

    console.log('params' , params)

    return this.http.get(url ,  { params });
  }


  createQuote(params: any) {
    return this.http.post(Config.api.quotes.create, params);
  }


  getQuote(uuid: string) {
    return this.http.get(Config.api.quotes.get + '/' + uuid);
  }


  validateQuote(quote:any, status: any) {
    return this.http.put(Config.api.quotes.validate + '/' + quote.last_version[0].uuid + '/validate', {status:status});
  }

  /* quotes versions actions */
  confirmQuoteVersion(uuid: string, params: any) {
    return this.http.patch(Config.api.quotes.confirm + '/' + uuid, params);
  }
  rollbackConfirmQuoteVersion(uuid: string, params: any) {
    return this.http.patch(Config.api.quotes.rollback + '/' + uuid, params);
  }
  acceptQuoteVersion(uuid: string, body: any) {
    return this.http.post(Config.api.quotes.accept + '/' + uuid, body);
  }
  declineQuoteVersion(uuid: string, params: any) {
    return this.http.patch(Config.api.quotes.decline + '/' + uuid, params);
  }
  newQuoteVersion(uuid: string, params: any) {
    return this.http.patch(Config.api.quotes.new_version + '/' + uuid, params);
  }



  /* quotes grid details actions */
  getQuoteTree(uuid: string) {
    return this.http.get(Config.api.quotes.get_quote_tree + '/' + uuid);
  }
 
  downloadQuotePdf(id: number) {
    return this.http.get(Config.api.quotes.download_quote + '/' + id);
  }


  updateQuoteDetails(uuid: string, params: any) {
    return this.http.patch(Config.api.quotes.update_quote_details + '/' + uuid, params);
  }
  
}
