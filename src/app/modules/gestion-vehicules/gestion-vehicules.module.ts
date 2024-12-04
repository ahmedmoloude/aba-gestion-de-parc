import { TabGroupeDocumentadmnistrativeModule } from './../document-administrative/tab-groupe-documentadmnistrative.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared';
import { CommonModule } from '@angular/common';
import { AdministrativeTabGroupeComponent } from './administrative-tab-groupe/administrative-tab-groupe.component';
import { ListVehiculesComponent } from './list-vehicules/list-vehicules.component';
import { DialogVehiculesComponent } from './list-vehicules/dialog-vehicules/dialog-vehicules.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogContratComponent } from './type-contrat/dialog-contrat/dialog-contrat.component';
import { AssuranceComponent } from './assurance/assurance.component';
import { GestionSinistresComponent } from './gestion-sinistres/gestion-sinistres.component';
import { TypeContratComponent } from './type-contrat/type-contrat.component';
import { DialogAssuranceComponent } from './assurance/dialog-assurance/dialog-assurance.component';
import { DialogSinistresComponent } from './gestion-sinistres/dialog-sinistres/dialog-sinistres.component';
import { VehiculeReformeComponent } from './vehicule-reforme/vehicule-reforme.component';
import { DocumentsComponent } from './documents/documents.component';
import { ListDocumentComponent } from './documents/list-document/list-document.component';
import { DialogRemplacerComponent } from './list-vehicules/dialog-remplacer/dialog-remplacer.component';
import { VehiculeRemplacementComponent } from './vehicule-remplacement/vehicule-remplacement.component';
import { DetailRemplacementComponent } from './vehicule-remplacement/detail-remplacement/detail-remplacement.component';
import { ExtincteursComponent } from './extincteurs/extincteurs.component';
import { DialogExtincteurComponent } from './extincteurs/dialog-extincteur/dialog-extincteur.component';
import { VoirPlusComponent } from './gestion-sinistres/voir-plus/voir-plus.component';
import { StatusVehiculesComponent } from './status-vehicules/status-vehicules.component';
import { ListStatusComponent } from './status-vehicules/list-status/list-status.component';
import { DetailsVehiculeComponent } from './details-vehicule/details-vehicule.component';
import { ListDetailsComponent } from './details-vehicule/list-details/list-details.component';
import { GpsComponent } from './gps/gps.component';
import { AssociationGpsComponent } from './gps/association-gps/association-gps.component';
import { HistoriquegpsComponent } from './gps/historiquegps/historiquegps.component';
import { HistoriquestatutComponent } from './administrative-tab-groupe/historiquestatut/historiquestatut.component';
import { RechargeExtincteurComponent } from './extincteurs/recharge-extincteur/recharge-extincteur.component';
import { HistoriqueExtincteurComponent } from './extincteurs/historique-extincteur/historique-extincteur.component';
import { PaginatorModule } from 'primeng-lts/paginator';
import { DialogSinistresDetailsComponent } from './details-vehicule/dialog-sinistres-details/dialog-sinistres-details.component';
import { SinistreDetailsComponent } from './details-vehicule/sinistre-details/sinistre-details.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    AdministrativeTabGroupeComponent,
    ListVehiculesComponent,
    DialogVehiculesComponent,
    TypeContratComponent,
    AssuranceComponent,
    GestionSinistresComponent,
    DialogContratComponent,
    DialogAssuranceComponent,
    DialogSinistresComponent,
    VehiculeReformeComponent,
    DocumentsComponent,
    ListDocumentComponent,
    DialogRemplacerComponent,
    VehiculeRemplacementComponent,
    DetailRemplacementComponent,
    ExtincteursComponent,
    DialogExtincteurComponent,
    VoirPlusComponent,
    StatusVehiculesComponent,
    ListStatusComponent,
    DetailsVehiculeComponent,
    ListDetailsComponent,
    SinistreDetailsComponent,
    DialogSinistresDetailsComponent,
    GpsComponent,
    AssociationGpsComponent,
    HistoriquegpsComponent,
    HistoriquestatutComponent,
    RechargeExtincteurComponent,
    HistoriqueExtincteurComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TabGroupeDocumentadmnistrativeModule,
    PaginatorModule,
    PdfViewerModule
  ],
})
export class GestionVehiculesModule {}
