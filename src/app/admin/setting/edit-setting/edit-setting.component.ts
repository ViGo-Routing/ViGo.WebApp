import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-edit-setting',
  templateUrl: './edit-setting.component.html',
  styleUrls: ['./edit-setting.component.scss'],
})
export class EditSettingComponent implements OnInit {
  editSettingForm!: FormGroup;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    public dialogRef: MatDialogRef<EditSettingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private settingService: SettingService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.myForm();
  }

  ngOnInit(): void {
    this.editSettingForm.patchValue(this.data);
    this.editSettingForm.controls['description'].disable();
    this.editSettingForm.controls['type'].disable();
    this.editSettingForm.controls['type'].setValue(
      this.getSettingType(this.data.type)
    );
    this.editSettingForm.controls['dataType'].disable();
    this.editSettingForm.controls['dataType'].setValue(
      this.getSettingDataType(this.data.dataType)
    );
    this.editSettingForm.controls['dataUnit'].disable();
    this.editSettingForm.controls['dataUnit'].setValue(
      this.getSettingDataUnit(this.data.dataUnit)
    );
  }

  myForm() {
    this.editSettingForm = this.formBuilder.group({
      value: ['', Validators.required],
      description: [''],
      type: [''],
      dataType: [''],
      dataUnit: [''],
    });
    console.log(this.editSettingForm);
  }

  update() {
    if (this.editSettingForm.valid) {
      this.settingService
        .updateSetting(this.data.key, this.editSettingForm.value.value)
        .subscribe((s) => {
          this.snackBar.open('Chỉnh sửa thành công', 'Đóng', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 1000,
          });
          this.dialogRef.close();
        });
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  getSettingType(
    type: 'DEFAULT' | 'TRIP' | 'PENALTY' | 'ROUTE_ROUTINE' | 'PRICING'
  ) {
    switch (type) {
      case 'DEFAULT':
        return 'Mặc định';
      case 'PENALTY':
        return 'Phạt';
      case 'PRICING':
        return 'Biểu phí';
      case 'ROUTE_ROUTINE':
        return 'Lịch trình';
      case 'TRIP':
        return 'Chuyến đi';
    }
  }

  getSettingDataType(dataType: 'DEFAULT' | 'INTEGER' | 'DOUBLE' | 'TIME') {
    switch (dataType) {
      case 'DEFAULT':
        return 'Mặc định';
      case 'DOUBLE':
        return 'Số thực';
      case 'INTEGER':
        return 'Số nguyên';
      case 'TIME':
        return 'Thời gian';
    }
  }

  getSettingDataUnit(
    dataUnit:
      | 'DEFAULT'
      | 'PERCENT'
      | 'MINUTES'
      | 'HOURS'
      | 'DAYS'
      | 'METERS'
      | 'KILOMETERS'
      | 'TURN'
      | 'TIME'
      | 'MB'
  ) {
    switch (dataUnit) {
      case 'DAYS':
        return 'Ngày';
      case 'DEFAULT':
        return 'Mặc định';
      case 'HOURS':
        return 'Giờ';
      case 'KILOMETERS':
        return 'Km';
      case 'MB':
        return 'MB';
      case 'METERS':
        return 'Mét';
      case 'MINUTES':
        return 'Phút';
      case 'PERCENT':
        return 'Phần trăm';
      case 'TIME':
        return 'Thời gian';
      case 'TURN':
        return 'Lượt';
    }
  }
}
