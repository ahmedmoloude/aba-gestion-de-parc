import { createAction, props } from '@ngrx/store';
import { Complaint } from 'app/core/models';

export const loadComplaints = createAction(
  '[Complaints List] Load Complaints',
  props<{ filter }>()
);
export const loadComplaintsSuccess = createAction(
  '[Complaints List] Complaints Loaded Successfully',
  props<{ complaints: Complaint[] }>()
);
export const loadComplaintsError = createAction(
  '[Complaints List] Load Complaints Error'
);
export const loadComplaintReasons = createAction(
  '[Complaint Reasons List] Load Complaint Reasons',
  props<{ filter }>()
);

export const loadComplaintReasonsSuccess = createAction(
  '[Complaint Reasons List] Complaint Reasons Loaded Successfully',
  props<{ reasons }>()
);
export const loadComplaintReasonsError = createAction(
  '[Complaint Reasons List] Load Complaint Reasons Error'
);

export const selectedComplaint = createAction(
  '[Complaint] set selectedComplaint',
  props<{ complaint: Complaint }>()
);

export const updateComplaint = createAction(
  '[Complaint] update Complaint',
  props<{ uuid: string; data: Complaint }>()
);

export const updateComplaintSuccess = createAction(
  '[Complaint] update Complaint Success',
  props<{ complaint: Complaint }>()
);

export const updateComplaintError = createAction(
  '[Complaint] update Complaint Error'
);

export const updateComplaintSuccessNew = createAction(
  '[Complaint] update Complaint Success New',
  props<{ complaint: Complaint }>()
);


export const complaintActionTypes = {
  loadComplaints,
  loadComplaintsSuccess,
  loadComplaintsError,
  loadComplaintReasons,
  loadComplaintReasonsSuccess,
  loadComplaintReasonsError,
  selectedComplaint,
  updateComplaint,
  updateComplaintSuccess,
  updateComplaintError,
  updateComplaintSuccessNew
};
