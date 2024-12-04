import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from 'app/config';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  deletMedia(uuid: any) {
    return this.http.delete(Config.api.vehicule.media + '/' + uuid);
  }

  getBrand() {
    return this.http.get(Config.api.vehicule.brand);
  }

  addBrand(data: any) {
    return this.http.post(Config.api.vehicule.brand, data);
  }

  editBrand(data: any, uuid:any) {
    return this.http.post(Config.api.vehicule.brand + '/' + uuid, data);
  }

  deletBrand(uuid: any) {
    return this.http.delete(Config.api.vehicule.brand + '/' + uuid);
  }

  getGamme() {
    return this.http.get(Config.api.vehicule.gamme);
  }

  addGamme(data: any) {
    return this.http.post(Config.api.vehicule.gamme, data);
  }

  editGamme(data: any, uuid:any) {
    return this.http.post(Config.api.vehicule.gamme + '/' + uuid, data);
  }

  deletGamme(uuid: any) {
    return this.http.delete(Config.api.vehicule.gamme + '/' + uuid);
  }

  getModele() {
    return this.http.get(Config.api.vehicule.modele);
  }

  addModele(data: any) {
    return this.http.post(Config.api.vehicule.modele, data);
  }

  editModele(data: any, uuid:any) {
    return this.http.post(Config.api.vehicule.modele + '/' + uuid, data);
  }

  deletModele(uuid: any) {
    return this.http.delete(Config.api.vehicule.modele + '/' + uuid);
  }

  getTruckCategory() {
    return this.http.get(Config.api.vehicule.category);
  }

  addTruckCategory(data: any) {
    return this.http.post(Config.api.vehicule.category, data);
  }

  editTruckCategory(data: any, uuid:any) {
    return this.http.post(Config.api.vehicule.category + '/' + uuid, data);
  }

  deletTruckCategory(uuid: any) {
    return this.http.delete(Config.api.vehicule.category + '/' + uuid);
  }

  getTruckType() {
    return this.http.get(Config.api.vehicule.type);
  }

  addTruckType(data: any) {
    return this.http.post(Config.api.vehicule.type, data);
  }

  editTruckType(data: any, uuid:any) {
    return this.http.post(Config.api.vehicule.type + '/' + uuid, data);
  }

  deletTruckType(uuid: any) {
    return this.http.delete(Config.api.vehicule.type + '/' + uuid);
  }

  getTruckService() {
    return this.http.get(Config.api.vehicule.service);
  }

  getParc() {
    return this.http.get(Config.api.vehicule.parc);
  }

  addParc( data: any ) {
    return this.http.post(Config.api.vehicule.parc, data);
  }

  getTonnage() {
    return this.http.get(Config.api.vehicule.tonnage);
  }

  addTonnage(data: any) {
    return this.http.post(Config.api.vehicule.tonnage, data);
  }

  editTonnage(data: any, uuid:any) {
    return this.http.post(Config.api.vehicule.tonnage + '/' + uuid, data);
  }

  deletTonnage(uuid: any) {
    return this.http.delete(Config.api.vehicule.tonnage + '/' + uuid);
  }

  getTruck(filters?: any, per_page? : number, page? : number) {
    console.log("FILTERS", filters)
    console.log("PAGE", page)
    let params = new HttpParams();
    params =  params.set('page', page.toString());
    params = params.set('per_page', per_page.toString());
    for (const property in filters) {
      params =  params.set(property , filters[property])
    }
    return this.http.get(Config.api.vehicule.truck, { params });
  }

  addTruck(data: any) {
    return this.http.post(Config.api.vehicule.truck, data);
  }

  editTruck(data: any, uuid:any) {
    return this.http.post(Config.api.vehicule.truck + '/' + uuid, data);
  }

  deletTruck(uuid: any) {
    return this.http.delete(Config.api.vehicule.truck + '/' + uuid);
  }

  getTruckContrat() {
    return this.http.get(Config.api.vehicule.contart);
  }

  addTruckContart(data: any) {
    return this.http.post(Config.api.vehicule.contart, data);
  }

  updateTruckContart(data: any, uuid: any) {
    return this.http.post(Config.api.vehicule.contart + '/' + uuid, data);
  }

  deletTruckContart(uuid: any) {
    return this.http.delete(Config.api.vehicule.contart + '/' + uuid);
  }

  getTruckDocument(filters: any = null) {
    let params = new HttpParams();
    // params =  params.set('page', page.toString());
    for (const property in filters) {
      params =  params.set(property , filters[property])
    }
    return this.http.get(Config.api.vehicule.document, { params });
  }

  addTruckDocument(data: any) {
    return this.http.post(Config.api.vehicule.document, data);
  }

  updateTruckDocument(data: any, uuid: any) {
    return this.http.post(Config.api.vehicule.document + '/' + uuid, data);
  }

  deletTruckDocument(uuid: any) {
    return this.http.delete(Config.api.vehicule.document + '/' + uuid);
  }

  getTruckSinistre() {
    return this.http.get(Config.api.vehicule.sinistre);
  }

  addTruckSinistre(data: any) {
    return this.http.post(Config.api.vehicule.sinistre, data);
  }

  getCountDocument() {
    return this.http.get(Config.api.vehicule.countDocument);
  }

  getStatusVehicule() {
    return this.http.get(Config.api.vehicule.statusVehicule);
  }

  getDetailsVehicule() {
    return this.http.get(Config.api.vehicule.detailsTruck);
  }

  getRemplacement(page:number = 1){
    return this.http.get(Config.api.vehicule.remplacement + `?page=${page}`);
  }

  addRemplacement(data: any){
    return this.http.post(Config.api.vehicule.remplacement, data);
  }

  getIntervention(page:number = 1){
    return this.http.get(Config.api.vehicule.intervention + `?page=${page}`);
  }
  getInterventionFiltre(filtre){
    return this.http.post(Config.api.vehicule.intervention_filtre, filtre);
  }

  addIntervention(data: any){
    return this.http.post(Config.api.vehicule.intervention, data);
  }

  updateIntervention(data: any, uuid: any) {
    return this.http.post(Config.api.vehicule.intervention + '/' + uuid, data);
  }

  deletIntervention(uuid: any) {
    return this.http.delete(Config.api.vehicule.intervention + '/' + uuid);
  }

  getCiterne(filters: any = null, page: number = 1){
    // console.log("FILTERS", filters)
    // console.log("PAGE", page)
    let params = new HttpParams();
    params =  params.set('page', page.toString());
    for (const property in filters) {
      params =  params.set(property , filters[property])
    }

    return this.http.get(Config.api.vehicule.citerne, { params });
    // return this.http.get(Config.api.vehicule.citerne + `?page=${page}` );
  }

  getCiterneFiltre(filtre:any){
    return this.http.post(Config.api.vehicule.citerne_filtre, filtre );
  }

  addCiterne(data: any){
    return this.http.post(Config.api.vehicule.citerne, data);
  }

  updateCiterne(data: any, uuid: any) {
    return this.http.post(Config.api.vehicule.citerne + '/' + uuid, data);
  }

  getCiterneByuuid(uuid: any) {
    return this.http.get(Config.api.vehicule.citerne + '/' + uuid);
  }

  deletCiterne(uuid: any) {
    return this.http.delete(Config.api.vehicule.citerne + '/' + uuid);
  }

  getCarte(filters: any = null, page: number = 1){
    let params = new HttpParams();
      params =  params.set('page', page.toString());
      for (const property in filters) {
        params =  params.set(property , filters[property])
      }

    return this.http.get(Config.api.vehicule.carte, { params });
  }

  getCarteFiltres(filters){
    return this.http.post(Config.api.vehicule.carte_filters, filters);
  }

  addCarte(data: any){
    return this.http.post(Config.api.vehicule.carte, data);
  }

  updateCarte(data: any, uuid: any) {
    return this.http.post(Config.api.vehicule.carte + '/' + uuid, data);
  }

  deletCarte(uuid: any) {
    return this.http.delete(Config.api.vehicule.carte + '/' + uuid);
  }

  getMouvement(filters : any = null, page:number = 1){
      let params = new HttpParams();
      params =  params.set('page', page.toString());
      for (const property in filters) {
        params =  params.set(property , filters[property])
      }
      return this.http.get(Config.api.vehicule.mouvement, { params });
  }

  getallMouvement(type : any, filters : any = null, page:number = 1){
    let params = new HttpParams();
    params =  params.set('page', page.toString());
    for (const property in filters) {
      params =  params.set(property , filters[property])
    }
    return this.http.get(Config.api.vehicule.mouvement + '/' + type, {params});
  }

  addMouvement(data: any){
    return this.http.post(Config.api.vehicule.mouvement, data);
  }

  editMouvement(data: any , uuid){
    return this.http.put(Config.api.vehicule.mouvement + '/' + uuid, data);
  }

  deleteMouvment(uuid){
    return this.http.delete(Config.api.vehicule.mouvement + '/' + uuid);
  }


  allCiterne(){
    return this.http.get(Config.api.vehicule.allCiterne);
  }

  allCarte(){
    return this.http.get(Config.api.vehicule.getAllCarte);
  }

  addJaugeage(data: any){
    return this.http.post(Config.api.vehicule.jaugeage, data);
  }

  getJaugeage(id: any, page: number = 1){
    return this.http.get(Config.api.vehicule.jaugeage + '/' + id + `?page=${page}`);
  }

  addDepense(data: any){
    return this.http.post(Config.api.vehicule.depense, data);
  }

  updateDepense(data: any, uuid: string){
    return this.http.post(Config.api.vehicule.depense + '/' + uuid, data);
  }

  deleteDepense(uuid: string) {
    return this.http.delete(Config.api.vehicule.depense + '/' + uuid);
  }

  getDepense(type: any, filters: any = null, page: number = 1){
    let params = new HttpParams();
    params =  params.set('page', page.toString());
    for (const property in filters) {
      params =  params.set(property , filters[property])
    }
    return this.http.get(Config.api.vehicule.depense + '/' + type + `?page=${page}`, { params});
  }

  getDepenseById(type : any, id:any, page:number = 1){
    return this.http.get(Config.api.vehicule.depense + '/' + type + '/'+ id + `?page=${page}`);
  }

  getCarteByuuid(uuid: any) {
    return this.http.get(Config.api.vehicule.carte + '/' + uuid);
  }

  affecterCarte(data : any) {
    return this.http.post(Config.api.vehicule.affecterCarte , data);
  }

  allTruck() {
    return this.http.get(Config.api.vehicule.truck);
  }

  truckByUuid(uuid) {
    return this.http.get(Config.api.vehicule.truck + '/' + uuid);
  }

  documentByType(filters: any = null,type) {
    let params = new HttpParams();
    params =  params.set('type', type.toString());
    for (const property in filters) {
      params =  params.set(property , filters[property])
    }
    return this.http.get(Config.api.vehicule.getDocumentByType, { params });
  }

  truckBystatus(status) {
    return this.http.get(Config.api.vehicule.trucksByStatus + '/' + status);
  }

  getDetailsVehiculeList(type) {
    return this.http.get(Config.api.vehicule.detailsTruck + '/' + type);
  }

  missionInfraction(model) {
    return this.http.get(Config.api.vehicule.missionInfraction + '/' + model);
  }

  addGps(data : any) {
    return this.http.post(Config.api.vehicule.gps , data);
  }

  editGps(data: any, uuid:any) {
    return this.http.post(Config.api.vehicule.gps + '/' + uuid, data);
  }

  deletGps(uuid: any) {
    return this.http.delete(Config.api.vehicule.gps + '/' + uuid);
  }

  getGps(filters: any = null,page:number= 1) {
      let params = new HttpParams();
      params =  params.set('page', page.toString());
      for (const property in filters) {
        params =  params.set(property , filters[property])
      }

      return this.http.get(Config.api.vehicule.gps, { params });
    // return this.http.get(Config.api.vehicule.gps +`?page=${page}` );
  }

  associerGps(data : any) {
    return this.http.post(Config.api.vehicule.associer_gps , data);
  }

  addPrestataire(data : any) {
    return this.http.post(Config.api.parametre.prestataire , data);
  }

  getPrestataire() {
    return this.http.get(Config.api.parametre.prestataire);
  }

  editPrestataire(data: any, uuid:any) {
    return this.http.post(Config.api.parametre.prestataire + '/' + uuid, data);
  }

  deletPrestataire(uuid: any) {
    return this.http.delete(Config.api.parametre.prestataire + '/' + uuid);
  }

  addColor(data : any) {
    return this.http.post(Config.api.parametre.color , data);
  }

  addCountry(data : any) {
    return this.http.post(Config.api.parametre.country , data);
  }

  getColor() {
    return this.http.get(Config.api.parametre.color);
  }
  getCountries() {
    return this.http.get(Config.api.parametre.country);
  }

  editColor(data: any, uuid:any) {
    return this.http.post(Config.api.parametre.color + '/' + uuid, data);
  }
  editCountry(data: any, uuid:any) {
    return this.http.post(Config.api.parametre.country + '/' + uuid, data);
  }

  deletColor(uuid: any) {
    return this.http.delete(Config.api.parametre.color + '/' + uuid);
  }
  deleteCountry(uuid: any) {
    return this.http.delete(Config.api.parametre.country + '/' + uuid);
  }

  getPanne() {
    return this.http.get(Config.api.vehicule.panne);
  }

  addPanne(data: any) {
    return this.http.post(Config.api.vehicule.panne, data);
  }

  updatePanne(data: any, uuid: any) {
    return this.http.post(Config.api.vehicule.panne + '/' + uuid, data);
  }

  deletPanne(uuid: any) {
    return this.http.delete(Config.api.vehicule.panne + '/' + uuid);
  }

  getNamePiece() {
    return this.http.get(Config.api.vehicule.name_piece);
  }

  addNamePiece(data: any) {
    return this.http.post(Config.api.vehicule.name_piece, data);
  }

  updateNamePiece(data: any, uuid: any) {
    return this.http.post(Config.api.vehicule.name_piece + '/' + uuid, data);
  }

  deletNamePiece(uuid: any) {
    return this.http.delete(Config.api.vehicule.name_piece + '/' + uuid);
  }

  getFamilyPiece() {
    return this.http.get(Config.api.vehicule.family_piece);
  }

  addFamilyPiece(data: any) {
    return this.http.post(Config.api.vehicule.family_piece, data);
  }

  updateFamilyPiece(data: any, uuid: any) {
    return this.http.post(Config.api.vehicule.family_piece + '/' + uuid, data);
  }

  deletFamilyPiece(uuid: any) {
    return this.http.delete(Config.api.vehicule.family_piece + '/' + uuid);
  }

  getPieceRechange(data) {
    return this.http.post(Config.api.vehicule.piece_rechange_list, data);
  }

  addPieceRechange(data: any) {
    return this.http.post(Config.api.vehicule.piece_rechange, data);
  }

  updatePieceRechange(data: any, uuid: any) {
    return this.http.post(Config.api.vehicule.piece_rechange + '/' + uuid, data);
  }

  deletPieceRechange(uuid: any) {
    return this.http.delete(Config.api.vehicule.piece_rechange + '/' + uuid);
  }

  getPieceByUuid(uuid: any) {
    return this.http.get(Config.api.vehicule.piece_rechange + '/' + uuid);
  }

  alimenterPieceRechange(data: any) {
    return this.http.post(Config.api.vehicule.alimenter_piece_rechange, data);
  }

  mouvementsStocks() {
    return this.http.get(Config.api.vehicule.mouvements_stocks);
  }


}
