import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, LoginGuard } from './core/guards';
import { AdminComponent } from './shared/layouts/admin/admin.component';
import { LoginComponent } from './modules/login/login.component';

// Vehicle Management
import { ListVehiculesComponent } from './modules/gestion-vehicules/list-vehicules/list-vehicules.component';
import { StatusVehiculesComponent } from './modules/gestion-vehicules/status-vehicules/status-vehicules.component';
import { DetailsVehiculeComponent } from './modules/gestion-vehicules/details-vehicule/details-vehicule.component';
import { DocumentsComponent } from './modules/gestion-vehicules/documents/documents.component';
import { VehiculeRemplacementComponent } from './modules/gestion-vehicules/vehicule-remplacement/vehicule-remplacement.component';
import { GpsComponent } from './modules/gestion-vehicules/gps/gps.component';
import { ExtincteursComponent } from './modules/gestion-vehicules/extincteurs/extincteurs.component';

// Personnel Management
import { GestionPersonnelComponent } from './modules/gestion-personnel/gestion-personnel.component';

// Maintenance Management
import { ListeInterventionsComponent } from './modules/gestion-maintenance/liste-interventions/liste-interventions.component';
import { PiecesRechangeComponent } from './modules/gestion-maintenance/pieces-rechange/pieces-rechange.component';
import { DemandePiecesMaintenanceComponent } from './modules/gestion-maintenance/demande-pieces-maintenance/demande-pieces-maintenance.component';
import { PneumatiqueComponent } from './modules/gestion-maintenance/pneumatique/pneumatique.component';
import { PlanningComponent } from './modules/gestion-maintenance/planning/planning.component';

// Other Components
import { DemandeInterventionComponent } from './modules/demande-intervention/demande-intervention.component';
import { ListeCartesComponent } from './modules/liste-cartes/liste-cartes.component';
import { TabGestionDisponibilitesComponent } from './modules/feuille-route/gestion-disponibilites/tab-gestion-disponibilites/tab-gestion-disponibilites.component';
import { ListeFeuilleComponent } from './modules/feuille-route/liste-feuille/liste-feuille.component';
import { TabAffectationComponent } from './modules/feuille-route/affectation/tab-affectation/tab-affectation.component';
import { ConsomationCarburantComponent } from './modules/consomation-depense/consomation-carburant/consomation-carburant.component';
import { DepensesAutorouteComponent } from './modules/consomation-depense/depenses-autoroute/depenses-autoroute.component';
import { GestionCiternesComponent } from './modules/gestion-citernes/gestion-citernes.component';

import { ROUTES } from './config';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      // Vehicle Management Routes
      {
        path: ROUTES['listvehicules'].path,
        component: ListVehiculesComponent,
        data: { route: ROUTES['listvehicules'].name }
      },
      {
        path: ROUTES['status'].path,
        component: StatusVehiculesComponent,
        data: { route: ROUTES['status'].name }
      },
      {
        path: ROUTES['detailsvehicule'].path,
        component: DetailsVehiculeComponent,
        data: { route: ROUTES['detailsvehicule'].name }
      },
      {
        path: ROUTES['documents'].path,
        component: DocumentsComponent,
        data: { route: ROUTES['documents'].name }
      },
      {
        path: ROUTES['vehiculeremplacement'].path,
        component: VehiculeRemplacementComponent,
        data: { route: ROUTES['vehiculeremplacement'].name }
      },
      {
        path: ROUTES['gps'].path,
        component: GpsComponent,
        data: { route: ROUTES['gps'].name }
      },
      {
        path: ROUTES['extincteur'].path,
        component: ExtincteursComponent,
        data: { route: ROUTES['extincteur'].name }
      },

      // Personnel Management Route
      {
        path: ROUTES['gestionpersonnel'].path,
        component: GestionPersonnelComponent,
        data: { route: ROUTES['gestionpersonnel'].name }
      },

      // Maintenance Management Routes
      {
        path: ROUTES['listeinterventions'].path,
        component: ListeInterventionsComponent,
        data: { route: ROUTES['listeinterventions'].name }
      },
      {
        path: ROUTES['piecesrechange'].path,
        component: PiecesRechangeComponent,
        data: { route: ROUTES['piecesrechange'].name }
      },
      {
        path: ROUTES['demande_pieces'].path,
        component: DemandePiecesMaintenanceComponent,
        data: { route: ROUTES['demande_pieces'].name }
      },
      {
        path: ROUTES['pneumatique'].path,
        component: PneumatiqueComponent,
        data: { route: ROUTES['pneumatique'].name }
      },
      {
        path: ROUTES['planning'].path,
        component: PlanningComponent,
        data: { route: ROUTES['planning'].name }
      },

      // Intervention Route
      {
        path: ROUTES['demandeintervention'].path,
        component: DemandeInterventionComponent,
        data: { route: ROUTES['demandeintervention'].name }
      },

      // Cards Route
      {
        path: ROUTES['listecartes'].path,
        component: ListeCartesComponent,
        data: { route: ROUTES['listecartes'].name }
      },

      // Road Sheet Routes
      {
        path: ROUTES['gestiondisponibilites'].path,
        component: TabGestionDisponibilitesComponent,
        data: { route: ROUTES['gestiondisponibilites'].name }
      },
      {
        path: ROUTES['listefeuille'].path,
        component: ListeFeuilleComponent,
        data: { route: ROUTES['listefeuille'].name }
      },
      {
        path: ROUTES['affectation'].path,
        component: TabAffectationComponent,
        data: { route: ROUTES['affectation'].name }
      },

      // Consumption/Expenses Routes
      {
        path: ROUTES['consomationcarburant'].path,
        component: ConsomationCarburantComponent,
        data: { route: ROUTES['consomationcarburant'].name }
      },
      {
        path: ROUTES['depensesautoroute'].path,
        component: DepensesAutorouteComponent,
        data: { route: ROUTES['depensesautoroute'].name }
      },

      // Tank Management Route
      {
        path: ROUTES['gestionciternes'].path,
        component: GestionCiternesComponent,
        data: { route: ROUTES['gestionciternes'].name }
      }
    ]
  },
  { 
    path: '**', 
    redirectTo: 'login' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class appRoutingModule {}
