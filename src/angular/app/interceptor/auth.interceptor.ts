import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, lastValueFrom, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

const IGNORED_PATTERNS = [/\/api\/auth/];

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (IGNORED_PATTERNS.some((pattern) => pattern.test(request.url))) {
      return next.handle(request);
    }
    return from(this.authRequest(request, next));
  }

  private sendWithAuth(
    request: HttpRequest<unknown>,
    next: HttpHandler,
    token: string,
  ): Observable<HttpEvent<unknown>> {
    const withAuth = request.clone({
      setHeaders: { Authorization: 'Bearer ' + token },
    });
    return next.handle(withAuth);
  }

  private async authRequest(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Promise<HttpEvent<unknown>> {
    const { accessToken, refreshToken } = this.authService;
    if (accessToken) {
      try {
        return await lastValueFrom(
          this.sendWithAuth(request, next, accessToken),
        );
      } catch (err) {
        if (err instanceof HttpErrorResponse && err.status !== 401) {
          throw err;
        }
      }
    }
    if (refreshToken) {
      try {
        await lastValueFrom(this.authService.refresh());
      } catch (err) {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.authService.logout();
        }
        throw err;
      }
      return lastValueFrom(
        this.sendWithAuth(request, next, this.authService.accessToken || ''),
      );
    }
    try {
      return lastValueFrom(next.handle(request));
    } catch (err) {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        this.authService.logout();
      }
      throw err;
    }
  }
}
