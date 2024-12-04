import { Action, createReducer, on } from '@ngrx/store';
import { MaintenanceStateEnum } from '../maintenance-intervention/maintenance-intervention.reducer';
import * as demandePiecesActions from'app/core/store/maintenance/demande-piece/demande-piece.actions';


export const demandePiecesFeatureKey = 'demandePieces';

export interface demandesPiecesState {
  demandesPieces: any[];
  demande: any;
  demandesHistoric: any[];
  bon: any;
  bonSortie: any;
  BonCommande: any;
  attachment: any;
  generateBonAchat: any;
  generateBonAchatState: MaintenanceStateEnum;
  dataState: MaintenanceStateEnum;
  demandeState: MaintenanceStateEnum;
  historicState: MaintenanceStateEnum;
  bonState: MaintenanceStateEnum;
  bonSortieState: MaintenanceStateEnum;
  BonCommandeState: MaintenanceStateEnum;
  completeCommandeState: MaintenanceStateEnum;
  attachmentState: MaintenanceStateEnum;
  errorMessage: { action: string; error: any } | null;
}

export const initialState: demandesPiecesState = {
  demandesPieces: null,
  demande: null,
  demandesHistoric: null,
  bon: null,
  bonSortie: null,
  BonCommande: null,
  attachment: null,
  generateBonAchat: null,
  generateBonAchatState: MaintenanceStateEnum.INIT,
  dataState: MaintenanceStateEnum.INIT,
  demandeState: MaintenanceStateEnum.INIT,
  historicState: MaintenanceStateEnum.INIT,
  bonState: MaintenanceStateEnum.INIT,
  bonSortieState: MaintenanceStateEnum.INIT,
  BonCommandeState: MaintenanceStateEnum.INIT,
  completeCommandeState: MaintenanceStateEnum.INIT,
  attachmentState: MaintenanceStateEnum.INIT,
  errorMessage: null,
};


export const DemandePiecesReducer = createReducer(
  initialState,
  on(demandePiecesActions.loadDemandePiecesList,(state, ) => ({...state, dataState: MaintenanceStateEnum.LOADING})),
  on(demandePiecesActions.loadDemandePiecesListSuccess,(state, {data}) => ({...state, dataState: MaintenanceStateEnum.SUCCESS, demandesPieces: data})),
  on(demandePiecesActions.loadDemandePiecesListFailure,(state, {error}) => ({...state, dataState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(demandePiecesActions.loadDemandePiecesDetail,(state, ) => ({...state, demandeState: MaintenanceStateEnum.LOADING})),
  on(demandePiecesActions.loadDemandePiecesDetailSuccess,(state, {data}) => ({...state, demandeState: MaintenanceStateEnum.SUCCESS, demande: data})),
  on(demandePiecesActions.loadDemandePiecesDetailFailure,(state, {error}) => ({...state, demandeState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(demandePiecesActions.loadDemandePiecesHistoric,(state, ) => ({...state, historicState: MaintenanceStateEnum.LOADING})),
  on(demandePiecesActions.loadDemandePiecesHistoricSuccess,(state, {data}) => ({...state, historicState: MaintenanceStateEnum.SUCCESS, demandesHistoric: data})),
  on(demandePiecesActions.loadDemandePiecesHistoricFailure,(state, {error}) => ({...state, historicState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(demandePiecesActions.generateDemandePiecesBonAchat,(state, ) => ({...state, generateBonAchatState: MaintenanceStateEnum.LOADING})),
  on(demandePiecesActions.generateDemandePiecesBonAchatSuccess,(state, {dataG}) => ({...state, generateBonAchatState: MaintenanceStateEnum.SUCCESS, generateBonAchat: dataG, BonCommande:{...state.BonCommande, data: state.BonCommande?.data.map(item => item.diagnostique_id == dataG.data.diagnostique_id ? dataG.data : item)}})),
  on(demandePiecesActions.generateDemandePiecesBonAchatFailure,(state, {error}) => ({...state, generateBonAchatState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(demandePiecesActions.loadDemandePiecesBon,(state, ) => ({...state, bonState: MaintenanceStateEnum.LOADING})),
  on(demandePiecesActions.loadDemandePiecesBonSuccess,(state, {data}) => ({...state, bonState: MaintenanceStateEnum.SUCCESS, bon: data})),
  on(demandePiecesActions.loadDemandePiecesBonFailure,(state, {error}) => ({...state, bonState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(demandePiecesActions.loadDemandePiecesBonSortie,(state, ) => ({...state, bonSortieState: MaintenanceStateEnum.LOADING})),
  on(demandePiecesActions.loadDemandePiecesBonSortieSuccess,(state, {data}) => ({...state, bonSortieState: MaintenanceStateEnum.SUCCESS, bonSortie: data})),
  on(demandePiecesActions.loadDemandePiecesBonSortieFailure,(state, {error}) => ({...state, bonSortieState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(demandePiecesActions.loadDemandePiecesBonCommande,(state, ) => ({...state, BonCommandeState: MaintenanceStateEnum.LOADING})),
  on(demandePiecesActions.loadDemandePiecesBonCommandeSuccess,(state, {data}) => ({...state, BonCommandeState: MaintenanceStateEnum.SUCCESS, BonCommande: data})),
  on(demandePiecesActions.loadDemandePiecesBonCommandeFailure,(state, {error}) => ({...state, BonCommandeState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(demandePiecesActions.completeDemandePiecesCommande,(state, ) => ({...state, completeCommandeState: MaintenanceStateEnum.LOADING})),
  on(demandePiecesActions.completeDemandePiecesCommandeSuccess,(state, {data}) => ({...state, completeCommandeState: MaintenanceStateEnum.SUCCESS, demandesPieces: state.demandesPieces.map(item => item.id === data?.data?.id? data?.data : item)})),
  on(demandePiecesActions.completeDemandePiecesCommandeFailure,(state, {error}) => ({...state, completeCommandeState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(demandePiecesActions.addDemandePiecesAttachment,(state, ) => ({...state, attachmentState: MaintenanceStateEnum.LOADING})),
  on(demandePiecesActions.addDemandePiecesAttachmentSuccess,(state, {data}) => ({...state, attachmentState: MaintenanceStateEnum.SUCCESS, attachment: data})),
  on(demandePiecesActions.addDemandePiecesAttachmentFailure,(state, {error}) => ({...state, attachmentState: MaintenanceStateEnum.ERROR, errorMessage: error})),
);



