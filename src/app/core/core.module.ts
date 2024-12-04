import { parcEffects } from './store/parc/parc.effects';
import { parcReducer } from './store/parc/parc.reducer';
import { prestataireReducer } from './store/prestataire/prestataire.reducer';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthGuard, LoginGuard } from './guards';
import { appInitializer } from './helpers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AuthStateService,
  AuthService,
  HandleResponse,
  HeaderService,
  ToastService,
  TokenService,
  DynamicContentHeaderService,
  SidenavService,
} from './services';
import { BoTaskService } from './services/admin-bo/bo-tasks.service';
import { BoAccountService } from './services/admin-bo/bo-accounts.service';
import { ComplaintEffects, complaintReducer } from './store/complaint';
import { BoGridService } from './services/admin-bo/bo-grids.service';
import { gridReducer } from './store/grids/grids.reducer';
import { TaskReducer } from './store/task/task.reducer';
import { GridsEffects } from './store/grids/grids.effects';
import { TreeOfferEffects } from './store/tree-offer/tree-offer.effects';
import { treeOfferReducer } from './store/tree-offer/tree-offer.reducer';
import { BoOfferService } from './services/admin-bo/bo-offers.service';
import { RessourcesEffects } from './store/resources/resources.effects';
import { ressourcesReducer } from './store/resources/resources.reducer';
import { RessouresService } from './services/ressoures.service';
import { ProductCategoryEffect } from './store/productcategory/productcategory.effects';
import { HorsNormProductReducer } from './store/hornormeproduct/horsnormproduct.reducer';
import { MotPortureEffects } from './store/mot_porture/motporture.effects';
import { MotPortureReducer } from './store/mot_porture/motporture.reducer';
import { BoQuoteService } from './services/admin-bo/bo-quotes.service';
import { ProductCategoryReducer } from './store/productcategory/productcategory.reducer';
import { contactReducer } from './store/contacts/contacts.reducer'
import { ContactsEffects } from './store/contacts/contacts.effects'
import { CustomerEffects } from './store/customer/customer.effects'
import { customerReducer } from './store/customer/customer.reducer';
import { taxeReducer } from './store/taxe/taxe.reducer';
import { TaxeEffects } from './store/taxe/taxe.effects';
import { tvaReducer } from './store/tva/tva.reducer';
import { TvaEffects } from './store/tva/tva.effects';
import { AgenceEffects } from './store/agence/agence.effects';
import { agenceReducer } from './store/agence/agence.reducer';
import { serviceReducer } from './store/service/service.reducer';
import { ServicesEffects } from './store/service/service.effects';
import { axeReducer } from './store/axe/axe.reducer';
import { AxeEffects } from './store/axe/axe.effects';
import { VoyageAutomatiqueEffects } from './store/voyageAutomatique/voyageAutomatique.effects';
import { voyageAutomatiqueReducer } from './store/voyageAutomatique/voyageAutomatique.reducer';
import { limitationReducer } from './store/limitation/limitation.reducer';
import { LimitationsEffects } from './store/limitation/limitation.effects';
import { ActivityReducer } from './store/comercialActivity/comercialActivity.reducer';
import { ActivityEffects } from './store/comercialActivity/comercialActivity.effects';
import { VehiculeReducer } from './store/vehicule/vehicule.reducer';
import { VehiculeEffects } from './store/vehicule/vehicule.effects';
import { VehiculeContratReducer } from './store/vehiculecontrat/vehiculecontrat.reducer';
import { VehiculeContartEffects } from './store/vehiculecontrat/vehiculecontrat.effects';
import { VehiculeDocumentReducer } from './store/vehiculedocument/vehiculedocument.reducer';
import { VehiculeDocumentEffects } from './store/vehiculedocument/vehiculedocument.effects';
import { VehiculeSinistreReducer } from './store/vehiculesinistre/vehiculesinistre.reducer';
import { VehiculeSinistreEffects } from './store/vehiculesinistre/vehiculesinistre.effects';
import { extincteurReducer } from './store/extincteur/extincteur.reducer';
import { ExtincteurEffects } from './store/extincteur/extincteur.effects';
import { remplacementReducer } from './store/remplacement/remplacement.reducer';
import { RemplacementEffects } from './store/remplacement/remplacement.effects';
import { interventionReducer } from './store/intervention/intervention.reducer';
import { interventionEffects } from './store/intervention/intervention.effects';
import { citerneReducer } from './store/citerne/citerne.reducer';
import { citerneEffects } from './store/citerne/citerne.effects';
import { carteReducer } from './store/carte/carte.reducer';
import { carteEffects } from './store/carte/carte.effects';
import { brandReducer } from './store/brand/brand.reducer';
import { brandEffects } from './store/brand/brand.effects';
import { modeleEffects } from './store/modele/modele.effects';
import { modeleReducer } from './store/modele/modele.reducer';
import { truckCategoryReducer } from './store/truckCategory/truckCategory.reducer';
import { truckCategoryEffects } from './store/truckCategory/truckCategory.effects';
import { truckTypeReducer } from './store/truckType/truckType.reducer';
import { truckTypeEffects } from './store/truckType/truckType.effects';
import { tonnageReducer } from './store/tonnage/tonnage.reducer';
import { tonnageEffects } from './store/tonnage/tonnage.effects';
import { typeExtincteurReducer } from './store/typeExtincteur/typeExtincteur.reducer';
import { typeExtincteurEffects } from './store/typeExtincteur/typeExtincteur.effects';
import { volumeReducer } from './store/volume/volume.reducer';
import { volumeEffects } from './store/volume/volume.effects';
import { TaskEffects } from './store/task/task.effects';
import { RdvReducer } from './store/rdv/rdv.reducer';
import { rdvEffects } from './store/rdv/rdv.effects';
import { geofencingReducer } from './store/geofencing/geofencing.reducers';
import { GeofencingEffect } from './store/geofencing/geofencing.effects';
import { prestataireEffects } from './store/prestataire/prestataire.effects';
import { gammesReducer } from './store/gamme/gamme.reducer';
import { gammeEffects } from './store/gamme/gamme.effects';
import { messageReducer } from './store/messages/message.reducer';
import { MessageEffects } from './store/messages/message.effects';
import { reservationReducer } from './store/reservation/reservation.reducer';
import { ReservationEffects } from './store/reservation/reservation.effects';
import { locationReducer } from './store/location/location.reducer';
import { LocationsEffects } from './store/location/location.effects';
import { factureReducer } from './store/facturation/facture/facture.reducer';
import { FactureEffects } from './store/facturation/facture/facture.effects';
import { DiscountEffects } from './store/facturation/discount/discount.effects';
import { discountReducer } from './store/facturation/discount/discount.reducer';
import { AvoirEffects } from './store/facturation/avoir/avoir.effects';
import { avoirReducer } from './store/facturation/avoir/avoir.reducer';
import { ReceiptEffects } from './store/facturation/customer-fee/receipt/receipt.effects';
import { receiptReducer } from './store/facturation/customer-fee/receipt/receipt.reducer';
import { UnpaidEffects } from './store/facturation/customer-fee/unpaid/unpaid.effects';
import { unpaidReducer } from './store/facturation/customer-fee/unpaid/unpaid.reducer';
import { RecouvrementEffects } from './store/facturation/customer-fee/recouvrement/recouvrement.effects';
import { treeOfferAffretmentReducer } from './store/tree-offer-affreetment/tree-offer-affreetment.reducer';
import { RecouvrementReducer } from './store/facturation/customer-fee/recouvrement/recouvrement.reducer';
import { RecouvreurEffects } from './store/facturation/recouvreur/recouvreur.effects';
import { recouvreurReducer } from './store/facturation/recouvreur/recouvreur.reducer';
import { DemandeEffects } from './store/affretement/demande/demande.effects';
import { demandeReducer } from './store/affretement/demande/demande.reducer';
import { CarteEffects } from './store/caisse/carte/carte.effects';
import { ValidationVersementEffects } from './store/caisse/validation-versement/validation-versement.effects';
import { VersementEffects } from './store/caisse/versement/versement.effects';
import { RetourCrbtEffects } from './store/caisse/retour-crbt/retour-crbt.effects';
import { ReceptionChequeTraiteEffects } from './store/caisse/reception-cheque-traite/reception-cheque-traite.effects';
import { ReceptionDocumentEffects } from './store/caisse/reception-document/reception-document.effects';
import { receptionDocumentReducer } from './store/caisse/reception-document/reception-document.reducer';
import { receptionChequeTraiteReducer } from './store/caisse/reception-cheque-traite/reception-cheque-traite.reducer';
import { retourCrbtReducer } from './store/caisse/retour-crbt/retour-crbt.reducer';
import { validationVersementReducer } from './store/caisse/validation-versement/validation-versement.reducer';
import { versementReducer } from './store/caisse/versement/versement.reducer';
import { caisseCarteReducer } from './store/caisse/carte/carte.reducer';
import { MaintenanceInterventionEffects } from './store/maintenance/maintenance-intervention/maintenance-intervention.effects';
import { MaintenanceInterventionReducer } from './store/maintenance/maintenance-intervention/maintenance-intervention.reducer';
import { DiagnostiqueEffects } from './store/maintenance/diagnostique/diagnostique.effects';
import { DiagnostiqueReducer } from './store/maintenance/diagnostique/diagnostique.reducer';
import { PieceRechangeEffects } from './store/maintenance/piece-rechange/piece-rechange.effects';
import { PieceRechangeReducer } from './store/maintenance/piece-rechange/piece-rechange.reducer';
import { ReparatorReducer } from './store/maintenance/reparator/reparator.reducer';
import { PneumatiqueReducer } from './store/maintenance/pneumatique/pneumatique.reducer';
import { ReparatorEffects } from './store/maintenance/reparator/reparator.effects';
import { PneumatiqueEffects } from './store/maintenance/pneumatique/pneumatique.effects';
import { paginationReducer } from './store/pagination/pagination.reducer';
import { PlanningReducer } from './store/maintenance/planning/planning.reducer';
import { PlanningEffects } from './store/maintenance/planning/planning.effects';
import { DemandePiecesEffects } from './store/maintenance/demande-piece/demande-piece.effects';
import { DemandePiecesReducer } from './store/maintenance/demande-piece/demande-piece.reducer';
import { modeReglementReducer } from './store/facturation/customer-fee/mode-reglement/mode-reglement.reducer';
import { ModeReglementEffects } from './store/facturation/customer-fee/mode-reglement/mode-reglement.effects';
import { roleReducer } from './store/role/role.reducer';
import { RoleEffects } from './store/role/role.effects';
import { RoleHabilitiesEffects } from './store/role-habilities/role-habilities.effects';
import { roleHabilitiesReducer } from './store/role-habilities/role-habilities.reducer';
import { CategoryReducer } from './store/maintenance/category/category.reducer';
import { CategoryEffects } from './store/maintenance/category/category.effects';
import { expenseReducer } from './store/caisse/expense/expense.reducer';
import { ExpenseService } from './services/caisse/expense.service';
import { ExpenseEffects } from './store/caisse/expense/expense.effects';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    EffectsModule.forFeature([
      ComplaintEffects,
      MessageEffects,
      GridsEffects,
      TreeOfferEffects,
      RessourcesEffects,
      GeofencingEffect,
      FactureEffects,
      AvoirEffects,
      ReceiptEffects,
      UnpaidEffects,
      RecouvrementEffects,
      RecouvreurEffects,
      DemandeEffects,
      CarteEffects,
      ValidationVersementEffects,
      VersementEffects,
      RetourCrbtEffects,
      ReceptionChequeTraiteEffects,
      ReceptionDocumentEffects,
      MaintenanceInterventionEffects,
      DiagnostiqueEffects,
      PieceRechangeEffects,
      ReparatorEffects,
      PneumatiqueEffects,
      DemandePiecesEffects,

    ]),
    EffectsModule.forFeature([
      ComplaintEffects,
      ProductCategoryEffect,
      MessageEffects,
      GridsEffects,
      MotPortureEffects,
      PlanningEffects
    ]),

    EffectsModule.forFeature([
      ComplaintEffects,
      ProductCategoryEffect,
      MessageEffects,
      GridsEffects,
      ContactsEffects,
      CustomerEffects,
      TaxeEffects,
      TvaEffects,
      AgenceEffects,
      ServicesEffects,
      AxeEffects,
      VoyageAutomatiqueEffects,
      LimitationsEffects,
      ActivityEffects,
      VehiculeEffects,
      VehiculeContartEffects,
      VehiculeDocumentEffects,
      VehiculeSinistreEffects,
      ExtincteurEffects,
      RemplacementEffects,
      interventionEffects,
      citerneEffects,
      carteEffects,
      brandEffects,
      parcEffects,
      modeleEffects,
      gammeEffects,
      truckCategoryEffects,
      truckTypeEffects,
      tonnageEffects,
      typeExtincteurEffects,
      volumeEffects,
      TaskEffects,
      rdvEffects,
      prestataireEffects,
      ReservationEffects,
      LocationsEffects
    ]),
    EffectsModule.forFeature([FactureEffects]),
    EffectsModule.forFeature([DiscountEffects]),
    EffectsModule.forFeature([RecouvrementEffects]),
    EffectsModule.forFeature([ModeReglementEffects]),
    EffectsModule.forFeature([RoleEffects]),
    EffectsModule.forFeature([RoleHabilitiesEffects]),
    EffectsModule.forFeature([CategoryEffects]),
    EffectsModule.forFeature([ExpenseEffects]),

    StoreModule.forFeature('motporture', MotPortureReducer),
    StoreModule.forFeature('complaints', complaintReducer),
    StoreModule.forFeature('messages', messageReducer),
    StoreModule.forFeature('grids', gridReducer),
    StoreModule.forFeature('tree_offer', treeOfferReducer),
    StoreModule.forFeature('ressources', ressourcesReducer),
    StoreModule.forFeature('geofencing', geofencingReducer),
    StoreModule.forFeature('tree_offer_affretment' , treeOfferAffretmentReducer),
    StoreModule.forFeature('HorsNormProduct', HorsNormProductReducer),
    StoreModule.forFeature('ProductCategory', ProductCategoryReducer),
    StoreModule.forFeature('HorsNormProduct', HorsNormProductReducer),
    StoreModule.forFeature('contact', contactReducer),
    StoreModule.forFeature('customer', customerReducer),
    StoreModule.forFeature('taxe', taxeReducer),
    StoreModule.forFeature('tva', tvaReducer),
    StoreModule.forFeature('agence', agenceReducer),
    StoreModule.forFeature('service', serviceReducer),
    StoreModule.forFeature('axe', axeReducer),
    StoreModule.forFeature('voyageAutomatique', voyageAutomatiqueReducer),
    StoreModule.forFeature('limitation', limitationReducer),
    StoreModule.forFeature('activity', ActivityReducer),
    StoreModule.forFeature('vehicule', VehiculeReducer),
    StoreModule.forFeature('contrat', VehiculeContratReducer),
    StoreModule.forFeature('document', VehiculeDocumentReducer),
    StoreModule.forFeature('sinistre', VehiculeSinistreReducer),
    StoreModule.forFeature('extincteur', extincteurReducer),
    StoreModule.forFeature('prestataire', prestataireReducer),
    StoreModule.forFeature('remplacement', remplacementReducer),
    StoreModule.forFeature('intervention', interventionReducer),
    StoreModule.forFeature('citerne', citerneReducer),
    StoreModule.forFeature('carte', carteReducer),
    StoreModule.forFeature('brand', brandReducer),
    StoreModule.forFeature('modele', modeleReducer),
    StoreModule.forFeature('gamme', gammesReducer),
    StoreModule.forFeature('parc', parcReducer),
    StoreModule.forFeature('truckCategory', truckCategoryReducer),
    StoreModule.forFeature('truckType', truckTypeReducer),
    StoreModule.forFeature('tonnage', tonnageReducer),
    StoreModule.forFeature('typeExtincteur', typeExtincteurReducer),
    StoreModule.forFeature('volume', volumeReducer),
    StoreModule.forFeature('task', TaskReducer),
    StoreModule.forFeature('rdv', RdvReducer),
    StoreModule.forFeature('reservation',reservationReducer),
    StoreModule.forFeature('location',locationReducer),
    StoreModule.forFeature('facture', factureReducer),
    StoreModule.forFeature('discount', discountReducer),
    StoreModule.forFeature('avoir', avoirReducer),
    StoreModule.forFeature('receipt', receiptReducer),
    StoreModule.forFeature('unpaid', unpaidReducer),
    StoreModule.forFeature('recouvrement', RecouvrementReducer),
    StoreModule.forFeature('recouvreur', recouvreurReducer),
    StoreModule.forFeature('demande', demandeReducer),
    StoreModule.forFeature('caisseCarte', caisseCarteReducer),
    StoreModule.forFeature('receptionDocument', receptionDocumentReducer),
    StoreModule.forFeature('receptionChequeTraite', receptionChequeTraiteReducer),
    StoreModule.forFeature('retourCrbt', retourCrbtReducer),
    StoreModule.forFeature('validationVersement', validationVersementReducer),
    StoreModule.forFeature('versement', versementReducer),
    StoreModule.forFeature('maintenanceIntervention', MaintenanceInterventionReducer),
    StoreModule.forFeature('diagnostique', DiagnostiqueReducer),
    StoreModule.forFeature('pieceRechange', PieceRechangeReducer),
    StoreModule.forFeature('reparator', ReparatorReducer),
    StoreModule.forFeature('pneumatique', PneumatiqueReducer),
    StoreModule.forFeature('pagination', paginationReducer),
    StoreModule.forFeature('planning', PlanningReducer),
    StoreModule.forFeature('demandePieces', DemandePiecesReducer),
    StoreModule.forFeature('modeReglement', modeReglementReducer),
    StoreModule.forFeature('role', roleReducer),
    StoreModule.forFeature('roleHabilities', roleHabilitiesReducer),
    StoreModule.forFeature('category', CategoryReducer),
    StoreModule.forFeature('expense', expenseReducer),


  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthStateService,
    AuthService,
    DynamicContentHeaderService,
    HandleResponse,
    HeaderService,
    ToastService,
    TokenService,
    AuthGuard,
    LoginGuard,
    EffectsModule,
    SidenavService,
    BoTaskService,
    BoAccountService,
    BoGridService,
    BoOfferService,
    RessouresService,
    BoQuoteService,
    ExpenseService
  ],

  declarations: [],
  exports: [],
})
export class CoreModule {}
