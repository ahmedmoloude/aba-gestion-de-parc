import { PlanningComponent } from './modules/gestion-maintenance/planning/planning.component';
import { ConventionModule } from './modules/offer-commerciales/convention/convention.module';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { appRoutingModule } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared';
import { GlobalModule } from './global/global.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appInitializer, AuthService } from './core';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ReclamationsComponent } from './modules/reclamations/reclamations.component';
import { TasksEffects } from './core/store/tasks/tasks.effects';
import { AccountsEffects } from './core/store/accounts/accounts.effects';
import { ListTemplateComponent } from './modules/list-template/list-template.component';
import { OfferCommercialesComponent } from './modules/offer-commerciales/offer-commerciales.component';
import { CommercialesDialogComponent } from './modules/offer-commerciales/commerciales-dialog/commerciales-dialog.component';
import { TreeListComponent } from './modules/offer-commerciales/tree-list/tree-list.component';
import { ConventionComponent } from './modules/offer-commerciales/convention/convention.component';
import { ConditionComponent } from './modules/offer-commerciales/condition/condition.component';
import { OffreCommercialComponent } from './modules/offer-commerciales/offre-commercial/offre-commercial.component';
import { ConventionDialogComponent } from './modules/offer-commerciales/convention/convention-dialog/convention-dialog.component';
import { ConditionDialogComponent } from './modules/offer-commerciales/condition/condition-dialog/condition-dialog.component';
import { ConditionHeritDialogComponent } from './modules/offer-commerciales/condition/condition-herit-dialog/condition-herit-dialog.component';
import { ProduitDialogComponent } from './modules/parametre/parametre-produit/produit-dialog/produit-dialog.component';
import { GestionRdvsComponent } from './modules/gestion-rdvs/gestion-rdvs.component';
import { GestionTasksComponent } from './modules/gestion-tasks/gestion-tasks.component';
import { GestionContactsComponent } from './modules/gestion-contacts/gestion-contacts.component';
import { GestionComptesClientComponent } from './modules/gestion-comptes-client/gestion-comptes-client.component';
import { GestionProspectsComponent } from './modules/gestion-prospects/gestion-prospects.component';
import { GestionsDevisComponent } from './modules/gestions-devis/gestions-devis.component';
import { TasksDialogComponent } from './modules/gestion-tasks/tasks-dialog/tasks-dialog.component';
import { ContactsDialogComponent } from './modules/gestion-contacts/contacts-dialog/contacts-dialog.component';
import { ClientComponent } from './modules/gestion-comptes-client/client-dialog/client-dialog.component';
import { ProspectsDialogComponent } from './modules/gestion-prospects/prospects-dialog/prospects-dialog.component';
import { ScheduleModule, View } from '@syncfusion/ej2-angular-schedule';
import {
  WeekService,
  MonthService,
  DragAndDropService,
} from '@syncfusion/ej2-angular-schedule';
import { DevisDialogComponent } from './modules/gestions-devis/devis-dialog/devis-dialog.component';
import { TasksEditDialogComponent } from './modules/gestion-tasks/tasks-edit-dialog/tasks-edit-dialog.component';

import { DatePipe } from '@angular/common';
import { EditContactDialogComponent } from './modules/gestion-contacts/edit-contact-dialog/edit-contact-dialog.component';
import { HistoriqueVersionsComponent } from './modules/gestions-devis/historique-versions/historique-versions.component';
import { ProspectsEffects } from './core/store/prospects/prospects.effects';
import { NewDevisVersionDialogComponent } from './modules/gestions-devis/new-devis-version-dialog/new-devis-version-dialog.component';
import { GestionRendezvousComponent } from './modules/gestion-rendezvous/gestion-rendezvous.component';
import { RendezvousAddComponent } from './modules/gestion-rendezvous/rendezvous-add/rendezvous-add.component';
import { RendezvousEditComponent } from './modules/gestion-rendezvous/rendezvous-edit/rendezvous-edit.component';
import { DetailsClientComponent } from './modules/gestion-comptes-client/details-client/details-client.component';
import { DevisToOfferDialogComponent } from './modules/gestions-devis/devis-to-offer-dialog/devis-to-offer-dialog.component';
import { TourneesComponent } from './modules/tournees/tournees.component';
import { DetailsTourneesComponent } from './modules/tournees/details-tournees/details-tournees.component';
import { GenerationTourneeComponent } from './modules/tournees/generation-tournee/generation-tournee.component';
import { CreationTourneeComponent } from './modules/tournees/creation-tournee/creation-tournee.component';
import { RamassageLightComponent } from './modules/tournees/ramassage-light/ramassage-light.component';
import { PassagePlanifieComponent } from './modules/tournees/passage-planifie/passage-planifie.component';
import { DialogPlanifieComponent } from './modules/tournees/passage-planifie/dialog-planifie/dialog-planifie.component';
import { PassageReguliersComponent } from './modules/tournees/passage-reguliers/passage-reguliers.component';
import { DialogFusionnerComponent } from './modules/tournees/passage-reguliers/dialog-fusionner/dialog-fusionner.component';
import { DialogPassageComponent } from './modules/tournees/generation-tournee/dialog-passage/dialog-passage.component';
import { DialogSecteurComponent } from './modules/tournees/generation-tournee/dialog-secteur/dialog-secteur.component';
import { TourneesClotureComponent } from './modules/tournees/tournees-cloture/tournees-cloture.component';
import { GroupByPipe } from './group-by.pipe';
import { ConvoyageComponent } from './modules/convoyage/convoyage.component';
import { DialogCovoyageComponent } from './modules/convoyage/dialog-covoyage/dialog-covoyage.component';
import { GenerationCovoyageComponent } from './modules/convoyage/generation-covoyage/generation-covoyage.component';
import { ListeConvoyageComponent } from './modules/convoyage/liste-convoyage/liste-convoyage.component';
import { SpreadSheetsModule } from '@grapecity/spread-sheets-angular';
import { GestionPersonnelComponent } from './modules/gestion-personnel/gestion-personnel.component';
import { AddPersonnelComponent } from './modules/gestion-personnel/add-personnel/add-personnel.component';
import { EditPersonnelComponent } from './modules/gestion-personnel/edit-personnel/edit-personnel.component';
import { DetailPersonnelComponent } from './modules/gestion-personnel/detail-personnel/detail-personnel.component';
import { DialogAddComponent } from './modules/gestion-personnel/detail-personnel/dialog-add/dialog-add.component';
import { GestionCiternesComponent } from './modules/gestion-citernes/gestion-citernes.component';
import { AddDialogComponent } from './modules/gestion-citernes/add-dialog/add-dialog.component';
import { DemandeInterventionComponent } from './modules/demande-intervention/demande-intervention.component';
import { AddInterventionComponent } from './modules/demande-intervention/add-intervention/add-intervention.component';
import { ListeCartesComponent } from './modules/liste-cartes/liste-cartes.component';
import { CartesDialogComponent } from './modules/liste-cartes/cartes-dialog/cartes-dialog.component';
import { RechargerCarteComponent } from './modules/liste-cartes/recharger-carte/recharger-carte.component';
import { ConsomationCarburantComponent } from './modules/consomation-depense/consomation-carburant/consomation-carburant.component';
import { DepensesAutorouteComponent } from './modules/consomation-depense/depenses-autoroute/depenses-autoroute.component';
import { RechargeCiterneComponent } from './modules/gestion-citernes/recharge-citerne/recharge-citerne.component';
import { MouvementStocksComponent } from './modules/gestion-citernes/mouvement-stocks/mouvement-stocks.component';
import { JaugeageDialogComponent } from './modules/gestion-citernes/mouvement-stocks/jaugeage-dialog/jaugeage-dialog.component';
import { HistoriqueDialogComponent } from './modules/gestion-citernes/mouvement-stocks/historique-dialog/historique-dialog.component';
import { ListeFeuillesRouteComponent } from './modules/feuille-route/liste-feuilles-route/liste-feuilles-route.component';
import { DialogLeavePersonnelComponent } from './modules/gestion-personnel/dialog-leave-personnel/dialog-leave-personnel.component';
import { DialogPleinComponent } from './modules/consomation-depense/consomation-carburant/dialog-plein/dialog-plein.component';
import { AddcarDialogComponent } from './modules/consomation-depense/depenses-autoroute/addcar-dialog/addcar-dialog.component';
import { ListeFeuilleComponent } from './modules/feuille-route/liste-feuille/liste-feuille.component';
import { DetailFeuilleComponent } from './modules/feuille-route/liste-feuille/detail-feuille/detail-feuille.component';
import { GeofencingComponent } from './modules/geofencing/geofencing.component';
import { MouvementstockcartesComponent } from './modules/liste-cartes/mouvementstockcartes/mouvementstockcartes.component';
import { AffecteDialogComponent } from './modules/liste-cartes/affecte-dialog/affecte-dialog.component';
import { ListeFacturesComponent } from './modules/factures/liste-factures/liste-factures.component';
import { SualisationGlobaleComponent } from './modules/factures/liste-factures/sualisation-globale/sualisation-globale.component';
import { GenererFactureComponent } from './modules/factures/generer-facture/generer-facture.component';
import { GenerationFactureComponent } from './modules/factures/generation-facture/generation-facture.component';
import { EtatControleComponent } from './modules/factures/etat-controle/etat-controle.component';
import { AvoirComponent } from './modules/factures/avoir/avoir.component';
import { DialogAvoirComponent } from './modules/factures/avoir/dialog-avoir/dialog-avoir.component';
import { DialogReglementComponent } from './modules/factures/avoir/dialog-reglement/dialog-reglement.component';
import { HistoriqueEpiComponent } from './modules/gestion-personnel/historique-epi/historique-epi.component';
import { AddPolygonDialogComponent } from './modules/geofencing/add-polygon-dialog/add-polygon-dialog.component';
import { AddEntityComponent } from './modules/geofencing/add-entity/add-entity.component';
import { ConfirmDialogComponent } from './modules/geofencing/confirm-dialog/confirm-dialog.component';

import { AddPlanningComponent } from './modules/gestion-maintenance/planning/add-planning/add-planning.component';
import { PiecesRechangeComponent } from './modules/gestion-maintenance/pieces-rechange/pieces-rechange.component';
import { AddPieceComponent } from './modules/gestion-maintenance/pieces-rechange/add-piece/add-piece.component';
import { GestionCommerciauxComponent } from './modules/gestion-commerciaux/gestion-commerciaux.component';
import { DetailCommerciauxComponent } from './modules/gestion-commerciaux/detail-commerciaux/detail-commerciaux.component';
import { HandtoolDirective } from './handtool.directive';
import { VoirhistoriqueComponent } from './modules/gestion-rdvs/voirhistorique/voirhistorique.component';
import { DemandePiecesComponent } from './modules/gestion-maintenance/pieces-rechange/demande-pieces/demande-pieces.component';
import { HistoriqueSortieComponent } from './modules/gestion-maintenance/pieces-rechange/historique-sortie/historique-sortie.component';
import { FicheDialogComponent } from './modules/gestion-prospects/fiche-dialog/fiche-dialog.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RemiseComponent } from './modules/factures/remise/remise.component';
import { AppliqueRemiseComponent } from './modules/factures/remise/applique-remise/applique-remise.component';
import { EncaissementComponent } from './modules/creances-client/encaissement/encaissement.component';

import { DialogRdvComponent } from './modules/gestion-rdvs/dialog-rdv/dialog-rdv.component';
import { RecouvrementComponent } from './modules/creances-client/recouvrement/recouvrement.component';
import { AffectationObjectifsComponent } from './modules/affectation-objectifs/affectation-objectifs.component';

import { MotiffacteurComponent } from './modules/factures/liste-factures/motiffacteur/motiffacteur.component';
import { RecalculerFactureComponent } from './modules/factures/liste-factures/recalculer-facture/recalculer-facture.component';
import { MapDialogComponent } from './modules/gestion-comptes-client/map-dialog/map-dialog.component';
import { EditClientComponent } from './modules/gestion-comptes-client/edit-client/edit-client.component';
import { RapportAvoirComponent } from './modules/factures/avoir/rapport-avoir/rapport-avoir.component';
import { AffectationDialogComponent } from './modules/affectation-objectifs/affectation-dialog/affectation-dialog.component';
import { DetailObjectifComponent } from './modules/gestion-commerciaux/detail-objectif/detail-objectif.component';
import { GestionImpayesComponent } from './modules/factures/gestion-impayes/gestion-impayes.component';
 import { ListeMissionsComponent } from './modules/affretement/liste-missions/liste-missions.component';
import { SuiviMissionsComponent } from './modules/affretement/suivi-missions/suivi-missions.component';
import { AffectationComponent } from './modules/affretement/affectation/affectation.component';
import { SharedUploadComponent } from './shared/components/shared-upload/shared-upload.component';
import { DialoEditDetailsObjectifComponent } from './modules/affectation-objectifs/dialo-edit-details-objectif/dialo-edit-details-objectif.component';
import { ToNumberPipe } from './to-number.pipe';
import { DemandesConfirmeesComponent } from './modules/affretement/demandes-confirmees/demandes-confirmees.component';
  import { DemandeComponent } from './modules/affretement/demande/demande.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogCreerObjectifComponent } from './modules/affectation-objectifs/dialog-creer-objectif/dialog-creer-objectif.component';
import { ListAffectationComponent } from './modules/affectation-objectifs/list-affectation/list-affectation.component';
import { AffectationCommercialComponent } from './modules/affectation-objectifs/list-affectation/affectation-commercial/affectation-commercial.component';
import { AffectationClientsComponent } from './modules/affectation-objectifs/list-affectation/affectation-clients/affectation-clients.component';
import { DialogCommercialComponent } from './modules/affectation-objectifs/list-affectation/affectation-commercial/dialog-commercial/dialog-commercial.component';
import { DialogClientComponent } from './modules/affectation-objectifs/list-affectation/affectation-clients/dialog-client/dialog-client.component';
import { DialogRecouvrementComponent } from './modules/creances-client/recouvrement/dialog-recouvrement/dialog-recouvrement.component';
import { VisualistationGlobalComponent } from './modules/creances-client/recouvrement/visualistation-global/visualistation-global.component';
import { DialogCommentaireComponent } from './modules/affretement/liste-missions/dialog-commentaire/dialog-commentaire.component';
import { DialogDescisionComponent } from './modules/affretement/liste-missions/dialog-descision/dialog-descision.component';
import { DialogEditComponent } from './modules/affretement/demande/dialog-edit/dialog-edit.component';
 import { DialogReclineComponent } from './modules/affretement/demande/dialog-recline/dialog-recline.component';
import { ExpNonFactureComponent } from './modules/factures/liste-factures/exp-non-facture/exp-non-facture.component';
import { DeliveryMatrixComponent } from './modules/delivery-matrix/delivery-matrix.component';
import { FicheFactureComponent } from './modules/factures/liste-factures/fiche-facture/fiche-facture.component';
import { MarchandiseComponent } from './modules/affretement/liste-clients/steps-reservations/marchandise/marchandise.component';
import { ListeClientsComponent } from './modules/affretement/liste-clients/liste-clients.component';
import { DialogReservationComponent } from './modules/affretement/liste-clients/dialog-reservation/dialog-reservation.component';
import { SelectChargementComponent } from './modules/affretement/liste-clients/select-chargement/select-chargement.component';
import { StepsReservationsComponent } from './modules/affretement/liste-clients/steps-reservations/steps-reservations.component';
import { DestinataireComponent } from './modules/affretement/liste-clients/steps-reservations/destinataire/destinataire.component';
import { ListMarchandiseComponent } from './modules/affretement/liste-clients/steps-reservations/list-marchandise/list-marchandise.component';
import { DetailMarchandiseComponent } from './modules/affretement/liste-clients/steps-reservations/marchandise/detail-marchandise/detail-marchandise.component';
import { MapMarchandiseComponent } from './modules/affretement/liste-clients/steps-reservations/marchandise/map-marchandise/map-marchandise.component';
import { VisualiserEnvoiComponent } from './modules/affretement/liste-clients/steps-reservations/marchandise/visualiser-envoi/visualiser-envoi.component';
import { VisualiserRetourComponent } from './modules/affretement/liste-clients/steps-reservations/marchandise/visualiser-retour/visualiser-retour.component';
import { CommonModule, registerLocaleData } from '@angular/common';
 import { SelectDechargementComponent } from './modules/affretement/liste-clients/select-dechargement/select-dechargement.component';
import { DetailsAffretementComponent } from './modules/affretement/liste-clients/details-affretement/details-affretement.component';
import { SupportDialogComponent } from './modules/affretement/liste-clients/steps-reservations/marchandise/support-dialog/support-dialog.component';
import { DialogNmbsupportComponent } from './modules/affretement/liste-clients/steps-reservations/marchandise/dialog-nmbsupport/dialog-nmbsupport.component';
import { VisualiserDocumentComponent } from './modules/affretement/liste-clients/steps-reservations/list-marchandise/visualiser-document/visualiser-document.component';
import { SelectClientComponent } from './modules/affretement/liste-clients/select-client/select-client.component';

import { DialogAffectationComponent } from './modules/affretement/affectation/dialog-affectation/dialog-affectation.component';
import { DialogInterventionComponent } from './modules/affretement/suivi-missions/dialog-intervention/dialog-intervention.component';
import { DialogRefuserComponent } from './modules/affretement/liste-clients/dialog-refuser/dialog-refuser.component';
import { SelectExpediteurComponent } from './modules/affretement/liste-clients/select-expediteur/select-expediteur.component';
import { DetailPiecesComponent } from './modules/gestion-maintenance/pieces-rechange/detail-pieces/detail-pieces.component';
import { AlementationStockComponent } from './modules/gestion-maintenance/pieces-rechange/alementation-stock/alementation-stock.component';
import { MouvementStockComponent } from './modules/gestion-maintenance/mouvement-stock/mouvement-stock.component';
import { MouvementStockGlobalComponent } from './modules/gestion-maintenance/pieces-rechange/mouvement-stock-global/mouvement-stock-global.component';
import { CreateEncaissementDialogComponent } from './modules/creances-client/encaissement/create-encaissement-dialog/create-encaissement-dialog.component';
import { CreateUnpaidDialogComponent } from './modules/factures/gestion-impayes/create-unpaid-dialog/create-unpaid-dialog.component';
import { HistoriqueFacturesComponent } from './modules/factures/liste-factures/historique-factures/historique-factures.component';
import { AffretmentConditionTreeComponent } from './modules/affretment-condition-tree/affretment-condition-tree.component';
import { AffretmentTreeHeaderComponent } from './modules/affretment-condition-tree/affretment-tree-header/affretment-tree-header.component';
import { AffretmentConventionDialogComponent } from './modules/affretment-condition-tree/affretment-convention-dialog/affretment-convention-dialog.component';
import { AffretmentConditionDialogComponent } from './modules/affretment-condition-tree/affretment-condition-dialog/affretment-condition-dialog.component';
import { AffretmentConventionComponent } from './modules/affretment-condition-tree/affretment-convention/affretment-convention.component';
import { AffretmentConditionComponent } from './modules/affretment-condition-tree/affretment-condition/affretment-condition.component';
import { AffretmentConditionServiceComponent } from './modules/affretment-condition-tree/affretment-condition-service/affretment-condition-service.component';
import { AffretmentConventionServiceComponent } from './modules/affretment-condition-tree/affretment-convention-service/affretment-convention-service.component';
import { AffretmentConditionServiceDialogComponent } from './modules/affretment-condition-tree/affretment-condition-service-dialog/affretment-condition-service-dialog.component';
import { TaxationAffretmentComponent } from './modules/affretement/taxation-affretment/taxation-affretment.component';
import { VisualistationDetailsComponent } from './modules/creances-client/recouvrement/visualistation-details/visualistation-details.component';
import { AffectationCartesComponent } from './modules/caisse/affectation-cartes/affectation-cartes.component';
import { DialogAffectationCarteComponent } from './modules/caisse/affectation-cartes/dialog-affectation-carte/dialog-affectation-carte.component';
import { DialogAlimentationCarteComponent } from './modules/caisse/affectation-cartes/dialog-alimentation-carte/dialog-alimentation-carte.component';
import { DialogDesaffecterCarteComponent } from './modules/caisse/affectation-cartes/dialog-desaffecter-carte/dialog-desaffecter-carte.component';
import { HistoriqueCarteComponent } from './modules/caisse/affectation-cartes/historique-carte/historique-carte.component';
import { ValidationVersementComponent } from './modules/caisse/validation-versement/validation-versement.component';
import { AffretementDevisComponent } from './modules/affretement-devis/affretement-devis.component';
import { DialogTransportComponent } from './modules/affretement-devis/dialog-transport/dialog-transport.component';
import { ServiceConditionDialogComponent } from './modules/affretement-devis/service-condition-dialog/service-condition-dialog.component';
import { TransportConditionServiceComponent } from './modules/affretement-devis/transport-condition-service/transport-condition-service.component';
import { TransportConditionServiceDialogComponent } from './modules/affretement-devis/transport-condition-service-dialog/transport-condition-service-dialog.component';
import { AffretementEtatControlComponent } from './modules/factures/affretement-etat-control/affretement-etat-control.component';
import { AffretementDetailFactureComponent } from './modules/factures/liste-factures/affretement-detail-facture/affretement-detail-facture.component';
import { AffretementGlobalFactureComponent } from './modules/factures/liste-factures/affretement-global-facture/affretement-global-facture.component';
import { ValidationRetourComponent } from './modules/caisse/validation-retour/validation-retour.component';
import { VersementComponent } from './modules/caisse/versement/versement.component';
import { ChequeComponent } from './modules/caisse/versement/cheque/cheque.component';
import { VirementComponent } from './modules/caisse/versement/virement/virement.component';
import { ReceptionTraiteComponent } from './modules/caisse/reception-traite/reception-traite.component';
import { ReceptionFacturesComponent } from './modules/caisse/reception-factures/reception-factures.component';
import { DocumentsFundsComponent } from './modules/affretement/documents-funds/documents-funds.component';
import { RecuperationDocumentComponent } from './modules/affretement/documents-funds/recuperation-document/recuperation-document.component';
import { TruckTrajectoryComponent } from './modules/affretement/liste-clients/steps-reservations/truck-trajectory/truck-trajectory.component';
import { DialogDocumentsComponent } from './modules/affretement/documents-funds/dialog-documents/dialog-documents.component';
import { ListeInterventionsComponent } from './modules/gestion-maintenance/liste-interventions/liste-interventions.component';
import { DetailVehiculeComponent } from './modules/gestion-maintenance/liste-interventions/detail-vehicule/detail-vehicule.component';
import { DiagnostiqueComponent } from './modules/gestion-maintenance/liste-interventions/diagnostique/diagnostique.component';
import { DialogPiecejointeComponent } from './modules/gestion-maintenance/liste-interventions/dialog-piecejointe/dialog-piecejointe.component';
import { DialogClotureinterventionComponent } from './modules/gestion-maintenance/liste-interventions/dialog-clotureintervention/dialog-clotureintervention.component';
import { IntervenirComponent } from './modules/gestion-maintenance/liste-interventions/intervenir/intervenir.component';
import { DetailInterventionsComponent } from './modules/gestion-maintenance/liste-interventions/detail-interventions/detail-interventions.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { DiscountDialogComponent } from './modules/affretement/liste-clients/discount-dialog/discount-dialog.component';
import { TimeLineComponent } from './modules/affretement/liste-clients/time-line/time-line.component';

registerLocaleData(en);
import { UpdateAffretementDevisComponent } from './modules/affretement-devis/update-affretement-devis/update-affretement-devis.component';
import { InventaireRechangeComponent } from './modules/gestion-maintenance/pieces-rechange/mouvement-stock-global/inventaire-rechange/inventaire-rechange.component';
import { HostoriqueInventaireComponent } from './modules/gestion-maintenance/pieces-rechange/mouvement-stock-global/inventaire-rechange/hostorique-inventaire/hostorique-inventaire.component';
import { DemandePiecesMaintenanceComponent } from './modules/gestion-maintenance/demande-pieces-maintenance/demande-pieces-maintenance.component';
import { CompleterCommandeComponent } from './modules/gestion-maintenance/demande-pieces-maintenance/completer-commande/completer-commande.component';
import { BonCommandeComponent } from './modules/gestion-maintenance/demande-pieces-maintenance/bon-commande/bon-commande.component';
import { DemandePiecejointeComponent } from './modules/gestion-maintenance/demande-pieces-maintenance/demande-piecejointe/demande-piecejointe.component';
import { ValidationDocumentsComponent } from './modules/gestion-maintenance/demande-pieces-maintenance/validation-documents/validation-documents.component';
import { DetailDemandeComponent } from './modules/gestion-maintenance/demande-pieces-maintenance/detail-demande/detail-demande.component';
import { HistoriqueDemandeComponent } from './modules/gestion-maintenance/demande-pieces-maintenance/historique-demande/historique-demande.component';
import { PneumatiqueComponent } from './modules/gestion-maintenance/pneumatique/pneumatique.component';
import { DetailPneumatiqueComponent } from './modules/gestion-maintenance/pneumatique/detail-pneumatique/detail-pneumatique.component';
import { AffecterVehiculeComponent } from './modules/gestion-maintenance/pneumatique/affecter-vehicule/affecter-vehicule.component';
import { AddPneumatiqueComponent } from './modules/gestion-maintenance/pneumatique/add-pneumatique/add-pneumatique.component';
import { ValidationDocumentsDiagComponent } from './modules/gestion-maintenance/liste-interventions/diagnostique/validation-documents-diag/validation-documents-diag.component';
import { DialogAffectationAgenceComponent } from './modules/caisse/affectation-cartes/dialog-affectation-agence/dialog-affectation-agence.component';
import { Router, RouterModule } from '@angular/router';
import { ValidationDiagComponent } from './modules/gestion-maintenance/liste-interventions/diagnostique/validation-diag/validation-diag.component';
import { InterventionBonCommandeComponent } from './modules/gestion-maintenance/liste-interventions/intervenir/intervention-bon-commande/intervention-bon-commande';
import { InterventionValidationDocumentsComponent } from './modules/gestion-maintenance/liste-interventions/intervenir/intervention-validation-documents/intervention-validation-documents.component';
import { UpdatePneumatiqueComponent } from './modules/gestion-maintenance/pneumatique/update-pneumatique/update-pneumatique.component';
import { PaginatorModule } from 'primeng-lts/paginator';
import { UpdatePlanningComponent } from './modules/gestion-maintenance/planning/update-planning/update-planning.component';
import { BonSortieComponent } from './modules/gestion-maintenance/demande-pieces-maintenance/bon-sortie/bon-sortie.component';
import { BonAchatComponent } from './modules/gestion-maintenance/demande-pieces-maintenance/bon-achat/bon-achat.component';
import { AddInventoryComponent } from './modules/gestion-maintenance/pieces-rechange/mouvement-stock-global/inventaire-rechange/add-inventory/add-inventory.component';
import { VoirBonComponent } from './modules/gestion-maintenance/demande-pieces-maintenance/voir-bon/voir-bon.component';
import { SetPasswordComponent } from './modules/set-password/set-password.component';
import { FindBonSortieComponent } from './modules/gestion-maintenance/demande-pieces-maintenance/find-bon-sortie/find-bon-sortie.component';
import { updateDepenseDialogComponent } from './modules/consomation-depense/depenses-autoroute/update-depense-dialog/update-depense-dialog.component';
import { PiecejointeComponent } from './modules/factures/liste-factures/piecejointe/piecejointe.component';
import { SepcialCommercialOffersComponent } from './modules/sepcial-commercial-offers/sepcial-commercial-offers.component';

import { NzButtonModule } from 'ng-zorro-antd/button';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { EditSepcialCommercialOffersComponent } from './modules/edit-sepcial-commercial-offers/edit-sepcial-commercial-offers.component';
import { FacturationSpecialOffersComponent } from './modules/facturation-special-offers/facturation-special-offers.component';
import { EditFacturationSpecialOffersComponent } from './modules/edit-facturation-special-offers/edit-facturation-special-offers.component';
import { DemandesLightComponent } from './modules/affretement/demandes-light/demandes-light.component';
import { NewDemandeLightComponent } from './modules/affretement/new-demande-light/new-demande-light.component';
import { AffretementRegenerateFactureComponent } from './modules/factures/liste-factures/affretement-regenerate-facture/affretement-regenerate-facture.component';
import { DetailDemandeDialogComponent } from './modules/affretement/demandes-light/detail-demande-dialog/detail-demande-dialog.component';
import { DialogBordereauComponent } from './modules/affretement/documents-funds/dialog-bordereau/dialog-bordereau.component';
import { DialogAffectAgentComponent } from './modules/affretement/documents-funds/dialog-affect-agent/dialog-affect-agent.component';
import { DialogAccuseReceptionComponent } from './modules/affretement/documents-funds/dialog-accuse-reception/dialog-accuse-reception.component';
import { DialogVoirReceptionComponent } from './modules/affretement/documents-funds/dialog-voir-reception/dialog-voir-reception.component';
import { DialogBordereauVersementComponent } from './modules/affretement/documents-funds/dialog-bordereau-versement/dialog-bordereau-versement.component';
import { VoirBordereauVersementComponent } from './modules/affretement/documents-funds/voir-bordereau-versement/voir-bordereau-versement.component';
import { DialogReferenceChequeComponent } from './modules/affretement/documents-funds/dialog-reference-cheque/dialog-reference-cheque.component';
import { ReportMenuComponent } from './modules/tower-control/report-menu/report-menu.component';
import { ReportDialogComponent } from './modules/tower-control/report-dialog/report-dialog.component';

@NgModule({
  declarations: [
    PiecesRechangeComponent,
    AddPieceComponent,
    AppComponent,
    LoginComponent,
    ReclamationsComponent,
    ListTemplateComponent,
    OfferCommercialesComponent,
    CommercialesDialogComponent,
    TreeListComponent,
    ConventionComponent,
    ConditionComponent,
    OffreCommercialComponent,
    ConventionDialogComponent,
    ConditionDialogComponent,
    ConditionHeritDialogComponent,
    GestionRdvsComponent,
    GestionTasksComponent,
    GestionContactsComponent,
    GestionComptesClientComponent,
    GestionProspectsComponent,
    GestionsDevisComponent,
    TasksDialogComponent,
    ContactsDialogComponent,
    ClientComponent,
    MapDialogComponent,
    ProspectsDialogComponent,
    DevisDialogComponent,
    NewDevisVersionDialogComponent,
    TasksEditDialogComponent,
    EditContactDialogComponent,
    HistoriqueVersionsComponent,
    GestionRendezvousComponent,
    RendezvousAddComponent,
    RendezvousEditComponent,
    DetailsClientComponent,
    DevisToOfferDialogComponent,
    TourneesComponent,
    DetailsTourneesComponent,
    GenerationTourneeComponent,
    CreationTourneeComponent,
    RamassageLightComponent,
    PassagePlanifieComponent,
    DialogPlanifieComponent,
    PassageReguliersComponent,
    DialogFusionnerComponent,
    DialogPassageComponent,
    DialogSecteurComponent,
    TourneesClotureComponent,
    GroupByPipe,
    ConvoyageComponent,
    DialogCovoyageComponent,
    GenerationCovoyageComponent,
    ListeConvoyageComponent,
    GestionPersonnelComponent,
    AddPersonnelComponent,
    EditPersonnelComponent,
    DetailPersonnelComponent,
    DialogAddComponent,
    GestionCiternesComponent,
    AddDialogComponent,
    DemandeInterventionComponent,
    AddInterventionComponent,
    ListeCartesComponent,
    CartesDialogComponent,
    RechargerCarteComponent,
    ConsomationCarburantComponent,
    DepensesAutorouteComponent,
    RechargeCiterneComponent,
    MouvementStocksComponent,
    JaugeageDialogComponent,
    HistoriqueDialogComponent,
    ListeFeuillesRouteComponent,
    DialogLeavePersonnelComponent,
    DialogPleinComponent,
    AddcarDialogComponent,
    updateDepenseDialogComponent,
    ListeFeuilleComponent,
    DetailFeuilleComponent,
    GeofencingComponent,
    MouvementstockcartesComponent,
    AffecteDialogComponent,
    ListeFacturesComponent,
    SualisationGlobaleComponent,
    GenererFactureComponent,
    GenerationFactureComponent,
    EtatControleComponent,
    AvoirComponent,
    DialogAvoirComponent,
    DialogReglementComponent,
    HistoriqueEpiComponent,
    AddPolygonDialogComponent,
    AddEntityComponent,
    ConfirmDialogComponent,
    PlanningComponent,
    AddPlanningComponent,
    GestionCommerciauxComponent,
    DetailCommerciauxComponent,
    HandtoolDirective,
    VoirhistoriqueComponent,
    DemandePiecesComponent,
    HistoriqueSortieComponent,
    FicheDialogComponent,
    RemiseComponent,
    AppliqueRemiseComponent,
    EncaissementComponent,
    DialogRdvComponent,
    RecouvrementComponent,
    AffectationObjectifsComponent,
    PiecejointeComponent,
    MotiffacteurComponent,
    RecalculerFactureComponent,
    EditClientComponent,
    RapportAvoirComponent,
    AffectationDialogComponent,
    DetailObjectifComponent,
    GestionImpayesComponent,
    ListeMissionsComponent,
    SuiviMissionsComponent,
    AffectationComponent,
    SharedUploadComponent,
    DialoEditDetailsObjectifComponent,
    ToNumberPipe,
    DemandesConfirmeesComponent,
    DemandeComponent,
    DialogCreerObjectifComponent,
    ListAffectationComponent,
    AffectationCommercialComponent,
    AffectationClientsComponent,
    DialogCommercialComponent,
    DialogClientComponent,
    DialogRecouvrementComponent,
    VisualistationGlobalComponent,
    DialogCommentaireComponent,
    DialogDescisionComponent,
    DialogEditComponent,
    DialogReclineComponent,
    ExpNonFactureComponent,
    DeliveryMatrixComponent,
    FicheFactureComponent,
    MarchandiseComponent,
    ListeClientsComponent ,
    DialogReservationComponent ,
    SelectChargementComponent ,
    StepsReservationsComponent ,
    DestinataireComponent ,
    ListMarchandiseComponent ,
    DetailMarchandiseComponent ,
    MapMarchandiseComponent ,
    VisualiserEnvoiComponent ,
    VisualiserRetourComponent ,
    SelectDechargementComponent ,
    DetailsAffretementComponent ,
    SupportDialogComponent,
    DialogNmbsupportComponent ,
    VisualiserDocumentComponent,
    SelectClientComponent,
    DialogAffectationComponent,
    DialogInterventionComponent,
    DialogRefuserComponent,
    SelectExpediteurComponent,
    DetailPiecesComponent,
    AlementationStockComponent,
    MouvementStockComponent,
    MouvementStockGlobalComponent,
    CreateEncaissementDialogComponent,
    CreateUnpaidDialogComponent,
    HistoriqueFacturesComponent,
    AffretmentConditionTreeComponent,
    AffretmentTreeHeaderComponent,
    AffretmentConventionDialogComponent,
    AffretmentConditionDialogComponent,
    AffretmentConventionComponent,
    AffretmentConditionComponent,
    AffretmentConditionServiceComponent,
    AffretmentConventionServiceComponent,
    AffretmentConditionServiceDialogComponent,
    TaxationAffretmentComponent,
    VisualistationDetailsComponent,
    AffectationCartesComponent,
    DialogAffectationCarteComponent,
    DialogAlimentationCarteComponent,
    DialogDesaffecterCarteComponent,
    HistoriqueCarteComponent,
    ValidationVersementComponent,
    AffretementDevisComponent,
    DialogTransportComponent,
    ServiceConditionDialogComponent,
    TransportConditionServiceComponent,
    TransportConditionServiceDialogComponent,
    AffretementEtatControlComponent,
    AffretementDetailFactureComponent,
    AffretementRegenerateFactureComponent,
    AffretementGlobalFactureComponent,
    ValidationRetourComponent,
    VersementComponent,
    ChequeComponent,
    VirementComponent,
    ReceptionTraiteComponent,
    ReceptionFacturesComponent,
    DocumentsFundsComponent,
    RecuperationDocumentComponent,
    TruckTrajectoryComponent,
    DialogDocumentsComponent,
    ListeInterventionsComponent,
    DetailVehiculeComponent,
    DiagnostiqueComponent,
    DialogPiecejointeComponent,
    DialogClotureinterventionComponent,
    IntervenirComponent,
    DetailInterventionsComponent,
    DiscountDialogComponent,
    TimeLineComponent,
    UpdateAffretementDevisComponent,
    InventaireRechangeComponent,
    HostoriqueInventaireComponent,
    DemandePiecesMaintenanceComponent,
    CompleterCommandeComponent,
    BonCommandeComponent,
    InterventionBonCommandeComponent,
    DemandePiecejointeComponent,
    ValidationDocumentsComponent,
    DetailDemandeComponent,
    HistoriqueDemandeComponent,
    PneumatiqueComponent,
    DetailPneumatiqueComponent,
    AffecterVehiculeComponent,
    AddPneumatiqueComponent,
    UpdatePneumatiqueComponent,
    ValidationDocumentsDiagComponent,
    ValidationDiagComponent,
    DialogAffectationAgenceComponent,
    InterventionValidationDocumentsComponent,
    UpdatePlanningComponent,
    BonSortieComponent,
    BonAchatComponent,
    FindBonSortieComponent,
    AddInventoryComponent,
    VoirBonComponent,
    SetPasswordComponent,
    SepcialCommercialOffersComponent,
    EditSepcialCommercialOffersComponent,
    FacturationSpecialOffersComponent,
    EditFacturationSpecialOffersComponent,
    DemandesLightComponent,
    NewDemandeLightComponent,
    DetailDemandeDialogComponent,
    DialogBordereauComponent,
    DialogAffectAgentComponent,
    DialogAccuseReceptionComponent,
    DialogVoirReceptionComponent,
    DialogBordereauVersementComponent,
    VoirBordereauVersementComponent,
    DialogReferenceChequeComponent,
    ReportMenuComponent,
    ReportDialogComponent
],
  imports: [
    DragDropModule,
    ConventionModule,
    SpreadSheetsModule,
    BrowserModule,
    ScheduleModule,
    CoreModule,
    appRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    GlobalModule,
    BrowserAnimationsModule,
    PdfViewerModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([TasksEffects, AccountsEffects, ProspectsEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
    HttpClientModule,
    NzSliderModule,
    RouterModule,
    PaginatorModule,
    NzModalModule,
    NzButtonModule
  ],
  providers: [
    WeekService,
    MonthService,
    DragAndDropService,
    DatePipe,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService , Router],
    },
    {provide: LOCALE_ID, useValue: 'fr' },
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
