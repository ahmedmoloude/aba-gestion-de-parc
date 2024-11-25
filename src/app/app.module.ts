import { PlanningComponent } from './modules/gestion-maintenance/planning/planning.component';

import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
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
import { TasksEffects } from './core/store/tasks/tasks.effects';
import { AccountsEffects } from './core/store/accounts/accounts.effects';
import { ProduitDialogComponent } from './modules/parametre/parametre-produit/produit-dialog/produit-dialog.component';
import { ScheduleModule, View } from '@syncfusion/ej2-angular-schedule';
import {
  WeekService,
  MonthService,
  DragAndDropService,
} from '@syncfusion/ej2-angular-schedule';

import { DatePipe } from '@angular/common';
import { ProspectsEffects } from './core/store/prospects/prospects.effects';

import { GroupByPipe } from './group-by.pipe';

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

import { MouvementstockcartesComponent } from './modules/liste-cartes/mouvementstockcartes/mouvementstockcartes.component';
import { AffecteDialogComponent } from './modules/liste-cartes/affecte-dialog/affecte-dialog.component';
import { HistoriqueEpiComponent } from './modules/gestion-personnel/historique-epi/historique-epi.component';


import { AddPlanningComponent } from './modules/gestion-maintenance/planning/add-planning/add-planning.component';
import { PiecesRechangeComponent } from './modules/gestion-maintenance/pieces-rechange/pieces-rechange.component';
import { AddPieceComponent } from './modules/gestion-maintenance/pieces-rechange/add-piece/add-piece.component';

import { HandtoolDirective } from './handtool.directive';
import { DemandePiecesComponent } from './modules/gestion-maintenance/pieces-rechange/demande-pieces/demande-pieces.component';
import { HistoriqueSortieComponent } from './modules/gestion-maintenance/pieces-rechange/historique-sortie/historique-sortie.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { SharedUploadComponent } from './shared/components/shared-upload/shared-upload.component';
import { ToNumberPipe } from './to-number.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';


import { CommonModule, registerLocaleData } from '@angular/common';

import { DetailPiecesComponent } from './modules/gestion-maintenance/pieces-rechange/detail-pieces/detail-pieces.component';
import { AlementationStockComponent } from './modules/gestion-maintenance/pieces-rechange/alementation-stock/alementation-stock.component';
import { MouvementStockComponent } from './modules/gestion-maintenance/mouvement-stock/mouvement-stock.component';
import { MouvementStockGlobalComponent } from './modules/gestion-maintenance/pieces-rechange/mouvement-stock-global/mouvement-stock-global.component';
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
registerLocaleData(en);
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
import { FindBonSortieComponent } from './modules/gestion-maintenance/demande-pieces-maintenance/find-bon-sortie/find-bon-sortie.component';
import { updateDepenseDialogComponent } from './modules/consomation-depense/depenses-autoroute/update-depense-dialog/update-depense-dialog.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { appRoutingModule } from './app.routing';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { ParametreModule } from './modules';

@NgModule({
  declarations: [
    PiecesRechangeComponent,
    AddPieceComponent,
    AppComponent,
    LoginComponent,
    GroupByPipe,
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
    MouvementstockcartesComponent,
    AffecteDialogComponent,
    HistoriqueEpiComponent,

    PlanningComponent,
    AddPlanningComponent,

    HandtoolDirective,
    DemandePiecesComponent,
    HistoriqueSortieComponent,
    SharedUploadComponent,
    ToNumberPipe,
    DetailPiecesComponent,
    AlementationStockComponent,
    MouvementStockComponent,
    MouvementStockGlobalComponent,
    ListeInterventionsComponent,
    DetailVehiculeComponent,
    DiagnostiqueComponent,
    DialogPiecejointeComponent,
    DialogClotureinterventionComponent,
    IntervenirComponent,
    DetailInterventionsComponent,
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
    // ProduitDialogComponent,
    InterventionValidationDocumentsComponent,
    UpdatePlanningComponent,
    BonSortieComponent,
    BonAchatComponent,
    FindBonSortieComponent,
    AddInventoryComponent,
    VoirBonComponent,
    
],
  imports: [
    DragDropModule,
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
    NzButtonModule,
    ParametreModule
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
