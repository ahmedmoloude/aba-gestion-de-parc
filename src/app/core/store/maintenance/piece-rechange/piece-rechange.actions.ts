import { createAction, props } from '@ngrx/store';

export enum PieceRechangesActionsType {
  /* Load PieceRechanges */
  LOAD_PIECES_RECHANGE = '[PieceRechanges] Load PieceRechanges',
  LOAD_PIECES_RECHANGE_SUCCESS = '[PieceRechanges] Load PieceRechanges Success',
  LOAD_PIECES_RECHANGE_FAILURE = '[PieceRechanges] Load PieceRechanges Failure',

  /* Load Inventory List */
  LOAD_INVENTORY_LIST = '[Inventory] Load Inventory List',
  LOAD_INVENTORY_LIST_SUCCESS = '[Inventory] Load Inventory List Success',
  LOAD_INVENTORY_LIST_FAILURE = '[Inventory] Load Inventory List Failure',

  /* Add Inventory */
  ADD_INVENTORY = '[Inventory] Add Inventory',
  ADD_INVENTORY_SUCCESS = '[Inventory] Add Inventory Success',
  ADD_INVENTORY_FAILURE = '[Inventory] Add Inventory Failure',

  /* Load Inventory Historic */
  LOAD_INVENTORY_Historic = '[Inventory] Load Inventory Historic',
  LOAD_INVENTORY_Historic_SUCCESS = '[Inventory] Load Inventory Historic Success',
  LOAD_INVENTORY_Historic_FAILURE = '[Inventory] Load Inventory Historic Failure',
}

/* Load PieceRechanges */
export const loadPieceRechanges = createAction(
  PieceRechangesActionsType.LOAD_PIECES_RECHANGE,
);

export const loadPieceRechangesSuccess = createAction(
  PieceRechangesActionsType.LOAD_PIECES_RECHANGE_SUCCESS,
  props<{ data: any }>()
);

export const loadPieceRechangesFailure = createAction(
  PieceRechangesActionsType.LOAD_PIECES_RECHANGE_FAILURE,
  props<{action: string, error: any} >()
);

/* Load Inventory List */
export const loadInventoryList = createAction(
  PieceRechangesActionsType.LOAD_INVENTORY_LIST,
  props<{ reference: string, name: any, per_page:number, page: number }>()
);

export const loadInventoryListSuccess = createAction(
  PieceRechangesActionsType.LOAD_INVENTORY_LIST_SUCCESS,
  props<{ data: any }>()
);

export const loadInventoryListFailure = createAction(
  PieceRechangesActionsType.LOAD_INVENTORY_LIST_FAILURE,
  props<{action: string, error: any} >()
);

/* Add Inventory  */
export const addInventory = createAction(
  PieceRechangesActionsType.ADD_INVENTORY,
  props<{ data: any }>()
);

export const addInventorySuccess = createAction(
  PieceRechangesActionsType.ADD_INVENTORY_SUCCESS,
  props<{ data: any }>()
);

export const addInventoryFailure = createAction(
  PieceRechangesActionsType.ADD_INVENTORY_FAILURE,
  props<{action: string, error: any} >()
);

  /* Load Inventory Historic */
export const loadInventoryHistoric = createAction(
  PieceRechangesActionsType.LOAD_INVENTORY_Historic,
  props<{ data: any }>()
);

export const loadInventoryHistoricSuccess = createAction(
  PieceRechangesActionsType.LOAD_INVENTORY_Historic_SUCCESS,
  props<{ data: any }>()
);

export const loadInventoryHistoricFailure = createAction(
  PieceRechangesActionsType.LOAD_INVENTORY_Historic_FAILURE,
  props<{action: string, error: any} >()
);
