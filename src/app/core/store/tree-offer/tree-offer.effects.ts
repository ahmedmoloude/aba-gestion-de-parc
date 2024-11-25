import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  fetchTreeOffer,
  fetchTreeOfferSuccess,
  treeOfferActionFailure,
} from './tree-offer.actions';
import { BoOfferService } from 'app/core/services/admin-bo/bo-offers.service';

@Injectable()
export class TreeOfferEffects {
  constructor(
    private actions$: Actions,
    private boOfferService: BoOfferService,
    private _toast: ToastService,

  ) { }

  // getTreeOffer$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(fetchTreeOffer),
  //     switchMap(({ fullTree, uuid }) => {
  //       return this.boOfferService.getOffer(uuid).pipe(
  //         map((res: any) => {
  //           const payload = res.response;
  //           return fetchTreeOfferSuccess({ payload, fullTree });
  //         }),
  //         catchError((error) => {
  //           this._toast.error('Une Erreur est survenu !');
  //           return of(
  //             treeOfferActionFailure({ action: 'Get Tree Offer', error })
  //           );
  //         })
  //       );
  //     })
  //   );
  // });


  // getListGrids$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(fetchGrids),
  //     switchMap(() => {
  //       return this.boGridService.fetchListGrids().pipe(
  //         map((res: any) => {
  //           // const payload = res.response;
  //           return fetchGridsSuccess({ payload: res });
  //         }),
  //         catchError((error) => {
  //           this._toast.error('Une Erreur est survenu !');
  //           return of(
  //             gridActionFailure({ action: 'Fetching grids', error })
  //           );
  //         })
  //       );
  //     })
  //   );
  // });
}
