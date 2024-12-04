import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from 'app/config';
import { InterventionMaintenanceFilter } from 'app/core/models/maintenance/filter/intervention-maintenance-filter.model';
import { AnyResponse, CreateInterventionResponse, DiagnostiqueResponse, InterventionResponse, InterventionsResponse} from 'app/core/models/facturation/response-data.model';
import { Observable } from 'rxjs';
import { DiagnostiqueRequest } from 'app/core/models/maintenance/diagnostique-request.model';

@Injectable({
  providedIn: 'root'
})
export class InterventionMaintenanceService {

  interventionUrl = Config.api.maintenance.intervention;

  constructor(private http: HttpClient) { }

  getMaintenanceInterventions(filter: InterventionMaintenanceFilter, per_page : number, page : number) : Observable<InterventionsResponse> {
    let params = new HttpParams();
    params =  params.set('page', page.toString());
    params = params.set('per_page', per_page.toString());
    return this.http.post<InterventionsResponse>(this.interventionUrl.getMaintenanceInterventions, filter, {params});
  }

  getDiagnosticDetail(uuid: string) : Observable<InterventionResponse> {
    return this.http.get<InterventionResponse>(`${this.interventionUrl.getDiagnosticDetail}/${uuid}`);
  }

  createDiagnostic(diagnostique: DiagnostiqueRequest) : Observable<DiagnostiqueResponse> {
    return this.http.post<DiagnostiqueResponse>(this.interventionUrl.createDiagnostic, diagnostique);
  }

  createIntervention(intervention: any) : Observable<CreateInterventionResponse> {
    return this.http.post<CreateInterventionResponse>(this.interventionUrl.createIntervention, intervention);
  }

  closeIntervention(uuid: string) : Observable<InterventionResponse> {
    return this.http.get<InterventionResponse>(`${this.interventionUrl.closeIntervention}/${uuid}`);
  }
  addPieceToIntervention(data: FormData) : Observable<InterventionResponse> {
    return this.http.post<InterventionResponse>(this.interventionUrl.addPieceToIntervention, data);
  }
}
