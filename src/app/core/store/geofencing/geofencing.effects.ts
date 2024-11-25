import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
    PolygonFailure,
    addPolygon,
    addPolygonSuccess
  } from './geofencing.actions';
import { ExtincteurService } from 'app/core/services/extincteur.service';

@Injectable()
export class GeofencingEffect {
  constructor(
    private actions$: Actions,
    private extincteurService: ExtincteurService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

//   getListExtincteur$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(fetchextincteurs),
//       switchMap(() => {
//         return this.extincteurService.getExtincteur().pipe(
//           map((res: any) => {
//             if (res.success) {
//               // console.log("store extincteur get",  res)
//               const payload = res.response;
//               return fetchextincteursSuccess({ payload });
//             } else {
//               this._toast.error('Une Erreur est survenu !');
//               return extincteurActionFailure({
//                 action: 'Fetching Extincteur',
//                 error: res.message,
//               });
//             }
//           }),
//           catchError((error) => {
//             this._toast.error('Une Erreur est survenu !');
//             return of(
//               extincteurActionFailure({
//                 action: 'Fetching Extincteur',
//                 error,
//               })
//             );
//           })
//         );
//       })
//     );
//   });

  createPolygon$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPolygon),
      switchMap(({ data }) => {
        return this.extincteurService.addExtincteur(data).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store extincteur add",  res)
              const payload = res.response;
              this._toast.success('Polygon ajouté avec succès !');
              return addPolygonSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return PolygonFailure({
                action: 'Add new polygon',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
                PolygonFailure({ action: 'Add new polygon', error })
            );
          })
        );
      })
    );
  });

//   updateContact$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(updateextincteur),
//       switchMap(({data, uuid }) => {
//         return this.extincteurService.updateExtincteur(data, uuid).pipe(
//           map((res: any) => {
//             if (res.success) {
//               // console.log("store extincteur update",  res)
//               const payload = res.response;
//               this._toast.success('Contact modifié avec succès !');
//               return updateextincteursuccess({ payload });
//             } else {
//               this._toast.error('Une Erreur est survenu !');
//               return extincteurActionFailure({
//                 action: 'Update contact',
//                 error: res.message,
//               });
//             }
//           }),
//           catchError((error) => {
//             this._toast.error('Une Erreur est survenu !');
//             return of(
//               extincteurActionFailure({ action: 'Update contact', error })
//             );
//           })
//         );
//       })
//     );
//   });

//   deleteContact$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(deleteextincteur),
//       switchMap(({ uuid }) => {
//         return this.extincteurService.deletExtincteur(uuid).pipe(
//           map((res: any) => {
//             if (res.success) {
//               // console.log("===== delete",res)
//               this._toast.success('Contact supprimé avec succès !');
//               return deleteextincteursuccess({ uuid });
//             } else {
//               this._toast.error('Une Erreur est survenu !');
//               return extincteurActionFailure({
//                 action: 'Delete contact',
//                 error: res.message,
//               });
//             }
//           }),
//           catchError((error) => {
//             this._toast.error('Une Erreur est survenu !');
//             return of(
//               extincteurActionFailure({ action: 'Delete contact', error })
//             );
//           })
//         );
//       })
//     );
//   });
}
