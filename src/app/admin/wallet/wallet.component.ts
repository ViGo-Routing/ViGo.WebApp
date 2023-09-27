import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { EditWalletComponent } from './edit-wallet/edit-wallet.component';
import { WalletService } from 'src/app/services/wallet.service';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { vndFormat } from 'src/app/shared/numberUtils';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit, AfterViewInit {
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [
    // 'select',
    'createdTime',
    'name',
    'phone',
    'balance',
    'type',
    //'status',
    //'action',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  WalletList: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  pageNumber: number = 0;
  pageSize: number = 10;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  totalItems: number;
  statusUpdate: string;

  vndFormat = vndFormat;

  constructor(
    private service: WalletService,
    public matdialog: MatDialog,
    //private dataService: DataService,
    // public isLoading: LoaderService,
    private snackBar: MatSnackBar,
    private title: Title,
    private meta: Meta
  ) {
    this.getWalletList();
  }

  ngOnInit(): void {
    this.title.setTitle('Danh sách ví | ' + environment.siteName);
    this.meta.addTag({
      name: 'description',
      content: 'Danh sách ví - ' + environment.siteName,
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  getWalletList() {
    let apiPageNumber = this.pageNumber + 1;
    this.service
      .getListWallets(apiPageNumber, this.pageSize)
      .subscribe((list) => {
        this.WalletList = list.data;
        this.dataSource = new MatTableDataSource(list.data);
        this.totalItems = list.totalCount;
      });
  }
  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getWalletList();
  }
  getWalletPage(pageIndex: number, pageSize: number) {
    // this.service.getListWalletPage(pageIndex, pageSize).subscribe((list) => {
    //   this.dataSource = new MatTableDataSource(list.result.result.doc);
    //   console.log(this.dataSource,'lít')
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // })
  }
  getWalletById(id: string) {
    // this.service.findWalletById(id).subscribe((s) => {
    //   this.Wallet = s.result;
    // });
    // return this.Wallet;
  }
  addWallet() {
    // this.matdialog
    //   .open(CreateWalletComponent, {
    //     disableClose: true,
    //     maxHeight: 'calc(100vh - 50px)',
    //     height: 'auto',
    //     width: '1500px',
    //     position: { top: '3%' },
    //   })
    //   .afterClosed()
    //   .subscribe(() => {
    //     this.getWalletList();
    //   });
  }
  editWallet(Wallet: any) {
    this.matdialog
      .open(EditWalletComponent, {
        disableClose: true,
        data: Wallet,
        maxHeight: 'calc(100vh - 50px)',
        height: 'auto',
        width: '500px',
        position: { top: '3%' },
      })
      .afterClosed()
      .subscribe(() => {
        this.getWalletList();
      });
  }

  updatWallet(id: string, status: string) {
    this.statusUpdate = status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    const edit = {
      status: this.statusUpdate,
    };
    this.service.updateWalletByID(id, edit).subscribe((s) => {
      this.snackBar.open('Cập nhật trạng thái thành công', 'Đóng', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 1000,
      });

      this.getWalletList();
    });
  }

  getWalletType(type: 'PERSONAL' | 'SYSTEM') {
    switch (type) {
      case 'PERSONAL':
        return 'Ví cá nhân';
      case 'SYSTEM':
        return 'Ví hệ thống';
    }
  }

  getWalletStatus(status: 'ACTIVE' | 'INACTIVE') {
    switch (status) {
      case 'ACTIVE':
        return 'Đang hoạt động';
      case 'INACTIVE':
        return 'Không hoạt động';
    }
  }
}
