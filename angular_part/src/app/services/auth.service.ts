import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/auth/';
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}jwt/create/`, body).pipe(
      tap((response: any) => {
        this.accessToken = response.access;
        this.refreshToken = response.refresh;
        if (this.accessToken && this.refreshToken) {
          localStorage.setItem('access_token', this.accessToken);
          localStorage.setItem('refresh_token', this.refreshToken);
        } else {
          throw new Error('Failed to retrieve tokens');
        }
      }),
      catchError(this.handleLoginError) 
    );
  }
  register(name: string, email: string, phone: string, password: string, rePassword: string): Observable<any> {
    const body = {
      username: name,
      email,
      phone,
      password,
      re_password: rePassword
    };

    
  
    return this.http.post(`${this.apiUrl}users/`, body).pipe(
      tap(() => console.log('Registration successful')),
      catchError(this.handleError)
    );
  }
  
  
  
  

  private handleLoginError(error: HttpErrorResponse) {
    let errorMessage = 'Login failed! Please check your credentials and try again.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Network Error: ${error.error.message}`;
    } else {
      if (error.status === 400) {
        errorMessage = error.error.detail || 'Invalid email or password';
      } else if (error.status === 401) {
        errorMessage = 'Unauthorized: Incorrect credentials';
      } else {
        errorMessage = 'Unexpected error occurred during login';
      }
    }
    return throwError(() => new Error(errorMessage));
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      console.error('Error details:', error.error); 
      errorMessage = error.error.detail || 'Invalid email or password';
    }
    return throwError(() => new Error(errorMessage));
  }
  

  logout(): void {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/about']);
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
  
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}users/me/`).pipe(
      catchError(this.handleError)
    );
  }
}
