import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared';
import { TarifaireTabGroupeComponent } from './tarifaire-tab-groupe/tarifaire-tab-groupe.component';
import { GrillePalettesComponent } from './grille-palettes/grille-palettes.component';
import { GrilleHorsnormsComponent } from './grille-horsnorms/grille-horsnorms.component';
import { GrilleServiceComponent } from './grille-service/grille-service.component';
import { SelectVersionComponent } from './select-version/select-version.component';
import { ConfirmationDialogComponent } from './grille-palettes/confirmation-dialog/confirmation-dialog.component';
import { HorsnomsDialogComponent } from './grille-horsnorms/horsnoms-dialog/horsnoms-dialog.component';
import { AddVersionComponent } from './add-version/add-version.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TarifaireTabGroupeComponent,
    GrillePalettesComponent,
    GrilleHorsnormsComponent,
    GrilleServiceComponent,
    SelectVersionComponent,
    ConfirmationDialogComponent,
    HorsnomsDialogComponent,
    AddVersionComponent,
  ],
  imports: [CommonModule, SharedModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
})
export class GrilleTarifaireModule { }
