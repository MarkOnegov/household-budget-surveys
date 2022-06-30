import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, map, Observable, Subject, tap } from 'rxjs';
import { LoginForm, SuccussLogin } from 'src/common/types/auth.types';
import { Role } from 'src/common/types/user.types';

const REFRESH_TOKEN_KEY = 'refresh';

export type CurrentUser = { username: string; roles: Role[] };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accessToken?: string;

  private _currentUser = new BehaviorSubject<CurrentUser | null | undefined>(
    undefined,
  );

  private _refresh: Observable<CurrentUser> | undefined = undefined;

  get currentUser() {
    return this._currentUser.pipe(filter((user) => user !== undefined));
  }

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

  constructor(private http: HttpClient, router: Router) {
    if (!this.refreshToken) {
      this._currentUser.next(null);
    } else {
      this.refresh().subscribe();
    }
    this.currentUser.subscribe((user) => {
      if (!user) {
        router.navigate(['login']);
      }
    });
  }

  login(credentials: LoginForm) {
    return this.http.post<SuccussLogin>('/api/auth/login', credentials).pipe(
      tap(this.succussLogin.bind(this)),
      map(({ user }) => user),
    );
  }

  logout() {
    this.accessToken = undefined;
    this.refreshToken = undefined;
    this._currentUser.next(null);
  }

  refresh() {
    if (this._refresh) {
      return this._refresh;
    }
    const refresh = new Subject<CurrentUser>();
    this._refresh = refresh;
    this.http
      .post<SuccussLogin>('/api/auth/refresh', {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap(this.succussLogin.bind(this)),
        map(({ user }) => user),
      )
      .subscribe({
        next: (user) => {
          refresh.next(user);
          refresh.complete();
          this._refresh = undefined;
        },
        error: (err) => {
          this.logout();
          refresh.error(err);
        },
        complete: () => refresh.complete(),
      });
    return refresh;
  }

  hasRole(...roles: Role[]) {
    return this.currentUser.pipe(
      map((user) => !!user && user.roles.some((role) => roles.includes(role))),
    );
  }

  isAdmin() {
    return this.currentUser.pipe(
      map((user) => !!user && user.roles.includes(Role.ADMIN)),
    );
  }

  private succussLogin({ access_token, refresh_token, user }: SuccussLogin) {
    this.accessToken = access_token;
    this.refreshToken = refresh_token;
    this._currentUser.next(user);
  }
}
