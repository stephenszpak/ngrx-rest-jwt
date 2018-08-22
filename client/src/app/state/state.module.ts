import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { MatSnackBarModule } from '@angular/material';
import { metaReducers, reducers } from './index';
import { SnackbarEffects } from './shared/snackbar/snackbar.effects';
import { DialogEffects } from './dialog/dialog.effects';


@NgModule({
  imports: [
    MatSnackBarModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([SnackbarEffects, DialogEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  declarations: []
})
export class StateModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StateModule
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: StateModule
  ) {
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. Import StateModule in the AppModule only.`
      );
    }
  }
}
