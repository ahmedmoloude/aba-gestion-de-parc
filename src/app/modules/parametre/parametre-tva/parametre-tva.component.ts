import { TvaDialogComponent } from './tva-dialog/tva-dialog.component';
import { Component, OnInit } from '@angular/core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { ToastService } from '../../../core';
import { TaxeDialogComponent } from './taxe-dialog/taxe-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import {
  selectEnvPayloadTaxe,
  selectEnvIsLoadingTaxe,
} from 'app/core/store/taxe/taxe.selectors';
import {
  selectEnvPayloadTva,
  selectEnvIsLoadingTva,
} from 'app/core/store/tva/tva.selectors';
import { fetchTaxe } from 'app/core/store/taxe/taxe.actions';
import { fetchTva } from 'app/core/store/tva/tva.actions';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-parametre-tva',
  templateUrl: './parametre-tva.component.html',
  styleUrls: ['./parametre-tva.component.css'],
})
export class ParametreTvaComponent implements OnInit {
  taxe: any;
  tva: any;
  valeurTva: number;
  valeurTaxe: number;
  spinnerTva: boolean = false;
  spinnerTaxe: boolean = false;
  constructor(
    private store: Store<AppState>,
    private boGridService: BoGridService,
    private _toast: ToastService,
    public dialog: MatDialog,
    public permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(fetchTaxe());
    this.store.dispatch(fetchTva());

    this.store.select(selectEnvIsLoadingTva).subscribe((res) => {
      this.spinnerTva = res;
      // console.log(this.spinnerTva)
    });

    this.store.select(selectEnvIsLoadingTaxe).subscribe((res) => {
      this.spinnerTaxe = res;
      // console.log(this.spinnerTaxe)
    });

    this.store.select(selectEnvPayloadTaxe).subscribe((res) => {
      this.valeurTaxe = Math.trunc(res['valeur'] * 100);
      this.taxe = res;
      // console.log(this.taxe)
    });

    this.store.select(selectEnvPayloadTva).subscribe((res) => {
      this.valeurTva = Math.trunc(res['valeur'] * 100);
      this.tva = res;
      // console.log(this.tva)
    });

    // this.boGridService.getTaxe().subscribe((data) => {
    //   this.valeurTaxe = Math.trunc(data["response"].valeur * 100)
    //   this.taxe = data["response"];
    //   console.log(this.taxe)
    // },
    // (error) => {
    //   console.log('error', error);
    //   //this._toast.error("Ressayer plus tard !");
    // });

    // this.boGridService.getTva().subscribe((data) => {
    //   this.valeurTva = Math.trunc(data["response"].valeur * 100)
    //   this.tva = data["response"];
    //   console.log(this.tva)
    // },
    // (error) => {
    //   console.log('error', error);
    //   //this._toast.error("Ressayer plus tard !");
    // });
  }

  openTva(data): void {
    const dialogRef = this.dialog.open(TvaDialogComponent, {
      disableClose: true,
      width: '600px',
      data: { data },
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.warn('input data', data);
      if (data) {
        console.log('cc', data);
        this.tva = data['response'];
        this.valeurTva = Math.trunc(data['response'].valeur * 100);
      }
    });
  }

  openTaxe(data): void {
    const dialogRef = this.dialog.open(TaxeDialogComponent, {
      disableClose: true,
      width: '600px',
      data: { data },
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.warn('input data', data);
      if (data) {
        console.log('dd', data);
        this.taxe = data['response'];
        this.valeurTaxe = Math.trunc(data['response'].valeur * 100);
      }
    });
  }
}
