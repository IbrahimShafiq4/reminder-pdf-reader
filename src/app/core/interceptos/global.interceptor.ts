import { HttpHeaders, HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { AuthService } from '../../auth/service/auth.service';
import { inject } from '@angular/core';
export const globalInterceptor: HttpInterceptorFn = (req, next) => {

  const _AuthService: AuthService = inject(AuthService);
  let userToken = '';
  _AuthService.user.subscribe((user) => {
    userToken = user!.token!
  })

  const modifiedReq = req.clone({
    params: new HttpParams().set('auth', userToken)
  })
  return next(modifiedReq);
};
