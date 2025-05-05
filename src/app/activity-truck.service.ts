import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from 'app/config';

@Injectable({
  providedIn: 'root'
})
export class ActivityTruckService {

  http: HttpClient;
  
    constructor(http: HttpClient) {
      this.http = http;
    }
  
    getActivityTrucks() {
      return this.http.get(Config.api.activityTruck.getAll);
    }
}
