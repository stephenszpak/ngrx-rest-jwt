
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from "@ngrx/store";
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import {
  AuthActionTypes,
  Login,
  LoginSuccess,
  LoginFailure,
  Register,
  RegisterSuccess,
  RegisterFailure,
  LoginRedirect,
  Logout
} from './auth.actions';

import { User, Authenticate } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { ShowSnackbar } from "../shared/snackbar/snackbar.actions";
import { HideSpinner, ShowSpinner } from "../shared/spinner/spinner.actions";

type showSpinnerTypes =
  | Login
  | Register

const showSpinnerActions = [
  AuthActionTypes.Login,
  AuthActionTypes.Register
];

type hideSpinnerTypes =
  | LoginSuccess
  | RegisterSuccess

const hideSpinnerActions = [
  AuthActionTypes.LoginSuccess,
  AuthActionTypes.RegisterSuccess
];

@Injectable()
export class AuthEffects {
  @Effect()
  showSpinner: Observable<Action> = this.actions
    .ofType<showSpinnerTypes>(...showSpinnerActions)
    .pipe(map(() => new ShowSpinner()));

  @Effect()
  hideSpinner: Observable<Action> = this.actions
    .ofType<hideSpinnerTypes>(...hideSpinnerActions)
    .pipe(map(() => new HideSpinner()));


  @Effect()
  login = this.actions.pipe(
    ofType<Login>(AuthActionTypes.Login),
    map(action => action.payload),
    exhaustMap((auth: Authenticate) =>
      this.authService.login(auth).pipe(
        map(user => {
          new LoginSuccess({ user: User });
          new ShowSnackbar({
            message: "Login",
            action: "Success"
          })
        }),
        catchError(error => of(new LoginFailure(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  loginSuccess = this.actions.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    tap(() => this.router.navigate(['/']))
  );

  @Effect({ dispatch: false })
  loginRedirect = this.actions.pipe(
    ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
    tap(authed => {
      this.router.navigate(['/login']);
    })
  );


  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) { }
}
