import { Customer } from "../../customer.model";

export class Recouvrement {
  id:number;
  uuid: string;
  customer: Customer;
  total_creance: number;
}
