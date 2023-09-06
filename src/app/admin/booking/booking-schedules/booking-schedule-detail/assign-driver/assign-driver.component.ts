import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-assign-driver',
  templateUrl: './assign-driver.component.html',
  styleUrls: ['./assign-driver.component.scss']
})
export class AssignDriverComponent {
  editForm: FormGroup;
  submitted = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    public dialogRef: MatDialogRef<AssignDriverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookingService: BookingService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { this.myForm() }
  myForm() {
    this.editForm = this.fb.group({
      driver: ['', Validators.required],
    });
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }
  }
  assignDriver() {
    this.submitted = true;
    const dataResponse = {
      bookingDetailId: this.data.bookingDetailId,
      driverId: this.editForm.get("driver")?.value
    }
    if (this.editForm.valid) {
      const formValues = this.editForm.value;
      this.bookingService.assignDriver(this.data.bookingDetailId, dataResponse).subscribe((s) => {
        this.snackBar.open("Đăng kí tài xế thành công ", "Đóng", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 1000
        });
        this.dialogRef.close();
      })
    }
  }
  cancel() {
    this.dialogRef.close();
  }
}
