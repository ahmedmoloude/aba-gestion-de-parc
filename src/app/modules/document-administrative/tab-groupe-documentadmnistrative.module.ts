import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared';
import { DocumentadminGroupeComponent } from './documentadmin-groupe/documentadmin-groupe.component';
import { VignetteComponent } from './vignette/vignette.component';
import { AssuranceComponent } from './assurance/assurance.component';
import { VisiteComponent } from './visite/visite.component';
import { CarteGriseComponent } from './carte-grise/carte-grise.component';
import { AutorisationComponent } from './autorisation/autorisation.component';
import { TachygrapheComponent } from './tachygraphe/tachygraphe.component';
import { TaxeComponent } from './taxe/taxe.component';
import { AddDialogComponent } from './taxe/add-dialog/add-dialog.component';
import { AddDialogComponent as assurance } from './assurance/add-dialog/add-dialog.component';
import { AddDialogComponent as visite } from './visite/add-dialog/add-dialog.component';
import { AddDialogComponent as vignette } from './vignette/add-dialog/add-dialog.component';
import { AddDialogComponent as tachygraphe } from './tachygraphe/add-dialog/add-dialog.component';
import { AddDialogComponent as carte } from './carte-grise/add-dialog/add-dialog.component';
import { AddDialogComponent as autorisation } from './autorisation/add-dialog/add-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DocumentadminGroupeComponent,
                  VignetteComponent,
                  AssuranceComponent,
                  VisiteComponent, 
                  CarteGriseComponent, autorisation,
                  AutorisationComponent, visite, vignette, tachygraphe, carte,
                  TachygrapheComponent, 
                  TaxeComponent, AddDialogComponent,assurance
                ],

  imports: [CommonModule, FormsModule,
    ReactiveFormsModule, SharedModule],

  exports: [DocumentadminGroupeComponent],
})
export class TabGroupeDocumentadmnistrativeModule {}
