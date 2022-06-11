import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canLoad(): boolean {
    if (!!this.authService.currentUser) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  canActivate(): boolean {
    if (!!this.authService.currentUser) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  canActivateChild(): boolean {
    if (!!this.authService.currentUser) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
