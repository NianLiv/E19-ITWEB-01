import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.includes(environment.apiRoot)) {
      return next.handle(req);
    }
    return this.addTokenToRequest(req).pipe(
      switchMap(request => next.handle(request))
    );
  }

  private addTokenToRequest<T>(
    request: HttpRequest<T>
  ): Observable<HttpRequest<T>> {
    return this.auth.token$.pipe(
      take(1),
      map(token => {
        const headers = request.headers.set(
          'Authorization',
          `Bearer ${token || ''}`
        );
        return request.clone({ headers });
      })
    );
  }
}
