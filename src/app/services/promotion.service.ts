import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ErrorService } from './error.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  host: string = environment.apiUrl;
  apiUrlPromotions = `${this.host}api/Promotion`
  constructor(private http: HttpClient, private errorSvc: ErrorService) {
  }
  getListPromotions(): Observable<any> {
    return this.http.get<any>(this.apiUrlPromotions).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  creatNewPromotion(promotion: any) {
    let url = `${this.apiUrlPromotions}`;
    return this.http.post<any>(url, promotion).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  updatePromotionByID(id: string, promotion: any) {
    let url = `${this.apiUrlPromotions}/` + id;
    return this.http.put<any>(url, promotion).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  getPromotionsById(id: string): Observable<any> {
    let url = `${this.apiUrlPromotions}/` + id
    return this.http.get<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  deletePromotionById(id: string): Observable<any> {
    let url = `${this.apiUrlPromotions}/` + id
    return this.http.delete<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
}
