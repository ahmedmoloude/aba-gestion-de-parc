import { HorsnomsDialogComponent } from './../grille-horsnorms/horsnoms-dialog/horsnoms-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import {
  fetchActivateGrid,
  importGridDetails,
} from 'app/core/store/grids/grids.actions';
import {
  selectActiveGrid,
  selectActiveGridGroupByNature,
  selectActiveGridServices,
  selectGrid,
  selectHorsnormTransport,
} from 'app/core/store/grids/grids.selectors';
import { ToastService } from 'app/services';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-tarifaire-tab-groupe',
  templateUrl: './tarifaire-tab-groupe.component.html',
  styleUrls: ['./tarifaire-tab-groupe.component.css'],
})
export class TarifaireTabGroupeComponent implements OnInit {
  selectedTabIndex = 0;
  file = null;
  activeGrid: any;
  gridsByNature = {};
  gridsServices = [];
  grid_hornorme = [];
  isloaded: boolean = false;
  public get nature_products(): string[] {
    return Object.keys(this.gridsByNature);
  }

  constructor(
    private store: Store<AppState>,
    private _toast: ToastService,
    public dialog: MatDialog,
    public permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.store.select(selectGrid).subscribe((results) => {
      if (results) {
        this.activeGrid = results;
      } else {
        this.store
          .select(selectActiveGrid)
          .subscribe((res) => (this.activeGrid = res?.grid_active));
      }
    });
    this.store.dispatch(fetchActivateGrid());
    this.store
      .select(selectActiveGridGroupByNature)
      .subscribe((res) => (this.gridsByNature = res));
    this.store
      .select(selectActiveGridServices)
      .subscribe((res) => (this.gridsServices = res));
    this.store.select(selectHorsnormTransport).subscribe((res) => {
      this.grid_hornorme = res;
      this.grid_hornorme.length > 0
        ? (this.isloaded = true)
        : (this.isloaded = false);
      console.log(res, 'display 1');
    });
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedTabIndex = this.selectedTabIndex + 1;
    this.selectedTabIndex = tabChangeEvent.index;
  }

  uploadFile(event) {
    this.file = (event.target as HTMLInputElement).files[0];
  }

  onSubmitForm() {
    if (!this.activeGrid?.id) {
      this._toast.warn("Verifier qu'une grille est actif !");
      return;
    }
    if (!this.file) {
      this._toast.warn('Pas de fichier sélectioné !');
      return;
    }

    let formData: any = new FormData();
    formData.append('file', this.file);
    formData.append('grid_id', this.activeGrid?.id);
    // import grid by nature transport
    if (this.selectedTabIndex < this.nature_products.length) {
      formData.append('rubric', 'transport');
      formData.append('update_mode', 0);
      formData.append('nature', this.nature_products[this.selectedTabIndex]);
      //
      this.store.dispatch(importGridDetails({ data: formData }));
      return;
    }
    // import grid services
    if ((this.selectedTabIndex = this.nature_products.length + 1)) {
      formData.append('rubric', 'services');
      formData.append('update_mode', 0);
      //
      this.store.dispatch(importGridDetails({ data: formData }));
      return;
    }
  }
  openHorsnorms(): void {
    this.dialog.open(HorsnomsDialogComponent, {
      disableClose: true,
      width: '831px',
      data: {},
    });
  }
}

// Todo: clear file input when submited , add pagination.
