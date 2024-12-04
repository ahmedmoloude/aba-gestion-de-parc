import { NgModule } from '@angular/core';
import { SharedModule, MaterialModule } from '../../shared';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from '../../config';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export const homeRoutes: Routes = [
  { path: '', component: HomeComponent, data: { route: ROUTES['home'].name } },
  // {path:'', component: TreegridComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes),
    SharedModule,
    // MatIconModule,
    // MatButtonModule
    // RouterModule
  ],
  declarations: [HomeComponent],
  //   exports: [RouterModule]
})
export class HomeModule {}
