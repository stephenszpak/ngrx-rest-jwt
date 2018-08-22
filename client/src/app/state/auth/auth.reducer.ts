import { AuthActions, AuthActionTypes } from './auth.actions';
import { User, Authenticate } from '../../core/models/user.model';


export interface State {
  status: boolean;
  loggedIn: boolean;
  user: User | null;
}

export const initialState: State = {
  status: false,
  loggedIn: false,
  user: null,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        loggedIn: true,
        status: true,
        user: action.payload.user,
      };
    }

    case AuthActionTypes.Logout: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getStatus = (state: State) => state.status;
export const getUser = (state: State) => state.user;
