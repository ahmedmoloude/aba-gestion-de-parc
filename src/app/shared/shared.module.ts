import { GalleriaModule } from 'primeng-lts/galleria';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ErrorPipe,
  FloatPipe,
  MinutesPipe,
  IfNullPipe,
  PeriodePipe,
  ReversePipe,
  TimerPipe,
  TruncatePipe,
  KeysPipe,
} from './pipes';
import {
  SidebarComponent,
  AddButtonComponent,
  HeaderFilterComponent,
  ShowImageComponent,
} from './components';
import { AdminComponent, LayoutHeaderComponent } from './layouts';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  RouterlinkCustomDirective,
  DynamicHeaderHostDirective,
} from './directives';
import { MaterialModule } from './material.module';
import { ListCardComponent } from './components/cards/list-card/list-card.component';
import { ModalComponent } from './components/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MenuPopoverComponent } from './components/menu-popover/menu-popover.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SharedAutcompleteComponent } from './components/shared-autcomplete/shared-autcomplete.component';
import { PaginationComponent } from './components/pagination/pagination.component';

import { AccordionModule } from 'primeng-lts/accordion'; //accordion and accordion tab
import { TieredMenuModule } from 'primeng-lts/tieredmenu';
import { MenuModule } from 'primeng-lts/menu';
import { ProgressSpinnerModule } from 'primeng-lts/progressspinner';
import { SharedFilterComponent } from './components/shared-filter/shared-filter.component';
import { IFieldComponent } from './components/i-field/i-field.component';
import {ButtonModule} from 'primeng-lts/button';
import { GalleriaComponent } from './components/galleria/galleria.component';
const declarables = [
  ErrorPipe,
  FloatPipe,
  MinutesPipe,
  IfNullPipe,
  PeriodePipe,
  ReversePipe,
  TimerPipe,
  TruncatePipe,
  SidebarComponent,
  LayoutHeaderComponent,
  RouterlinkCustomDirective,
  ModalComponent,
  MenuPopoverComponent,
  KeysPipe,
  SharedAutcompleteComponent,
  PaginationComponent,
  IFieldComponent,
  SharedFilterComponent,
  GalleriaComponent

];

@NgModule({
  imports: [
    NgxPaginationModule,
    LeafletModule,
    LeafletDrawModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    MatDialogModule,
    AccordionModule,
    TieredMenuModule,
    MenuModule,
    GalleriaModule,
    ButtonModule

    // StoreModule.forRoot(reducers, { metaReducers }),
    // !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  exports: [
    ...declarables,
    MaterialModule,
    NgxPaginationModule,
    LeafletModule,
    LeafletDrawModule,
    GalleriaModule,
    ProgressSpinnerModule,
    ButtonModule
    // AccordionModule,
    // TieredMenuModule,
    // MenuModule,
  ],
  declarations: [
    ...declarables,
    AdminComponent,
    AddButtonComponent,
    HeaderFilterComponent,
    ListCardComponent,
    DynamicHeaderHostDirective,
    ShowImageComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
