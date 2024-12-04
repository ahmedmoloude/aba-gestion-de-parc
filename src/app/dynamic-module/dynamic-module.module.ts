import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { PreviewComponent } from './preview/preview.component';



@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    PreviewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DynamicModuleModule { }
