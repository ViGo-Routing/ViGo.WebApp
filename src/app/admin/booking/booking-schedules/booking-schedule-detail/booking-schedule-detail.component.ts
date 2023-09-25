import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { BookingService } from 'src/app/services/booking.service';
import { vndFormat } from 'src/app/shared/numberUtils';
import { AssignDriverComponent } from './assign-driver/assign-driver.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-booking-schedule-detail',
  templateUrl: './booking-schedule-detail.component.html',
  styleUrls: ['./booking-schedule-detail.component.scss'],
})
export class BookingScheduleDetailComponent implements OnInit {
  bookingDetail: any = {};
  vndFormat = vndFormat;

  constructor(
    public dialogRef: MatDialogRef<BookingScheduleDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookingService: BookingService,
    private diverService: UserService,
    public matdialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getBookingDetail()
  }
  getBookingDetail() {
    this.bookingService
      .getBookingDetail(this.data.meta.id)
      .subscribe((detail) => {
        detail.date = moment(detail.date).format('DD/MM/yyyy');
        this.bookingDetail = detail;
      });

  }
  getBookingDetailStatus(
    status:
      | 'ASSIGNED'
      | 'GOING_TO_PICKUP'
      | 'ARRIVE_AT_PICKUP'
      | 'GOING_TO_DROPOFF'
      | 'ARRIVE_AT_DROPOFF'
      | 'CANCELLED'
      | 'PENDING_ASSIGN'
      | 'PENDING_PAID'
      | 'COMPLETED'
  ) {
    switch (status) {
      case 'ASSIGNED':
        return 'Đã có tài xế';
      case 'GOING_TO_PICKUP':
        return 'Đang đi đến điểm đón';
      case 'ARRIVE_AT_PICKUP':
        return 'Đã đến điểm đón';
      case 'GOING_TO_DROPOFF':
        return 'Đang đi đến điểm kết thúc';
      case 'ARRIVE_AT_DROPOFF':
        return 'Đã đến điểm kết thúc';
      case 'CANCELLED':
        return 'Bị hủy';
      case 'COMPLETED':
        return 'Đã hoàn thành';
      case 'PENDING_ASSIGN':
        return 'Chưa có tài xế';
      case 'PENDING_PAID':
        return 'Chờ thanh toán';
    }
  }
  openAssignDriver(bookingDetailId: string) {
    this.diverService.getListDriverToAssign(bookingDetailId).subscribe((details) => {
      console.log(details)
      const data = {
        bookingDetailId: bookingDetailId,
        driver: details
      }
      this.matdialog
        .open(AssignDriverComponent, {
          disableClose: true,
          data: data,
          maxHeight: 'calc(100vh - 10vh)',
          height: 'auto',
          width: '600px',

          position: { top: '6%' },
        })
        .afterClosed()
        .subscribe(() => {
          this.getBookingDetail();
        });
    });
  }
  cancel() {
    this.dialogRef.close();
  }
}
