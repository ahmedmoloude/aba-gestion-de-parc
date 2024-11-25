// export class Diagnostique  {
//   categorie: string;
//   piece_rechange_id: string;
//   quantity: string;
//   type_piece_rechange: string;
//   demande_intervention_id: string;
//   updated_at: Date;
//   created_at: Date;
//   id: number;
// }

export class Diagnostique {
  id: number;
  piece_rechange_id: number | null;
  demande_intervention_id: number;
  quantity: number | null;
  type_piece_rechange: string | null;
  created_at: string;
  updated_at: string;
  lieu_reparation: any;
  total_ht: string | null;
  total_ttc: string | null;
  statut: string;
  bon_sortie_id: number | null;
  bon_achat_id: number | null;
  category_id: number;
  piece_rechange: PieceRechange | null;
  category: Category;
}

interface PieceRechange {
  id: number;
  uuid: string;
  date_entree: string;
  reference: string;
  quantite: number;
  stock_min: number;
  name_id: number;
  family_id: number;
  user_id: number | null;
  created_at: string;
  updated_at: string;
  prix_unitaire: string;
  tva: string;
  prestataire_id: number;
  name: {
    id: number;
    uuid: string;
    name: string;
    created_at: string;
    updated_at: string;
  };
}

interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
