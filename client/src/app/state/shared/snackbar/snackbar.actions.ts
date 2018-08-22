import { Action } from '@ngrx/store';
import { MatSnackBarConfig } from '@angular/material';

export enum SnackbarActionTypes {
  ShowSnackbar = '[Snackbar] Show Snackbar',
  HideSnackbar = '[Snackbar] Hide Snackbar'
}

export class ShowSnackbar implements Action {
  readonly type = SnackbarActionTypes.ShowSnackbar;

  constructor(public payload: { message: string, action?: string, config?: MatSnackBarConfig }) { }
}

export class HideSnackbar implements Action {
  readonly type = SnackbarActionTypes.HideSnackbar;
}

export type SnackbarActions = ShowSnackbar | HideSnackbar;
