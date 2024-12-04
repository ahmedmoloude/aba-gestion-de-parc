import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { Observable } from 'rxjs';
import { Complaint, ComplaintReason } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {
  constructor(private http: HttpClient) {}

  getListComplaints(filter: any = null): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(Config.api.complaints.list, {
      params: filter,
    });
  }

  getListComplaintReasons(filter: any = null): Observable<ComplaintReason[]> {
    return this.http.get<ComplaintReason[]>(Config.api.complaints.reason.list, {
      params: filter,
    });
  }
}
