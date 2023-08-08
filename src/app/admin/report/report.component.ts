import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { SelectionModel } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ReportService } from 'src/app/services/report.service';
import { CreateReportComponent } from './create-report/create-report.component';
import { EditReportComponent } from './edit-report/edit-report.component';
import { DetailReportComponent } from './detail-report/detail-report.component';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [
    // 'select',
    'createdTime',
    'title',
    'content',
    'name',
    // 'feedback',
    'type',
    'status',
    'action',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  ReportList: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  pageNumber: number = 0;
  pageSize: number = 10;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  totalItems: number;

  constructor(
    private service: ReportService,
    public matdialog: MatDialog,
    //private dataService: DataService,
    // public isLoading: LoaderService,
    private snackBar: MatSnackBar,
    private title: Title,
    private meta: Meta
  ) {
    this.getReportList();
  }

  ngOnInit(): void {
    this.title.setTitle('Danh sách báo cáo | ' + environment.siteName);
    this.meta.addTag({
      name: 'description',
      content: 'Danh sách báo cáo - ' + environment.siteName,
    });
  }

  getReportList() {
    let apiPageNumber = this.pageNumber + 1;
    this.service
      .getListReports(apiPageNumber, this.pageSize)
      .subscribe((list) => {
        this.ReportList = list.data;
        this.dataSource = new MatTableDataSource(list.data);
        this.totalItems = list.totalCount;
      });
  }
  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getReportList();
  }
  getReportPage(pageIndex: number, pageSize: number) {
    // this.service.getListReportPage(pageIndex, pageSize).subscribe((list) => {
    //   this.dataSource = new MatTableDataSource(list.result.result.doc);
    //   console.log(this.dataSource,'lít')
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // })
  }
  getReportById(id: string) {
    // this.service.findReportById(id).subscribe((s) => {
    //   this.Report = s.result;
    // });
    // return this.Report;
  }
  addReport() {
    this.matdialog
      .open(CreateReportComponent, {
        disableClose: true,
        maxHeight: 'calc(100vh - 50px)',
        height: 'auto',
        width: '1500px',
        position: { top: '3%' },
      })
      .afterClosed()
      .subscribe(() => {
        this.getReportList();
      });
  }
  editReport(Report: any) {
    this.matdialog
      .open(EditReportComponent, {
        disableClose: true,
        data: Report,
        maxHeight: 'calc(100vh - 50px)',
        height: 'auto',
        width: '500px',
        position: { top: '3%' },
      })
      .afterClosed()
      .subscribe(() => {
        this.getReportList();
      });
  }

  detailReport(Report: any) {
    this.matdialog
      .open(DetailReportComponent, {
        disableClose: true,
        data: Report,
        maxHeight: 'calc(100vh - 30vh)',
        height: 'auto',
        width: '1000px',
        position: { top: '3%' },
      })
      .afterClosed()
      .subscribe(() => {
        this.getReportList();
      });
  }

  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = !!this.ReportList && this.ReportList.length;
  //   return numSelected === numRows;
  // }
  // /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected()
  //     ? this.selection.clear()
  //     : this.ReportList.forEach((r: any) => this.selection.select(r));
  // }
  // /** The label for the checkbox on the passed row */
  // checkboxLabel(row: any): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1
  //     }`;
  // }
  // deleteAll() {
  //   const listname: any[] = this.selection.selected.map(x => x.device);
  //   listname.forEach(item => {
  //     this.service.deleteReportById(item.id).subscribe(s => {
  //       this.snackBar.open(`Xóa ${item.name} thành công`, "Đóng", {
  //         horizontalPosition: this.horizontalPosition,
  //         verticalPosition: this.verticalPosition,
  //         duration: 1000
  //       });
  //     })
  //   })
  // }

  getReportStatus(status: 'PENDING' | 'PROCESSED' | 'DENIED') {
    switch (status) {
      case 'DENIED':
        return 'Bị từ chối';
      case 'PENDING':
        return 'Đang chờ xử lý';
      case 'PROCESSED':
        return 'Đã xử lý';
    }
  }

  getReportType(type: 'DRIVER_NOT_COMING' | 'BOOKER_NOT_COMING' | 'OTHER') {
    switch (type) {
      case 'BOOKER_NOT_COMING':
        return 'Khách hàng không đến';
      case 'DRIVER_NOT_COMING':
        return 'Tài xế không đến';
      case 'OTHER':
        return 'Khác';
    }
  }
}
