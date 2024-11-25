export class Pneu {
  code_pneu: string;
  fournisseur: string;
  marque: string;
  modele: string;
  type_pneu: string;
  indice_vitesse: string;
  indice_charge: string;
  km_parcouru: string;
  taille?: any;
  etat: string;
  duree_vie: string;
  date_acquisition: string;
  km_acquisition: string;
  dmc: string;
  position: string;
  montant_ht: string;
  tva: string;
  montant_ttc: string;
  comment: string;
  updated_at?: string;
  created_at?: string;
  id?: number;
  pneu_id?: number;
  truck_id?: any;
  affected?: boolean;
  affectations?: Affectation[];
  usure: number;
  profondeur: number;
  pression: number;
  last_affectation?: Affectation;
}

export class Affectation {
  id: number;
  date_debut: string;
  date_debut_affectation: string;
  date_fin_affectation?: string;
  position: string;
  km_depart: string;
  truck_id: number;
  pneu_id: number;
  created_at: string;
  updated_at: string;
  truck: Truck;
  pneu?: Pneu;
}

interface Truck {
  id: number;
  uuid: string;
  city_id: number;
  parc_id: number;
  brand_id: number;
  modele_id: number;
  truck_category_id: number;
  truck_type_id: number;
  color_id: number;
  matricule: string;
  code_interne: string;
  n_chassis: string;
  date_sortie: string;
  date_circulation: string;
  date_entree_vehicule?: any;
  carburant: string;
  tonnage_id: number;
  taille_reservoir: string;
  consomation_carburant: string;
  consomation_carburant_reel: string;
  puissance_fiscale: string;
  activity: string;
  km_initial: string;
  km_reel: string;
  qte_carburant_reel: string;
  adblue: boolean;
  capacite_consommation: string;
  taux_consommation_theorique: string;
  taux_consommation_reel: string;
  zone_id: number;
  image?: any;
  driver_id?: any;
  created_at: string;
  updated_at: string;
  nbr_scelle: number;
  n_w?: any;
  user_id?: any;
  gamme_id?: any;
  commentaire?: any;
  disponible: Disponible;
  status: Status[];
}

interface Status {
  id: number;
  uuid: string;
  status: string;
  date_entree?: any;
  kilometrage?: any;
  date_reforme?: any;
  type_reforme?: any;
  date_vente?: any;
  truck_id: number;
  user_id?: any;
  created_at: string;
  updated_at: string;
  user?: any;
}

interface Disponible {
  status: boolean;
  motif: string;
  count: number;
}

export class AffectationRequest {
  date_debut: string;
  date_fin: string;
  position: string;
  truck_id: number;
  pneu_id: number;
  km_depart: number;
}
