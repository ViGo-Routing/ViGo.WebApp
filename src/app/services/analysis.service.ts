import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ErrorService } from './error.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  host: string = environment.apiUrl;
  apiUrlBookings = `${this.host}api/Booking`
  apiUrlBookingsDetail = `${this.host}/api/BookingDetail`
  apiUrlUser = `${this.host}/api/BookingDetail`
  constructor(private http: HttpClient, private errorSvc: ErrorService) {
  }
  getBookingsAnalysis(): Observable<any> {
    let url = `${this.apiUrlBookings}/Analysis`
    return this.http.get<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  getBookingsDetailAnalysis(): Observable<any> {
    let url = `${this.apiUrlBookingsDetail}/Analysis`
    return this.http.get<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  getUserAnalysis(): Observable<any> {
    let url = `${this.apiUrlUser}/Analysis`
    return this.http.get<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
}
