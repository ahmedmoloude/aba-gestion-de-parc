import { createAction, props } from '@ngrx/store';

export const PolygonFailure = createAction(
    '[polygons] polygons Action Failure',
    props<{ action: string; error: any }>()
);
export const addPolygon = createAction(
    '[polygons] polygons Action Add',
    props<{ data: any; }>()
);
export const addPolygonSuccess = createAction(
    '[polygons] polygons Action Success',
    props<{ payload: any; }>()
);