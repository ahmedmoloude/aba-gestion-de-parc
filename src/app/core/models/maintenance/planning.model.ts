import { Truck } from "./intervention-maintenance.model";

export class Planning {
  id: number;
  uuid:string;
  reference: string;
  statut: string;
  truck: Truck;
  truck_id: number;
  operation: string;
  date_debut: Date;
  rappel_jour: number;
  rappel_km: number;
  date_fin: Date;
  comment: string;
}
