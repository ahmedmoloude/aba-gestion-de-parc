import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'app/config';

@Injectable({ providedIn: 'root' })
export class BoTourService {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }


  deleteTour(uuid){
    return this.http.delete(Config.api.tour.delete + "/" + uuid);
  }
  getToursByIds(data: any) {
    return this.http.post(Config.api.tour.listByIds, data);
  }

  initTour(data: any) {
    return this.http.post(Config.api.tour.initTour, data);
  }

  getTourDetails(uuid: string) {
    return this.http.get(Config.api.tour.getDetails + '/' + uuid);
  }

  getPassagesToPlanify(identifiant: string, isUuid: 0 | 1) {
    return this.http.get(Config.api.tour.getPassageToPlanify + '/' + identifiant + '?is_uuid=' + isUuid);
  }

  planifyPassage(data: any) {
    return this.http.post(Config.api.tour.planifyPassage, data);
  }

  cancelPlanifyPassage(id: string) {
    return this.http.delete(Config.api.tour.unPlanifyPassage + "/" + id, {});
  }

  planifyTour(id: number, data: any) {
    return this.http.patch(Config.api.tour.planifyTour + "/" + id, data);
  }


  mergeTours(data: any) {
    return this.http.post(Config.api.tour.mergeTours, data);
  }

  dailyPlanifyTours() {
    return this.http.get(Config.api.tour.dailyTours);
  }


  downloadTourPdf(id: any) {
    return this.http.get(Config.api.tour.download_pdf + '/' + id , {
      observe: 'body',
      responseType: 'blob',
    });
  }




}
