import { createSelector } from "@ngrx/store";
import { AppState } from "../app.states";
import { PaginationState } from "./pagination.reducer";

export const appSelectPagination = (state: AppState) => state.pagination;
export const selectPagination = createSelector(
    appSelectPagination,
  (state: PaginationState) => state
);