import { createAction, props } from "@ngrx/store";

export const updatePagination = createAction(
    '[Pagination] Update Pagination',
    props<{ currentPage: number, pageSize: number, totalItems: number }>()
);