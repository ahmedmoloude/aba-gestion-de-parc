export class DiagnostiqueRequest {
  demande_intervention_id: number;
  data: Array<{piece_rechange_id: number, type_piece_rechange: string, quantity: number, categorie: string}>
  date_fin_prevu: Date
}
