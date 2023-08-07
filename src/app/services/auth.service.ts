import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs';
import { ErrorService } from './error.service';
import { environment } from 'src/environments/environment.prod';
import { isValidToken } from '../shared/jwtUtils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  host: string = environment.apiUrl;
  apiHost = `${this.host}api/Authenticate/Web/Login`;
  constructor(private http: HttpClient, private errorSvc: ErrorService) {}

  ProceedLogin(UserCred: any) {
    return this.http
      .post(this.apiHost, UserCred)
      .pipe(catchError((error) => this.errorSvc.handleError(error)));
  }
  IsLoggedIn() {
    return isValidToken();
  }
  IsNotLogin() {
    return localStorage.getItem('is_login') != 'invalid';
  }
  GetToken() {
    let message = localStorage.getItem('token');
    let permission = localStorage.getItem('permission');
    return localStorage.getItem('token') || '';
  }
  GetPermission() {
    let message = localStorage.getItem('permission');
    return localStorage.getItem('permission') || '';
  }
  CreateListRoute() {
    let message = localStorage.getItem('permission');
  }
}
