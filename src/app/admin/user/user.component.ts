import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { EditUserComponent } from './edit-user/edit-user.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'createdTime',
    'name',
    'email',
    'phone',
    'gender',
    'role',
    'status',
    'action',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageNumber: number = 0;
  pageSize: number = 10;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  totalItems: number;

  statusUpdate: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private service: UserService,
    public matdialog: MatDialog,
    private snackBar: MatSnackBar,
    //private dataService: DataService,
    // public isLoading: LoaderService,
    private title: Title,
    private meta: Meta
  ) {
    this.getUserList();
  }

  ngOnInit(): void {
    this.title.setTitle('Danh sách người dùng | ' + environment.siteName);
    this.meta.addTag({
      name: 'description',
      content: 'Danh sách người dùng - ' + environment.siteName,
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getUserList() {
    let apiPageNumber = this.pageNumber + 1;
    this.service
      .getListUsers(apiPageNumber, this.pageSize)
      .subscribe((list) => {
        this.dataSource = new MatTableDataSource(list.data);
        this.totalItems = list.totalCount;
      });
  }
  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getUserList();
  }
  updatUserStatus(id: string, status: string) {
    this.statusUpdate = status === 'ACTIVE' ? 'BANNED' : 'ACTIVE';
    const edit = {
      status: this.statusUpdate,
    };
    this.service.updateStatusUserByID(id, edit).subscribe((s: any) => {
      this.snackBar.open('Cập nhật trạng thái thành công', 'Đóng', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 1000,
      });
      this.getUserList();
    });
  }
  getUserPage(pageIndex: number, pageSize: number) {
    // this.service.getListUserPage(pageIndex, pageSize).subscribe((list) => {
    //   this.dataSource = new MatTableDataSource(list.result.result.doc);
    //   console.log(this.dataSource,'lít')
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // })
  }
  getUserById(id: string) {
    // this.service.findUserById(id).subscribe((s) => {
    //   this.user = s.result;
    // });
    // return this.user;
  }

  editUser(user: any) {
    this.matdialog
      .open(EditUserComponent, {
        disableClose: true,
        data: user,
        maxHeight: 'calc(100vh - 50px)',
        height: 'auto',
        width: '500px',
        position: { top: '3%' },
      })
      .afterClosed()
      .subscribe(() => {
        this.getUserList();
      });
  }

  deleteUser(dev: any) { }

  getUserStatus(
    status: 'PENDING' | 'ACTIVE' | 'INACTIVE' | 'BANNED' | 'REJECTED'
  ) {
    switch (status) {
      case 'PENDING':
        return 'Đang chờ duyệt';
      case 'ACTIVE':
        return 'Đang hoạt động';
      case 'INACTIVE':
        return 'Không hoạt động';
      case 'BANNED':
        return 'Bị khóa';
      case 'REJECTED':
        return 'Bị từ chối';
    }
  }

  getUserRole(role: 'CUSTOMER' | 'DRIVER' | 'ADMIN') {
    switch (role) {
      case 'ADMIN':
        return 'Admin';
      case 'CUSTOMER':
        return 'Khách hàng';
      case 'DRIVER':
        return 'Tài xế';
    }
  }
}
