import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ErrorService } from './error.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  host: string = environment.apiUrl;
  apiUrlUsers = `${this.host}api/User`
  constructor(private http: HttpClient, private errorSvc: ErrorService) {
  }
  getListUsers(pageNumber: number, pageSize: number): Observable<any> {
    let url = `${this.apiUrlUsers}?PageNumber=${pageNumber}&PageSize=${pageSize}`
    return this.http.get<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  creatNewUser(user: any) {
    return this.http.post<any>(this.apiUrlUsers, user).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  updateUserByID(id: string, user: any) {
    let url = `${this.apiUrlUsers}/` + id;
    return this.http.put<any>(url, user).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  updateStatusUserByID(id: string, user: any) {
    let url = `${this.apiUrlUsers}/UpdateStatus` + id;
    return this.http.put<any>(url, user).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
}
