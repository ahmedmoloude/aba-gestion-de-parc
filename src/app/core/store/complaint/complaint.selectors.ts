import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { ComplaintState } from './complaint.reducer';

const selectComplaintFeature = createFeatureSelector<AppState, ComplaintState>(
  'complaints'
);

export const selectComplaints = createSelector(
  selectComplaintFeature,
  (state) => Object.keys(state).map((key) => state[key])
);

export const selectComplaintReasons = createSelector(
  selectComplaintFeature,
  (state) => {
    return state.reasons;
  }
);

export const selectComplaint = createSelector(
  selectComplaintFeature,
  (state) => {
    return state.selectedComplaint;
  }
);

export const selectComplaintIsLoading = createSelector(
  selectComplaintFeature,
  (state) => state.loading
);
