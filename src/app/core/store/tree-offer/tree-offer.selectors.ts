import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { TreeOfferState } from './tree-offer.reducer';

export const appSelectTreeOffer = (state: AppState) => state.tree_offer;

export const selectTreeOffer = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferState) => state.tree
);
export const selectTreeOfferTransport = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferState) => state.tree.grids.transport
);
export const selectTreeOfferServices = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferState) => state.tree.grids.services
);
export const selectConditionsMetaIds = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferState) => {
    const new_conditions = state.treeOuptut.add.conditions;
    const loaded_conditions = state.treeOuptut.saved.conditions;
    const all_conditions = loaded_conditions.concat(new_conditions)
    return {
      new: new_conditions.map(item => item.meta_.cond_id),
      loaded: loaded_conditions.map(item => item.meta_.cond_id),
      all: all_conditions.map(item => item.meta_.cond_id),
    }  // get duplicated conditions meta ids
  }
);
export const selectConditionsHash = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferState) => {
    const new_conditions = state.treeOuptut.add.conditions; const loaded_conditions = state.treeOuptut.saved.conditions;
    const all_conditions = loaded_conditions.concat(new_conditions)
    return all_conditions.map(item => item.meta_.cond_hash) // get conditions unicity hash
  }
);
export const selectTreeOutputConditions = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferState) => {
    const new_conditions = state.treeOuptut.add.conditions;
    const loaded_conditions = state.treeOuptut.saved.conditions;
    const deleted_conditions = state.treeOuptut.delete.conditions;
    const all_conditions = loaded_conditions.concat(new_conditions)
    return { new_conditions, loaded_conditions, all_conditions, deleted_conditions }
  }
);
export const selectConventionsValidation = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferState) => {
    const transport = state.tree.grids.transport;
    const conv_types = transport.map(item => item.type)
    const templates_ids = transport.filter(item => item.type === 'template').map(item => item.id)
    const templates_sector_ids = [] //transport.filter(item => item.type === 'template').map(item => item.sector_id)

    return { conv_types, templates_ids, templates_sector_ids }
  }
);
export const selectTreeDisableActions = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferState) => state.tree.disableActions
);
export const selectTreeLoadingServices = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferState) => state.tree.grids.isLoadingServices
);
export const selectTreeOutputOffer = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferState) => state.treeOuptut
);
export const selectTreeOfferIsLoading = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferState) => state.loading
);
export const selectTreeOfferError = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferState) => state.error
);
export const selectTreeOfferStatus = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferState) => state.status
);
