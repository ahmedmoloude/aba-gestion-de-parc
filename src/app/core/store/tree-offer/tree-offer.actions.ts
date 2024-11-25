import { createAction, props } from '@ngrx/store';

export const resetTreeOffer = createAction('[tree Offer] Rest tree offer');
export const setTreeOfferMode = createAction('[tree Offer] Set mode tree offer',
  props<{ mode: 'READ' | 'CREATE' | 'UPDATE', disableActions: boolean }>());

export const fetchTreeOffer = createAction('[tree Offer] Get Tree Offer');
export const fetchTreeOfferSuccess = createAction(
  '[tree Offer] Get Tree Offer Success',
  props<{ payload: any }>()
);
export const treeOfferActionFailure = createAction(
  '[tree Offer] Get Tree Offer Action Failure',
  props<{ error: any }>()
);

/* --------- tree build ---------- */
// add transport convention
export const addConvTransport = createAction('[tree Offer] Add convention node transport');
export const addConvTransportSuccess = createAction('[tree Offer] Add convention node transport success',
  props<{ payload: any }>());
export const addConvTransportFailure = createAction('[tree Offer] Add convention node transport failure',
  props<{ error: any }>());

// delete transport convention
export const removeConvTransport = createAction('[tree Offer] Remove convention node transport',
  props<{ idx: number }>());

// add transport condition
export const addConditionTransport = createAction('[tree Offer] Add condition node transport',
  props<{ idx_convention: number, payload: any }>());
export const updateConditionTransport = createAction('[tree Offer] Update condition node transport',
  props<{ idx_convention: number, idx: number, payload: any }>());
export const removeConditionTransport = createAction('[tree Offer] Remove condition node transport',
  props<{ idx_convention: number, idx: number, }>());

// select services convention
export const selectConvServices = createAction('[tree Offer] Select convention node services');
export const selectConvServicesSuccess = createAction('[tree Offer] Select convention node services success',
  props<{ payload: any[] }>());
export const selectConvServicesFailure = createAction('[tree Offer] Select convention node services failure',
  props<{ error: any }>());

// add services condition
export const addConditionServices = createAction('[tree Offer] Add condition node services',
  props<{ idx_convention: number, payload: any }>());
export const updateConditionServices = createAction('[tree Offer] Update condition node services',
  props<{ idx_convention: number, idx: number, payload: any }>());
export const removeConditionServices = createAction('[tree Offer] Remove condition node services',
  props<{ idx_convention: number, idx: number }>());

/* ----------------------------- */

export const recreateMetaAfterDeleteCondition = createAction('[tree Offer] Recreate meta data conditions of a convention node',
  props<{ deleted_idx: number, entity: string, idx_convention?: number, conv_meta?: string }>());

/* tree output */
// all conditions
export const treeOutput_allConditionsSevices_delete = createAction('[tree Offer] Delete all services conditions');

// output new conditions to save
export const treeOutput_newConditions_add = createAction('[tree Offer] Add conditions to data to save',
  props<{ payload: any[] }>());
export const treeOutput_newConditions_delete = createAction('[tree Offer] Delete a condition from data to save',
  props<{ cond_id?: string, conv_id?: string }>());

export const treeOutput_newTemplateOffers_add = createAction('[tree Offer] Add template_offer to data to save',
  props<{ payload: any }>());
export const treeOutput_newTemplateOffers_delete = createAction('[tree Offer] Delete a template_offer from data to save',
  props<{ templatable_id: number }>());

// output conditions loaded from saved offer
export const treeOutput_savedConditions_load = createAction('[tree Offer] Load saved conditions',
  props<{ payload: any[] }>());
export const treeOutput_savedConditions_delete = createAction('[tree Offer] Delete from saved conditions',
  props<{ cond_id?: string, conv_id?: string }>());

// output conditions to delete
export const treeOutput_deleteConditions_add = createAction('[tree Offer] Add conditions to delete',
  props<{ payload: string[] }>());