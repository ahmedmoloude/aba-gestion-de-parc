import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  ProductCategoryActionFailure,
} from './horsnormproduct.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.states';
import { ProductCategoryService } from 'app/core/services/ProductCategory.service';

@Injectable()
export class HorsNormProductEffect {
  constructor(
    private actions$: Actions,
    private ProductCategoryService: ProductCategoryService,
    private _toast: ToastService,
    private store: Store<AppState>,
  ) { }
  // fetchHornnormetype$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(fetchhornormProduct),
  //     switchMap(() => {
  //       let _Type_prd = ['Hors Norme'];
  //       return this.ProductCategoryService.getListProductNature(_Type_prd).pipe(
  //         map((res: any) => {
  //           console.log(res.response,'list hornormes');
  //           return fetchhornormProductSuccess({ payload: res.response });
  //         }),
  //         catchError((error) => {
  //           console.log(error);
  //           return of(
  //             ProductCategoryActionFailure({ action: 'Fetching grids', error })
  //           );
  //         })
  //       );
  //     })
  //   );
  // });

  // typeproductcategory$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(fetchallProductCategoryType),
  //     switchMap(() => {
  //       return this.ProductCategoryService.getProductType().pipe(
  //         map((res: any) => {
  //           console.log(res);
  //           return fetchallProductCategoryTypeSuccess({ payload: res.response });
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

  // createproductcategory$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(createProductCategory),
  //     switchMap(({data}) => {
        
  //       return this.ProductCategoryService.createProductType(data).pipe(
  //         map((res: any) => {
  //           this._toast.success('nature product a été ajouté avec succès !');
  //           const payload = res.response.product_category;
  //           return createProductCategorySuccess({ payload: payload });
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

  // allproductnature$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(fetchProductNature),
  //     switchMap(() => {
  //       let _Type_prd = ['Colis','Palette'];
  //       return this.ProductCategoryService.getListProductNature(_Type_prd).pipe(
  //         map((res: any) => {
  //           console.log(res);
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

  // deleteHorsNormesGrid$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(deleteNatureProduct),
  //     switchMap(({ uuid }) => {
  //       return this.ProductCategoryService.deleteNatureProduct(uuid).pipe(
  //         map((res: any) => {
  //           if (res.success) {
  //             this._toast.success('Nature Product supprimé avec succès !');
  //             return deleteNatureProductSuccess({ uuid });
  //           } else {
  //             this._toast.error('Une Erreur est survenu !');
  //           }
  //         }),
  //         catchError((error) => {
  //           this._toast.error('Une Erreur est survenu !');
  //           return of(
  //             ProductCategoryActionFailure({ action: 'Delete nature product', error })
  //           );
  //         })
  //       );
  //     })
  //   );
  // });

  // updateNatureProduct$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(updateNatureProduct),
  //     switchMap(({ uuid, data }) => {
  //       return this.ProductCategoryService.updateNatureProduct(data, uuid).pipe(
  //         map((res: any) => {
  //           if (res.success) {
  //             const payload = res.response;
  //             this._toast.success('Nature Product a été modifier avec succès !');
  //             console.log(payload, 'affichage');
  //             return updateNatureProductSuccess({ payload });
  //           } else {
  //             this._toast.error('Une Erreur est survenu !');
  //             return ProductCategoryActionFailure({
  //               action: 'Add new grid',
  //               error: res.message,
  //             });
  //           }
  //         }),
  //         catchError((error) => {
  //           this._toast.error('Une Erreur est survenu !');
  //           return of(
  //             ProductCategoryActionFailure({ action: 'Add new ', error })
  //           );
  //         })
  //       );
  //     })
  //   );
  // });

}
