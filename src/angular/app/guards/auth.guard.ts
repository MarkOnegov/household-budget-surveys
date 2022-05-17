import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService) {}
  canLoad(): boolean {
    return !!this.authService.currentUser;
  }
  canActivate(): boolean {
    return !!this.authService.currentUser;
  }
  canActivateChild(): boolean {
    return !!this.authService.currentUser;
  }
}
