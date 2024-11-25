import { Customer } from "../customer.model";
import { Discount } from "./discount.model";
import { Expedition } from "./expedition.model";
import { Recouvreur } from "./recouvreur.model";
import { Zone } from "./zone.model";

export class Facture {
  base_recalculation: string;
  id: number;
  uuid: string;
  count_colis: number;
  count_expedition: number;
  created_at: string;
  customer_id: number;
  customer: Customer;
  echeance_date: string;
  end_date: string;
  expeditions: Expedition[];
  facture_date: Date;
  file: {
    detaillee: string | null,
    globale: string | null,
    detaillee_remise: string | null,
    globale_remise: string | null
  };
  is_annuler: boolean;
  montant_avoir: string;
  montant_ht: string;
  montant_recalcule: string;
  montant_ttc: string;
  montant_service_ht: string;
  montant_service_ttc: string;
  montant_service_tva: string;
  montant_transport_ht: string;
  montant_transport_ttc: string;
  montant_transport_tva: string;
  paiement_status: string;
  path_detaille: string;
  path_global: string;
  recouvreur_id: number;
  recouvreur: Recouvreur;
  reference: string;
  remise: Discount;
  remise_id: number;
  start_date: string;
  status: string;
  taux_remise: string;
  total_montant: string;
  total_paye: string;
  tva_service: any;
  tva_transport: any;
  type_regelement: string;
  updated_at: any;
  zone_id: number;
  zone: Zone;
  totalTarifDetails: { ht: number; tva: number; ttc: number };
  totalTransportTarifs: { ht: number; tva: number; ttc: number };
  remise_montant: string;
  demandes?: any[];
}
