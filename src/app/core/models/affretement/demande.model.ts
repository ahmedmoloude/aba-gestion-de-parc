export class Demande {
  demande: DemandeDetail;
  return_documents: Returndocuments;
  return_fonds: Returnfonds;
  customer: Customer;
  document_counts: Documentcounts;
}


interface Documentcounts {
  EN_COURS: number;
  SCANNED: number;
  RECOVER: number;
  DELIVERED: number;
}

interface Customer {
  id: number;
  uuid: string;
  reference: string;
  name: string;
  first_name: string;
  last_name?: any;
}

interface Returnfonds {
  Trait: Trait[];
  Cheque: Trait[];
}

interface Trait {
  id: number;
  uuid: string;
  type: string;
  status: string;
  reference?: any;
  id_expedition?: any;
  created_at: string;
  updated_at: string;
  current_hub_id?: any;
  point_dechargement_id: number;
  montant: string;
  status_retour: string;
  historiques: Historique[];
}

interface Returndocuments {
  BL: BL[];
  Facture: BL[];
}

interface BL {
  id: number;
  uuid: string;
  type: string;
  status: string;
  reference: string;
  id_expedition?: any;
  created_at: string;
  updated_at: string;
  current_hub_id?: any;
  point_dechargement_id: number;
  montant?: any;
  status_retour: string;
  historiques: Historique[];
}

export interface Historique {
  id: number;
  action: string;
  document_id: number;
  created_at: string;
  updated_at: string;
}

interface DemandeDetail {
  attachements: any[];
  id: number;
  uuid: string;
  date_debut: string;
  date_fin: string;
  commentaire?: any;
  statut: string;
  customer_id: number;
  motif_id?: any;
  created_at: string;
  updated_at: string;
  reference: string;
  trajet?: any;
  facture_id: number;
  bl_images: string[] ;
  facture_images: string[];
}
