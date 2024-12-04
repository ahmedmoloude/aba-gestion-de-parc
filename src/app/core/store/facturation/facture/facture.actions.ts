import { createAction, props } from '@ngrx/store';
import { Facture } from 'app/core/models/facturation/facture.model';
import { FactureFilter } from 'app/core/models/facturation/filters/facture-filter.model';
import { History } from 'app/core/models/facturation/history.model';
import { Prefacturation } from 'app/core/models/facturation/prefacturation.model';

export enum FactureActionstypes {
  /* Load Factures */
  LOAD_FACTURES = '[Facture] Load Factures',
  LOAD_FACTURES_SUCCESS = '[Facture] Load Factures Success',
  LOAD_FACTURES_FAILURE = '[Facture] Load Factures Failure',

  /* Load Facture */
  LOAD_FACTURE = '[Facture] Load Facture',
  LOAD_FACTURE_SUCCESS = '[Facture] Load Facture Success',
  LOAD_FACTURE_FAILURE = '[Facture] Load Facture Failure',

  /* Load Facture detail */
  LOAD_FACTURE_DETAIL = '[Facture] Load Facture Detail',
  LOAD_FACTURE_DETAIL_SUCCESS = '[Facture] Load Facture Detail Success',
  LOAD_FACTURE_DETAIL_FAILURE = '[Facture] Load Facture Detail Failure',

  /* Prepare Facture */
  PREPARE_FACTURE = '[Facture] Prepare Facture',
  PREPARE_FACTURE_SUCCESS = '[Facture] Prepare Facture Success',
  PREPARE_FACTURE_FAILURE = '[Facture] Prepare Facture Failure',

  /* Generate Facture */
  GENERATE_FACTURES = '[Facture] Generate Factures',
  GENERATE_FACTURES_SUCCESS = '[Facture] Generate Factures Success',
  GENERATE_FACTURES_FAILURE = '[Facture] Generate Factures Failure',

  /* Add Attachment To Facture */
  ADD_ATTACHMENT_FACTURE = '[Facture] Add Attachment To',
  ADD_ATTACHMENT_FACTURE_SUCCESS = '[Facture] Add Attachment To Facture Success',
  ADD_ATTACHMENT_FACTURE_FAILURE = '[Facture] Add Attachment To Facture Failure',

  /* Recalculate Facture */
  RECALCULATE_FACTURE = '[Facture] Recalculate Facture ',
  RECALCULATE_FACTURE_SUCCESS = '[Facture] Recalculate Facture Success',
  RECALCULATE_FACTURE_FAILURE = '[Facture] Recalculate Facture Failure',

  /* Load Factures History */
  LOAD_FACTURES_HISTORY = '[Facture] Load Factures History',
  LOAD_FACTURES_HISTORY_SUCCESS = '[Facture] Load Factures History Success',
  LOAD_FACTURES_HISTORY_FAILURE = '[Facture] Load Factures History Failure',

  /* Cancel Facture */
  CANCEL_FACTURE = '[Facture] Cancel Facture',
  CANCEL_FACTURE_SUCCESS = '[Facture] Cancel Facture Success',
  CANCEL_FACTURE_FAILURE = '[Facture] Cancel Facture Failure',

  /* Add Motif To Facture */
  ADD_MOTIF_FACTURE = '[Facture] Add Motif To',
  ADD_MOTIF_FACTURE_SUCCESS = '[Facture] Add Motif To Facture Success',
  ADD_MOTIF_FACTURE_FAILURE = '[Facture] Add Motif To Facture Failure',

  /* Load Payed Factures */
  LOAD_PAYED_FACTURES = '[Facture] Load Payed Factures',
  LOAD_PAYED_FACTURES_SUCCESS = '[Facture] Load Payed Factures Success',
  LOAD_PAYED_FACTURES_FAILURE = '[Facture] Load Payed Factures Failure',

  /* Load Customer Payed Factures */
  LOAD_CUSTOMER_PAYED_FACTURES = '[Facture] Load Customer Payed Factures',
  LOAD_CUSTOMER_PAYED_FACTURES_SUCCESS = '[Facture] Load Customer Payed Factures Success',
  LOAD_CUSTOMER_PAYED_FACTURES_FAILURE = '[Facture] Load Customer Payed Factures Failure',

  /* Cancel Facture */
  UPDATE_FACTURE = '[Facture] uPDATE Facture',

  /* Export Factures */
  EXPORT_FACTURES = '[Facture] Export Factures',
  EXPORT_FACTURES_SUCCESS = '[Facture] Export Factures Success',
  EXPORT_FACTURES_FAILURE = '[Facture] Export Factures Failure',

  /* Regenerate Affretement Facture */
  REGENERATE_AFFRETEMENT_FACTURE = '[Facture] Regenerate Affretement Facture',
  REGENERATE_AFFRETEMENT_FACTURE_SUCCESS = '[Facture] Regenerate Affretement Facture Success',
  REGENERATE_AFFRETEMENT_FACTURE_FAILURE = '[Facture] Regenerate Affretement Facture Failure',
}

/* Load Factures Actions */
export const loadFactures = createAction(
  FactureActionstypes.LOAD_FACTURES,
  props<{ data: FactureFilter, per_page :number, page : number}>()
);

export const loadFacturesSuccess = createAction(
  FactureActionstypes.LOAD_FACTURES_SUCCESS,
  props<{ data: Facture[]  }>()
);

export const loadFacturesFailure = createAction(
  FactureActionstypes.LOAD_FACTURES_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Load Factures Actions */

/* Load Facture Actions */
export const loadFacture = createAction(
  FactureActionstypes.LOAD_FACTURE,
);

export const loadFactureSuccess = createAction(
  FactureActionstypes.LOAD_FACTURE_SUCCESS,
  props<{ data: any }>()
);

export const loadFactureFailure = createAction(
  FactureActionstypes.LOAD_FACTURE_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Load Facture Actions */

/* Load Facture Detail Actions */
export const loadFactureDetail = createAction(
  FactureActionstypes.LOAD_FACTURE_DETAIL,
  props<{ data: string }>()
);

export const loadFactureDetailSuccess = createAction(
  FactureActionstypes.LOAD_FACTURE_DETAIL_SUCCESS,
  props<{ data: Facture }>()
);

export const loadFactureDetailFailure = createAction(
  FactureActionstypes.LOAD_FACTURE_DETAIL_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Load Facture Detail Actions */

/* Prepare Facture Actions */
export const prepareFacture = createAction(
  FactureActionstypes.PREPARE_FACTURE,
  props<{ data: {startDate: Date, activity: string, customer: string}}>()
);

export const prepareFactureSuccess = createAction(
  FactureActionstypes.PREPARE_FACTURE_SUCCESS,
  props<{ data: Prefacturation }>()
);

export const prepareFactureFailure = createAction(
  FactureActionstypes.PREPARE_FACTURE_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Prepare Facture Actions */

/* Generate Factures Actions */
export const generateFactures= createAction(
  FactureActionstypes.GENERATE_FACTURES,
  props<{ data: {startDate: Date, activity: string, customer: string}}>()
);

export const generateFacturesSuccess = createAction(
  FactureActionstypes.GENERATE_FACTURES_SUCCESS,
);

export const generateFacturesFailure = createAction(
  FactureActionstypes.GENERATE_FACTURES_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Generate Factures Actions */

/* Add Attachment To Facture Actions */
export const addAttachmentToFacture= createAction(
  FactureActionstypes.ADD_ATTACHMENT_FACTURE,
  props<{ data: FormData }>()
);

export const addAttachmentToFactureSuccess = createAction(
  FactureActionstypes.ADD_ATTACHMENT_FACTURE_SUCCESS,
  props<{ data: any }>()
);

export const addAttachmentToFactureFailure = createAction(
  FactureActionstypes.ADD_ATTACHMENT_FACTURE_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Add Attachment To Facture Actions */

/* Recalculate Facture Actions */
export const recalculateFacture= createAction(
  FactureActionstypes.RECALCULATE_FACTURE,
  props<{ data: FormData }>()
);

export const recalculateFactureSuccess = createAction(
  FactureActionstypes.RECALCULATE_FACTURE_SUCCESS,
  props<{ data: any }>()
);

export const recalculateFactureFailure = createAction(
  FactureActionstypes.RECALCULATE_FACTURE_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Recalculate Facture Actions */

/* Load Factures History Actions */
export const loadFacturesHistory = createAction(
  FactureActionstypes.LOAD_FACTURES_HISTORY,
  props<{ data: any, per_page :number, page : number  }>()

);

export const loadFacturesHistorySuccess = createAction(
  FactureActionstypes.LOAD_FACTURES_HISTORY_SUCCESS,
  props<{ data: History[]  }>()
);

export const loadFacturesHistoryFailure = createAction(
  FactureActionstypes.LOAD_FACTURES_HISTORY_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Load Factures HistoryActions */

/* Cancel Facture Actions */
export const cancelFacture = createAction(
  FactureActionstypes.CANCEL_FACTURE,
  props<{ data: string  }>()
);

export const cancelFactureSuccess = createAction(
  FactureActionstypes.CANCEL_FACTURE_SUCCESS,
  props<{ data: any }>()
);

export const cancelFactureFailure = createAction(
  FactureActionstypes.CANCEL_FACTURE_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Cancel Facture Actions */


/* Add Attachment To Facture Actions */
export const addMotifToFacture= createAction(
  FactureActionstypes.ADD_MOTIF_FACTURE,
  props<{ data: {motif: string, facture: string}  }>()
);

export const addMotifToFactureSuccess = createAction(
  FactureActionstypes.ADD_MOTIF_FACTURE_SUCCESS,
  props<{ data: any }>()
);

export const addMotifToFactureFailure = createAction(
  FactureActionstypes.ADD_MOTIF_FACTURE_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Add Attachment To Facture Actions */

/* Load Payed Factures Actions */
export const loadPayedFactures = createAction(
  FactureActionstypes.LOAD_PAYED_FACTURES,
);

export const loadPayedFacturesSuccess = createAction(
  FactureActionstypes.LOAD_PAYED_FACTURES_SUCCESS,
  props<{ data: Facture[]  }>()
);

export const loadPayedFacturesFailure = createAction(
  FactureActionstypes.LOAD_PAYED_FACTURES_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Load Payed Factures Actions */

/* Load Customer Payed Factures Actions */
export const loadCustomerPayedFactures = createAction(
  FactureActionstypes.LOAD_CUSTOMER_PAYED_FACTURES,
  props<{ data: number }>()
);

export const loadCustomerPayedFacturesSuccess = createAction(
  FactureActionstypes.LOAD_CUSTOMER_PAYED_FACTURES_SUCCESS,
  props<{ data: Facture[] }>()
);

export const loadCustomerPayedFacturesFailure = createAction(
  FactureActionstypes.LOAD_CUSTOMER_PAYED_FACTURES_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Load Customer Payed Factures Actions */

/* End Cancel Facture Actions */
export const updateFacture = createAction(
  FactureActionstypes.UPDATE_FACTURE,
  props<{ data: any }>()
);

/* Load Factures Actions */
export const exportFactures = createAction(
  FactureActionstypes.EXPORT_FACTURES,
  props<{ data: FactureFilter  }>()
);

export const exportFacturesSuccess = createAction(
  FactureActionstypes.EXPORT_FACTURES_SUCCESS,
  props<{ data: any }>()
);

export const exportFacturesFailure = createAction(
  FactureActionstypes.EXPORT_FACTURES_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Load Factures Actions */

/* Regenerate Affretement Facture Actions */
export const regenerateAffretementFacture = createAction(
  FactureActionstypes.REGENERATE_AFFRETEMENT_FACTURE,
  props<{ data: {facture_id: number, demande_ids: number[]}  }>()
);

export const regenerateAffretementFactureSuccess = createAction(
  FactureActionstypes.REGENERATE_AFFRETEMENT_FACTURE_SUCCESS,
  props<{ data: any }>()
);

export const regenerateAffretementFactureFailure = createAction(
  FactureActionstypes.REGENERATE_AFFRETEMENT_FACTURE_FAILURE,
  props<{ action: string; error: any }>()
);
/* END Regenerate Affretement Facture Actions */
