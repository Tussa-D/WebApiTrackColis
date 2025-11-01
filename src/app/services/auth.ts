import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginModel, RegisterModel, LoginResponse, Response } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  
  // Pour savoir si l'utilisateur est connecté (observable)
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  // ✅ LOGIN
  login(model: LoginModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/Authenticate/login`, model)
      .pipe(
        tap(response => {
          // Sauvegarder le token dans localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('refreshToken', response.refreshToken);
          this.isAuthenticatedSubject.next(true);
        })
      );
  }

  // ✅ REGISTER
  register(model: RegisterModel): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/Authenticate/register`, model);
  }

  // ✅ REGISTER ADMIN
  registerAdmin(model: RegisterModel): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/Authenticate/register-admin`, model);
  }

  // ✅ LOGOUT
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.isAuthenticatedSubject.next(false);
  }

  // ✅ Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return this.hasToken();
  }

  // ✅ Récupérer le token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ✅ Vérifier si le token existe
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // ✅ Récupérer les informations de l'utilisateur depuis le token JWT
  getUserInfo(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        username: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        roles: payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || []
      };
    } catch (e) {
      return null;
    }
  }
}