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
  apiUrlRoutine = `${this.host}api/RouteRoutine/Route`
  apiUrlRouteStation = `${this.host}api/RouteStation/Route`
  constructor(private http: HttpClient, private errorSvc: ErrorService) {
  }
  getListRoutes(pageNumber: number, pageSize: number): Observable<any> {
    let url = `${this.apiUrlRoutes}?PageNumber=${pageNumber}&PageSize=${pageSize}`
    return this.http.get<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  getRoutesById(id: string): Observable<any> {
    let url = `${this.apiUrlRoutes}/` + id
    return this.http.get<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }

  getRouteStationByRouteId(id: string): Observable<any> {
    let url = `${this.apiUrlRouteStation}/` + id
    return this.http.get<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  creatNewRoute(route: any) {
    return this.http.post<any>(this.apiUrlRoutes, route).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  updateRouteByID(id: string, device: any) {
    let url = `${this.apiUrlRoutes}/` + id;
    return this.http.put<any>(url, device).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  deleteRouteByID(id: string) {
    let url = `${this.apiUrlRoutes}/` + id;
    return this.http.delete<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }


  //ROUTINE
  getRoutineByRouteId(id: string): Observable<any> {
    let url = `${this.apiUrlRoutine}/` + id
    return this.http.get<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  updateRoutineByID(id: string, routine: any) {
    let url = `${this.apiUrlRoutine}/` + id;
    let data = {
      routeId: id,
      routeRoutines: [
        routine
      ]
    }
    return this.http.put<any>(url, data).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
}
