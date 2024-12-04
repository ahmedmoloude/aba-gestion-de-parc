import { Facture } from "./facture.model";

export class Prefacturation {
    messagerie: Messagerie;
    affretement: Messagerie;
}

interface Messagerie {
  count_factures: number;
  count_clients: number;
  ht: number;
  ttc: number;
  remise: number;
  etat_control: Facture;
}

