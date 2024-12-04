export class Carte {
  id: number;
  uuid: string;
  reference: string;
  libelle: string;
  banque: string;
  expiration_date: string;
  plafond: string;
  solde_consomme: string;
  solde?: any;
  status: boolean;
  is_affected: boolean;
  agency_id?: any;
  created_at: string;
  updated_at: string;
  n_carte: string;
  cvv: string;
  date_affectation?: any;
  agence?: any;
  last_affectation?: any;
}
