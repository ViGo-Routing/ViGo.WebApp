import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { BookingService } from 'src/app/services/booking.service';
import { vndFormat } from 'src/app/shared/numberUtils';

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
    private bookingService: BookingService // public matdialog: MatDialog,
  ) {}

  ngOnInit(): void {
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

  cancel() {
    this.dialogRef.close();
  }
}
