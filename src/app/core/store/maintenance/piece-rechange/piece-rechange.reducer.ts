import { Action, createReducer, on } from '@ngrx/store';
import { MaintenanceStateEnum } from '../maintenance-intervention/maintenance-intervention.reducer';
import * as PieceRechangesActions from'app/core/store/maintenance/piece-rechange/piece-rechange.actions';


export const pieceRechangeFeatureKey = 'pieceRechange';

export interface PieceRechangeState {
  piecesRechange: any[];
  dataState: MaintenanceStateEnum;
  inventoryList: any[];
  inventoriesState: MaintenanceStateEnum;
  inventory: any;
  inventoryState: MaintenanceStateEnum;
  inventoryHistoric: any;
  historicState: MaintenanceStateEnum;
  errorMessage: { action: string; error: any } | null;
}

export const initialState: PieceRechangeState = {
  piecesRechange: null,
  dataState: MaintenanceStateEnum.INIT,
  inventoryList: null,
  inventoriesState: MaintenanceStateEnum.INIT,
  inventory: null,
  inventoryState: MaintenanceStateEnum.INIT,
  inventoryHistoric: null,
  historicState: MaintenanceStateEnum.INIT,
  errorMessage: null,
};


export const PieceRechangeReducer = createReducer(
  initialState,
  on(PieceRechangesActions.loadPieceRechanges,(state, ) => ({...state, dataState: MaintenanceStateEnum.LOADING})),
  on(PieceRechangesActions.loadPieceRechangesSuccess,(state, {data}) => ({...state, dataState: MaintenanceStateEnum.SUCCESS, piecesRechange: data.data})),
  on(PieceRechangesActions.loadPieceRechangesFailure,(state, {error}) => ({...state, dataState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(PieceRechangesActions.loadInventoryList,(state, ) => ({...state, inventoriesState: MaintenanceStateEnum.LOADING})),
  on(PieceRechangesActions.loadInventoryListSuccess,(state, {data}) => ({...state, inventoriesState: MaintenanceStateEnum.SUCCESS, inventoryList: data})),
  on(PieceRechangesActions.loadInventoryListFailure,(state, {error}) => ({...state, inventoriesState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(PieceRechangesActions.addInventory,(state, ) => ({...state, inventoryState: MaintenanceStateEnum.LOADING})),
  on(PieceRechangesActions.addInventorySuccess,(state, {data}) => ({...state, inventoryState: MaintenanceStateEnum.SUCCESS, inventory: data, inventoryList: state.inventoryList.map(el => el.id == data.id? data : el)})),
  on(PieceRechangesActions.addInventoryFailure,(state, {error}) => ({...state, inventoryState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(PieceRechangesActions.loadInventoryHistoric,(state, ) => ({...state, historicState: MaintenanceStateEnum.LOADING})),
  on(PieceRechangesActions.loadInventoryHistoricSuccess,(state, {data}) => ({...state, historicState: MaintenanceStateEnum.SUCCESS, inventoryHistoric: data})),
  on(PieceRechangesActions.loadInventoryHistoricFailure,(state, {error}) => ({...state, historicState: MaintenanceStateEnum.ERROR, errorMessage: error})),

);



