import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ErrorService } from './error.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLicenseService {
  host: string = environment.apiUrl;
  apiUrlUserLicenses = `${this.host}api/UserLicense`
  constructor(private http: HttpClient, private errorSvc: ErrorService) {
  }
  getListUserLicenses(pageNumber: number, pageSize: number): Observable<any> {
    let url = `${this.apiUrlUserLicenses}/?PageNumber=${pageNumber}&PageSize=${pageSize}`
    return this.http.get<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  creatNewUserLicense(UserLicense: any) {
    let url = `${this.apiUrlUserLicenses}`;
    return this.http.post<any>(url, UserLicense).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  updateUserLicenseByID(id: string, UserLicense: any) {
    let url = `${this.apiUrlUserLicenses}/` + id;
    return this.http.put<any>(url, UserLicense).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  getUserLicensesById(id: string): Observable<any> {
    let url = `${this.apiUrlUserLicenses}/User/` + id
    return this.http.get<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  deleteUserLicenseById(id: string): Observable<any> {
    let url = `${this.apiUrlUserLicenses}/` + id
    return this.http.delete<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
}
