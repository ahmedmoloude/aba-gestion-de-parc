export class InterventionRequest{
  demande_intervention_id: number;
  lieu_reparation: string;
  date_fin_reelle: Date;
  categories?: any
  reparateurs?: number[];
  diagnostiques?: any[];
}
