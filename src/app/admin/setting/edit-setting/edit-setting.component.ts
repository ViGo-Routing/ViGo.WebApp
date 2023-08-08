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
    this.editSettingForm.controls['dataType'].disable();
    this.editSettingForm.controls['dataUnit'].disable();
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
}
