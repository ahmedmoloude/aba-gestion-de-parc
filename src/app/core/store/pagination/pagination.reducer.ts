import { createReducer, on } from "@ngrx/store";
import { updatePagination } from "./pagination.actions";

export interface PaginationState {
    currentPage: number;
    pageSize: number;
    totalItems: number;
}
export const initialState: PaginationState = {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0
};

export const paginationReducer = createReducer(
    initialState,
    on(updatePagination, (state, {currentPage, pageSize, totalItems}) => ({
      ...state,
      currentPage:  currentPage,
      pageSize: pageSize,
      totalItems: totalItems
    })),
)