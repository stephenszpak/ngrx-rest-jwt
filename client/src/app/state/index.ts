import { environment } from '../../environments/environment';
import { ActionReducerMap, ActionReducer, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import {
  reducer as snackbarReducer,
  State as SnackbarState
} from './shared/snackbar/snackbar.reducer';
import {
  reducer as spinnerReducer,
  State as SpinnerState,
  isShowing
} from './shared/spinner/spinner.reducer';
import {
  getOpened,
  reducer as sidenavReducer,
  State as SidenavState
} from './shared/sidenav/sidenav.reducer';
import {
  reducer as dialogReducer,
  State as DialogState
} from './dialog/dialog.reducer';
import {
  reducer as authReducer,
  State as AuthState,
  getUser,
  getStatus,
  getLoggedIn
} from './auth/auth.reducer';

export enum Features {
  dialog = 'dialog',
  snackbar = 'snackbar',
  sidenav = 'sidenav',
  spinner = 'spinner',
  auth = 'auth'
}

export interface State {
  [Features.dialog]: DialogState;
  [Features.snackbar]: SnackbarState;
  [Features.sidenav]: SidenavState;
  [Features.spinner]: SpinnerState;
  [Features.auth]: AuthState;
}

export const reducers: ActionReducerMap<State> = {
  [Features.dialog]: dialogReducer,
  [Features.snackbar]: snackbarReducer,
  [Features.sidenav]: sidenavReducer,
  [Features.spinner]: spinnerReducer,
  [Features.auth]: authReducer
};

export function logger(
  reducer: ActionReducer<State>
): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log("state", state);
    console.log("action", action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : [];

export const sidenavState = createFeatureSelector<SidenavState>(Features.sidenav);
export const sidenavIsOpen = createSelector(sidenavState, getOpened);

export const selectSpinnerEntity = createFeatureSelector<SpinnerState>(Features.spinner);
export const isSpinnerShowing = createSelector(selectSpinnerEntity, isShowing);

export const authState = createFeatureSelector<AuthState>(Features.auth);
export const getCurrentUser = createSelector(authState, getUser);
export const getCurrentStatus = createSelector(authState, getStatus);
export const getCurrentLoggedIn = createSelector(authState, getLoggedIn);
