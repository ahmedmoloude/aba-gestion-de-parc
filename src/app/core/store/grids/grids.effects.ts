import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  gridActionFailure,
  fetchGrids,
  fetchGridsSuccess,
  importGridDetails,
  importGridDetailsSuccess,
  fetchActivateGrid,
  fetchActivateGridSuccess,
  updateGrid,
  updateGridSuccess,
  addGridDetails,
  addGridDetailsSuccess,
  deleteGridhorsnorm,
  deleteGridhorsnormSuccess,
  updateGridHorsnorm,
  updateGridhorsnormSuccess,
} from './grids.actions';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.states';

@Injectable()
export class GridsEffects {
  constructor(
    private actions$: Actions,
    private boGridService: BoGridService,
    private _toast: ToastService,
    private store: Store<AppState>,
  ) { }

  getListGrids$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchGrids),
      switchMap(() => {
        return this.boGridService.fetchListGrids('PUBLIC').pipe(
          map((res: any) => {
            const payload = res.response;
            return fetchGridsSuccess({ payload: payload });
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              gridActionFailure({ action: 'Fetching grids', error })
            );
          })
        );
      })
    );
  });

  getActivateGrids$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchActivateGrid),
      switchMap(() => {
        return this.boGridService.fetchActivateGrids().pipe(
          map((res: any) => {
            const payload = res.response;
            return fetchActivateGridSuccess({ payload });
          }),
          catchError((error) => {
            let message =
              error.error.status == 400
                ? 'Aucune grille activée'
                : error.response.message
            this._toast.error(message);
            return of(
              gridActionFailure({ action: 'Fetching active grids', error })
            );
          })
        );
      })
    );
  });

  importGridDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(importGridDetails),
      switchMap(({ data }) => {
        return this.boGridService.importGrid(data).pipe(
          map((res: any) => {
            this._toast.success('Import effectué avec succès !');
            this.store.dispatch(fetchActivateGrid());
            this.store.dispatch(fetchGrids());
            return importGridDetailsSuccess();
          }),
          catchError((err) => {
            const errorMsg = err?.error?.response ? err.error.response.message : "Une Erreur est survenu !"
            this._toast.error(errorMsg);
            return of(
              gridActionFailure({ action: 'Import grid details', error: errorMsg })
            );
          })
        );
      })
    );
  });

  updateGrid$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateGrid),
      switchMap(({ uuid, data }) => {
        return this.boGridService.updateGrid(uuid, data).pipe(
          map((res: any) => {
            if (res.success) {
              const payload = res.response;
              this._toast.success('Grille modifié avec succès !');
              this.store.dispatch(fetchActivateGrid())
              return updateGridSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return gridActionFailure({
                action: 'Update grid',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              gridActionFailure({ action: 'Update grid', error })
            );
          })
        );
      })
    );
  });

  /* hors normes */
  createHorsNormeGrid$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addGridDetails),
      switchMap(({ data }) => {
        return this.boGridService.addGridDetail(data).pipe(
          map((res: any) => {
            if (res.success) {
              console.log(res.response, "good");
              const payload = res.response;
              console.log(payload, "payload");
              this._toast.success('hors norm a été ajouté avec succès !');
              return addGridDetailsSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return gridActionFailure({
                action: 'Add new grid',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              gridActionFailure({ action: 'Add new grid', error })
            );
          })
        );
      })
    );
  });
  updateHorsNormeGrid$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateGridHorsnorm),
      switchMap(({ uuid, data }) => {
        return this.boGridService.updateGridDetail(data, uuid).pipe(
          map((res: any) => {
            if (res.success) {
              const payload = res.response;
              this._toast.success('Hors norm a été modifier avec succès !');
              console.log(payload, 'affichage');
              return updateGridhorsnormSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return gridActionFailure({
                action: 'Add new grid',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              gridActionFailure({ action: 'Add new grid', error })
            );
          })
        );
      })
    );
  });

  deleteHorsNormesGrid$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteGridhorsnorm),
      switchMap(({ uuid }) => {
        return this.boGridService.deleteGridDetail(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              this._toast.success('hors norm a été  supprimé avec succès !');
              return deleteGridhorsnormSuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return gridActionFailure({
                action: 'Delete grid',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              gridActionFailure({ action: 'Delete grid', error })
            );
          })
        );
      })
    );
  });
}
