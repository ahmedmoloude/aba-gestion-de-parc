import { ServiceDialogComponent } from './service-dialog/service-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from './../../../core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import {
  selectEnvPayloadService,
  selectEnvIsLoadingService,
} from 'app/core/store/service/service.selectors';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-parametre-services',
  templateUrl: './parametre-services.component.html',
  styleUrls: ['./parametre-services.component.css'],
})
export class ParametreServicesComponent implements OnInit {
  headerColumuns = ['Rubrique', 'Base de calcul', 'Taxe'];
  produits: any;
  p: number = 1;
  spinnerRubrics: boolean = false;
  rubrics: any;
  constructor(
    private store: Store<AppState>,
    private _toast: ToastService,
    public dialog: MatDialog,
    public permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.store.select(selectEnvPayloadService).subscribe((res) => {
      this.rubrics = res;
      console.log(' rubrics========>', this.rubrics);
    });

    this.store.select(selectEnvIsLoadingService).subscribe((res) => {
      this.spinnerRubrics = res;
    });
    // this.spinnerRubrics = true;
    // this.boGridService.getrubrics().subscribe((data) => {
    //   this.rubrics = data["response"];
    //   this.spinnerRubrics = false;
    //   console.log(this.rubrics)
    // },
    // (error) => {
    //   console.log('error', error);
    // });
  }
  openDialogDetails(): void {
    const dialogRef = this.dialog.open(ServiceDialogComponent, {
      disableClose: true,
      width: '630px',
      data: {},
    });

    // dialogRef.afterClosed().subscribe((data) => {
    //   console.warn('input data', data);
    //   if (data) {
    //     this.rubrics.push(data.response);
    //   }
    // });
  }
}
