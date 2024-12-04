import { SharedModule } from 'app/shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from '../../config';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: { route: ROUTES['dashboard'].name },
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes),
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // RouterModule
  ],
  declarations: [DashboardComponent],
  //   exports: [RouterModule]
})
export class DashboardModule {}
