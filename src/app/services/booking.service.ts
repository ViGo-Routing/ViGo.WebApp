import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ErrorService } from './error.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  host: string = environment.apiUrl;
  apiUrlBookings = `${this.host}api/Booking`
  constructor(private http: HttpClient, private errorSvc: ErrorService) {
  }
  getListBookings(pageNumber: number, pageSize: number): Observable<any> {
    let url = `${this.apiUrlBookings}?PageNumber=${pageNumber}&PageSize=${pageSize}`
    return this.http.get<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  getBookingsById(id: string): Observable<any> {
    let url = `${this.apiUrlBookings}/` + id
    return this.http.get<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
}
