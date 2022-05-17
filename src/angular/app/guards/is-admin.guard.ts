import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService) {}
  canLoad(): boolean {
    return !!this.authService.currentUser;
  }
  canActivate(): boolean {
    return this.authService.isAdmin();
  }
  canActivateChild(): boolean {
    return this.authService.isAdmin();
  }
}
