import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  host: string = environment.apiUrl;
  apiUrlSetting = `${this.host}api/Setting`;

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getSettings(): Observable<any> {
    let url = `${this.apiUrlSetting}`;
    return this.http
      .get<any>(url)
      .pipe(catchError((error) => this.errorService.handleError(error)));
  }

  updateSetting(settingKey: string, settingValue: any) {
    let url = `${this.apiUrlSetting}/${settingKey}`;
    let body = {
      key: settingKey,
      value: settingValue,
    };
    return this.http
      .put<any>(url, body)
      .pipe(catchError((error) => this.errorService.handleError(error)));
  }
}
