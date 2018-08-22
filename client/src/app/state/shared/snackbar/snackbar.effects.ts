import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, tap, delay } from 'rxjs/operators';

import { SnackbarActionTypes, ShowSnackbar, HideSnackbar } from './snackbar.actions';

@Injectable()
export class SnackbarEffects {
  constructor(private actions: Actions, private matSnackbar: MatSnackBar) { }

  @Effect({ dispatch: false })
  closeSnackbar: Observable<Action> = this.actions.pipe(
    ofType<HideSnackbar>(SnackbarActionTypes.HideSnackbar),
    tap(() => this.matSnackbar.dismiss())
  );

  @Effect()
  showSnackbar: Observable<Action> = this.actions.pipe(
    ofType<ShowSnackbar>(SnackbarActionTypes.ShowSnackbar),
    map((action: ShowSnackbar) => action.payload),
    tap(payload => this.matSnackbar.open(payload.message, payload.action, payload.config)),
    delay(2000),
    map(() => new HideSnackbar())
  );
}
