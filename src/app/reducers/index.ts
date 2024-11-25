import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { routerReducer } from '@ngrx/router-store';
import { environment } from '../../environments/environment';
import { taskReducer } from 'app/core/store/tasks/tasks.reducer';
import { profilReducer } from 'app/core/store/profil/profil.reducer';
import { accountReducer } from 'app/core/store/accounts/accounts.reducer';
import { prospectReducer } from 'app/core/store/prospects/prospects.reducer';
import { factureReducer } from 'app/core/store/facturation/facture/facture.reducer';

export interface State { }

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  profil: profilReducer,
  tasks: taskReducer,
  accounts: accountReducer,
  prospects : prospectReducer,

};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];
