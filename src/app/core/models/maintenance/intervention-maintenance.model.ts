import { Diagnostique } from "./diagnostique.model";

export class InterventionMaintenance {
  id: number;
  uuid: string;
  n_demande: string;
  commentaire: string;
  status: string;
  date_demande: string;
  date_prise_charge?: any;
  date_fin_prevu?: any;
  date_fin_reelle?: any;
  driver_id: number;
  user_id: number;
  truck_id: number;
  created_at: string;
  updated_at: string;
  driver: Driver;
  demandeur: Demandeur;
  truck: Truck;
  details: Detail[];
  diagnostiques: Diagnostique[];
  bons: Bon[];
}

interface Detail {
  id: number;
  uuid: string;
  type: string;
  panne_id: number;
  demande_intervention_id: number;
  created_at: string;
  updated_at: string;
  panne: Tonnage;
}

export interface Truck {
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
  tonnage: Tonnage;
  brand: Brand;
  modele: Modele;
  gamme?: any;
  truck_type: Tonnage;
  driver?: any;
}

interface Tonnage {
  id: number;
  uuid: string;
  name: string;
  created_at: string;
  updated_at: string;
}

interface Disponible {
  status: boolean;
  motif: string;
  count?: number;
}

interface Demandeur {
  id: number;
  uuid: string;
  name: string;
  userable_type: string;
  userable_id: number;
  env_id?: any;
  email: string;
  account_id: number;
  email_verified_at?: any;
  password: string;
  remember_token?: any;
  created_at: string;
  updated_at: string;
  matricule?: any;
  max_declared_value?: any;
  max_payment_on_delivery?: any;
  to_collector_credit: boolean;
  encombrement: boolean;
  PS: boolean;
  color?: any;
  fcm_token?: any;
}

interface Driver {
  id: number;
  uuid: string;
  parc_id: number;
  matricule: string;
  cin: string;
  end_date_cin: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  birth_place: string;
  town: string;
  family_situation: string;
  children_number: string;
  adress: string;
  profile_picture_url: string;
  entry_date: string;
  contract_type: string;
  interim_company?: any;
  direction: string;
  departement: string;
  code: string;
  function: string;
  statut: boolean;
  cnss_number: string;
  date_end_contrart: string;
  contact: string;
  driver_lisence: string;
  experience: string;
  agency_id?: any;
  created_at: string;
  updated_at: string;
  cart_pro_num: string;
  color?: any;
  disponible: Disponible;
  messagerie: Messagerie;
  affretement: Affretement;
}

interface Affretement {
  status: boolean;
  uuid?: any;
}

interface Messagerie {
  status: boolean;
  type: string;
  data: string;
}

interface Brand {
  id: number;
  uuid: string;
  name: string;
  created_at: string;
  updated_at: string;
  file?: any;
  modeles: Modele[];
}

interface Modele {
  id: number;
  uuid: string;
  name: string;
  brand_id: number;
  created_at: string;
  updated_at: string;
  gammes?: Gamme[];
}

interface Gamme {
  id: number;
  uuid: string;
  name: string;
  brand_id: number;
  modele_id: number;
  created_at: string;
  updated_at: string;
}

export interface Bon {
  id: number;
  uuid: string;
  reference: string;
  type: string;
  intervention_id: number;
  created_at: string;
  updated_at: string;
  path?: any;
}
