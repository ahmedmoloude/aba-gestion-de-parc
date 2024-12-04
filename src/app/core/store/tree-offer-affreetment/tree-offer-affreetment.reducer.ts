import { createReducer, on } from '@ngrx/store';
import { addConditionServicesAffretment, addConditionTransportAffretment, addConvTransportAffretment, addConvTransportFailureAffretment, addConvTransportSuccessAffretment, fetchTreeOfferAffretment, fetchTreeOfferSuccessAffretment, recreateMetaAfterDeleteConditionAffretment, removeConditionServicesAffretment, removeConditionTransportAffretment, removeConvTransportAffretment, resetTreeOfferAffretment, selectConvServicesAffretment, selectConvServicesFailureAffretment, selectConvServicesSuccessAffretment, setTreeOfferModeAffretment, treeOfferActionFailureAffretment, treeOutput_allConditionsSevices_delete_affretment, treeOutput_deleteConditions_add_affretment, treeOutput_newConditions_add_affretment, treeOutput_newConditions_delete_affretment, treeOutput_newTemplateOffers_add_affretment, treeOutput_newTemplateOffers_delete_affretment, treeOutput_savedConditions_delete_affretment, treeOutput_savedConditions_load_affretment, updateConditionServicesAffretment, updateConditionTransportAffretment } from './tree-offer-affreetment.actions';


interface Convention {
  id?: number,
  uuid?: string,
  title?: string,
  type?: 'template' | 'public' | 'offer',
  sector_id?: number | null,
  conditions?: any[],
  isLoading?: boolean,
}

export interface TreeOfferAffretmentState {
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
  status : 'LOADING' | 'SUCCESS' | 'ERROR' | 'INIT',
  error: any,
}

export const initialState: TreeOfferAffretmentState = {
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

export const treeOfferAffretmentReducer = createReducer(
  initialState,
  on(resetTreeOfferAffretment, (state) => ({ ...initialState })), // reset tree data
  on(setTreeOfferModeAffretment, (state, { mode, disableActions }) => ({
    ...state, tree: { ...state.tree, mode, disableActions }
  })), // set tree offer mode

  on(fetchTreeOfferAffretment, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchTreeOfferSuccessAffretment, (state, { payload }) => ({
    ...state,
    loading: false,
    tree: {
      ...state.tree, commerciale_offer: payload.commerciale_offer,
      grids: { ...state.tree.grids, transport: payload.transport, services: payload.services }
    },
    status: 'SUCCESS',
    error: null,
  })),
  on(treeOfferActionFailureAffretment, (state, { error }) => ({
    ...state,
    loading: false,
    status: 'ERROR',
    error: { error },
  })),

  /* ---------------- tree build ----------------*/
  // transport convention
  on(addConvTransportAffretment, (state) => ({
    ...state,
    tree: {
      ...state.tree,
      disableActions: true,
      grids: { ...state.tree.grids, transport: [...state.tree.grids.transport, { isLoading: true }] }
    }
  })),
  on(addConvTransportSuccessAffretment, (state, { payload }) => {
    const temp_ = [...state.tree.grids.transport]; temp_[temp_.length - 1] = payload; // update loading node
    return {
      ...state,
      tree: {
        ...state.tree, disableActions: false, grids: { ...state.tree.grids, transport: temp_ }
      }
    }
  }),
  on(addConvTransportFailureAffretment, (state, { error }) => {
    const temp_ = [...state.tree.grids.transport]; temp_.pop(); // remove loading node
    return {
      ...state,
      tree: {
        ...state.tree, disableActions: false, grids: { ...state.tree.grids, transport: temp_ }
      }
    }
  }),
  on(removeConvTransportAffretment, (state, { idx }) => {
    const temp_ = [...state.tree.grids.transport]; temp_.splice(idx, 1);
    return {
      ...state, tree: { ...state.tree, grids: { ...state.tree.grids, transport: temp_ } }
    }
  }),

  // transport condition
  on(addConditionTransportAffretment, (state, { idx_convention, payload }) => {
    const temp_ = JSON.parse(JSON.stringify(state.tree.grids.transport)); // deep clone object
    temp_[idx_convention].conditions.push(payload);
    return {
      ...state, tree: { ...state.tree, grids: { ...state.tree.grids, transport: temp_ } }
    }
  }),
  on(updateConditionTransportAffretment, (state, { idx_convention, idx, payload }) => {
    const temp_ = JSON.parse(JSON.stringify(state.tree.grids.transport)); // deep clone object
    temp_[idx_convention].conditions[idx] = payload;
    return {
      ...state, tree: { ...state.tree, grids: { ...state.tree.grids, transport: temp_ } }
    }
  }),
  on(removeConditionTransportAffretment, (state, { idx_convention, idx }) => {
    const temp_ = JSON.parse(JSON.stringify(state.tree.grids.transport)); // deep clone object
    temp_[idx_convention].conditions.splice(idx, 1);
    return {
      ...state, tree: { ...state.tree, grids: { ...state.tree.grids, transport: temp_ } }
    }
  }),

  // services convention
  on(selectConvServicesAffretment, (state) => ({
    ...state,
    tree: {
      ...state.tree, disableActions: true,
      grids: { ...state.tree.grids, isLoadingServices: true }
    }
  })),
  on(selectConvServicesSuccessAffretment, (state, { payload }) => {
    const temp_ = JSON.parse(JSON.stringify(state.tree.grids.services)); // deep clone object
    return {
      ...state,
      tree: {
        ...state.tree, disableActions: false,
        grids: { ...state.tree.grids, isLoadingServices: false, services: [ ...temp_ , ...payload], }
      }
    }
  }),
  on(selectConvServicesFailureAffretment, (state, { error }) => {
    return {
      ...state,
      tree: {
        ...state.tree, disableActions: false,
        grids: { ...state.tree.grids, isLoadingServices: false }
      }
    }
  }),

  // services conditions
  on(addConditionServicesAffretment, (state, { idx_convention, payload }) => {
    const temp_ = JSON.parse(JSON.stringify(state.tree.grids.services)); // deep clone object
    temp_[idx_convention].conditions.push(payload);
    return {
      ...state, tree: { ...state.tree, grids: { ...state.tree.grids, services: temp_ } }
    }
  }),
  on(updateConditionServicesAffretment, (state, { idx_convention, idx, payload }) => {
    const temp_ = JSON.parse(JSON.stringify(state.tree.grids.services)); // deep clone object
    temp_[idx_convention].conditions[idx] = payload;
    return {
      ...state, tree: { ...state.tree, grids: { ...state.tree.grids, services: temp_ } }
    }
  }),
  on(removeConditionServicesAffretment, (state, { idx_convention, idx }) => {
    const temp_ = JSON.parse(JSON.stringify(state.tree.grids.services)); // deep clone object
    temp_[idx_convention].conditions.splice(idx, 1);
    return {
      ...state, tree: { ...state.tree, grids: { ...state.tree.grids, services: temp_ } }
    }
  }),

  /* ---------------------------------------------- */

  /* ---------------- tree ouptut ----------------*/
  on(treeOutput_allConditionsSevices_delete_affretment, (state) => {
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
  on(treeOutput_savedConditions_load_affretment, (state, { payload }) => {
    return {
      ...state, treeOuptut: {
        ...state.treeOuptut, saved: { ...state.treeOuptut.saved, conditions: [...state.treeOuptut.saved.conditions, ...payload] }
      }
    }
  }),
  on(treeOutput_savedConditions_delete_affretment, (state, { cond_id, conv_id }) => {
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
  on(treeOutput_newConditions_add_affretment, (state, { payload }) => {
    return {
      ...state, treeOuptut: {
        ...state.treeOuptut, add: { ...state.treeOuptut.add, conditions: [...state.treeOuptut.add.conditions, ...payload] }
      }
    }
  }),
  on(treeOutput_newConditions_delete_affretment, (state, { cond_id, conv_id }) => {
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
  on(treeOutput_newTemplateOffers_add_affretment, (state, { payload }) => {
    return {
      ...state, treeOuptut: {
        ...state.treeOuptut, add: {
          ...state.treeOuptut.add, templates_offers: [...state.treeOuptut.add.templates_offers, payload]
        }
      }
    }
  }),
  on(treeOutput_newTemplateOffers_delete_affretment, (state, { templatable_id }) => {
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
  on(treeOutput_deleteConditions_add_affretment, (state, { payload }) => {
    // ids of conditions to delete
    return {
      ...state, treeOuptut: {
        ...state.treeOuptut, delete: { ...state.treeOuptut.delete, conditions: [...state.treeOuptut.delete.conditions, ...payload] }
      }
    }
  }),

  // recreate meta data of conditions
  on(recreateMetaAfterDeleteConditionAffretment, (state, { deleted_idx, entity, idx_convention, conv_meta }) => {
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
