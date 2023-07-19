import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  displayedColumns: string[] = [
    'createdTime',
    'name',
    'email',
    'phone',
    'gender',
    'role',
    'status',
    'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageNumber: number = 1;
  pageSize: number = 10;
  totalItems: number;

  constructor(
    private service: UserService,
    public matdialog: MatDialog,
    //private dataService: DataService,
    // public isLoading: LoaderService,
  ) {
    this.getUserList()
  }


  getUserList() {
    this.service.getListUsers(this.pageNumber, this.pageSize).subscribe((list) => {
      this.dataSource = new MatTableDataSource(list.data);
      this.totalItems = list.totalCount;
    })
  }
  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getUserList();
  }
  getUserPage(pageIndex: number, pageSize: number,) {
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

  deleteUser(dev: any) {

  }
}
