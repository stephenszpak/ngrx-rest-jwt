import { Action } from '@ngrx/store';

export enum SpinnerActionTypes {
  ShowSpinner = '[Spinner] Show Spinner',
  HideSpinner = '[Spinner] Hide Spinner'
}

export class ShowSpinner implements Action {
  readonly type = SpinnerActionTypes.ShowSpinner;
}

export class HideSpinner implements Action {
  readonly type = SpinnerActionTypes.HideSpinner;
}

export type SpinnerActions = ShowSpinner | HideSpinner;
