import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { LoginComponent } from '../components/login/login.component';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate, CanDeactivate<unknown> {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isNonAuthorized().pipe(
      tap((nonAuthorized) => {
        if (!nonAuthorized) {
          this.router.navigate([]);
        }
      }),
    );
  }
  canDeactivate(
    component: unknown,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (component instanceof LoginComponent) {
      return this.isNonAuthorized().pipe(map((authorized) => !authorized));
    }
    return true;
  }

  private isNonAuthorized() {
    return this.authService.currentUser.pipe(map((user) => !user));
  }
}
