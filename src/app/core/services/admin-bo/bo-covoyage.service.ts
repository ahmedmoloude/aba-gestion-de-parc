import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'app/config';

@Injectable({ providedIn: 'root' })
export class BoCovoyageService {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  downloadLoadingSheet(id) {
    return this.http.get(Config.api.covoyage.downloadLoadingSheet + '/' + id, { responseType: 'blob' });
  }

  getListCovoyages(filters: any,page : number=1) {
    let queryParams = `&type=${filters.type}`
    if (filters.status) queryParams += `&status=${filters.status}`;
    if (filters.from_date) queryParams += `&from_date=${filters.from_date}`;
    if (filters.to_date) queryParams += `&to_date=${filters.to_date}`;

    return this.http.get(Config.api.covoyage.list + `?page=${page}`+ queryParams);
  }

  initCovoyage(data: any) {
    return this.http.post(Config.api.covoyage.initCovoyage, data);
  }

  updateCovoyage(data: any, uuid: string) {
    return this.http.patch(Config.api.covoyage.updateCovoyage + '/' + uuid, data);
  }

  affecterCovoyage(data: any, uuid: string) {
    return this.http.patch(Config.api.covoyage.editCovoyage + '/' + uuid, data);
  }

  getCovoyageKpis(data: any) {
    return this.http.post(Config.api.covoyage.covoyageKpis, data);
  }

  getCovoyageExpToPlanify(uuid: string) {
    return this.http.get(Config.api.covoyage.covoyageExpToPlanify + '/' + uuid);
  }

  planifyExpedition(data: any) {
    return this.http.post(Config.api.covoyage.planifyExpedition, data);
  }

  unPlanifyExpedition(id: string) {
    return this.http.delete(Config.api.covoyage.unPlanifyExpedition + "/" + id);
  }

  dailyPlanifyCovoyages() {
    return this.http.get(Config.api.covoyage.dailyCovoyages);
  }

  listCovoyages(page:number = 1) {
    return this.http.get(Config.api.covoyage.covoyageAffectation + `?page=${page}`);
  }

}
