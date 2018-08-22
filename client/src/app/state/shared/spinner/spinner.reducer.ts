import { SpinnerActions, SpinnerActionTypes } from './spinner.actions';

export interface State {
  show: boolean;
}

export const initialState: State = {
  show: false
};

export function reducer(state = initialState, action: SpinnerActions): State {
  switch (action.type) {
    case SpinnerActionTypes.HideSpinner:
      return {
        ...state,
        show: false
      };
    case SpinnerActionTypes.ShowSpinner:
      return {
        ...state,
        show: true
      };
    default:
      return state;
  }
}

export const isShowing = (state: State) => state.show;
