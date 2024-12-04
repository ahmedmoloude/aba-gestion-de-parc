import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from 'app/config';
import { Observable } from 'rxjs';
import { AnyMxRecord } from 'dns';

@Injectable()
export class BoGridService {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  fetchListGrids(type = null) {
    const url = type ? Config.api.grids.list + `?type=${type}` : Config.api.grids.list;
    return this.http.get(url);
  }

  getGridDetails(uuid: string, isTransport: number) {
    return this.http.get(Config.api.grids.get + `/${uuid}?isTransport=${isTransport}`);
  }

  fetchActivateGrids() {
    return this.http.get(Config.api.grids.grids_activated);
  }

  importGrid(form_data: FormData) {
    return this.http.post(Config.api.grids.import, form_data);
  }

  importTemplate(form_data: FormData) {
    return this.http.post(Config.api.templates.import, form_data);
  }

  fetchListTemplate(filters: any, page:number=1) {
    let queryParams = `&type=TEMPLATE`
    if (filters.title) queryParams += `&title=${filters.title}`;
    if (filters.activity_id) queryParams += `&activity_id=${filters.activity_id}`;

    return this.http.get(Config.api.templates.list + `?page=${page}`+ queryParams);
  }

  fetchListActivity(): Observable<any> {
    return this.http.get(Config.api.templates.activities);
  }

  fetchListDetailsTemplate(id: any) {
    return this.http.get(Config.api.templates.details + id);
  }

  updateGrid(uuid: string, data: any) {
    return this.http.put(Config.api.grids.update + '/' + uuid, data);
  }

  /* hors normes */
  addGridDetail(data: any) {
    return this.http.post(Config.api.grids.create_hors_normes, data);
  }

  updateGridDetail(data: any, uuid: any) {
    return this.http.put(Config.api.grids.update_hors_normes + '/' + uuid, data);
  }

  deleteGridDetail(uuid: any) {
    return this.http.delete(Config.api.grids.delete_hors_normes + '/' + uuid);
  }


  

  getCustomer() {
    return this.http.get(Config.api.customer.getcustomer);
  }

  getCustomersProspects() {
    return this.http.get(Config.api.customer.getCustomersProspects);
  }

  getCustomerCount(id: any) {
    return this.http.get(Config.api.customer.detail_customer + id);
  }

  getCustomerDetails(id: any, relation: any) {
    return this.http.get(Config.api.customer.customerDetails + id + '/' + relation);
  }


  getAllTour(filters: any ,page:number=1) {
    let queryParams = `&type=${filters.type}`
    if (filters.status) queryParams += `&status=${filters.status}`;
    if (filters.from_date) queryParams += `&from_date=${filters.from_date}`;
    if (filters.to_date) queryParams += `&to_date=${filters.to_date}`;

    return this.http.get(Config.api.tour.list+`?page=${page}`+queryParams );
  }

  tours(type:any, page:number = 1) {
    return this.http.get(Config.api.tour.tourAffectation + '/' + type + `?page=${page}`);
  }

  getAllPassagePlanified(page:number = 1) {
    return this.http.get(Config.api.passagePlanified.passagePlanified + `?page=${page}`);
  }

  addPassagePlanified(data: any) {
    return this.http.post(Config.api.passagePlanified.passagePlanified, data);
  }

  addRamassageLight(data: any) {
    return this.http.post(Config.api.ramassageLight.ramassageLight, data);
  }

  getAllCities() {
    return this.http.get(Config.api.ramassageLight.allCities);
  }

  getTourByUuid(uuid: any) {
    return this.http.get(Config.api.tour.tour + '/' + uuid);
  }

  updatTour(data:any, id: any) {
    return this.http.patch(Config.api.tour.list + '/' + id , data);
  }

  affecterTour(data:any, id: any) {
    return this.http.patch(Config.api.tour.affecter + '/' + id , data);
  }

  getCityAgence() {
    return this.http.get(Config.api.agences.cities);
  }

  zones(id :any) {
    return this.http.get(Config.api.agences.zone+ '/' + id);
  }



  CitiesAgence() {
    return this.http.get(Config.api.axes.CitiesAgence);
  }

  addPlanifiedCovoyage(data :any) {
    return this.http.post(Config.api.planifiedCovoyage.planifiedCovoyage, data);
  }

  allPlanifiedCovoyage() {
    return this.http.get(Config.api.planifiedCovoyage.planifiedCovoyage);
  }

  deletePlanifiedCovoyage(uuid: any) {
    return this.http.delete(Config.api.planifiedCovoyage.planifiedCovoyage + '/' + uuid);
  }

  updatePlanifiedCovoyage(data :any, uuid: any) {
    return this.http.post(Config.api.planifiedCovoyage.planifiedCovoyage + '/' + uuid, data);
  }

  citiesFilter(city: any) {
    return this.http.get(Config.api.search.citiesFilter + '/' + city);
  }

  matriculeFilter(matricule: any) {
    return this.http.get(Config.api.search.TruckFilter + '/' + matricule);
  }

  getTransfert(page:number = 1){
    return this.http.get(Config.api.transfert.list + `?page=${page}`);
  }

  affecterTransfert(data:any, id: any){
    return this.http.patch(Config.api.transfert.affecter + '/' + id , data);
  }

  getAffretmentGrids(){
    return this.http.get(Config.api.grids_affretment.list)
  }

  getGridDetailsAffretment(uuid: string, isTransport: number) {
    return this.http.get(Config.api.grids_affretment.details + `/${uuid}?isTransport=${isTransport}`);
  }





  getAffretmentServicesByGrid(uuid){
    return this.http.get(Config.api.grids_affretment.get_services_by_grid + `/${uuid}`);
  }


  getAffretmentDetailsServiesGlobal(filters = null) : Observable<any>{

    let params = new HttpParams();
    for (const property in filters) {
      params =  params.set(property , filters[property])
    }
    return this.http.get(Config.api.grids_affretment.get_services_global , {params});
  }

  getSpecefiqueServices(filters = null) : Observable<any> {
    let params = new HttpParams();
    for (const property in filters) {
      params =  params.set(property , filters[property])
    }

    return this.http.get(Config.api.grids_affretment.get_services_specefique , {params});
  }



  getTransportrConditions(filters = null) : Observable<any> {

    let params = new HttpParams();
    for (const property in filters) {
      params =  params.set(property , filters[property])
    }

    return this.http.get(Config.api.grids_affretment.get_transport_coditions , {params});
  }


  importGridAffertment(formData : FormData):Observable<any>{
    return this.http.post(Config.api.grids_affretment.import_grid , formData);
  }
  getAffretementGridsTransport():Observable<any>{
    return this.http.get(Config.api.grids_affretment.get_grids_transport);
  }
  getAffretementGridsSpecific():Observable<any>{
    return this.http.get(Config.api.grids_affretment.get_grids_specific);
  }
  getAffretementGridsGlobal():Observable<any>{
    return this.http.get(Config.api.grids_affretment.get_grids_global);
  }
  activeAffretementGrid(formData):Observable<any>{
    return this.http.post(Config.api.grids_affretment.active_grid , formData);
  }

  importAffretementOffre(formData : FormData):Observable<any>{
    return this.http.post(Config.api.grids_affretment.import_offre_affretemenet , formData);
  }




  downloadCanvas(type): Observable<any> {
    return this.http.get(Config.api.download_canvas + '/' + type, {
      responseType: 'arraybuffer',
    });
  }
}
