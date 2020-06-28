import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
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
import {RouterModule} from '@angular/router';
import {BASE_PATH} from '@api/variables';
import {OAuthModule} from 'angular-oauth2-oidc';
import {TestbefundAuthInterceptor} from './interceptors/testbefund-auth-interceptor.service';
import {AuthGuard} from './guards/auth.guard';
import { LoginSuccessComponent } from './components/login-success/login-success.component';
import {AppRoutingModule} from './app-routing.module';

declare const TESTBEFUND_API_URL: string;


const materialModules = [
  MatSnackBarModule,
  MatSelectModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
];

@NgModule({
  declarations: [
    AppComponent,
    CreateTestComponent,
    CreateTestSingleTestComponent,
    LoginSuccessComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ApiModule,
    AppRoutingModule,
    StoreModule.forRoot({
      testbefund: testbefundReducer
    }),
    EffectsModule.forRoot([TestbefundEffects]),
    BrowserAnimationsModule,
    ...materialModules,
    OAuthModule.forRoot(),
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
