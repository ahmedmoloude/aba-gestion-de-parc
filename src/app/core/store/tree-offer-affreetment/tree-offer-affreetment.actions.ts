import { createAction, props } from '@ngrx/store';

export const resetTreeOfferAffretment = createAction('[tree Offer Affretment] Rest tree offer');
export const setTreeOfferModeAffretment = createAction('[tree Offer Affretment] Set mode tree offer',
  props<{ mode: 'READ' | 'CREATE' | 'UPDATE', disableActions: boolean }>());

export const fetchTreeOfferAffretment = createAction('[tree Offer Affretment] Get Tree Offer');
export const fetchTreeOfferSuccessAffretment = createAction(
  '[tree Offer Affretment] Get Tree Offer Success',
  props<{ payload: any }>()
);
export const treeOfferActionFailureAffretment = createAction(
  '[tree Offer Affretment] Get Tree Offer Action Failure',
  props<{ error: any }>()
);

/* --------- tree build ---------- */
// add transport convention
export const addConvTransportAffretment = createAction('[tree Offer Affretment] Add convention node transport');
export const addConvTransportSuccessAffretment = createAction('[tree Offer Affretment] Add convention node transport success',
  props<{ payload: any }>());
export const addConvTransportFailureAffretment = createAction('[tree Offer Affretment] Add convention node transport failure',
  props<{ error: any }>());

// delete transport convention
export const removeConvTransportAffretment = createAction('[tree Offer Affretment] Remove convention node transport',
  props<{ idx: number }>());

// add transport condition
export const addConditionTransportAffretment = createAction('[tree Offer Affretment] Add condition node transport',
  props<{ idx_convention: number, payload: any }>());
export const updateConditionTransportAffretment = createAction('[tree Offer Affretment] Update condition node transport',
  props<{ idx_convention: number, idx: number, payload: any }>());
export const removeConditionTransportAffretment = createAction('[tree Offer Affretment] Remove condition node transport',
  props<{ idx_convention: number, idx: number, }>());

// select services convention
export const selectConvServicesAffretment = createAction('[tree Offer Affretment] Select convention node services');
export const selectConvServicesSuccessAffretment = createAction('[tree Offer Affretment] Select convention node services success',
  props<{ payload: any[] }>());
export const selectConvServicesFailureAffretment = createAction('[tree Offer Affretment] Select convention node services failure',
  props<{ error: any }>());

// add services condition
export const addConditionServicesAffretment = createAction('[tree Offer Affretment] Add condition node services',
  props<{ idx_convention: number, payload: any }>());
export const updateConditionServicesAffretment = createAction('[tree Offer Affretment Affretment] Update condition node services Affretment',
  props<{ idx_convention: number, idx: number, payload: any }>());
export const removeConditionServicesAffretment = createAction('[tree Offer Affretment] Remove condition node services',
  props<{ idx_convention: number, idx: number }>());

/* ----------------------------- */

export const recreateMetaAfterDeleteConditionAffretment = createAction('[tree Offer Affretment] Recreate meta data conditions of a convention node',
  props<{ deleted_idx: number, entity: string, idx_convention?: number, conv_meta?: string }>());

/* tree output */
// all conditions
export const treeOutput_allConditionsSevices_delete_affretment = createAction('[tree Offer Affretment] Delete all services conditions');

// output new conditions to save
export const treeOutput_newConditions_add_affretment = createAction('[tree Offer Affretment] Add conditions to data to save',
  props<{ payload: any[] }>());
export const treeOutput_newConditions_delete_affretment = createAction('[tree Offer Affretment] Delete a condition from data to save',
  props<{ cond_id?: string, conv_id?: string }>());

export const treeOutput_newTemplateOffers_add_affretment = createAction('[tree Offer Affretment] Add template_offer to data to save',
  props<{ payload: any }>());
export const treeOutput_newTemplateOffers_delete_affretment = createAction('[tree Offer Affretment] Delete a template_offer from data to save',
  props<{ templatable_id: number }>());

// output conditions loaded from saved offer
export const treeOutput_savedConditions_load_affretment = createAction('[tree Offer Affretment] Load saved conditions',
  props<{ payload: any[] }>());
export const treeOutput_savedConditions_delete_affretment = createAction('[tree Offer Affretment] Delete from saved conditions',
  props<{ cond_id?: string, conv_id?: string }>());

// output conditions to delete
export const treeOutput_deleteConditions_add_affretment = createAction('[tree Offer Affretment] Add conditions to delete',
  props<{ payload: string[] }>());