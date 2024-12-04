import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared';
import { CommonModule } from '@angular/common';
import { VehiculeTabGroupeComponent } from './vehicule-tab-groupe/vehicule-tab-groupe.component';
import { ParametreMarqueComponent } from './parametre-marque/parametre-marque.component';
import { DialogMarqueComponent } from './parametre-marque/dialog-marque/dialog-marque.component';
import { ParametreModeleComponent } from './parametre-modele/parametre-modele.component';
import { DialogModeleComponent } from './parametre-modele/dialog-modele/dialog-modele.component';
import { ParametreCategorieComponent } from './parametre-categorie/parametre-categorie.component';
import { DialogCategorieComponent } from './parametre-categorie/dialog-categorie/dialog-categorie.component';
import { ParametreTypeComponent } from './parametre-type/parametre-type.component';
import { DialogTypeComponent } from './parametre-type/dialog-type/dialog-type.component';
import { ParametreTonnageComponent } from './parametre-tonnage/parametre-tonnage.component';
import { DialogTonnageComponent } from './parametre-tonnage/dialog-tonnage/dialog-tonnage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogParcComponent } from './dialog-parc/dialog-parc.component';
import { DialogGammeComponent } from './dialog-gamme/dialog-gamme.component';

@NgModule({
  declarations: [
    VehiculeTabGroupeComponent,
    ParametreMarqueComponent,
    DialogMarqueComponent,
    ParametreModeleComponent,
    DialogModeleComponent,
    ParametreCategorieComponent,
    DialogCategorieComponent,
    ParametreTypeComponent,
    DialogTypeComponent,
    ParametreTonnageComponent,
    DialogTonnageComponent,
    DialogParcComponent,
    DialogGammeComponent,
  ],
  exports: [VehiculeTabGroupeComponent],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class VehiculeTabGroupeModule {}
