import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import {testbefundReducer} from './store/testbefund.reducer';
import {EffectsModule} from '@ngrx/effects';
import {TestbefundEffects} from './store/testbefund.effects';
import {CreateTestComponent} from './components/create-test/create-test.component';
import {ApiModule} from '@api/api.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {CreateTestSingleTestComponent} from './components/create-test/create-test-single-test/create-test-single-test.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {BASE_PATH} from '@api/variables';
import {OAuthModule} from 'angular-oauth2-oidc';
import {TestbefundAuthInterceptor} from './interceptors/testbefund-auth-interceptor.service';
import {LoginSuccessComponent} from './components/login-success/login-success.component';
import {AppRoutingModule} from './app-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {CreateTestInfoComponent} from './components/create-test/create-test-info/create-test-info.component';
import {CreateSingleTestCodeComponent} from './components/create-test/create-single-test-code/create-single-test-code.component';
import { CreateTestControlsComponent } from './components/create-test/create-test-controls/create-test-controls.component';
import { localStorageSync } from 'ngrx-store-localstorage';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

declare const TESTBEFUND_API_URL: string;


const materialModules = [
  MatSnackBarModule,
  MatSelectModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatButtonToggleModule,
];

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['testbefund'], rehydrate: true})(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    CreateTestComponent,
    CreateTestSingleTestComponent,
    LoginSuccessComponent,
    CreateTestInfoComponent,
    CreateSingleTestCodeComponent,
    CreateTestControlsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ApiModule,
    AppRoutingModule,
    StoreModule.forRoot({
      testbefund: testbefundReducer
    }, {metaReducers}),
    EffectsModule.forRoot([TestbefundEffects]),
    BrowserAnimationsModule,
    ...materialModules,
    OAuthModule.forRoot(),
    MatCardModule,
    MatTabsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TestbefundAuthInterceptor,
      multi: true
    },
    {
      provide: BASE_PATH,
      useValue: TESTBEFUND_API_URL
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
