import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from 'app/config';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  addContact(data: any) {
    return this.http.post(Config.api.contact.addContact, data);
  }

  getContact(filters: any = null, page:number = 1) {
    let params = new HttpParams();
    params =  params.set('page', page.toString());
    for (const property in filters) {
      params =  params.set(property , filters[property])
    }

    return this.http.get(Config.api.contact.getContact, { params });
    // let queryParams = `&type=contact`
    // if (filters.first_name) queryParams += `&first_name=${filters.first_name}`;
    // if (filters.last_name) queryParams += `&last_name=${filters.last_name}`;
    // if (filters.client) queryParams += `&customer_id=${filters.client}`;
    // if (filters.departement_id) queryParams += `&departement_id=${filters.departement_id}`;
    // if (filters.fonction_id) queryParams += `&fonction_id=${filters.fonction_id}`;
    // if (filters.phone) queryParams += `&phone=${filters.phone}`;
    // if (filters.email) queryParams += `&email=${filters.email}`;
    // if (filters.fax) queryParams += `&fax=${filters.fax}`;

    // return this.http.get(Config.api.contact.getContact + `?page=${page}`+ queryParams); 
  }

  deletContact(uuid: any) {
    return this.http.delete(Config.api.contact.deletContact + uuid);
  }

  editContact(data: any, uuid: any) {
    return this.http.put(Config.api.contact.editContact + uuid, data);
  }

  addContactDepartement(data: any) {
    return this.http.post(Config.api.contact.departement, data);
  }

  getContactDepartement() {
    return this.http.get(Config.api.contact.departement);
  }

  deletContactDepartement(uuid: any) {
    return this.http.delete(Config.api.contact.departement + '/' + uuid);
  }

  editContactDepartement(data: any, uuid: any) {
    return this.http.put(Config.api.contact.departement + '/' + uuid, data);
  }

  addContactFonction(data: any) {
    return this.http.post(Config.api.contact.fonction, data);
  }

  getContactFonction() {
    return this.http.get(Config.api.contact.fonction);
  }

  deletContactFonction(uuid: any) {
    return this.http.delete(Config.api.contact.fonction + '/' + uuid);
  }

  editContactFonction(data: any, uuid: any) {
    return this.http.put(Config.api.contact.fonction + '/' + uuid, data);
  }
}
