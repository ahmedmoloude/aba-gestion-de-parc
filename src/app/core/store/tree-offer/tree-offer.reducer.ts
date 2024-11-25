import { createReducer, on } from '@ngrx/store';
import {
  treeOfferActionFailure,
  fetchTreeOffer,
  fetchTreeOfferSuccess,
  addConvTransport,
  removeConvTransport,
  selectConvServices,
  addConvTransportSuccess,
  selectConvServicesSuccess,
  addConditionTransport,
  removeConditionTransport,
  addConvTransportFailure,
  selectConvServicesFailure,
  addConditionServices,
  removeConditionServices,
  treeOutput_newTemplateOffers_add,
  treeOutput_newConditions_add,
  treeOutput_newConditions_delete,
  treeOutput_newTemplateOffers_delete,
  updateConditionTransport,
  updateConditionServices,
  resetTreeOffer,
  setTreeOfferMode,
  treeOutput_savedConditions_load,
  treeOutput_savedConditions_delete,
  treeOutput_deleteConditions_add,
  treeOutput_allConditionsSevices_delete,
  recreateMetaAfterDeleteCondition,
} from './tree-offer.actions';

interface Convention {
  id?: number,
  uuid?: string,
  title?: string,
  type?: 'template' | 'public' | 'offer',
  sector_id?: number | null,
  conditions?: any[],
  isLoading?: boolean,
}

export interface TreeOfferState {
  tree: {
    mode: 'READ' | 'CREATE' | 'UPDATE',
    disableActions: boolean,
    commerciale_offer: any,
    grids: { transport: Convention[], services: Convention[], isLoadingServices: boolean },
  };
  treeOuptut: {
    add: { templates_offers: any[]; conditions: any[] },  // new data to save
    saved: { templates_offers: any[], conditions: any[] }, // already saved data
    delete: { templates_offers: string[]; conditions: string[] } // data to delete
  }
  loading: boolean,
  status: 'LOADING' | 'SUCCESS' | 'ERROR' | 'INIT',
  error: any,
}

export const initialState: TreeOfferState = {
  tree: {
    mode: 'READ',
    disableActions: false,
    commerciale_offer: null,
    grids: { transport: [], services: [], isLoadingServices: false },
  },
  treeOuptut: {
    add: { templates_offers: [], conditions: [] },
    saved: { templates_offers: [], conditions: [] },
    delete: { templates_offers: [], conditions: [] }
  },
  loading: false,
  error: null,
  status: 'INIT',
};

export const treeOfferReducer = createReducer(
  initialState,
  on(resetTreeOffer, (state) => ({ ...initialState })), // reset tree data
  on(setTreeOfferMode, (state, { mode, disableActions }) => ({
    ...state, tree: { ...state.tree, mode, disableActions }
  })), // set tree offer mode

  on(fetchTreeOffer, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchTreeOfferSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    tree: {
      ...state.tree, commerciale_offer: payload.commerciale_offer,
      grids: { ...state.tree.grids, transport: payload.transport, services: payload.services }
    },
    status: 'SUCCESS',
    error: null,
  })),
  on(treeOfferActionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    status: 'ERROR',
    error: { error },
  })),

  /* ---------------- tree build ----------------*/
  // transport convention
  on(addConvTransport, (state) => ({
    ...state,
    tree: {
      ...state.tree,
      disableActions: true,
      grids: { ...state.tree.grids, transport: [...state.tree.grids.transport, { isLoading: true }] }
    }
  })),
  on(addConvTransportSuccess, (state, { payload }) => {
    const temp_ = [...state.tree.grids.transport]; temp_[temp_.length - 1] = payload; // update loading node
    return {
      ...state,
      tree: {
        ...state.tree, disableActions: false, grids: { ...state.tree.grids, transport: temp_ }
      }
    }
  }),
  on(addConvTransportFailure, (state, { error }) => {
    const temp_ = [...state.tree.grids.transport]; temp_.pop(); // remove loading node
    return {
      ...state,
      tree: {
        ...state.tree, disableActions: false, grids: { ...state.tree.grids, transport: temp_ }
      }
    }
  }),
  on(removeConvTransport, (state, { idx }) => {
    const temp_ = [...state.tree.grids.transport]; temp_.splice(idx, 1);
    return {
      ...state, tree: { ...state.tree, grids: { ...state.tree.grids, transport: temp_ } }
    }
  }),

  // transport condition
  on(addConditionTransport, (state, { idx_convention, payload }) => {
    const temp_ = JSON.parse(JSON.stringify(state.tree.grids.transport)); // deep clone object
    temp_[idx_convention].conditions.push(payload);
    return {
      ...state, tree: { ...state.tree, grids: { ...state.tree.grids, transport: temp_ } }
    }
  }),
  on(updateConditionTransport, (state, { idx_convention, idx, payload }) => {
    const temp_ = JSON.parse(JSON.stringify(state.tree.grids.transport)); // deep clone object
    temp_[idx_convention].conditions[idx] = payload;
    return {
      ...state, tree: { ...state.tree, grids: { ...state.tree.grids, transport: temp_ } }
    }
  }),
  on(removeConditionTransport, (state, { idx_convention, idx }) => {
    const temp_ = JSON.parse(JSON.stringify(state.tree.grids.transport)); // deep clone object
    temp_[idx_convention].conditions.splice(idx, 1);
    return {
      ...state, tree: { ...state.tree, grids: { ...state.tree.grids, transport: temp_ } }
    }
  }),

  // services convention
  on(selectConvServices, (state) => ({
    ...state,
    tree: {
      ...state.tree, disableActions: true,
      grids: { ...state.tree.grids, isLoadingServices: true }
    }
  })),
  on(selectConvServicesSuccess, (state, { payload }) => {
    return {
      ...state,
      tree: {
        ...state.tree, disableActions: false,
        grids: { ...state.tree.grids, isLoadingServices: false, services: [...payload], }
      }
    }
  }),
  on(selectConvServicesFailure, (state, { error }) => {
    return {
      ...state,
      tree: {
        ...state.tree, disableActions: false,
        grids: { ...state.tree.grids, isLoadingServices: false }
      }
    }
  }),

  // services conditions
  on(addConditionServices, (state, { idx_convention, payload }) => {
    const temp_ = JSON.parse(JSON.stringify(state.tree.grids.services)); // deep clone object
    temp_[idx_convention].conditions.push(payload);
    return {
      ...state, tree: { ...state.tree, grids: { ...state.tree.grids, services: temp_ } }
    }
  }),
  on(updateConditionServices, (state, { idx_convention, idx, payload }) => {
    const temp_ = JSON.parse(JSON.stringify(state.tree.grids.services)); // deep clone object
    temp_[idx_convention].conditions[idx] = payload;
    return {
      ...state, tree: { ...state.tree, grids: { ...state.tree.grids, services: temp_ } }
    }
  }),
  on(removeConditionServices, (state, { idx_convention, idx }) => {
    const temp_ = JSON.parse(JSON.stringify(state.tree.grids.services)); // deep clone object
    temp_[idx_convention].conditions.splice(idx, 1);
    return {
      ...state, tree: { ...state.tree, grids: { ...state.tree.grids, services: temp_ } }
    }
  }),

  /* ---------------------------------------------- */

  /* ---------------- tree ouptut ----------------*/
  on(treeOutput_allConditionsSevices_delete, (state) => {
    // remove all services transport
    return {
      ...state, treeOuptut: {
        ...state.treeOuptut,
        saved: {
          ...state.treeOuptut.saved,
          conditions: state.treeOuptut.saved.conditions.filter(item => !item.meta_.is_service)
        },
        add: {
          ...state.treeOuptut.add,
          conditions: state.treeOuptut.add.conditions.filter(item => !item.meta_.is_service)
        }
      }
    }
  }),

  // output conditions loaded from saved offer
  on(treeOutput_savedConditions_load, (state, { payload }) => {
    return {
      ...state, treeOuptut: {
        ...state.treeOuptut, saved: { ...state.treeOuptut.saved, conditions: [...state.treeOuptut.saved.conditions, ...payload] }
      }
    }
  }),
  on(treeOutput_savedConditions_delete, (state, { cond_id, conv_id }) => {
    // remove convention children or single condition 
    return {
      ...state, treeOuptut: {
        ...state.treeOuptut, saved: {
          ...state.treeOuptut.saved,
          conditions: cond_id ? state.treeOuptut.saved.conditions.filter(item => item.meta_.cond_id !== cond_id) :
            state.treeOuptut.saved.conditions.filter(item => item.meta_.conv_id !== conv_id)
        }
      }
    }
  }),

  // output new conditions to save
  on(treeOutput_newConditions_add, (state, { payload }) => {
    return {
      ...state, treeOuptut: {
        ...state.treeOuptut, add: { ...state.treeOuptut.add, conditions: [...state.treeOuptut.add.conditions, ...payload] }
      }
    }
  }),
  on(treeOutput_newConditions_delete, (state, { cond_id, conv_id }) => {
    // remove convention children or single condition 
    return {
      ...state, treeOuptut: {
        ...state.treeOuptut, add: {
          ...state.treeOuptut.add,
          conditions: cond_id ? state.treeOuptut.add.conditions.filter(item => item.meta_.cond_id !== cond_id) :
            state.treeOuptut.add.conditions.filter(item => item.meta_.conv_id !== conv_id)
        }
      }
    }
  }),
  on(treeOutput_newTemplateOffers_add, (state, { payload }) => {
    return {
      ...state, treeOuptut: {
        ...state.treeOuptut, add: {
          ...state.treeOuptut.add, templates_offers: [...state.treeOuptut.add.templates_offers, payload]
        }
      }
    }
  }),
  on(treeOutput_newTemplateOffers_delete, (state, { templatable_id }) => {
    return {
      ...state, treeOuptut: {
        ...state.treeOuptut, add: {
          ...state.treeOuptut.add,
          templates_offers: state.treeOuptut.add.templates_offers.filter(item => item.templatable_id !== templatable_id)
        }
      }
    }
  }),

  // output conditions to delete
  on(treeOutput_deleteConditions_add, (state, { payload }) => {
    // ids of conditions to delete
    return {
      ...state, treeOuptut: {
        ...state.treeOuptut, delete: { ...state.treeOuptut.delete, conditions: [...state.treeOuptut.delete.conditions, ...payload] }
      }
    }
  }),

  // recreate meta data of conditions
  on(recreateMetaAfterDeleteCondition, (state, { deleted_idx, entity, idx_convention, conv_meta }) => {
    if (entity === 'output') {
      return {
        ...state,
        treeOuptut: {
          ...state.treeOuptut,
          add: {
            ...state.treeOuptut.add, conditions: decrementMetaFromIdx(deleted_idx,
              JSON.parse(JSON.stringify(state.treeOuptut.add.conditions)), conv_meta),
          },
          saved: {
            ...state.treeOuptut.saved, conditions: decrementMetaFromIdx(deleted_idx,
              JSON.parse(JSON.stringify(state.treeOuptut.saved.conditions)), conv_meta),
          }
        }
      }
    } else if (entity === 'transport') {
      const temp_ = JSON.parse(JSON.stringify(state.tree.grids.transport)); // deep clone object
      temp_[idx_convention].conditions = decrementMetaFromIdx(deleted_idx, temp_[idx_convention].conditions);
      return {
        ...state, tree: { ...state.tree, grids: { ...state.tree.grids, transport: temp_ } }
      }
    } else if (entity === 'services') {
      const temp_ = JSON.parse(JSON.stringify(state.tree.grids.services)); // deep clone object
      temp_[idx_convention].conditions = decrementMetaFromIdx(deleted_idx, temp_[idx_convention].conditions);
      return {
        ...state, tree: { ...state.tree, grids: { ...state.tree.grids, services: temp_ } }
      }
    }
    return { ...state }
  }),


);

const decrementMetaFromIdx = (delteteIdx: number, conditions: any[], conv_meta = null) => {
  const res = []
  for (const [idx, cond] of conditions.entries()) {
    // transport or services node conditions : idx is pos of condition in convention children
    if (cond?.meta_ && idx >= delteteIdx && conv_meta === null) {
      const decrementIdx = parseInt(cond.meta_.cond_id.split('-')[3]) - 1 // temporaly
      cond.meta_.cond_id = `${cond.meta_.conv_id}-${decrementIdx}`
    }

    // output conditions
    const idx_cond = parseInt(cond?.meta_?.cond_id.split('-')[3]); // pos of condition in convention children
    if (cond?.meta_ && idx_cond >= delteteIdx && cond?.meta_?.conv_id === conv_meta) {
      const decrementIdx = idx_cond - 1 // temporaly
      cond.meta_.cond_id = `${cond.meta_.conv_id}-${decrementIdx}`
    }

    res.push(cond)
  }
  return res;
}
