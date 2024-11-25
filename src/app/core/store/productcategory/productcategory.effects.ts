import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  createProductCategory,
  createProductCategorySuccess,
  deleteNatureProduct,
  deleteNatureProductSuccess,
  fetchProductCategory,
  fetchProductCategorySuccess,
  ProductCategoryActionFailure,
  updateNatureProduct,
  updateNatureProductSuccess,
} from './productcategory.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.states';
import { ProductCategoryService } from 'app/core/services/ProductCategory.service';

@Injectable()
export class ProductCategoryEffect {
  constructor(
    private actions$: Actions,
    private ProductCategoryService: ProductCategoryService,
    private _toast: ToastService,
    private store: Store<AppState>,
  ) { }
  productcategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchProductCategory),
      switchMap(() => {
        return this.ProductCategoryService.getProductNature().pipe(
          map((res: any) => {
            //console.log(res.response.product_category,"list");
            return fetchProductCategorySuccess({ payload: res.response.product_category });
          }),
          catchError((error) => {
            return of(
              ProductCategoryActionFailure({ action: 'Fetching grids', error })
            );
          })
        );
      })
    );
  });

  createproductcategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createProductCategory),
      switchMap(({ data }) => {
        return this.ProductCategoryService.createProductType(data).pipe(
          map((res: any) => {
            this._toast.success('nature product a été ajouté avec succès !');
            const payload = res.response.product_category;
            console.log(res, 'ajoute response');
            return createProductCategorySuccess({ payload: payload });
          }),
          catchError((error) => {
            return of(
              ProductCategoryActionFailure({ action: 'Fetching grids', error })
            );
          })
        );
      })
    );
  });

  // allproductnature$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(fetchProductNature),
  //     switchMap(() => {
  //       let _Type_prd = ['Colis','Palette'];
  //       return this.ProductCategoryService.getListProductNature(_Type_prd).pipe(
  //         map((res: any) => {
  //           console.log(res,'fetch success');
  //           return fetchallProductNatureSuccess({ payload: res.response.product_category });
  //         }),
  //         catchError((error) => {
  //           return of(
  //             ProductCategoryActionFailure({ action: 'Fetching grids', error })
  //           );
  //         })
  //       );
  //     })
  //   );
  // });

  deleteHorsNormesGrid$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteNatureProduct),
      switchMap(({ uuid }) => {
        return this.ProductCategoryService.deleteNatureProduct(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              this._toast.success('Nature Product supprimé avec succès !');
              return deleteNatureProductSuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              ProductCategoryActionFailure({ action: 'Delete nature product', error })
            );
          })
        );
      })
    );
  });

  updateNatureProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateNatureProduct),
      switchMap(({ uuid, data }) => {
        return this.ProductCategoryService.updateNatureProduct(data, uuid).pipe(
          map((res: any) => {
            if (res.success) {
              const payload = res.response;
              this._toast.success('Nature Product a été modifier avec succès !');
              console.log(payload, 'affichage');
              return updateNatureProductSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return ProductCategoryActionFailure({
                action: 'Add new grid',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              ProductCategoryActionFailure({ action: 'Add new ', error })
            );
          })
        );
      })
    );
  });

}
