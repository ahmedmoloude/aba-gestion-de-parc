import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared';
import { ConventionTabGroupeComponent } from './convention-tab-groupe/convention-tab-groupe.component';
import { ServicePaletteComponent } from './service-palette/service-palette.component';
import { ServiceColisComponent } from './service-colis/service-colis.component';
import { ServiceHorsNormesComponent } from './service-hors-normes/service-hors-normes.component';

@NgModule({
  declarations: [ConventionTabGroupeComponent, ServicePaletteComponent, ServiceColisComponent, ServiceHorsNormesComponent],
  imports: [CommonModule, SharedModule],
})
export class ConventionModule {}
