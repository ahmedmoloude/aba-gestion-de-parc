import { SharedModule } from 'app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabAffectationComponent } from './tab-affectation/tab-affectation.component';
import { RamassageComponent } from './ramassage/ramassage.component';
import { TransfertComponent } from './transfert/transfert.component';
import { LivraisonComponent } from './livraison/livraison.component';
import { ConvoyageComponent } from './convoyage/convoyage.component';
import { AffretementComponent } from './affretement/affretement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogAffectationComponent } from './dialog-affectation/dialog-affectation.component';

@NgModule({
  declarations: [TabAffectationComponent, RamassageComponent, TransfertComponent, LivraisonComponent, ConvoyageComponent, AffretementComponent, DialogAffectationComponent],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class TabAffectationModule {}
