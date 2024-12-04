import { Action, createReducer, on } from '@ngrx/store';
import * as DocumentActions from 'app/core/store/caisse/reception-document/reception-document.actions';
import { StateEnum } from '../carte/carte.reducer';
import { ReceptionDocument } from 'app/core/models/caisse/reception-document.model';

export const receptionDocumentFeatureKey = 'receptionDocument';

export interface receptionDocumentState {
  documents: ReceptionDocument[];
  receipt: number[];
  documentsState: StateEnum;
  errorMessage: { action: string; error: any } | null;
}

export const initialState: receptionDocumentState = {
  documents: null,
  receipt: null,
  documentsState: StateEnum.INIT,
  errorMessage: null,
};


export const receptionDocumentReducer = createReducer(
  initialState,
  on(DocumentActions.loadDocuments, state => ({...state, documentsState: StateEnum.LOADING})),
  on(DocumentActions.loadDocumentsSuccess, (state, {data}) => ({...state, documentsState: StateEnum.SUCCESS, documents: data})),
  on(DocumentActions.loadDocumentsFailure, (state, {error}) => ({...state, documentsState: StateEnum.ERROR, errorMessage: error})),
  on(DocumentActions.loadChecks, state => ({...state, documentsState: StateEnum.LOADING})),
  on(DocumentActions.loadChecksSuccess, (state, {data}) => ({...state, documentsState: StateEnum.SUCCESS, documents: data})),
  on(DocumentActions.loadChecksFailure, (state, {error}) => ({...state, documentsState: StateEnum.ERROR, errorMessage: error})),
  on(DocumentActions.confirmDocumentsReception, state => ({...state, documentsState: StateEnum.LOADING})),
  on(DocumentActions.confirmDocumentsReceptionSuccess, (state, {data}) => ({...state, documentsState: StateEnum.SUCCESS, receipt: data , documents: state.documents.map(v => {
    if (!data.includes(v.document_id)) {
      return v;
    }
  }).filter(v => v)})),
  on(DocumentActions.confirmDocumentsReceptionFailure, (state, {error}) => ({...state, documentsState: StateEnum.ERROR, errorMessage: error})),
);

