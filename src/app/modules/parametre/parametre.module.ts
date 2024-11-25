import { VehiculeTabGroupeModule } from './parametre-vehicules/vehicule-tab-groupe.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametreTabGroupeComponent } from './parametre-tab-groupe/parametre-tab-groupe.component';
import { ParametreTvaComponent } from './parametre-tva/parametre-tva.component';
import { ParametreProduitComponent } from './parametre-produit/parametre-produit.component';
import { SharedModule } from 'app/shared';
import { GlobalModule } from 'app/global/global.module';
import { ParametreHorsnormesComponent } from './parametre-horsnormes/parametre-horsnormes.component';
import { ParametreVolumetriqueComponent } from './parametre-volumetrique/parametre-volumetrique.component';
import { ParametreServicesComponent } from './parametre-services/parametre-services.component';
import { ProduitDialogComponent } from './parametre-produit/produit-dialog/produit-dialog.component';
import { HorsnormesDialogComponent } from './parametre-horsnormes/horsnormes-dialog/horsnormes-dialog.component';
import { ServiceDialogComponent } from './parametre-services/service-dialog/service-dialog.component';
import { TvaDialogComponent } from './parametre-tva/tva-dialog/tva-dialog.component';
import { TaxeDialogComponent } from './parametre-tva/taxe-dialog/taxe-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParametreAxeComponent } from './parametre-axe/parametre-axe.component';
import { AddAxeComponent } from './parametre-axe/add-axe/add-axe.component';
import { RecapitulatifDialogComponent } from './parametre-axe/recapitulatif-dialog/recapitulatif-dialog.component';
import { EditAxeComponent } from './parametre-axe/edit-axe/edit-axe.component';
import { ParametreAgenceComponent } from './parametre-agence/parametre-agence.component';
import { AgenceDialogComponent } from './parametre-agence/agence-dialog/agence-dialog.component';
import { ParametreDestinationComponent } from './parametre-destination/parametre-destination.component';
import { DialogParametreDestinationComponent } from './parametre-destination/dialog-parametre-destination/dialog-parametre-destination.component';
import { ParametreIntervallesComponent } from './parametre-intervalles/parametre-intervalles.component';
import { IntervallesDialogComponent } from './parametre-intervalles/intervalles-dialog/intervalles-dialog.component';
import { ParametreConosmationComponent } from './parametre-conosmation/parametre-conosmation.component';
import { DialogConosmationComponent } from './parametre-conosmation/dialog-conosmation/dialog-conosmation.component';
import { ExtincteurTabGroupeModule } from './parametre-extincteur/extincteur-tab-groupe.module';
import { ParametreGpsComponent } from './parametre-gps/parametre-gps.component';
import { AddGpsComponent } from './parametre-gps/add-gps/add-gps.component';
import { ParametrePrestataireComponent } from './parametre-prestataire/parametre-prestataire.component';
import { AddPrestataireComponent } from './parametre-prestataire/add-prestataire/add-prestataire.component';
import { TypeRdvComponent } from './type-rdv/type-rdv.component';
import { AddTypeRdvComponent } from './type-rdv/add-type-rdv/add-type-rdv.component';
import { ParametreObjectifComponent } from './parametre-objectif/parametre-objectif.component';
import { DialogObjectifComponent } from './parametre-objectif/dialog-objectif/dialog-objectif.component';
import { ParametreContactComponent } from './parametre-contact/parametre-contact.component';
import { DialogDepartementComponent } from './parametre-contact/dialog-departement/dialog-departement.component';
import { DialogFonctionComponent } from './parametre-contact/dialog-fonction/dialog-fonction.component';
import { AddMotifComponent } from './type-rdv/add-motif/add-motif.component';
import { ListPrestataireComponent } from './parametre-prestataire/list-prestataire/list-prestataire.component';
import { ParametreColorsComponent } from './parametre-colors/parametre-colors.component';
import { DialogColorComponent } from './parametre-colors/dialog-color/dialog-color.component';
import { PrixGasoilComponent } from './prix-gasoil/prix-gasoil.component';
import { TypeAffretementComponent } from './type-affretement/type-affretement.component';
import { DistanceVillesComponent } from './distance-villes/distance-villes.component';
import { AffPercentageComponent } from './aff-percentage/aff-percentage.component';
import { HabilitationComponent } from './habilitation/habilitation.component';
import { DialogRoleComponent } from './habilitation/dialog-role/dialog-role.component';
import { AffectRoleHabilitationComponent } from './habilitation/affect-role-habilitation/affect-role-habilitation.component';
import { AffectRoleHabilitationTestComponent } from './habilitation/affect-role-habilitation-test/affect-role-habilitation-test.component';
import { WorkflowValidationComponent } from './workflow-validation/workflow-validation.component';
import { AddWorkflowDialogComponent } from './workflow-validation/add-workflow-dialog/add-workflow-dialog.component';
import { ParametrePrestataireNatureDepenseComponent } from './parametre-prestataire-nature-depense/parametre-prestataire-nature-depense.component';
import { ListPrestataireNatureDepenseComponent } from './parametre-prestataire-nature-depense/list-prestataire-nature-depense/list-prestataire-nature-depense.component';
import { AddPrestataireDepenseComponent } from './parametre-prestataire-nature-depense/add-prestataire-depense/add-prestataire-depense.component';
import { AddNatureDepenseComponent } from './parametre-prestataire-nature-depense/add-nature-depense/add-nature-depense.component';
import { ParametreCountryComponent } from './parametre-country/parametre-country.component';
import { DialogCountryComponent } from './parametre-country/dialog-country/dialog-country.component';
import { ParamtreRamassageComponent } from './paramtre-ramassage/paramtre-ramassage.component';
import { ParamtreLivraisonComponent } from './paramtre-livraison/paramtre-livraison.component';
import { DialgLivraisonComponent } from './paramtre-livraison/dialg-livraison/dialg-livraison.component';
import { DialogRamassageComponent } from './paramtre-ramassage/dialog-ramassage/dialog-ramassage.component';

@NgModule({
  declarations: [
    ParametreTabGroupeComponent,
    ParametreTvaComponent,
    ParametreProduitComponent,
    ParametreHorsnormesComponent,
    ParametreVolumetriqueComponent,
    ParametreServicesComponent,
    ProduitDialogComponent,
    HorsnormesDialogComponent,
    ServiceDialogComponent,
    TvaDialogComponent,
    TaxeDialogComponent,
    ParametreAxeComponent,
    AddAxeComponent,
    RecapitulatifDialogComponent,
    EditAxeComponent,
    ParametreAgenceComponent,
    AgenceDialogComponent,
    ParametreDestinationComponent,
    DialogParametreDestinationComponent,
    ParametreIntervallesComponent,
    IntervallesDialogComponent,
    ParametreConosmationComponent,
    DialogConosmationComponent,
    ParametreGpsComponent,
    AddGpsComponent,
    ParametrePrestataireComponent,
    AddPrestataireComponent,
    TypeRdvComponent,
    AddTypeRdvComponent,
    ParametreObjectifComponent,
    DialogObjectifComponent,
    ParametreContactComponent,
    DialogDepartementComponent,
    DialogFonctionComponent,
    AddMotifComponent,
    ListPrestataireComponent,
    ParametreColorsComponent,
    DialogColorComponent,
    PrixGasoilComponent,
    TypeAffretementComponent,
    DistanceVillesComponent,
    AffPercentageComponent,
    HabilitationComponent,
    DialogRoleComponent,
    AffectRoleHabilitationComponent,
    AffectRoleHabilitationTestComponent,
    WorkflowValidationComponent,
    AddWorkflowDialogComponent,
    ParametrePrestataireNatureDepenseComponent,
    AddPrestataireDepenseComponent,
    AddNatureDepenseComponent,
    ListPrestataireNatureDepenseComponent,
    ParametreCountryComponent,
    DialogCountryComponent,
    ParamtreRamassageComponent,
    ParamtreLivraisonComponent,
    DialgLivraisonComponent,
    DialogRamassageComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    GlobalModule,
    ExtincteurTabGroupeModule,
    VehiculeTabGroupeModule,
  ],
})
export class ParametreModule {}
