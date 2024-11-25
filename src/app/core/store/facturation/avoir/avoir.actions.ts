import { createAction, props } from '@ngrx/store';
import { Avoir } from 'app/core/models/facturation/avoir.model';
import { AvoirFilter } from 'app/core/models/facturation/filters/avoir-filter.model';


export enum AvoirActionstypes {
  /* Load Avoirs */
  LOAD_AVOIRS = '[Avoir] Load Avoirs',
  LOAD_AVOIRS_SUCCESS = '[Avoir] Load Avoirs Success',
  LOAD_AVOIRS_FAILURE = '[Avoir] Load Avoirs Failure',

  /* Load Avoir */
  LOAD_AVOIR = '[Avoir] Load Avoir',
  LOAD_AVOIR_SUCCESS = '[Avoir] Load Avoir Success',
  LOAD_AVOIR_FAILURE = '[Avoir] Load Avoir Failure',

  /* Create Avoir */
  CREATE_AVOIR = '[Avoir] Create Avoir',
  CREATE_AVOIR_SUCCESS = '[Avoir] Create Avoir Success',
  CREATE_AVOIR_FAILURE = '[Avoir] Create Avoir Failure',

  /* Update Avoir */
  UPDATE_AVOIR = '[Avoir] Update Avoir',
  UPDATE_AVOIR_SUCCESS = '[Avoir] Update Avoir Success',
  UPDATE_AVOIR_FAILURE = '[Avoir] Update Avoir Failure',

  /* Delete Avoir */
  DELETE_AVOIR = '[Avoir] Delete Avoir',
  DELETE_AVOIR_SUCCESS = '[Avoir] Delete Avoir Success',
  DELETE_AVOIR_FAILURE = '[Avoir] Delete Avoir Failure',

  /* Load Facture Avoir */
  LOAD_FACTURE_AVOIR = '[Facture] Load Facture Avoir',
  LOAD_FACTURE_AVOIR_SUCCESS = '[Facture] Load Facture Avoir Success',
  LOAD_FACTURE_AVOIR_FAILURE = '[Facture] Load Facture Avoir Failure',

  /* Load Convention Client  Avoir */
  LOAD_CONVENTION_CLIENT = '[String] Load Convention Client',
  LOAD_CONVENTION_CLIENT_SUCCESS = '[String] Load Convention Client Success',
  LOAD_CONVENTION_CLIENT_FAILURE = '[String] Load Convention Client Failure',

  /* Export Avoirs */
  EXPORT_AVOIRS = '[Avoir] Export Avoirs',
  EXPORT_AVOIRS_SUCCESS = '[Avoir] Export Avoirs Success',
  EXPORT_AVOIRS_FAILURE = '[Avoir] Export Avoirs Failure',

  /* Load Rapport Avoir */
  LOAD_RAPPORT_AVOIR = '[Avoir] Load Rapport Avoir',
  LOAD_RAPPORT_AVOIR_SUCCESS = '[Avoir] Load Rapport Avoir Success',
  LOAD_RAPPORT_AVOIR_FAILURE = '[Avoir] Load Rapport Avoir Failure',

    /* Export PDF Avoir */
    EXPORT_PDF_AVOIR = '[Avoir] Export PDF Avoir',
    EXPORT_PDF_AVOIR_SUCCESS = '[Avoir] Export PDF Avoir Success',
    EXPORT_PDF_AVOIR_FAILURE = '[Avoir] Export PDF Avoir Failure',
}

/* Load Avoirs Actions */
export const loadAvoirs = createAction(
  AvoirActionstypes.LOAD_AVOIRS,
  props<{ data: AvoirFilter, per_page :number, page : number }>()
);

export const loadAvoirsSuccess = createAction(
  AvoirActionstypes.LOAD_AVOIRS_SUCCESS,
  props<{ data: any }>()
);

export const loadAvoirsFailure = createAction(
  AvoirActionstypes.LOAD_AVOIRS_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Load Avoirs Actions */

/* Load Avoir Actions */
export const loadAvoir = createAction(
  AvoirActionstypes.LOAD_AVOIR,
  props<{ uuid: string }>()
);

export const loadAvoirSuccess = createAction(
  AvoirActionstypes.LOAD_AVOIR_SUCCESS,
  props<{ data: any }>()
);

export const loadAvoirFailure = createAction(
  AvoirActionstypes.LOAD_AVOIR_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Load Avoir Actions */

/* Create Avoir Actions */
export const createAvoir = createAction(
  AvoirActionstypes.CREATE_AVOIR,
  props<{ data: FormData }>()
);

export const createAvoirSuccess = createAction(
  AvoirActionstypes.CREATE_AVOIR_SUCCESS,
  props<{ data: Avoir }>()
);

export const createAvoirFailure = createAction(
  AvoirActionstypes.CREATE_AVOIR_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Create Avoir Actions */

/* Update Avoir Actions */
export const updateAvoir = createAction(
  AvoirActionstypes.UPDATE_AVOIR,
  props<{ data: any }>()
);

export const updateAvoirSuccess = createAction(
  AvoirActionstypes.UPDATE_AVOIR_SUCCESS,
  props<{ data: any }>()
);

export const updateAvoirFailure = createAction(
  AvoirActionstypes.UPDATE_AVOIR_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Update Avoir Actions */

/* Delete Avoir Actions */
export const deleteAvoir = createAction(
  AvoirActionstypes.DELETE_AVOIR,
  props<{ uuid: string }>()
);

export const deleteAvoirSuccess = createAction(
  AvoirActionstypes.DELETE_AVOIR_SUCCESS,
  props<{ data: any }>()
);

export const deleteAvoirFailure = createAction(
  AvoirActionstypes.DELETE_AVOIR_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Delete Avoir Actions */

/* Load Facture Avoir Actions */
export const loadFactureAvoir = createAction(
  AvoirActionstypes.LOAD_FACTURE_AVOIR,
  props<{ reference: string }>()
);

export const loadFactureAvoirSuccess = createAction(
  AvoirActionstypes.LOAD_FACTURE_AVOIR_SUCCESS,
  props<{ data: any }>()
);

export const loadFactureAvoirFailure = createAction(
  AvoirActionstypes.LOAD_FACTURE_AVOIR_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Load Facture Avoir Actions */

/* Load Convention Client Actions */
export const loadConventionClient = createAction(
  AvoirActionstypes.LOAD_CONVENTION_CLIENT,
  props<{ uuid: string }>()
);

export const loadConventionClientSuccess = createAction(
  AvoirActionstypes.LOAD_CONVENTION_CLIENT_SUCCESS,
  props<{ data: any }>()
);

export const loadConventionClientFailure = createAction(
  AvoirActionstypes.LOAD_CONVENTION_CLIENT_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Load Convention Client Actions */

/* Export Avoirs Actions */
export const exportAvoirs = createAction(
  AvoirActionstypes.EXPORT_AVOIRS,
);

export const exportAvoirsSuccess = createAction(
  AvoirActionstypes.EXPORT_AVOIRS_SUCCESS,
  props<{ data: any }>()
);

export const exportAvoirsFailure = createAction(
  AvoirActionstypes.EXPORT_AVOIRS_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Export Avoirs Actions */

/* Load rapport Avoir Actions */
export const loadRapportAvoir = createAction(
  AvoirActionstypes.LOAD_RAPPORT_AVOIR,
);

export const loadRapportAvoirSuccess = createAction(
  AvoirActionstypes.LOAD_RAPPORT_AVOIR_SUCCESS,
  props<{ data: any }>()
);

export const loadRapportAvoirFailure = createAction(
  AvoirActionstypes.LOAD_RAPPORT_AVOIR_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Load rapport Avoir Actions */

/* Export Avoirs Actions */
export const exportPdfAvoir = createAction(
  AvoirActionstypes.EXPORT_PDF_AVOIR,
  props<{ data: number }>()
);

export const exportPdfAvoirSuccess = createAction(
  AvoirActionstypes.EXPORT_PDF_AVOIR_SUCCESS,
  props<{ data: any }>()
);

export const exportPdfAvoirFailure = createAction(
  AvoirActionstypes.EXPORT_PDF_AVOIR_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Export Avoirs Actions */
