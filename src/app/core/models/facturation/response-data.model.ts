import { Carte } from "../caisse/carte.model";
import { ReceptionDocument } from "../caisse/reception-document.model";
import { Versement } from "../caisse/versement.model";
import { Customer } from "../customer.model";
import { CreateIntervention } from "../maintenance/create-intervention.model";
import { Diagnostique } from "../maintenance/diagnostique.model";
import { InterventionMaintenance } from "../maintenance/intervention-maintenance.model";
import { Affectation, Pneu } from "../maintenance/pneu.model";
import { Avoir } from "./avoir.model";
import { DiscountType } from "./discount-type.model";
import { Facture } from "./facture.model";
import { History } from "./history.model";
import { Prefacturation } from "./prefacturation.model";
import { Recouvreur } from "./recouvreur.model";

 class ResponseData {
  code: string;
  message: string;
  status: number;
  success: boolean;
}

export class AnyResponse extends ResponseData {
  response: any;
}
export class FacturesResponse extends ResponseData {
  response: {
    data : Facture[];
    current_page: number;
    per_page : number;
    total : number;
  }
}

export class FactureResponse extends ResponseData {
  response: Facture;
}

export class AccountCustomersResponse extends ResponseData {
  response: Customer[];
}
export class PrefacturationResponse extends ResponseData {
  response: Prefacturation;
}
export class DiscountTypesResponse extends ResponseData{
  response: DiscountType[];
}

export class AvoirsResponse extends ResponseData {
  response: {
    data : Avoir[];
    current_page: number;
    per_page : number;
    total : number;
  }
}

export class AvoirResponse extends ResponseData {
  response: Avoir;
}

export class ReceiptsResponse extends ResponseData {
  response: {
    data : any[];
    current_page: number;
    per_page : number;
    total : number;
  }
}

export class ReceiptResponse extends ResponseData {
  response: any;
}

export class UnpaidsResponse extends ResponseData {
  response: any;
}

export class UnpaidResponse extends ResponseData {
  response: any;
}
export class GenerateFacturesResponse extends ResponseData {
  response: any;
}

export class FacturesHistoryResponse extends ResponseData {
  response: {
    data : History[];
    current_page: number;
    per_page : number;
    total : number;
  }
}

export class RecouvrementsResponse extends ResponseData {
  response: {
    data : any[];
    current_page: number;
    per_page : number;
    total : number;
  }}

export class RapportAvoirResponse extends ResponseData {
  response: [{nature: string, total_montant_avoir: string|number, avoir_count: number}];
}
export class RecouvreursResponse extends ResponseData {
  response: Recouvreur[];
}
export class DemandesResponse extends ResponseData {
  response: any[];
}

export class DemandeResponse extends ResponseData {
  response: any[];
}
export class CartesResponse extends ResponseData {
  response: {
    data : Carte[];
    current_page: number;
    per_page : number;
    total : number;
  }
}
export class CarteResponse extends ResponseData {
  response: Carte;
}

export class DocumentsResponse extends ResponseData {
  response: ReceptionDocument[];
}

export class confirmDocumentsReceptionResponse extends ResponseData {
  response: number[];
}
export class VersementResponse extends ResponseData {
  response: Versement[];
}

export class InterventionsResponse extends ResponseData {
  response: {
    data : InterventionMaintenance[];
    current_page: number;
    per_page : number;
    total : number;
  }
}

export class InterventionResponse extends ResponseData {
  response: InterventionMaintenance;
}
export class DiagnostiqueResponse extends ResponseData {
  response: Diagnostique;
}

export class CreateInterventionResponse extends ResponseData {
  response: CreateIntervention;
}

export class PneuResponse extends ResponseData {
  response: Pneu;
}

export class PneusResponse extends ResponseData {
  response: {
    data : Pneu[];
    current_page: number;
    per_page : number;
    total : number;
  }
}

export class PneuAffectationResponse extends ResponseData {
  response: Affectation;
}
