import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookingService } from 'src/app/services/booking.service';
import { DetailBookingComponent } from './detail-booking/detail-booking.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [
    'createdTime',
    'customerName',
    'phoneUser',
    // 'startRouteStation',
    // 'endRouteStation',
    'priceAfterDiscount',
    'paymentMethod',
    'vehicleName',
    'status',
    'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  bookingList: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageNumber: number = 1;
  pageSize: number = 10;
  totalItems: number;

  length = 500;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  constructor(
    private service: BookingService,
    public matdialog: MatDialog,

    private paginatorIntl: MatPaginatorIntl
    //private dataService: DataService,
    // public isLoading: LoaderService,
  ) {
    this.paginatorIntl.itemsPerPageLabel = 'Items per page:';
    this.paginatorIntl.nextPageLabel = 'Next page';
    this.paginatorIntl.previousPageLabel = 'Previous page';
    this.getBookingPage(this.pageNumber, this.pageSize);
    this.getBookingList()
  }


  getBookingList() {
    this.service.getListBookings(this.pageNumber, this.pageSize).subscribe((list) => {
      this.dataSource = new MatTableDataSource(list.data);
      this.totalItems = list.totalCount;
    })
  }

  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getBookingList();
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = !!this.bookingList && this.bookingList.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.bookingList.forEach((r: any) => this.selection.select(r));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1
      }`;
  }

}
