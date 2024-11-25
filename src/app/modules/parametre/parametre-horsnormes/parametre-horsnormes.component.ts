import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import {
  deleteNatureProduct,
  fetchProductCategory,
} from 'app/core/store/productcategory/productcategory.actions';
import {
  selectNatureProduct,
  selectTypeIsLoading,
} from 'app/core/store/productcategory/productcategory.selector';
import { environment } from 'environments/environment';
import { HorsnormesDialogComponent } from './horsnormes-dialog/horsnormes-dialog.component';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-parametre-horsnormes',
  templateUrl: './parametre-horsnormes.component.html',
  styleUrls: ['./parametre-horsnormes.component.css'],
})
export class ParametreHorsnormesComponent implements OnInit {
  headerColumuns = ['Label', 'Valeur'];
  page: number = 1;
  natures_horsnorm: any = null;
  url = environment.STORAGE + '/storage/product_category_img/';
  isLoading$ = this.store.select(selectTypeIsLoading);
  constructor(public dialog: MatDialog, private store: Store<AppState>,
    public permissionService: PermissionService) {
    this.store.select(selectNatureProduct).subscribe((res) => {
      (this.natures_horsnorm = res),
        (this.natures_horsnorm = this.natures_horsnorm.filter(
          (g) => g.type != 'Colis' && g.type != 'Palette'
        ));
    });
  }

  ngOnInit(): void {}

  openDialogDetails(): void {
    this.dialog.open(HorsnormesDialogComponent, {
      disableClose: true,
      width: '630px',
      data: {},
    });
  }

  openProductCategoryupdate(item: any) {
    this.dialog.open(HorsnormesDialogComponent, {
      disableClose: true,
      width: '630px',
      data: {
        type: item.type,
        title: item.title,
        uuid: item.uuid,
      },
    });
  }

  delete(uuid: string) {
    console.log(uuid);
    this.store.dispatch(deleteNatureProduct({ uuid }));
  }
}
