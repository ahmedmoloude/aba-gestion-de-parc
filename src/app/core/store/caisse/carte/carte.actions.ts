import { createAction, props } from '@ngrx/store';
import { Carte } from 'app/core/models/caisse/carte.model';
import { CarteFilter } from 'app/core/models/caisse/filter/carte-filter.model';

export enum CaisseCarteActionstypes {
  /* Load CaisseCartes */
  LOAD_CAISSE_CARTES = '[CaisseCarte] Load CaisseCartes',
  LOAD_CAISSE_CARTES_SUCCESS = '[CaisseCarte] Load CaisseCartes Success',
  LOAD_CAISSE_CARTES_FAILURE = '[CaisseCarte] Load CaisseCartes Failure',

  /* Load CaisseCarte */
  LOAD_CAISSE_CARTE = '[CaisseCarte] Load CaisseCarte',
  LOAD_CAISSE_CARTE_SUCCESS = '[CaisseCarte] Load CaisseCarte Success',
  LOAD_CAISSE_CARTE_FAILURE = '[CaisseCarte] Load CaisseCarte Failure',

  /* Add CaisseCarte */
  ADD_CAISSE_CARTE = '[CaisseCarte] Add CaisseCarte',
  ADD_CAISSE_CARTE_SUCCESS = '[CaisseCarte] Add CaisseCarte Success',
  ADD_CAISSE_CARTE_FAILURE = '[CaisseCarte] Add CaisseCarte Failure',

  /* Feed CaisseCarte */
  FEED_CAISSE_CARTE = '[CaisseCarte] Feed CaisseCarte',
  FEED_CAISSE_CARTE_SUCCESS = '[CaisseCarte] Feed CaisseCarte Success',
  FEED_CAISSE_CARTE_FAILURE = '[CaisseCarte] Feed CaisseCarte Failure',

  /* Affect CaisseCarte */
  AFFECT_CAISSE_CARTE = '[CaisseCarte] Affect CaisseCarte',
  AFFECT_CAISSE_CARTE_SUCCESS = '[CaisseCarte] Affect CaisseCarte Success',
  AFFECT_CAISSE_CARTE_FAILURE = '[CaisseCarte] Affect CaisseCarte Failure',

  /* Disaffect CaisseCarte */
  DISAFFECT_CAISSE_CARTE = '[CaisseCarte] Disaffect CaisseCarte',
  DISAFFECT_CAISSE_CARTE_SUCCESS = '[CaisseCarte] Disaffect CaisseCarte Success',
  DISAFFECT_CAISSE_CARTE_FAILURE = '[CaisseCarte] Disaffect CaisseCarte Failure',

  /* Load Mouvement CaisseCarte */
  LOAD_MOUVEMENT_CAISSE_CARTE = '[CaisseCarte] Load Mouvement CaisseCarte',
  LOAD_MOUVEMENT_CAISSE_CARTE_SUCCESS = '[CaisseCarte] Load Mouvement CaisseCarte Success',
  LOAD_MOUVEMENT_CAISSE_CARTE_FAILURE = '[CaisseCarte] Load Mouvement CaisseCarte Failure',

  /* Delete CaisseCarte */
  DELETE_CAISSE_CARTE = '[CaisseCarte] Delete CaisseCarte',
  DELETE_CAISSE_CARTE_SUCCESS = '[CaisseCarte] Delete CaisseCarte Success',
  DELETE_CAISSE_CARTE_FAILURE = '[CaisseCarte] Delete CaisseCarte Failure',

}

/* Load CaisseCarte Actions */
export const loadCaisseCartes = createAction(
  CaisseCarteActionstypes.LOAD_CAISSE_CARTES,
  props<{ data: CarteFilter, per_page :number, page : number }>()
);

export const loadCaisseCartesSuccess = createAction(
  CaisseCarteActionstypes.LOAD_CAISSE_CARTES_SUCCESS,
  props<{ data: Carte[] }>()
);

export const loadCaisseCartesFailure = createAction(
  CaisseCarteActionstypes.LOAD_CAISSE_CARTES_FAILURE,
  props<{ action: string; error: any }>()
);

/* Load CaisseCarte Actions */
export const loadCaisseCarte = createAction(
  CaisseCarteActionstypes.LOAD_CAISSE_CARTE,
  props<{ data: any }>()
);

export const loadCaisseCarteSuccess = createAction(
  CaisseCarteActionstypes.LOAD_CAISSE_CARTE_SUCCESS,
  props<{ data: any }>()
);

export const loadCaisseCarteFailure = createAction(
  CaisseCarteActionstypes.LOAD_CAISSE_CARTE_FAILURE,
  props<{ action: string; error: any }>()
);

/* Add CaisseCarte Actions */
export const addCaisseCarte = createAction(
  CaisseCarteActionstypes.ADD_CAISSE_CARTE,
  props<{ data: Carte }>()
);

export const addCaisseCarteSuccess = createAction(
  CaisseCarteActionstypes.ADD_CAISSE_CARTE_SUCCESS,
  props<{ data: Carte }>()
);

export const addCaisseCarteFailure = createAction(
  CaisseCarteActionstypes.ADD_CAISSE_CARTE_FAILURE,
  props<{ action: string; error: any }>()
);

/* Feed CaisseCarte Actions */
export const feedCaisseCarte = createAction(
  CaisseCarteActionstypes.FEED_CAISSE_CARTE,
  props<{ data: FormData }>()
);

export const feedCaisseCarteSuccess = createAction(
  CaisseCarteActionstypes.FEED_CAISSE_CARTE_SUCCESS,
  props<{ data: any }>()
);

export const feedCaisseCarteFailure = createAction(
  CaisseCarteActionstypes.FEED_CAISSE_CARTE_FAILURE,
  props<{ action: string; error: any }>()
);

/* Affect CaisseCarte Actions */
export const affectCaisseCarte = createAction(
  CaisseCarteActionstypes.AFFECT_CAISSE_CARTE,
  props<{ data: {carte_id: number, agency_id: number, start_date: string} }>()
);

export const affectCaisseCarteSuccess = createAction(
  CaisseCarteActionstypes.AFFECT_CAISSE_CARTE_SUCCESS,
  props<{ data: Carte }>()
);

export const affectCaisseCarteFailure = createAction(
  CaisseCarteActionstypes.AFFECT_CAISSE_CARTE_FAILURE,
  props<{ action: string; error: any }>()
);

/* Disaffect CaisseCarte Actions */
export const disaffectCaisseCarte = createAction(
  CaisseCarteActionstypes.DISAFFECT_CAISSE_CARTE,
  props<{ data: string }>()
);

export const disaffectCaisseCarteSuccess = createAction(
  CaisseCarteActionstypes.DISAFFECT_CAISSE_CARTE_SUCCESS,
  props<{ data: Carte }>()
);

export const disaffectCaisseCarteFailure = createAction(
  CaisseCarteActionstypes.DISAFFECT_CAISSE_CARTE_FAILURE,
  props<{ action: string; error: any }>()
);

/* Load Mouvement CaisseCarte Actions */
export const loadMouvementCaisseCarte = createAction(
  CaisseCarteActionstypes.LOAD_MOUVEMENT_CAISSE_CARTE,
  props<{ data: any }>()
);

export const loadMouvementCaisseCarteSuccess = createAction(
  CaisseCarteActionstypes.LOAD_MOUVEMENT_CAISSE_CARTE_SUCCESS,
  props<{ data: any }>()
);

export const loadMouvementCaisseCarteFailure = createAction(
  CaisseCarteActionstypes.LOAD_MOUVEMENT_CAISSE_CARTE_FAILURE,
  props<{ action: string; error: any }>()
);

/* Delete CaisseCarte Actions */
export const deleteCaisseCarte = createAction(
  CaisseCarteActionstypes.DELETE_CAISSE_CARTE,
  props<{ data: string }>()
);

export const deleteCaisseCarteSuccess = createAction(
  CaisseCarteActionstypes.DELETE_CAISSE_CARTE_SUCCESS,
  props<{ data: any }>()
);

export const deleteCaisseCarteFailure = createAction(
  CaisseCarteActionstypes.DELETE_CAISSE_CARTE_FAILURE,
  props<{ action: string; error: any }>()
);
