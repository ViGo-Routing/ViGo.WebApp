import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ErrorService } from './error.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  host: string = environment.apiUrl;
  apiUrlRoutes = `${this.host}api/Route`
  constructor(private http: HttpClient, private errorSvc: ErrorService) {
  }
  getListRoutes(): Observable<any> {
    return this.http.get<any>(this.apiUrlRoutes).pipe(
      catchError(async (error) => this.errorSvc.handleError(error))
    );
  }
  getRoutesById(id: string): Observable<any> {
    let url = `${this.apiUrlRoutes}/` + id
    return this.http.get<any>(url).pipe(
      catchError(async (error) => this.errorSvc.handleError(error))
    );
  }
  creatNewRoute(route: any) {
    return this.http.post<any>(this.apiUrlRoutes, route).pipe(
      catchError(async (error) => this.errorSvc.handleError(error))
    );
  }
  updateRouteByID(id: string, device: any) {
    let url = `${this.apiUrlRoutes}/` + id;
    return this.http.put<any>(url, device).pipe(
      catchError(async (error) => this.errorSvc.handleError(error))
    );
  }
}
