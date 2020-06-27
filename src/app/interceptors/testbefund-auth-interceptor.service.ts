import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OAuthResourceServerErrorHandler, OAuthStorage} from 'angular-oauth2-oidc';

@Injectable()
export class TestbefundAuthInterceptor implements HttpInterceptor {

  constructor(private authStorage: OAuthStorage,
              private errorHandler: OAuthResourceServerErrorHandler) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.authStorage.getItem('id_token');
    console.log(token);
    const header = 'Bearer ' + token;
    const headers = req.headers
      .set('Authorization', header);
    req = req.clone({headers});
    return next.handle(req);
  }
}
