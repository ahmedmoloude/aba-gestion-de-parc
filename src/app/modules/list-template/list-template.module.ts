import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared';
import { TemplateDialogComponent } from './template-dialog/template-dialog.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateDetailsComponent } from './template-details/template-details.component';
@NgModule({
  declarations: [TemplateDialogComponent, TemplateDetailsComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
})
export class ListTemplateModule {}
