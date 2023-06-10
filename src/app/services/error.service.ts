import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(

    private router: Router
  ) { }

  handleError(error: any) {
    // console.log("error", error);
    // if (error == undefined) {
    //   console.log('Undefined error')
    // }
    // if (error.status) {
    //   switch (error.status) {
    //     case 400:
    //       if (error.message.includes('RemoveMany')) {
    //         this.toastr.error(`${error.error.message}`);
    //       } else if (error.message.includes('DeleteMany')) {
    //         this.toastr.error(`${error.error.message}`);
    //       } else {
    //         this.toastr.error(`${error.error.message}`);
    //       }
    //       break;
    //     case 401:
    //       this.toastr.error(`Unauthorized `, `${error.statusText}`);
    //       this.router.navigate(['/login']);
    //       break;
    //     case 403:
    //       this.toastr.error('Forbidden', `${error.message}`);
    //       break;
    //     case 404:
    //       if (error.message.includes('DeviceLog')) {
    //         console.log('Device Log not found');
    //       } else if (error.message.includes('Login')) {
    //         this.toastr.error('Please check your password and account name and try again.');
    //       } else {
    //         console.log('Not found');
    //       }
    //       break;
    //     case 405:
    //       this.toastr.error(`${error.message}`);
    //       break;
    //     case 409:
    //       this.toastr.error(`${error.message}`);
    //       break;
    //     case 500:
    //       this.toastr.error('Internal server error');
    //       break;
    //     case 503:
    //       this.toastr.error('Service Unavailable');
    //       break;
    //     default:
    //       console.log(`Bad request `, `${error.message}`);
    //       break;
    //   }
    // } else if (error.error) {
    //   switch (error.status) {
    //     case 400:
    //       this.toastr.error(`Bad request `, `${error.error.message}`);
    //       break;
    //     case 401:
    //       this.toastr.error(`Unauthorized `, `${error.error.message}`);
    //       this.router.navigate(['/login']);
    //       break;
    //     case 403:
    //       this.toastr.error('Forbidden', `${error.error.message}`);
    //       break;
    //     case 404:
    //       if (error.message.includes('DeviceLog')) {
    //         console.log('Device Log not found');
    //       } else if (error.message.includes('Login')) {
    //         this.toastr.error('Please check your password and account name and try again.');
    //       } else {
    //         console.log('Not found');
    //       }
    //       break;
    //     case 405:
    //       this.toastr.error(`${error.error.message}`);
    //       break;
    //     case 409:
    //       this.toastr.error(`${error.error.message}`);
    //       break;
    //     case 500:
    //       this.toastr.error('Internal server error');
    //       break;
    //     case 503:
    //       this.toastr.error('Service Unavailable');
    //       break;
    //     default:
    //       console.log(`Bad request `, `${error.error.message}`);
    //       break;
    //   }
    // }
    // if (error.name.match('TimeoutError')) {
    //   this.toastr.error('Connection Timeout');
    // } else {
    //   console.log('An error occurred:', `${error.message}`);
    // }
    // return throwError(
    //   `Backend returned code ${error.status}, ` +
    //   `body was: ${(error.error as any).message}`);

  }

  handleTimeoutError(error: any) {
    // this.toastr.error(`Connection timeout!`);
    return throwError(
      `Connection timeout!`);
  }
}
