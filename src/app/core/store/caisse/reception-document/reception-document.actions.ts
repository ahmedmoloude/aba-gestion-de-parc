import { createAction, props } from '@ngrx/store';

import { ReceptionDocument } from 'app/core/models/caisse/reception-document.model';
import { DocumentFilter } from 'app/core/models/caisse/filter/document-filter.model';

export enum DocumentActionstypes {
  /* Load Documents */
  LOAD_DOCUMENTS = '[Document] Load Documents',
  LOAD_DOCUMENTS_SUCCESS = '[Document] Load Documents Success',
  LOAD_DOCUMENTS_FAILURE = '[Document] Load Documents Failure',

  /* Load Checks */
  LOAD_CHECKS = '[Document] Load Checks',
  LOAD_CHECKS_SUCCESS = '[Document] Load Checks Success',
  LOAD_CHECKS_FAILURE = '[Document] Load Checks Failure',

  /* confirm Documents Reception */
  CONFIRM_DOCUMENTS_RECEPTION = '[Document] confirm Documents Reception',
  CONFIRM_DOCUMENTS_RECEPTION_SUCCESS = '[Document] confirm Documents Reception Success',
  CONFIRM_DOCUMENTS_RECEPTION_FAILURE = '[Document] confirm Documents Reception Failure',
}

/* Load Document Actions */
export const loadDocuments = createAction(
  DocumentActionstypes.LOAD_DOCUMENTS,
  props<{ data: DocumentFilter }>()
);

export const loadDocumentsSuccess = createAction(
  DocumentActionstypes.LOAD_DOCUMENTS_SUCCESS,
  props<{ data: ReceptionDocument[] }>()
);

export const loadDocumentsFailure = createAction(
  DocumentActionstypes.LOAD_DOCUMENTS_FAILURE,
  props<{ action: string; error: any }>()
);

/* Load Checks Actions */
export const loadChecks = createAction(
  DocumentActionstypes.LOAD_CHECKS,
  props<{ data: DocumentFilter }>()
);

export const loadChecksSuccess = createAction(
  DocumentActionstypes.LOAD_CHECKS_SUCCESS,
  props<{ data: ReceptionDocument[] }>()
);

export const loadChecksFailure = createAction(
  DocumentActionstypes.LOAD_CHECKS_FAILURE,
  props<{ action: string; error: any }>()
);

/* confirm Documents Reception Actions */
export const confirmDocumentsReception = createAction(
  DocumentActionstypes.CONFIRM_DOCUMENTS_RECEPTION,
  props<{ data: {documents: Array<number>} }>()
);

export const confirmDocumentsReceptionSuccess = createAction(
  DocumentActionstypes.CONFIRM_DOCUMENTS_RECEPTION_SUCCESS,
  props<{ data: number[] }>()
);

export const confirmDocumentsReceptionFailure = createAction(
  DocumentActionstypes.CONFIRM_DOCUMENTS_RECEPTION_FAILURE,
  props<{ action: string; error: any }>()
);
