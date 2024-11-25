export class Discount {
  id: number;
  uuid: string;
  created_at: Date;
  taux: number;
  remise_sur: string;
  remise_type_id: number;
  nature: string;
  updated_at: Date;
  factures?:Array<string>;
}
