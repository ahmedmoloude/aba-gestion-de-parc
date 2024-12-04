export class FactureFilter {
  reference: string;
  customer_id: number;
  zone_id: number;
  recouvreur_id:number;
  start_date: Date;
  end_date: Date;
  activity: 'Messagerie'|'Afferetement'|''|null;
  agency_id: number;
}
