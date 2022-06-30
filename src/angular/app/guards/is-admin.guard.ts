import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService) {}
  canLoad(): Observable<boolean> {
    return this.authService.isAdmin();
  }
  canActivate(): Observable<boolean> {
    return this.authService.isAdmin();
  }
  canActivateChild(): Observable<boolean> {
    return this.authService.isAdmin();
  }
}
