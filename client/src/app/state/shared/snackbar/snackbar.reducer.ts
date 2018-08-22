import { SnackbarActions, SnackbarActionTypes } from './snackbar.actions';

export interface State {
  show: boolean;
}

export const initialState: State = {
  show: false
};

export function reducer(state = initialState, action: SnackbarActions): State {
  switch (action.type) {
    case SnackbarActionTypes.HideSnackbar:
      return {
        ...state,
        show: false
      };
    case SnackbarActionTypes.ShowSnackbar:
      return {
        ...state,
        show: true
      };
    default:
      return state;
  }
}
