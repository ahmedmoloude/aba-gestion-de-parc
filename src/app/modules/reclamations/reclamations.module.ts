import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared';
import { ReclamationDetailComponent } from './reclamation-detail/reclamation-detail.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [ReclamationDetailComponent, TaskDetailComponent],
  imports: [CommonModule, SharedModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule , MatIconModule],
})
export class ReclamationsModule {}
