import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-detail-booking',
  templateUrl: './detail-booking.component.html',
  styleUrls: ['./detail-booking.component.scss']
})
export class DetailBookingComponent {

  booking: any;
  constructor(
    public dialogRef: MatDialogRef<DetailBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: BookingService
  ) { console.log(data); this.getBookingByID(data) }

  getBookingByID(id: string) {
    this.service.getBookingsById(id).subscribe((result) => {
      this.booking = result
    })
  }
  cancel() {
    this.dialogRef.close();
  }

}
