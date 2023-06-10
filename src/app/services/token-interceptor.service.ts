import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoaderService } from './loader.service';


@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private inject: Injector, public loaderService: LoaderService) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.setLoading(true)
    let authService = this.inject.get(AuthService);
    let jwtToken = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authService.GetToken(),
      },
    });
    return next.handle(jwtToken).pipe(
      finalize(() => {
        this.loaderService.setLoading(false)
      })
    );
  }
}
