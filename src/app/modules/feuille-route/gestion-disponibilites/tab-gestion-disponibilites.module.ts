import { SharedModule } from 'app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabGestionDisponibilitesComponent } from './tab-gestion-disponibilites/tab-gestion-disponibilites.component';
import { DisponibiliteVehiculeComponent } from './disponibilite-vehicule/disponibilite-vehicule.component';
import { DisponibiliteConducteurComponent } from './disponibilite-conducteur/disponibilite-conducteur.component';
import { PaginatorModule } from 'primeng-lts/paginator';

@NgModule({
  declarations: [
    TabGestionDisponibilitesComponent,
    DisponibiliteVehiculeComponent,
    DisponibiliteConducteurComponent,
  ],
  imports: [CommonModule, SharedModule, PaginatorModule],
})
export class TabGestionDisponibilitesModule {}
