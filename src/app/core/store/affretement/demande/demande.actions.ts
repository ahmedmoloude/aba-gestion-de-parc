import { createAction, props } from '@ngrx/store';

export enum DemandeActionstypes {
  /* Load Demandes */
  LOAD_DEMANDES = '[Demande] Load Demandes',
  LOAD_DEMANDES_SUCCESS = '[Demande] Load Demandes Success',
  LOAD_DEMANDES_FAILURE = '[Demande] Load Demandes Failure',

  /* Load Cloesd Demandes */
  LOAD_CLOSED_DEMANDES = '[Demande] Load Closed Demandes',
  LOAD_CLOSED_DEMANDES_SUCCESS = '[Demande] Load Closed Demandes Success',
  LOAD_CLOSED_DEMANDES_FAILURE = '[Demande] Load Closed Demandes Failure',

  /* Update Demande Document Status */
  UPDATE_DEMANDE_DOCUMENT_STATUS = '[Document] Update Demande Document Status',
  UPDATE_DEMANDE_DOCUMENT_STATUS_SUCCESS = '[Document] Update Demande Document Status Success',
  UPDATE_DEMANDE_DOCUMENT_STATUS_FAILURE = '[Document] Update Demande Document Status Failure',

  /* Deliver Demande Documents */
  DELIVER_DEMANDE_DOCUMENTS = '[Document] Deliver Demande Documents',
  DELIVER_DEMANDE_DOCUMENTS_SUCCESS = '[Document] Deliver Demande Documents Success',
  DELIVER_DEMANDE_DOCUMENTS_FAILURE = '[Document] Deliver Demande Documents Failure',
}

/* Load Demandes Actions*/
export const loadDemandes = createAction(
  DemandeActionstypes.LOAD_DEMANDES,
  props<{ data: string }>()
);

export const loadDemandesSuccess = createAction(
  DemandeActionstypes.LOAD_DEMANDES_SUCCESS,
  props<{ data: any }>()
);

export const loadDemandesFailure = createAction(
  DemandeActionstypes.LOAD_DEMANDES_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Load Demandes Actions*/

/* Load Closed Demandes Actions*/

export const loadClosedDemandes = createAction(
  DemandeActionstypes.LOAD_CLOSED_DEMANDES,
  props<{ data: string }>()
);

export const loadClosedDemandesSuccess = createAction(
  DemandeActionstypes.LOAD_CLOSED_DEMANDES_SUCCESS,
  props<{ data: any }>()
);

export const loadClosedDemandesFailure = createAction(
  DemandeActionstypes.LOAD_CLOSED_DEMANDES_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Load Closed Demandes Actions*/

/* Update Demande Document Status Actions*/
export const updateDemandeDocumentStatus = createAction(
  DemandeActionstypes.UPDATE_DEMANDE_DOCUMENT_STATUS,
  props<{ data: any }>()
);

export const updateDemandeDocumentStatusSuccess = createAction(
  DemandeActionstypes.UPDATE_DEMANDE_DOCUMENT_STATUS_SUCCESS,
  props<{ data: any }>()
);

export const updateDemandeDocumentStatusFailure = createAction(
  DemandeActionstypes.UPDATE_DEMANDE_DOCUMENT_STATUS_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Update Demande Document Status Actions*/

/* Deliver Demande documents Actions*/
export const deliverDemandeDocuments = createAction(
  DemandeActionstypes.DELIVER_DEMANDE_DOCUMENTS,
  props<{ data: FormData }>()
);

export const deliverDemandeDocumentsSuccess = createAction(
  DemandeActionstypes.DELIVER_DEMANDE_DOCUMENTS_SUCCESS,
  props<{ data: any }>()
);

export const deliverDemandeDocumentsFailure = createAction(
  DemandeActionstypes.DELIVER_DEMANDE_DOCUMENTS_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Deliver Demande Documents Actions*/
