import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { throwError } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(

    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error != null) {
      console.log(error.error)
      // Client-side error occurred
      if (error.error.status === 401) {
        this.router.navigate(["/login"]);
      }
      this.snackBar.open(`${error.error}`, "Đóng", {
        horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition,
        duration: 1000,
      })
    } else {
      // Backend error occurred
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error.message}`;
    }
    return throwError(errorMessage);

  }

  handleTimeoutError(error: any) {
    // this.snackBar.open(`Connection timeout!`);
    return throwError(
      `Connection timeout!`);
  }
}
