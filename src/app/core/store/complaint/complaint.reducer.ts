import { createReducer, on } from '@ngrx/store';
import { Complaint, ComplaintReason } from '../../models';
import { complaintActionTypes } from './complaint.action';

export interface ComplaintState {
  complaints: Complaint[];
  reasons: ComplaintReason[];
  selectedComplaint: Complaint;
  loading: boolean;
}

const initialState: ComplaintState = {
  complaints: [],
  reasons: [],
  selectedComplaint: null,
  loading: false,
};

export const complaintReducer = createReducer(
  initialState,
  on(complaintActionTypes.loadComplaints, (state) => ({
    ...state,
    loading: true,
  })),
  on(complaintActionTypes.loadComplaintsSuccess, (state, { complaints }) => {
    return {
      ...state,
      complaints,
      loading: false,
    };
  }),
  on(complaintActionTypes.loadComplaintReasons, (state) => {
    return {
      ...state,
    };
  }),
  on(complaintActionTypes.loadComplaintReasonsSuccess, (state, { reasons }) => {
    return {
      ...state,
      reasons,
    };
  }),
  on(complaintActionTypes.selectedComplaint, (state, { complaint }) => {
    console.log('------------>>> selectedComplaint reducers', complaint)
    return {
      ...state,
      selectedComplaint: complaint,
    };
  }),
  on(complaintActionTypes.updateComplaint, (state) => {
    return {
      ...state,
    };
  }),
  on(complaintActionTypes.updateComplaintSuccess, (state, { complaint }) => {
    console.log('--------->>> 11111111111111111111111111111111111111111111111111', complaint)
    var complaints = [];
    var selectedComplaint = complaint
    if(complaint.parent_id) {
      console.log('--------->>> complaint.parent_id', complaint.parent_id)
      complaints = state.complaints.map((item) => {
        var newComplaint = { ...item }
        if (Number(item.id) == Number(complaint.parent_id)) {
          console.log('------------------>>>>> newComplaint', newComplaint)
          newComplaint.childs = item.childs.map(child => child.id == complaint.id ? complaint : child)
          newComplaint.status = complaint.parentStatus
          console.log('------------------>>>>> newComplaint after mapping', newComplaint)
          selectedComplaint = newComplaint
        }
        return newComplaint
      } )
    }
    else {
      complaints = state.complaints.map((item) =>
    item.id === complaint.id ? complaint : item
  )
    }

    return {
      ...state,
      complaints: complaints,
      selectedComplaint: selectedComplaint,
    };
  }),

  on(complaintActionTypes.updateComplaintSuccessNew, (state, { complaint }) => {
    console.log('--------->>> 2222222222222222222222222222222222222222222', complaint)
    console.log('--------------------->>>>> test', state.complaints.map((item) =>
    item.id === complaint.id ? complaint : item
  ),)
    return {
      ...state,
      complaints: state.complaints.map((item) =>
        item.id === complaint.id ? complaint : item
      ),
      selectedComplaint: complaint,
    };
  })



);
