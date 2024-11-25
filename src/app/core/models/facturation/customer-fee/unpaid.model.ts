import { Receipt } from "./receipt.model";

export class Unpaid {
  id: number;
  uuid: string;
  payed: boolean;
  date_demande: string;
  paiement_id: number;
  created_at: Date;
  updated_at: Date;
  paiement: Receipt;
}
