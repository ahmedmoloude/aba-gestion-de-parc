import { createAction, props } from '@ngrx/store';
import { Complaint } from 'app/core/models';

export const fetshMotPorture = createAction('[Motporture] Fetch Motporture');

export const fetshActionFailure = createAction(
  '[Motporture] Fetch Motporture Failure',
  props<{ action: string; error: any }>()
);

export const fetshMotPortureSuccess = createAction(
  '[Motporture] Fetch Motporture Success',
  props<{ payload: any[] }>()
);











