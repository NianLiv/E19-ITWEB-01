import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User, UserSignUp } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenStorageKey: string = 'token';
  private readonly authEndpoint = `${environment.apiRoot}/user`;

  isAuthenticated$ = new BehaviorSubject<boolean>(this.hasToken());
  currentUser$ = new BehaviorSubject<User | null>(this.getUserFromToken());
  token$ = new BehaviorSubject<string | null>(this.getToken());

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  private getToken(): string {
    return localStorage.getItem(this.tokenStorageKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenStorageKey, token);
    this.token$.next(token);
    this.isAuthenticated$.next(true);
    this.currentUser$.next(this.jwtHelper.decodeToken(token));
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenStorageKey);
  }

  private getUserFromToken(): User {
    return this.jwtHelper.decodeToken(this.getToken());
  }

  public login(email: string, password: string): Observable<void> {
    return this.http
      .post<{ token: string }>(`${this.authEndpoint}/sign-in`, {
        email,
        password
      })
      .pipe(
        tap(response => this.setToken(response.token)),
        mapTo(undefined)
      );
  }

  public signUp(signUp: UserSignUp): Observable<void> {
    return this.http
      .post<{ token: string }>(`${this.authEndpoint}/sign-up`, signUp)
      .pipe(
        tap(response => this.setToken(response.token)),
        mapTo(undefined)
      );
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.token$.next(null);
    this.isAuthenticated$.next(false);
    this.currentUser$.next(null);
  }
}
