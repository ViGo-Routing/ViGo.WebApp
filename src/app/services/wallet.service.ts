import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ErrorService } from './error.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  host: string = environment.apiUrl;
  apiUrlWallets = `${this.host}api/Wallet`
  apiUrlWalletTransactions = `${this.host}api/WalletTransaction`
  constructor(private http: HttpClient, private errorSvc: ErrorService) {
  }

  //wallet
  getListWallets(pageNumber: number, pageSize: number): Observable<any> {
    let url = `${this.apiUrlWallets}/?PageNumber=${pageNumber}&PageSize=${pageSize}`
    return this.http.get<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  getListWalletsSystem(): Observable<any> {
    let url = `${this.apiUrlWallets}/SystemAnalysis`
    return this.http.get<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  creatNewWallet(Wallet: any) {
    let url = `${this.apiUrlWallets}`;
    return this.http.post<any>(url, Wallet).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  updateWalletByID(id: string, Wallet: any) {
    let url = `${this.apiUrlWallets}/` + id;
    return this.http.put<any>(url, Wallet).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  getWalletsById(id: string): Observable<any> {
    let url = `${this.apiUrlWallets}/User/` + id
    return this.http.get<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
  deleteWalletById(id: string): Observable<any> {
    let url = `${this.apiUrlWallets}/` + id
    return this.http.delete<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }

  getListWalletTransactions(pageNumber: number, pageSize: number): Observable<any> {
    let url = `${this.apiUrlWalletTransactions}/System?PageNumber=${pageNumber}&PageSize=${pageSize}`
    return this.http.get<any>(url).pipe(
      catchError((error) => this.errorSvc.handleError(error))
    );
  }
}
