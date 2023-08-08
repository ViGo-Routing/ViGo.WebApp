import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { vndFormat } from 'src/app/shared/numberUtils';
import { DetailFareComponent } from '../detail-fare/detail-fare.component';
import { FareService } from 'src/app/services/fare.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-fare',
  templateUrl: './update-fare.component.html',
  styleUrls: ['./update-fare.component.scss'],
})
export class UpdateFareComponent implements OnInit {
  vndFormat = vndFormat;
  valueError = false;
  errorMessage = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    public dialogRef: MatDialogRef<DetailFareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fareService: FareService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onBaseDistanceChange(e: number) {
    this.data.farePolicies[0].minDistance = e;
  }

  onMaxDistanceChange(e: number, index: number) {
    this.data.farePolicies[index + 1].minDistance = e;
  }

  addPolicy() {
    let minDistance = null,
      maxDistance = null,
      pricePerKm = null;
    let policiesCount = this.data.farePolicies.length;
    console.log(policiesCount);
    if (policiesCount == 1) {
      minDistance = this.data.baseDistance;
    } else {
      minDistance = this.data.farePolicies[policiesCount - 2].maxDistance;
    }

    // console.log(minDistance);
    // console.log(maxDistance);
    // console.log(pricePerKm);
    this.data.farePolicies.splice(policiesCount - 1, 0, {
      minDistance: minDistance,
      maxDistance: maxDistance,
      pricePerKm: pricePerKm,
    });
    console.log(this.data.farePolicies);
  }

  deletePolicy(index: number) {
    this.data.farePolicies.splice(index, 1);
    if (index == 0) {
      this.data.farePolicies[index].minDistance = this.data.baseDistance;
    } else {
      this.data.farePolicies[index].minDistance =
        this.data.farePolicies[index - 1].maxDistance;
    }
  }

  update() {
    this.valueError = false;
    this.errorMessage = '';

    if (this.data.baseDistance <= 0) {
      this.valueError = true;
      this.errorMessage = 'Số km đầu tiên phải lớn hơn 0!';
    } else if (this.data.basePrice < 1000) {
      this.valueError = true;
      this.errorMessage =
        'Giá tiền cho các km đầu tiên phải lớn hơn hoặc bằng ' +
        vndFormat(1000);
    } else {
      // this.data.farePolicies.sort((policy1: any, policy2: any) => {
      //   policy2.minDistance - policy1.minDistance;
      // });

      for (let i = 0; i < this.data.farePolicies.length; i++) {
        let policy = this.data.farePolicies[i];
        if (i < this.data.farePolicies.length - 1) {
          if (
            policy.maxDistance == null ||
            policy.maxDistance <= policy.minDistance
          ) {
            this.valueError = true;
            this.errorMessage =
              'Số km tối đa phải lớn hơn ' + policy.minDistance;
          }
        } else {
        }
        if (policy.pricePerKm == null || policy.pricePerKm < 1000) {
          this.valueError = true;
          this.errorMessage =
            'Giá tiền mỗi km phải lớn hơn hoặc bằng ' + vndFormat(1000);
        }
      }

      if (!this.valueError) {
        let updatedFare = {
          id: this.data.id,
          baseDistance: this.data.baseDistance,
          basePrice: this.data.basePrice,
          farePolicies: this.data.farePolicies,
        };
        this.fareService
          .updateFare(this.data.id, updatedFare)
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
  }

  trackByFn(index: number, item: any) {
    return index;
  }

  cancel() {
    this.dialogRef.close();
  }
}
