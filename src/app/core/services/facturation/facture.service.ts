import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { FactureFilter } from 'app/core/models/facturation/filters/facture-filter.model';
import { AnyResponse, FactureResponse, FacturesHistoryResponse, FacturesResponse, GenerateFacturesResponse, PrefacturationResponse } from 'app/core/models/facturation/response-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private http: HttpClient) { }

  generateBills(){
    return this.http.get(Config.api.bill.generateBill);
  }

  getBills(filter:FactureFilter, per_page : number, page : number): Observable<FacturesResponse>{
    let params = new HttpParams();
    params =  params.set('page', page.toString());
    params = params.set('per_page', per_page.toString());
    return this.http.post<FacturesResponse>(Config.api.bill.getBills, filter, {params});
  }

  getBill(){
    return this.http.get(Config.api.bill.getBill);
  }

  getBillDetail(uuid: string): Observable<FactureResponse>{
    return this.http.get<FactureResponse>(Config.api.bill.getBillDetail + uuid);
  }

  onPrefacturation(search:{startDate: Date, activity: string, customer: string}): Observable<PrefacturationResponse>{
    return this.http.post<PrefacturationResponse>(Config.api.bill.prefacturation, search);
  }

  onGnerateFactures(body:{startDate: Date, activity: string, customer: string}): Observable<GenerateFacturesResponse>{
    return this.http.post<GenerateFacturesResponse>(Config.api.bill.generateBill, body);
  }
  onAddAttachmentToFacture(data: FormData) {
    return this.http.post<GenerateFacturesResponse>(Config.api.bill.addAttachmentToBill, data);
  }

  recalculateFacture(data: FormData) {
    return this.http.post<GenerateFacturesResponse>(Config.api.bill.recalculateBill, data);
  }

  getBillsHistory(filter:any, per_page : number, page : number): Observable<FacturesHistoryResponse>{
    let params = new HttpParams();
    params =  params.set('page', page.toString());
    params = params.set('per_page', per_page.toString());
    return this.http.post<FacturesHistoryResponse>(Config.api.bill.getBillsHistory,filter, {params});
  }

  cancelBill(uuid: string): Observable<FacturesResponse>{
    return this.http.get<FacturesResponse>(`${Config.api.bill.cancelBill}/${uuid}`);
  }

  onAddMotifToFacture(data: {motif: string, facture: string} ): Observable<AnyResponse> {
    return this.http.post<AnyResponse>(`${Config.api.bill.addMotifToBill}`,data);
  }

  getPayedBills(): Observable<AnyResponse>{
    return this.http.get<AnyResponse>(Config.api.bill.getPayedBills);
  }

  getCustomerPayedBills(uuid: number): Observable<AnyResponse>{
    return this.http.get<AnyResponse>(`${Config.api.bill.getCustomerPayedBills}/${uuid}`);
  }

  exportFactures(data: FactureFilter) {
    return this.http.post(`${Config.api.bill.exportFacture}`, data,  { responseType: 'blob' });
  }


  exportFacture(data: FactureFilter) {
    return this.http.post(`${Config.api.bill.exportFacture}`, data);
  }

  regenerateAffretementFacture(data: {facture_id: number, demande_ids: number[]}): Observable<AnyResponse> {
    return this.http.post<AnyResponse>(`${Config.api.bill.regenerateFacture}`, data);
  }




  getSpecialeOffersPreFactures() : Observable<any>{

    return this.http.get<AnyResponse>(`${Config.api.specialOffersBill.getAll}`);

  }


  simulateCRONJob() : Observable<any>{

    return this.http.get<AnyResponse>(`${Config.api.specialOffersBill.simulateCRON}`);

  }



  getSpecialeOffersPreFactureDetails(uuid) : Observable<any>{

    return this.http.get<AnyResponse>(`${Config.api.specialOffersBill.getOne}/${uuid}`);

  }

  calculateSepecialFacture(uuid , final_sumbit , inputs ) {
    return this.http.post(`${Config.api.specialOffersBill.calculate_sepecial_facture}`, {
      uuid,
      final_sumbit,
      inputs
    });
  }





  //



}
