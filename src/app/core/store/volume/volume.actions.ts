import { createAction, props } from '@ngrx/store';

export const volumeActionFailure = createAction(
  '[volume] volume Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchvolume = createAction(
  '[volume] Fetch List volume'
);
export const fetchvolumeSuccess = createAction(
  '[volume] Fetch List volume Success',
  props<{ payload: any[] }>()
);

export const addvolume = createAction(
  '[volume] Add volume',
  props<{ data: any }>()
);
export const addvolumeuccess = createAction(
  '[volume] Add volume Success',
  props<{ payload: any }>()
);

export const updatevolume = createAction(
  '[volume] Update volume',
  props<{ data: any,  uuid: string  }>()
);
export const updatevolumeuccess = createAction(
  '[volume] Update volume Success',
  props<{ payload: any }>()
);

export const deletevolume = createAction(
  '[volume] Delete volume',
  props<{ uuid: string }>()
);
export const deletevolumeuccess = createAction(
  '[volume] Delete volume Success',
  props<{ uuid: string }>()
);
