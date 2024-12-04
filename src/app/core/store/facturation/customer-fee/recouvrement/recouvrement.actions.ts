import { createAction, props } from '@ngrx/store';
import { RecouvrementFilter } from 'app/core/models/facturation/filters/recouvrement-filter.model';


export enum RecouvrementActionstypes {
  /* Load Total Recouvrements */
  LOAD_TOTAL_RECOUVREMENTS = '[Recouvrement] Load Total Recouvrements',
  LOAD_TOTAL_RECOUVREMENTS_SUCCESS = '[Recouvrement] Load Total Recouvrements Success',
  LOAD_TOTAL_RECOUVREMENTS_FAILURE = '[Recouvrement] Load Total Recouvrements Failure',

  /* Load Recouvrements */
  LOAD_RECOUVREMENTS = '[Recouvrement] Load Recouvrements',
  LOAD_RECOUVREMENTS_SUCCESS = '[Recouvrement] Load Recouvrements Success',
  LOAD_RECOUVREMENTS_FAILURE = '[Recouvrement] Load Recouvrements Failure',

  /* Load Recouvrement */
  LOAD_RECOUVREMENT = '[Recouvrement] Load Recouvrement',
  LOAD_RECOUVREMENT_SUCCESS = '[Recouvrement] Load Recouvrement Success',
  LOAD_RECOUVREMENT_FAILURE = '[Recouvrement] Load Recouvrement Failure',

  /* Load Recouvrement By Range */
  LOAD_RECOUVREMENTS_BY_RANGE = '[Recouvrement] Load Recouvrements By Range',
  LOAD_RECOUVREMENTS_BY_RANGE_SUCCESS = '[Recouvrement] Load Recouvrements Success By Range',
  LOAD_RECOUVREMENTS_BY_RANGE_FAILURE = '[Recouvrement] Load Recouvrements Failure By Range',
}

/* Load Recouvrements Actions */
export const loadTotalRecouvrements = createAction(
  RecouvrementActionstypes.LOAD_TOTAL_RECOUVREMENTS,
);

export const loadTotalRecouvrementsSuccess = createAction(
  RecouvrementActionstypes.LOAD_TOTAL_RECOUVREMENTS_SUCCESS,
  props<{ data: any }>()
);

export const loadTotalRecouvrementsFailure = createAction(
  RecouvrementActionstypes.LOAD_TOTAL_RECOUVREMENTS_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Load Recouvrements Actions */

/* Load Recouvrements Actions */
export const loadRecouvrements = createAction(
  RecouvrementActionstypes.LOAD_RECOUVREMENTS,
  props<{ data: RecouvrementFilter, per_page :number, page : number}>()

);

export const loadRecouvrementsSuccess = createAction(
  RecouvrementActionstypes.LOAD_RECOUVREMENTS_SUCCESS,
  props<{ data: any }>()
);

export const loadRecouvrementsFailure = createAction(
  RecouvrementActionstypes.LOAD_RECOUVREMENTS_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Load Recouvrements Actions */


/* Load Recouvrement Actions */
export const loadRecouvrement = createAction(
  RecouvrementActionstypes.LOAD_RECOUVREMENT,
  props<{ data: number }>()

);

export const loadRecouvrementSuccess = createAction(
  RecouvrementActionstypes.LOAD_RECOUVREMENT_SUCCESS,
  props<{ data: any }>()
);

export const loadRecouvrementFailure = createAction(
  RecouvrementActionstypes.LOAD_RECOUVREMENT_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Load Recouvrement Actions */

/* Load Recouvrements  By Range  Actions */
export const loadRecouvrementsByRange = createAction(
  RecouvrementActionstypes.LOAD_RECOUVREMENTS_BY_RANGE,
  props<{ data: string }>()

);

export const loadRecouvrementsByRangeSuccess = createAction(
  RecouvrementActionstypes.LOAD_RECOUVREMENTS_BY_RANGE_SUCCESS,
  props<{ data: any }>()
);

export const loadRecouvrementsByRangeFailure = createAction(
  RecouvrementActionstypes.LOAD_RECOUVREMENTS_BY_RANGE_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Load Recouvrements By Range Actions */
