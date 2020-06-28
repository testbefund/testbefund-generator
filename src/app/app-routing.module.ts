import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CreateTestComponent} from './components/create-test/create-test.component';
import {AuthGuard} from './guards/auth.guard';
import {LoginSuccessComponent} from './components/login-success/login-success.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: 'create',
        component: CreateTestComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'login-successful',
        component: LoginSuccessComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '**',
        redirectTo: 'create'
      }
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
