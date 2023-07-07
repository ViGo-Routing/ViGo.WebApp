import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ErrorService } from './error.service';
import { Observable, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  host: string = environment.apiUrl;
  apiUrlVehicles = `${this.host}api/Vehicles`
  apiUrlVehicleTypes = `${this.host}api/VehicleType`
  constructor(private http: HttpClient, private errorSvc: ErrorService) {
  }
  getListVehicles(): Observable<any> {
    return this.http.get<any>(this.apiUrlVehicles).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  getVehiclesById(id: string): Observable<any> {
    let url = `${this.apiUrlVehicles}/` + id
    return this.http.get<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  creatNewVehicle(vehicle: any) {
    return this.http.post<any>(this.apiUrlVehicles, vehicle).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  updateVehicleByID(id: string, device: any) {
    let url = `${this.apiUrlVehicles}/` + id;
    return this.http.put<any>(url, device).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }

  // VihecleType 
  getVehicleTypesById(id: string): Observable<any> {
    let url = `${this.apiUrlVehicleTypes}/` + id
    return this.http.get<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  getListVehicleTypes(): Observable<any> {
    return this.http.get<any>(this.apiUrlVehicleTypes).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
}
