import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from 'app/config';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  addTask(data: any) {
    return this.http.post(Config.api.task.addTask, data);
  }

  getAllTask() {
    return this.http.get(Config.api.task.getAllTask);
  }

  getAllTaskByUser(id: any) {
    return this.http.get(Config.api.task.getAllTask + '/' + id);
  }

  UserCommercial() {
    return this.http.get(Config.api.task.UserCommercial);
  }

  deletTask(uuid: any) {
    return this.http.delete(Config.api.task.deletTask + uuid);
  }

  editTask(data: any, uuid: any) {
    return this.http.post(Config.api.task.editTask + uuid, data);
  }

  getcommercialTasksable(data: any) {
    return this.http.get(Config.api.task.getcommercialTasksable + data)
  }

  addRdv(data: any) {
    return this.http.post(Config.api.rdv.Rdv, data);
  }

  getRdv() {
    return this.http.get(Config.api.rdv.Rdv);
  }

  getRdvByDate(start: any, end: any) {
    return this.http.get(Config.api.rdv.Rdv + '/' + start + '/' + end);
  }

  getTaskByDate(start: any, end: any) {
    return this.http.get(Config.api.task.getTaskByDate + '/' + start + '/' + end);
  }

  getRdvByUser(id: any) {
    return this.http.get(Config.api.rdv.Rdv + '/' + id);
  }

  deletRdv(uuid: any) {
    return this.http.delete(Config.api.rdv.Rdv + '/' + uuid);
  }

  editRdv(data: any, uuid: any) {
    return this.http.post(Config.api.rdv.Rdv + '/' + uuid, data);
  }

  addComercialActivity(data: any) {
    return this.http.post(Config.api.activityComercial.other, data);
  }

  getAllActivity(page:number = 1) {
    return this.http.get(Config.api.activityComercial.other + `?page=${page}`);
  }

  getRdvv(filters: any = null, page : number=1) {

    let params = new HttpParams();
    params =  params.set('page', page.toString());
    for (const property in filters) {
      params =  params.set(property , filters[property])
    }

    return this.http.get(Config.api.activityComercial.getRdv, { params });
    let queryParams = `&typeActivity=RDV`
    if (filters.commercial) queryParams += `&user_id=${filters.commercial}`;
    if (filters.client) queryParams += `&customer_id=${filters.client}`;
    if (filters.date_debut) queryParams += `&startTime=${filters.date_debut}`;
    if (filters.date_fin) queryParams += `&endTime=${filters.date_fin}`;
    if (filters.status) queryParams += `&status=${filters.status}`;
    if (filters.status) queryParams += `&status=${filters.status}`;
    if (filters.is_prospect) queryParams += `&is_prospect=${filters.is_prospect}`;
    if (filters.subject) queryParams += `&subject=${filters.subject}`;
    if (filters.type) queryParams += `&type=${filters.type}`;
    if (filters.priority) queryParams += `&priority=${filters.priority}`;
    if (filters.motif) queryParams += `&motif=${filters.motif}`;
    if (filters.location) queryParams += `&location=${filters.location}`;

    return this.http.get(Config.api.activityComercial.getRdv + `?page=${page}`+ queryParams);
  }

  getTask(filters: any = null, page:number = 1) {
    let params = new HttpParams();
    params =  params.set('page', page.toString());
    for (const property in filters) {
      params =  params.set(property , filters[property])
    }

    return this.http.get(Config.api.activityComercial.getTask, { params });
    // let queryParams = `&type=Task`
    // if (filters.commercial) queryParams += `&user_id=${filters.commercial}`;
    // if (filters.client) queryParams += `&customer_id=${filters.client}`;
    // if (filters.date_debut) queryParams += `&startTime=${filters.date_debut}`;
    // if (filters.date_fin) queryParams += `&endTime=${filters.date_fin}`;
    // if (filters.status) queryParams += `&status=${filters.status}`;
    // if (filters.is_prospect) queryParams += `&is_prospect=${filters.is_prospect}`;
    // if (filters.subject) queryParams += `&subject=${filters.subject}`;
    // if (filters.priority) queryParams += `&priority=${filters.priority}`;
    // if (filters.location) queryParams += `&location=${filters.location}`;

    // return this.http.get(Config.api.activityComercial.getTask + `?page=${page}`+ queryParams);
  }

  exportActivity() {
    return this.http.get(Config.api.activityComercial.export, {
      observe: 'body',
      responseType: 'blob',
    });
  }

  getActivityByUser(id :any) {
    return this.http.get(Config.api.activityComercial.other + '/' + id);
  }
  getAllActivityByDate(start: any, end: any) {
    return this.http.get(Config.api.activityComercial.other + '/' + start + '/' + end);
  }

  deleteActivity(uuid: any) {
    return this.http.delete(Config.api.activityComercial.other + '/' + uuid);
  }

  deletePJ(uuid: any) {
    return this.http.delete(Config.api.activityComercial.deletePJ + '/' + uuid);
  }

  updateActivity(data: any, uuid: any) {
    return this.http.post(Config.api.activityComercial.other + '/' + uuid, data);
  }

  filterComercialActivity(data: any) {
    return this.http.get(Config.api.activityComercial.filter, data);
  }
  
}
