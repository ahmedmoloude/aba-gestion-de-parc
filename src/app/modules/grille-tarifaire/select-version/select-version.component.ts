import { ConfirmationDialogComponent } from './../grille-palettes/confirmation-dialog/confirmation-dialog.component';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import {
  selectActiveGrid,
  selectGrid,
  selectGridIsLoading,
  selectPublicGrids,
} from 'app/core/store/grids/grids.selectors';
import { AddVersionComponent } from '../add-version/add-version.component';
import { selectedGrid, updateGrid } from 'app/core/store/grids/grids.actions';
import { ToastService } from 'app/services';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-select-version',
  templateUrl: './select-version.component.html',
  styleUrls: ['./select-version.component.css'],
})
export class SelectVersionComponent implements OnInit {
  @Input() data: any;
  isOpend: boolean = false;
  toggleClientList: boolean = true;
  information: any = {};
  versions = [];
  activeGrid: any;
  selectedGrid: any;
  listGrids$ = this.store.select(selectPublicGrids);
  isLoading$ = this.store.select(selectGridIsLoading);
  listGrids = [];

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private _toastService: ToastService,
    public permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectActiveGrid)
      .subscribe((res) => (this.activeGrid = res?.grid_active));
    this.store.select(selectGrid).subscribe((res) => (this.selectedGrid = res));
    // this.store.select(selectPublicGrids).subscribe(res => this.listGrids = res )
  }

  toogleisOpen() {
    this.isOpend = !this.isOpend;
  }

  checkInfoLength(): boolean {
    return Object.keys(this.information).length > 0 ? true : false;
  }
  openDialog(grid): void {
    if (this.isValidate(grid)) {
      this.dialog
        .open(ConfirmationDialogComponent, {
          width: '600px',
          data: {
            action: updateGrid,
            payload: {
              uuid: grid.uuid,
              data: {
                is_activated: !grid.is_activated,
              },
            },
            message: 'Êtes vous sûr de vouloir activer cette grille ?',
          },
        })
        .afterClosed()
        .subscribe((result) => {
          this.listGrids$ = this.store.select(selectPublicGrids);
          this.store
            .select(selectActiveGrid)
            .subscribe((res) => (this.activeGrid = res?.grid_active));
        });
    } else {
      this._toastService.warn('Veuillez compléter les données manquantes');
    }
  }
  openAddDialog(): void {
    this.toggleClientList = false;
    this.dialog.open(AddVersionComponent, {
      disableClose: true,
      width: '500px',
      data: this.data,
    });
  }

  isValidate(grid) {
    if (
      grid.grids_details &&
      grid.grids_details.services &&
      grid.grids_details.services.length != 0 &&
      grid.grids_details.transport &&
      grid.grids_details.transport.length != 0 &&
      grid.grids_details_hors_norme &&
      grid.grids_details_hors_norme.transport &&
      grid.grids_details_hors_norme.transport.length != 0
    ) {
      let data = {
        Colis: [],
        Palette: [],
      };
      grid.grids_details.transport.forEach((element) => {
        if (data[element.type_product_category])
          data[element.type_product_category].push(element);
      });
      return data.Colis.length != 0 && data.Palette.length != 0;
    }
    return false;
  }

  selectGrid(grid) {
    this.store.dispatch(selectedGrid({ grid: grid }));
  }
}
