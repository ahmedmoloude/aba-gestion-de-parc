import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from 'app/config';
import { Observable } from 'rxjs';
import {
  DemandeResponse,
  DemandesResponse,
} from '../models/facturation/response-data.model';

@Injectable({
  providedIn: 'root',
})
export class AffretementService {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getCalendar(filters: any = null, data) {
    let params = new HttpParams();
    for (const property in filters) {
      params = params.set(property, filters[property]);
    }

    return this.http.post(Config.api.affretement.get_calendar, data, {
      params,
    });
  }

  getDemandeAffretement({
    filters = null,
    page = 1,
    per_page = 10,
    next_page = 0,
  }): any {
    let params = new HttpParams();
    for (const property in filters) {
      params = params.set(property, filters[property]);
    }
    params = params.set('per_page', per_page.toString());
    params = params.set('page', page.toString());
    params = params.set('next_page', next_page.toString());

    return this.http.get(Config.api.affretement.demande_affretement, {
      params,
    });
  }

  getConfirmedDemandeAffretement({
    filters = null,
    page = 1,
    per_page = 10,
    next_page = 0,
  }): any {
    let params = new HttpParams();
    for (const property in filters) {
      params = params.set(property, filters[property]);
    }
    params = params.set('per_page', per_page.toString());
    params = params.set('page', page.toString());
    params = params.set('next_page', next_page.toString());

    return this.http.get(Config.api.affretement.get_confirmed_demandes, {
      params,
    });
  }

  addDemandeAffretement(data: any) {
    return this.http.post(Config.api.affretement.demande_affretement, data);
  }

  editDemandeAffretement(data: any, uuid: any) {
    return this.http.put(
      Config.api.affretement.demande_affretement + '/' + uuid,
      data
    );
  }

  deletDemandeAffretement(uuid: any) {
    return this.http.delete(
      Config.api.affretement.demande_affretement + '/' + uuid
    );
  }

  getVehiculeAffectation(data: any) {
    return this.http.post(
      Config.api.affretement.get_vehicule_affectation,
      data
    );
  }

  getConducteurAffectation(data: any) {
    return this.http.post(
      Config.api.affretement.get_conducteur_affectation,
      data
    );
  }

  create(data: any): Observable<any> {
    return this.http.post(Config.api.affretement.create, data);
  }

  list(): Observable<any> {
    return this.http.get(Config.api.affretement.list);
  }

  detailsByUuid(uuid: any): Observable<any> {
    return this.http.get(Config.api.affretement.detail + '/' + uuid);
  }

  getListVehicules(): Observable<any> {
    return this.http.get(Config.api.affretement.list_vehicule);
  }

  getListVehiculesAffretement(data: any): Observable<any> {
    return this.http.post(Config.api.affretement.get_vehicule_demande, data);
  }
  getListVehiculesType(): Observable<any> {
    return this.http.get(Config.api.affretement.get_vehicule_type);
  }

  getServicesAffretement(): Observable<any> {
    return this.http.get(Config.api.affretement.services_affretement);
  }

  affectationDemande(data: any) {
    return this.http.post(Config.api.affretement.affectation_demande, data);
  }

  changerStatutDemande(data: any) {
    return this.http.post(Config.api.affretement.status_demande, data);
  }

  approbationChargement() {
    return this.http.get(Config.api.affretement.approbation_chargement);
  }

  approbationDechargement() {
    return this.http.get(Config.api.affretement.approbation_dechargement);
  }

  changerStatusPoint(data: any) {
    return this.http.post(Config.api.affretement.status_point_chargement, data);
  }

  desaffectationDemande(uuid: any) {
    return this.http.get(
      Config.api.affretement.desaffectation_demande + '/' + uuid
    );
  }

  MotifDemande(type = 'AFFRETEMENT') {
    return this.http.get(
      Config.api.affretement.motifs_affretement + '/' + type
    );
  }

  typeTrajetDemande(data: any) {
    return this.http.post(Config.api.affretement.type_trajet_demande, data);
  }

  taxataion(body) {
    return this.http.post(Config.api.affretement.taxation_test, body);
  }

  getSelectableServicesAffretment(): Observable<any> {
    return this.http.get(Config.api.affretement.selectable_services);
  }

  getDemandesDocuments(
    status: 0 | 1,
    demande: string
  ): Observable<DemandesResponse> {
    return this.http.get<DemandesResponse>(
      `${Config.api.affretement.getDemandesDocuments}?cloture=${status}${
        demande ? '&demande=' + demande : ''
      }`
    );
  }

  updateDemandeDocumentStatus(data: any): Observable<DemandeResponse> {
    return this.http.post<DemandeResponse>(
      Config.api.affretement.updateDemandeDocumentStatus,
      data
    );
  }

  deliverDemandeDocuments(data: FormData): Observable<DemandeResponse> {
    return this.http.post<DemandeResponse>(
      Config.api.affretement.deliverDemandeDocuments,
      data
    );
  }

  getDemandeTrajectories(uuid): Observable<any> {
    return this.http.get(
      Config.api.affretement.get_demande_trajectories + '/' + uuid
    );
  }

  getDistanceBetweenCities(): Observable<any> {
    return this.http.get(Config.api.affretement.get_distance_between_cities);
  }

  updateDemandeTrajectories(body): Observable<any> {
    return this.http.post(Config.api.affretement.save_trajectory, body);
  }

  getAffretementTypes(): Observable<any> {
    return this.http.get(Config.api.affretement.types);
  }

  updateDemande(body, uuid): Observable<any> {
    return this.http.post(
      Config.api.affretement.update_demande + '/' + uuid,
      body
    );
  }

  getPaletteTypes(): Observable<any> {
    return this.http.get(Config.api.affretement.get_palettes_types);
  }

  createDiscount(body): Observable<any> {
    return this.http.post(Config.api.affretement.create_discount, body);
  }

  confirmDiscount(body, uuid): Observable<any> {
    return this.http.post(
      Config.api.affretement.confirm_discount + '/' + uuid,
      body
    );
  }

  refuseDiscount(body, uuid): Observable<any> {
    return this.http.post(
      Config.api.affretement.refuse_discount + '/' + uuid,
      body
    );
  }

  getAllTonnages() {
    return this.http.get(Config.api.vehicule.get_all_tonnages);
  }

  downloadDecleration(id): Observable<any> {
    return this.http.get(
      Config.api.affretement.download_decleartion + '/' + id,
      {
        observe: 'body',
        responseType: 'blob',
      }
    );
  }

  store_distance_between_cities(origin_id, dest_id, distance): Observable<any> {
    return this.http.post(Config.api.store_distance_between_cities, {
      ville_depart_id: origin_id,
      ville_arrivee_id: dest_id,
      distance: distance,
    });
  }

  updateStatus(body) {
    return this.http.post(Config.api.affretement.update_status_demande, body);
  }

  createDemandeLight(body) {
    return this.http.post(Config.api.affretement.create_demande_light, body);
  }

  getDemandesLight(filters: any = null) {
    let params = new HttpParams();

    for (const property in filters) {
      params = params.set(property, filters[property]);
    }

    return this.http.get(Config.api.affretement.get_demandes_light, { params });
  }

  updateAmountDemandeLight(body) {
    return this.http.post(
      Config.api.affretement.update_demande_light_amount,
      body
    );
  }

  getDemandeLightTaxationDetails(uuid) {
    let params = new HttpParams();

    params = params.set('uuid', uuid);

    return this.http.get(
      Config.api.affretement.get_demande_light_taxation_details,
      { params }
    );
  }

  deleteDemandeLight(body) {
    return this.http.put(Config.api.affretement.delete_demande_light, body);
  }

  exportLightDemande(customer_id = null) {
    

    let params = new HttpParams();

    params = params.set('customer_id', customer_id);

    return this.http.get(Config.api.affretement.export_light_demandes, {
      observe: 'body',
      responseType: 'blob',
      params
    } , );
  }
}
