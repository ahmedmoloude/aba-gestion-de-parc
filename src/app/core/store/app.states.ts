import { parcState } from './parc/parc.reducer';
import { prestataireState } from './prestataire/prestataire.reducer';
import { AccountState } from "./accounts/accounts.reducer";
import { ProfilState } from "./profil/profil.reducer";
import { TaskState } from "./tasks/tasks.reducer";
import { ComplaintState } from './complaint/complaint.reducer';
import { GridState } from "./grids/grids.reducer";
import { TreeOfferState } from "./tree-offer/tree-offer.reducer";
import { RessourceState } from "./resources/resources.reducer";
import { ProductCategoryState } from "./productcategory/productcategory.reducer";
import { HorsNormState } from "./hornormeproduct/horsnormproduct.reducer";
import { ProspectState } from "./prospects/prospects.reducer";
import { MotPortureState } from "./mot_porture/motporture.reducer";
import { ContactState } from "./contacts/contacts.reducer";
import { CustomerState } from "./customer/customer.reducer";
import { TaxeState } from "./taxe/taxe.reducer";
import { TvaState } from "./tva/tva.reducer";
import { AgenceState } from "./agence/agence.reducer";
import { ServiceState } from "./service/service.reducer";
import { axeState } from "./axe/axe.reducer";
import { VoyageAutomatiqueState } from "./voyageAutomatique/voyageAutomatique.reducer";
import { LimitationState } from "./limitation/limitation.reducer";
import { ActivityState } from "./comercialActivity/comercialActivity.reducer";
import { VehiculeState } from "./vehicule/vehicule.reducer";
import { VehiculeContratState } from "./vehiculecontrat/vehiculecontrat.reducer";
import { VehiculeDocumentState } from "./vehiculedocument/vehiculedocument.reducer";
import { VehiculeSinistreState } from "./vehiculesinistre/vehiculesinistre.reducer";
import { ExtincteurState } from "./extincteur/extincteur.reducer";
import { RemplacementState } from "./remplacement/remplacement.reducer";
import { PersonnelState } from "./personnels/personnel.reducer";
import { interventionState } from "./intervention/intervention.reducer";
import { citerneState } from "./citerne/citerne.reducer";
import { carteState } from "./carte/carte.reducer";
import { brandState } from "./brand/brand.reducer";
import { modeleState } from "./modele/modele.reducer";
import { truckCategoryState } from "./truckCategory/truckCategory.reducer";
import { tonnageState } from "./tonnage/tonnage.reducer";
import { typeExtincteurState } from "./typeExtincteur/typeExtincteur.reducer";
import { volumeState } from "./volume/volume.reducer";
import { RdvState } from "./rdv/rdv.reducer";
import { GeofencingState } from "./geofencing/geofencing.reducers";
import { gammeState } from './gamme/gamme.reducer';
import { MessageState } from './messages/message.reducer';
import { ReservationState } from './reservation/reservation.state';
import { LocationState } from './location/location.reducer';
import { FactureState } from './facturation/facture/facture.reducer';
import { DiscountState } from './facturation/discount/discount.reducer';
import { AvoirState } from './facturation/avoir/avoir.reducer';
import { ReceiptState } from './facturation/customer-fee/receipt/receipt.reducer';
import { UnpaidState } from './facturation/customer-fee/unpaid/unpaid.reducer';
import { TreeOfferAffretmentState } from './tree-offer-affreetment/tree-offer-affreetment.reducer';
import { RecouvrementState } from './facturation/customer-fee/recouvrement/recouvrement.reducer';
import { RecouvreurState } from './facturation/recouvreur/recouvreur.reducer';
import { DemandeState } from './affretement/demande/demande.reducer';
import { receptionDocumentState } from './caisse/reception-document/reception-document.reducer';
import { receptionChequeTraiteState } from './caisse/reception-cheque-traite/reception-cheque-traite.reducer';
import { retourCrbtState } from './caisse/retour-crbt/retour-crbt.reducer';
import { validationVersementState } from './caisse/validation-versement/validation-versement.reducer';
import { VersementState } from './caisse/versement/versement.reducer';
import { CaisseCarteState } from './caisse/carte/carte.reducer';
import { MaintenanceInterventionState } from './maintenance/maintenance-intervention/maintenance-intervention.reducer';
import { DiagnostiqueState } from './maintenance/diagnostique/diagnostique.reducer';
import { PieceRechangeState } from './maintenance/piece-rechange/piece-rechange.reducer';
import { PlanningState } from './maintenance/planning/planning.reducer';
import { PneumatiqueState } from './maintenance/pneumatique/pneumatique.reducer';
import { demandesPiecesState } from './maintenance/demande-piece/demande-piece.reducer';
import { ReparatorState } from './maintenance/reparator/reparator.reducer';
import { PaginationState } from './pagination/pagination.reducer';
import { ModeReglementState } from './facturation/customer-fee/mode-reglement/mode-reglement.reducer';
import { RoleState } from './role/role.reducer';
import { RoleHabilitiesState } from './role-habilities/role-habilities.reducer';
import { CategoryState } from './maintenance/category/category.reducer';
import { ExpenseState } from './caisse/expense/expense.reducer';

export interface AppState {
    reservation:ReservationState,
    tasks: TaskState,
    profil: ProfilState,
    accounts: AccountState,
    complaints: ComplaintState,
    messages: MessageState,
    grids: GridState,
    tree_offer: TreeOfferState,
    ressources: RessourceState,
    ProductCategory: ProductCategoryState,
    HorsNormProduct:HorsNormState,
    prospects:ProspectState
    motporture:MotPortureState,
    contact : ContactState,
    customer : CustomerState,
    taxe : TaxeState,
    tva : TvaState,
    agence : AgenceState,
    service : ServiceState,
    axe : axeState,
    voyageAutomatique : VoyageAutomatiqueState,
    limitation : LimitationState,
    activity : ActivityState,
    task : TaskState,
    rdv : RdvState,
    vehicule : VehiculeState,
    contrat : VehiculeContratState,
    document : VehiculeDocumentState,
    sinistre : VehiculeSinistreState,
    extincteur : ExtincteurState
    remplacement : RemplacementState,
    personnels : PersonnelState,
    intervention : interventionState,
    citerne : citerneState,
    carte : carteState,
    brand : brandState,
    gamme : gammeState,
    modele : modeleState,
    parc : parcState,
    truckCategory : truckCategoryState,
    truckType : truckCategoryState,
    tonnage : tonnageState,
    typeExtincteur : typeExtincteurState,
    volume : volumeState,
    prestataire : prestataireState,
    geofancing: GeofencingState,
    location: LocationState,
    facture: FactureState,
    discount: DiscountState,
    avoir: AvoirState,
    receipt: ReceiptState,
    unpaid: UnpaidState,
    tree_offer_affretment: TreeOfferAffretmentState,
    recouvrement: RecouvrementState,
    recouvreur: RecouvreurState,
    demande: DemandeState,
    caisseCarte: CaisseCarteState,
    receptionDocument: receptionDocumentState,
    receptionChequeTraite: receptionChequeTraiteState,
    retourCrbt: retourCrbtState,
    validationVersement: validationVersementState,
    versement: VersementState,
    maintenanceIntervention: MaintenanceInterventionState,
    diagnostique: DiagnostiqueState,
    pieceRechange:PieceRechangeState,
    planning: PlanningState,
    pneumatique: PneumatiqueState,
    // pieceRequested: PieceRequestedState
    reparator: ReparatorState,
    pagination: PaginationState,
    demandePieces: demandesPiecesState,
    modeReglement:ModeReglementState,
    role: RoleState,
    roleHabilities: RoleHabilitiesState,
    category: CategoryState,
    expense: ExpenseState
}
