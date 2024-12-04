import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared';
import { CommonModule } from '@angular/common';
import { ParcTabGroupeComponent } from './parc-tab-groupe/parc-tab-groupe.component';
import { ParcTransitComponent } from './parc-transit/parc-transit.component';
import { ParcLivraisonComponent } from './parc-livraison/parc-livraison.component';
import { ParcConvoyageComponent } from './parc-convoyage/parc-convoyage.component';
import { DialogConvoyageComponent } from './parc-convoyage/dialog-convoyage/dialog-convoyage.component';
import { DialogLivraisonComponent } from './parc-livraison/dialog-livraison/dialog-livraison.component';
import { ParcStockComponent } from './parc-stock/parc-stock.component';
import { DialogTransitComponent } from './parc-transit/dialog-transit/dialog-transit.component';
import { DialogStockComponent } from './parc-stock/dialog-stock/dialog-stock.component';

@NgModule({
  declarations: [
    ParcTabGroupeComponent,
    ParcTransitComponent,
    ParcLivraisonComponent,
    ParcConvoyageComponent,
    DialogConvoyageComponent,
    DialogLivraisonComponent,
    ParcStockComponent,
    DialogTransitComponent,
    DialogStockComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class GestionDeParcModule {}
