export class ReceptionDocument {
  document_id: number;
  n_expedition: string;
  n_declaration: string;
  data_emission: string;
  expediteur: string;
  destinataire: string;
  destination: string;
  type: string;
  document_reference: string;
  livree: boolean;
  mode_reglement?: string;
  Banque?: any;
  montant?: any;
}
