import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookingService } from 'src/app/services/booking.service';
import { DetailBookingComponent } from './detail-booking/detail-booking.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {

  displayedColumns: string[] = [
    'createdTime',
    'customerName',
    'phoneUser',
    'startRouteStation',
    'endRouteStation',
    'priceAfterDiscount',
    'paymentMethod',
    'vehicleName',
    'status',
    'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  length = 500;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  constructor(
    private service: BookingService,
    public matdialog: MatDialog,
    //private dataService: DataService,
    // public isLoading: LoaderService,
  ) {
    this.getBookingPage(this.pageIndex, this.pageSize);
    this.getBookingList()
  }


  getBookingList() {
    this.service.getListBookings().subscribe((list) => {
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


  getBookingPage(pageIndex: number, pageSize: number,) {
    // this.service.getListBookingPage(pageIndex, pageSize).subscribe((list) => {

    //   this.dataSource = new MatTableDataSource(list.result.result.doc);
    //   console.log(this.dataSource,'lít')
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;

    // })
  }
  getBookingById(id: string) {
    // this.service.findBookingById(id).subscribe((s) => {
    //   this.booking = s.result;
    // });

    // return this.booking;
  }

  editBooking(dev: any) {
  }

  detailBooking(booking: any) {
    this.matdialog
      .open(DetailBookingComponent, {
        disableClose: true,
        data: booking,
        maxHeight: 'calc(100vh - 30vh)',
        height: 'auto',
        width: '1500px',
        position: { top: '3%' },
      })
      .afterClosed()
      .subscribe(() => {
        this.getBookingList();
      });
  }
}
