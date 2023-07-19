import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ErrorService } from './error.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  host: string = environment.apiUrl;
  apiUrlReports = `${this.host}api/Report`
  constructor(private http: HttpClient, private errorSvc: ErrorService) {
  }
  getListReports(pageNumber: number, pageSize: number): Observable<any> {
    let url = `${this.apiUrlReports}/Admin?PageNumber=${pageNumber}&PageSize=${pageSize}`
    return this.http.get<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  creatNewReport(Report: any) {
    let url = `${this.apiUrlReports}`;
    return this.http.post<any>(url, Report).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  updateReportByID(id: string, Report: any) {
    let url = `${this.apiUrlReports}/` + id;
    return this.http.put<any>(url, Report).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  getReportsById(id: string): Observable<any> {
    let url = `${this.apiUrlReports}/` + id
    return this.http.get<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  deleteReportById(id: string): Observable<any> {
    let url = `${this.apiUrlReports}/` + id
    return this.http.delete<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
}
