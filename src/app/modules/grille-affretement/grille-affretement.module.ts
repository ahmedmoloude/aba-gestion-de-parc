import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { GrilleTransportComponent } from './grille-transport/grille-transport.component';
import { GrilleServiceSpecifiqueComponent } from './grille-service-specifique/grille-service-specifique.component';
import { GrilleServiceStandardComponent } from './grille-service-standard/grille-service-standard.component';
import { AffretementTabGroupeComponent } from './affretement-tab-groupe/affretement-tab-groupe.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GrilleTransportComponent,
    GrilleServiceSpecifiqueComponent,
    GrilleServiceStandardComponent,
    AffretementTabGroupeComponent
  ],
  imports: [
    CommonModule,SharedModule,MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule
  ]
})
export class GrilleAffretementModule { }
