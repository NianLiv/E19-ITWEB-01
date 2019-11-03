import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly tokenStorageKey: string = 'token';

  isAuthenticated$ = new BehaviorSubject<boolean>(this.hasToken());
  token$ = new BehaviorSubject<string | null>(this.getToken());

  constructor(private httpClient: HttpClient) { }

  private getToken(): string {
    return localStorage.getItem(this.tokenStorageKey);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenStorageKey);
  }

  public login(): void {
    localStorage.setItem('token', 'JWT');
    this.isAuthenticated$.next(true);
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated$.next(false);
  }

}
