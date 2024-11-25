import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkflowValidationService {

  url = environment.URL
  http: HttpClient;
  private workflowsSubject = new BehaviorSubject<[]>([]);
public workflows$ = this.workflowsSubject.asObservable();

  constructor(http: HttpClient) {
    this.http = http;
  }

  saveWorkflow(body: any) {
    return this.http.post(`${this.url}workflow-validation/create`, body);
  }

  getList() {
    return this.http.get(`${this.url}workflow-validation/list`).subscribe((workflows: any) => {
      this.workflowsSubject.next(workflows);
    });;
  }
}
