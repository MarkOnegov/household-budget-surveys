import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { LoginForm, SuccussLogin } from 'src/common/types/auth.types';
import { Role, User } from 'src/common/types/user.types';

const REFRESH_TOKEN_KEY = 'refresh';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accessToken?: string;

  currentUser?: { username: string; roles: Role[] };

  get refreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY) || undefined;
  }
  set refreshToken(token: string | undefined) {
    if (!token) {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      return;
    }
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  constructor(private http: HttpClient) {}

  login(credentials: LoginForm) {
    return this.http.post<SuccussLogin>('/api/auth/login', credentials).pipe(
      tap(this.succussLogin.bind(this)),
      map(({ user }) => user),
    );
  }

  logout() {
    this.accessToken = undefined;
    this.refreshToken = undefined;
    this.currentUser = undefined;
  }

  refresh() {
    return this.http
      .post<SuccussLogin>('/api/auth/refresh', {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap(this.succussLogin.bind(this)),
        map(({ user }) => user),
      );
  }

  hasRole(...roles: Role[]) {
    if (!this.currentUser) {
      return false;
    }
    return roles.some((role) => this.currentUser?.roles.includes(role));
  }

  isAdmin() {
    return this.currentUser?.roles.includes(Role.ADMIN) || false;
  }

  private succussLogin({ access_token, refresh_token, user }: SuccussLogin) {
    this.accessToken = access_token;
    this.refreshToken = refresh_token;
    this.currentUser = user;
  }
}
