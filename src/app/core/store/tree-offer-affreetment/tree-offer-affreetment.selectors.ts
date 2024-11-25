
import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { TreeOfferAffretmentState } from './tree-offer-affreetment.reducer';

export const appSelectTreeOffer = (state: AppState) => state.tree_offer_affretment;

export const selectTreeOfferAffretment = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferAffretmentState) => state.tree
);
export const selectTreeOfferTransportAffretment = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferAffretmentState) => state.tree.grids.transport
);

export const selectTreeOfferServicesAffretment = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferAffretmentState) => state.tree.grids.services
);


export const selectConditionsMetaIdsAffretment = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferAffretmentState) => {
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
export const selectConditionsHashAffretment = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferAffretmentState) => {
    const new_conditions = state.treeOuptut.add.conditions; const loaded_conditions = state.treeOuptut.saved.conditions;
    const all_conditions = loaded_conditions.concat(new_conditions)
    return all_conditions.map(item => item.meta_.cond_hash) // get conditions unicity hash
  }
);
export const selectTreeOutputConditionsAffretment = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferAffretmentState) => {
    const new_conditions = state.treeOuptut.add.conditions;
    const loaded_conditions = state.treeOuptut.saved.conditions;
    const deleted_conditions = state.treeOuptut.delete.conditions;
    const all_conditions = loaded_conditions.concat(new_conditions)
    return { new_conditions, loaded_conditions, all_conditions, deleted_conditions }
  }
);
export const selectConventionsValidationAffretment = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferAffretmentState) => {
    const transport = state.tree.grids.transport;
    const conv_types = transport.map(item => item.type)
    const templates_ids = transport.filter(item => item.type === 'template').map(item => item.id)
    const templates_sector_ids = [] //transport.filter(item => item.type === 'template').map(item => item.sector_id)

    return { conv_types, templates_ids, templates_sector_ids }
  }
);
export const selectTreeDisableActionsAffretment = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferAffretmentState) => state.tree.disableActions
);
export const selectTreeLoadingServicesAffretment = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferAffretmentState) => state.tree.grids.isLoadingServices
);
export const selectTreeOutputOfferAffretment = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferAffretmentState) => state.treeOuptut
);
export const selectTreeOfferIsLoadingAffretment = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferAffretmentState) => state.loading
);
export const selectTreeOfferErrorAffretment = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferAffretmentState) => state.error
);
export const selectTreeOfferStatusAffretment = createSelector(
  appSelectTreeOffer,
  (state: TreeOfferAffretmentState) => state.status
);
