import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from 'app/config';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

 http: HttpClient;
 
   constructor(http: HttpClient) {
     this.http = http;
   }
 
   getProjets() {
     return this.http.get(Config.api.projet.getAll);
   }

   addProjet(projet: FormData){
    return this.http.post(Config.api.projet.create, projet);
  }

  editProjet(projet: FormData, uuid){
    return this.http.put(Config.api.projet.create + '/' +uuid,projet);
  }
}