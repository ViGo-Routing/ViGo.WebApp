import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UserLicenseService } from 'src/app/services/user-license.service';
import { CreateUserLicenseComponent } from './create-user-license/create-user-license.component';

@Component({
  selector: 'app-user-license',
  templateUrl: './user-license.component.html',
  styleUrls: ['./user-license.component.scss']
})
export class UserLicenseComponent {
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [
    // 'select',
    'createdTime',
    'name',
    'phone',
    'licenseType',
    'frontSideFile',
    'backSideFile',
    'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  UserLicenseList: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  pageNumber: number = 0;
  pageSize: number = 10;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  totalItems: number;
  statusUpdate: string
  constructor(
    private service: UserLicenseService,
    public matdialog: MatDialog,
    //private dataService: DataService,
    // public isLoading: LoaderService,
    private snackBar: MatSnackBar
  ) {

    this.getUserLicenseList()
  }


  getUserLicenseList() {
    let apiPageNumber = this.pageNumber + 1
    this.service.getListUserLicenses(apiPageNumber, this.pageSize).subscribe((list) => {
      this.UserLicenseList = list.data
      this.dataSource = new MatTableDataSource(list.data);
      this.totalItems = list.totalCount;

    })
  }
  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getUserLicenseList();
  }
  getUserLicensePage(pageIndex: number, pageSize: number,) {
    // this.service.getListUserLicensePage(pageIndex, pageSize).subscribe((list) => {

    //   this.dataSource = new MatTableDataSource(list.result.result.doc);
    //   console.log(this.dataSource,'lít')
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;

    // })
  }
  getUserLicenseById(id: string) {
    // this.service.findUserLicenseById(id).subscribe((s) => {
    //   this.UserLicense = s.result;
    // });

    // return this.UserLicense;
  }
  addUserLicense() {
    this.matdialog
      .open(CreateUserLicenseComponent, {
        disableClose: true,
        maxHeight: 'calc(100vh - 50px)',
        height: 'auto',
        width: '500px',
        position: { top: '3%' },
      })
      .afterClosed()
      .subscribe(() => {
        this.getUserLicenseList();
      });
  }

  updatUserLicense(id: string, status: string) {
    this.statusUpdate = status === "APPROVED" ? "REJECTED" : "APPROVED"
    const edit = {
      status: this.statusUpdate
    }
    this.service.updateUserLicenseByID(id, edit).subscribe((s: any) => {
      this.snackBar.open("Cập nhật trạng thái thành công", "Đóng", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 1000
      });
      this.getUserLicenseList()
    })

  }
}
