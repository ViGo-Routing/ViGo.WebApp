import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { da } from 'date-fns/locale';
import { ErrorService } from 'src/app/services/error.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-promotion',
  templateUrl: './edit-promotion.component.html',
  styleUrls: ['./edit-promotion.component.scss']
})
export class EditPromotionComponent {

  submitted = false;
  editForm: FormGroup;
  intervalList: any;
  calendarStart: any;
  calendarEnd: any;
  promotion: any = {}
  vehicleType: any
  updateForm: any = {
    expireTime: '',
    startTime: ''
  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    public dialogRef: MatDialogRef<EditPromotionComponent>,
    private service: PromotionService,
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
    this.getPromotionWithId(this.data);

  }
  myForm() {
    this.editForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      discountAmount: [0, Validators.required],
      isPercentage: [true, Validators.required],
      maxDecrease: [0, Validators.required],
      startTime: ['', Validators.required],
      expireTime: ['', Validators.required],
      maxTotalUsage: [0, Validators.required],
      usagePerUser: [0, Validators.required],
      minTotalPrice: [0, Validators.required],
      vehicleTypeId: ['', Validators.required],
      status: ['UNAVAILABLE', Validators.required]
    });
  }
  async getPromotionWithId(id: string) {
    try {
      const response = await this.service.getPromotionsById(id).toPromise();
      this.editForm.patchValue(response);

      if (response.vehicleTypeId != null) {
        await this.getListVehicleType();
      }
    } catch (error) {
      console.error(error);
    }

  }
  async getListVehicleType() {
    try {
      const response = await this.serviceVehicleType.getListVehicleTypes().toPromise();
      this.vehicleType = response.data;
      console.log(response)
    } catch (error) {
      console.error(error);
    }

  }

  onStartDateChange(event: any) {
    console.log("xxxxxx", event.value)
    this.editForm.controls['startTime'].setValue(event.value);
  }
  onEndDateChange(event: any) {
    this.editForm.controls['expireTime'].setValue(event.value);
  }
  update() {
    this.submitted = true;
    if (this.editForm.valid) {
      const formValues = this.editForm.value;
      this.service.updatePromotionByID(this.data, formValues).subscribe((s) => {
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
