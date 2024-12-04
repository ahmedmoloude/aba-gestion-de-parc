import { ProduitDialogComponent } from './produit-dialog/produit-dialog.component';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { PermissionService } from 'app/core/services/permission.service';
import { AppState } from 'app/core/store/app.states';
import {
  deleteNatureProduct,
  fetchProductCategory,
  fetchProductNature,
} from 'app/core/store/productcategory/productcategory.actions';
import {
  selectNatureProduct,
  selectTypeIsLoading,
} from 'app/core/store/productcategory/productcategory.selector';

@Component({
  selector: 'app-parametre-produit',
  templateUrl: './parametre-produit.component.html',
  styleUrls: ['./parametre-produit.component.css'],
})
export class ParametreProduitComponent implements OnInit {
  headerColumuns = ['Catégorie', 'Nature'];
  produits: any;
  natures_product: any = null;
  data: any = null;
  load: boolean = false;
  page: number = 1;
  isLoading$ = this.store.select(selectTypeIsLoading);

  constructor(public dialog: MatDialog, private store: Store<AppState>,
    public permissionService: PermissionService) {}

  ngOnInit(): void {
    this.store.select(selectNatureProduct).subscribe((res) => {
      (this.natures_product = res),
      console.log("PRODUCT", this.natures_product);
        (this.natures_product = this.natures_product.filter(
          (g) => g.type != 'Hors Norme'
        ));
    });
  }

  openDialogDetails(): void {
    this.dialog.open(ProduitDialogComponent, {
      disableClose: true,
      width: '631px',
      data: {},
    });
  }

  openProductCategoryupdate(item: any) {
    this.dialog.open(ProduitDialogComponent, {
      disableClose: true,
      width: '631px',
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
