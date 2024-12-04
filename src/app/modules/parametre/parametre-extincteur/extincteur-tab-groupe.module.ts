import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExtincteurTabGroupeComponent } from './extincteur-tab-groupe/extincteur-tab-groupe.component';
import { TypeExtincteurComponent } from './type-extincteur/type-extincteur.component';
import { VolumeExtincteurComponent } from './volume-extincteur/volume-extincteur.component';
import { DialogTypeComponent } from './type-extincteur/dialog-type/dialog-type.component';
import { DialogVolumeComponent } from './volume-extincteur/dialog-volume/dialog-volume.component';

@NgModule({
  declarations: [
    ExtincteurTabGroupeComponent,
    TypeExtincteurComponent,
    VolumeExtincteurComponent,
    DialogTypeComponent,
    DialogVolumeComponent,
  ],
  exports: [ExtincteurTabGroupeComponent],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class ExtincteurTabGroupeModule {}
