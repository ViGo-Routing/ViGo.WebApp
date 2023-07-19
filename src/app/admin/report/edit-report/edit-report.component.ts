import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { da } from 'date-fns/locale';
import { ErrorService } from 'src/app/services/error.service';
import { ReportService } from 'src/app/services/report.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss']
})
export class EditReportComponent {

  submitted = false;
  editForm: FormGroup;
  intervalList: any;
  calendarStart: any;
  calendarEnd: any;
  report: any = {}
  vehicleType: any
  updateForm: any = {
    expireTime: '',
    startTime: ''
  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    public dialogRef: MatDialogRef<EditReportComponent>,
    private service: ReportService,
    private serviceVehicleType: VehicleService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private errSvc: ErrorService,
    private snackBar: MatSnackBar
  ) {
    this.myForm();
    this.createForm.runOnce = 'false'
  }

  createForm: any = {
  };
  ngOnInit(): void {
  }
  myForm() {
    this.editForm = this.fb.group({
      reviewerNote: ['', Validators.required],
      status: ['PROCESSED', Validators.required],
      isDeleted: [true, Validators.required],

    });
  }

  update() {
    this.submitted = true;
    if (this.editForm.valid) {
      const formValues = this.editForm.value;
      this.service.updateReportByID(this.data, formValues).subscribe((s) => {
        this.snackBar.open("Chỉnh sửa thành công", "Đóng", {
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
  onSubmit(): void {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }
  }

  onReset(): void {
    this.submitted = false;
    this.editForm.reset();
  }
}
