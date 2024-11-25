import { createAction, props } from '@ngrx/store';

export enum DemandePiecesActionsType {
  /* Load Demande Pieces List*/
  LOAD_DEMANDE_PIECES_LIST = '[DemandePieces] Load Demande Pieces List',
  LOAD_DEMANDE_PIECES_LIST_SUCCESS = '[DemandePieces] Load Demande Pieces List Success',
  LOAD_DEMANDE_PIECES_LIST_FAILURE = '[DemandePieces] Load Demande Pieces List Failure',

  /* Load Demande Pieces Historic */
  LOAD_DEMANDE_PIECES_HISTORIC = '[DemandePieces] Load Demande Pieces Historic',
  LOAD_DEMANDE_PIECES_HISTORIC_SUCCESS = '[DemandePieces] Load Demande Pieces Historic Success',
  LOAD_DEMANDE_PIECES_HISTORIC_FAILURE = '[DemandePieces] Load Demande Pieces Historic Failure',

  /* Load Demande Pieces Detail */
  LOAD_DEMANDE_PIECES_DETAIL = '[DemandePieces] Load Demande Pieces Detail',
  LOAD_DEMANDE_PIECES_DETAIL_SUCCESS = '[DemandePieces] Load Demande Pieces Detail Success',
  LOAD_DEMANDE_PIECES_DETAIL_FAILURE = '[DemandePieces] Load Demande Pieces Detail Failure',

  /* Load Demande Pieces Bon Commande */
  LOAD_DEMANDE_PIECES_BON_COMMANDE = '[DemandePieces] Load Demande Pieces Bon Commande',
  LOAD_DEMANDE_PIECES_BON_COMMANDE_SUCCESS = '[DemandePieces] Load Demande Pieces Bon Commande Success',
  LOAD_DEMANDE_PIECES_BON_COMMANDE_FAILURE = '[DemandePieces] Load Demande Pieces Bon Commande Failure',

  /* Load Demande Pieces Bon Achat */
  LOAD_DEMANDE_PIECES_BON = '[DemandePieces] Load Demande Pieces Bon Achat',
  LOAD_DEMANDE_PIECES_BON_SUCCESS = '[DemandePieces] Load Demande Pieces Bon Achat Success',
  LOAD_DEMANDE_PIECES_BON_FAILURE = '[DemandePieces] Load Demande Pieces Bon Achat Failure',

  /* Generate Demande Pieces Bon Achat */
  GENERATE_DEMANDE_PIECES_BON_ACHAT = '[DemandePieces] Generate Demande Pieces Bon Achat',
  GENERATE_DEMANDE_PIECES_BON_ACHAT_SUCCESS = '[DemandePieces] Generate Demande Pieces Bon Achat Success',
  GENERATE_DEMANDE_PIECES_BON_ACHAT_FAILURE = '[DemandePieces] Generate Demande Pieces Bon Achat Failure',

  /* Load Demande Pieces Bon Sortie Partiel */
  LOAD_DEMANDE_PIECES_BON_SORTIE = '[DemandePieces] Load Demande Pieces Bon Sortie Partiel',
  LOAD_DEMANDE_PIECES_BON_SORTIE_SUCCESS = '[DemandePieces] Load Demande Pieces Bon Sortie Partiel Success',
  LOAD_DEMANDE_PIECES_BON_SORTIE_FAILURE = '[DemandePieces] Load Demande Pieces Bon Sortie Partiel Failure',

  /* Complete Demande Pieces Commande */
  COMPLETE_DEMANDE_PIECES_COMMANDE = '[DemandePieces] Complete Demande Pieces Commande',
  COMPLETE_DEMANDE_PIECES_COMMANDE_SUCCESS = '[DemandePieces] Complete Demande Pieces Commande Success',
  COMPLETE_DEMANDE_PIECES_COMMANDE_FAILURE = '[DemandePieces] Complete Demande Pieces Commande Failure',

  /* Add Demande Pieces Attachment */
  ADD_DEMANDE_PIECES_ATTACHMENT = '[DemandePieces] Add Demande Pieces Attachment',
  ADD_DEMANDE_PIECES_ATTACHMENT_SUCCESS = '[DemandePieces] Add Demande Pieces Attachment Success',
  ADD_DEMANDE_PIECES_ATTACHMENT_FAILURE = '[DemandePieces] Add Demande Pieces Attachment Failure',
}

/* Load Demande Pieces List Actions */
export const loadDemandePiecesList = createAction(
  DemandePiecesActionsType.LOAD_DEMANDE_PIECES_LIST,
  props<{ data: any }>()
);

export const loadDemandePiecesListSuccess = createAction(
  DemandePiecesActionsType.LOAD_DEMANDE_PIECES_LIST_SUCCESS,
  props<{ data: any }>()
);

export const loadDemandePiecesListFailure = createAction(
  DemandePiecesActionsType.LOAD_DEMANDE_PIECES_LIST_FAILURE,
  props<{ action: string; error: any }>()
);

/* Load Demande Pieces Historic Actions */
export const loadDemandePiecesHistoric = createAction(
  DemandePiecesActionsType.LOAD_DEMANDE_PIECES_HISTORIC,
  props<{ data: any }>()
);

export const loadDemandePiecesHistoricSuccess = createAction(
  DemandePiecesActionsType.LOAD_DEMANDE_PIECES_HISTORIC_SUCCESS,
  props<{ data: any }>()
);

export const loadDemandePiecesHistoricFailure = createAction(
  DemandePiecesActionsType.LOAD_DEMANDE_PIECES_HISTORIC_FAILURE,
  props<{ action: string; error: any }>()
);

/* Load Demande Pieces Detail Actions */
export const loadDemandePiecesDetail = createAction(
  DemandePiecesActionsType.LOAD_DEMANDE_PIECES_DETAIL,
  props<{ data: any }>()
);

export const loadDemandePiecesDetailSuccess = createAction(
  DemandePiecesActionsType.LOAD_DEMANDE_PIECES_DETAIL_SUCCESS,
  props<{ data: any }>()
);

export const loadDemandePiecesDetailFailure = createAction(
  DemandePiecesActionsType.LOAD_DEMANDE_PIECES_DETAIL_FAILURE,
  props<{ action: string; error: any }>()
);

/* Load Demande Pieces Bon Commande Actions */
export const loadDemandePiecesBonCommande = createAction(
  DemandePiecesActionsType.LOAD_DEMANDE_PIECES_BON_COMMANDE,
  props<{ data: any }>()
);

export const loadDemandePiecesBonCommandeSuccess = createAction(
  DemandePiecesActionsType.LOAD_DEMANDE_PIECES_BON_COMMANDE_SUCCESS,
  props<{ data: any }>()
);

export const loadDemandePiecesBonCommandeFailure = createAction(
  DemandePiecesActionsType.LOAD_DEMANDE_PIECES_BON_COMMANDE_FAILURE,
  props<{ action: string; error: any }>()
);

/* Load Demande Pieces Bon Achat Actions */
export const loadDemandePiecesBon = createAction(
  DemandePiecesActionsType.LOAD_DEMANDE_PIECES_BON,
  props<{ data: {reference: string, type: string} }>()
);

export const loadDemandePiecesBonSuccess = createAction(
  DemandePiecesActionsType.LOAD_DEMANDE_PIECES_BON_SUCCESS,
  props<{ data: any }>()
);

export const loadDemandePiecesBonFailure = createAction(
  DemandePiecesActionsType.LOAD_DEMANDE_PIECES_BON_FAILURE,
  props<{ action: string; error: any }>()
);
/* Generate Demande Pieces Bon Achat Actions */
export const generateDemandePiecesBonAchat = createAction(
  DemandePiecesActionsType.GENERATE_DEMANDE_PIECES_BON_ACHAT,
  props<{ data: any }>()
);

export const generateDemandePiecesBonAchatSuccess = createAction(
  DemandePiecesActionsType.GENERATE_DEMANDE_PIECES_BON_ACHAT_SUCCESS,
  props<{ dataG: any }>()
);

export const generateDemandePiecesBonAchatFailure = createAction(
  DemandePiecesActionsType.GENERATE_DEMANDE_PIECES_BON_ACHAT_FAILURE,
  props<{ action: string; error: any }>()
);

/* Load Demande Pieces Bon Sortie Partiel Actions */
export const loadDemandePiecesBonSortie = createAction(
  DemandePiecesActionsType.LOAD_DEMANDE_PIECES_BON_SORTIE,
  props<{ data: any }>()
);

export const loadDemandePiecesBonSortieSuccess = createAction(
  DemandePiecesActionsType.LOAD_DEMANDE_PIECES_BON_SORTIE_SUCCESS,
  props<{ data: any }>()
);

export const loadDemandePiecesBonSortieFailure = createAction(
  DemandePiecesActionsType.LOAD_DEMANDE_PIECES_BON_SORTIE_FAILURE,
  props<{ action: string; error: any }>()
);

/* Complete Demande Pieces Commande Actions */
export const completeDemandePiecesCommande = createAction(
  DemandePiecesActionsType.COMPLETE_DEMANDE_PIECES_COMMANDE,
  props<{ data: any }>()
);

export const completeDemandePiecesCommandeSuccess = createAction(
  DemandePiecesActionsType.COMPLETE_DEMANDE_PIECES_COMMANDE_SUCCESS,
  props<{ data: any }>()
);

export const completeDemandePiecesCommandeFailure = createAction(
  DemandePiecesActionsType.COMPLETE_DEMANDE_PIECES_COMMANDE_FAILURE,
  props<{ action: string; error: any }>()
);

/* Add Demande Pieces Attachment Actions */
export const addDemandePiecesAttachment = createAction(
  DemandePiecesActionsType.ADD_DEMANDE_PIECES_ATTACHMENT,
  props<{ data: any }>()
);

export const addDemandePiecesAttachmentSuccess = createAction(
  DemandePiecesActionsType.ADD_DEMANDE_PIECES_ATTACHMENT_SUCCESS,
  props<{ data: any }>()
);

export const addDemandePiecesAttachmentFailure = createAction(
  DemandePiecesActionsType.ADD_DEMANDE_PIECES_ATTACHMENT_FAILURE,
  props<{ action: string; error: any }>()
);
