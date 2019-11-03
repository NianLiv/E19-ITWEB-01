import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserSignUp } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenStorageKey: string = 'token';
  private readonly authEndpoint = `${environment.apiRoot}/user`;

  isAuthenticated$ = new BehaviorSubject<boolean>(this.hasToken());
  token$ = new BehaviorSubject<string | null>(this.getToken());

  constructor(private http: HttpClient) {}

  private getToken(): string {
    return localStorage.getItem(this.tokenStorageKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenStorageKey, token);
    this.token$.next(token);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenStorageKey);
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
    this.isAuthenticated$.next(false);
  }
}
