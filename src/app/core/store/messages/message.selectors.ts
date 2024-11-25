import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { MessageState } from './message.reducer';

const selectMessageFeature = createFeatureSelector<AppState, MessageState>(
  'messages'
);

export const selectMessages = createSelector(selectMessageFeature, (state) =>
  Object.keys(state).map((key) => state[key])
);

export const selectMessage = createSelector(selectMessageFeature, (state) =>
  {
    return state.selectedMessage
  }
);

