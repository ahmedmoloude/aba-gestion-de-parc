import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProspectService {
  constructor(private http: HttpClient) {}

  


  deleteProspectFiche(id) {
    return this.http.delete(Config.api.prospect.deleteFicheProspects + '/' + id)
  }
  uploadProspectFiche(body) : Observable<any> {
    return this.http.post(Config.api.prospect.uploadficheProspects , body)
  }

  addProspect(body): Observable<any> {
    return this.http.post(Config.api.prospect.addProspect, body );
  }

  // getTask(filters: any, page:number = 1) {
  //   let queryParams = `&type=Task`
  //   if (filters.commercial) queryParams += `&user_id=${filters.commercial}`;
  //   if (filters.client) queryParams += `&customer_id=${filters.client}`;
  //   if (filters.date_debut) queryParams += `&startTime=${filters.date_debut}`;
  //   if (filters.date_fin) queryParams += `&endTime=${filters.date_fin}`;
  //   if (filters.status) queryParams += `&status=${filters.status}`;

  //   return this.http.get(Config.api.activityComercial.getTask + `?page=${page}`+ queryParams);
  // }
  getProspects(filters: any, page:number = 1 , merchant_uuid?) : Observable<any> {
    let params = new HttpParams();
    params =  params.set('page', page.toString());
    if (merchant_uuid) {
      params =  params.set('merchant_uuid' , merchant_uuid)
    }
    for (const property in filters) {
      params =  params.set(property , filters[property])
    }
    return this.http.get(Config.api.prospect.getProspects,  { params });
    // let queryParams = `&is_prospect=true`
    //   if (filters.start_date) queryParams += `&start_date=${filters.start_date}`;
    //   if (filters.end_date) queryParams += `&end_date=   ${filters.end_date}`;
    //   if (filters.city_id) queryParams += `&city_id=${filters.city_id}`;
    //   if (filters.commercial_id) queryParams += `&commercial_id=${filters.commercial_id}`;
    //   if (filters.name) queryParams += `&name=${filters.name}`;
    //   if (filters.secteur_activite) queryParams += `&secteur_activite=${filters.secteur_activite}`;
    //   if (filters.identity_number) queryParams += `&identity_number=${filters.identity_number}`;
    //   if (filters.reference) queryParams += `&reference=${filters.reference}`;
    //   if (filters.type) queryParams += `&type=${filters.type}`;
    //   if (filters.nature_transport) queryParams += `&nature_transport=${filters.nature_transport}`;

    //   if (merchant_uuid) {
    //     return this.http.get(Config.api.prospect.getProspects + `?page=${page}` + queryParams + `&merchant_uuid=${merchant_uuid}`);
    //   }
    //   else{
    //     return this.http.get(Config.api.prospect.getProspects + `?page=${page}` + queryParams);
    //   }
    
  }


  convertProspect(body){
    return this.http.post(Config.api.prospect.convertProspct, body );
  }
  filtre(filtre:any = null ,page :number =1) {
    return this.http.post<any>(Config.api.prospect.filtre_prospect + `?page${page}` , filtre);
  }

}
