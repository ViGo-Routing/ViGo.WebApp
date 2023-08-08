import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FareService {
  host: string = environment.apiUrl;
  apiUrlFare = `${this.host}api/Fare`;
  apiUrlFarePolicy = `${this.host}api/FarePolicy`;

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getFares(): Observable<any> {
    let url = `${this.apiUrlFare}`;
    return this.http
      .get<any>(url)
      .pipe(catchError((error) => this.errorService.handleError(error)));
  }

  getFarePolicies(fareId: string): Observable<any> {
    let url = `${this.apiUrlFarePolicy}/Fare/${fareId}`;
    return this.http
      .get<any>(url)
      .pipe(catchError((error) => this.errorService.handleError(error)));
  }

  updateFare(fareId: string, updatedFare: any) {
    let url = `${this.apiUrlFare}/${fareId}`;
    let body = updatedFare;
    return this.http
      .put<any>(url, body)
      .pipe(catchError((error) => this.errorService.handleError(error)));
  }
  // updateSetting(settingKey: string, settingValue: any) {
  //   let url = `${this.apiUrlSetting}/${settingKey}`;
  //   let body = {
  //     key: settingKey,
  //     value: settingValue,
  //   };
  //   return this.http
  //     .put<any>(url, body)
  //     .pipe(catchError((error) => this.errorService.handleError(error)));
  // }
}
