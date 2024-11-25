import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from '../../config';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
export const authRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: { route: ROUTES['login'].name },
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [LoginComponent],
})
export class LoginModule {}
