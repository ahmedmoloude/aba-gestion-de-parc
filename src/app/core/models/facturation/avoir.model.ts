import { Facture } from "./facture.model";

export class Avoir {
  id: number;
  uuid: string;
  reference: string;
  base_calcule: string;
  montant_facture: string;
  attachement: string;
  commentaire: string;
  created_at: string;
  customer_id: number;
  facture: Facture;
  facture_id: number;
  montant_avoir: string;
  montant_calcule: string;
  motif: string;
  type: string;
  updated_at: string;
}
