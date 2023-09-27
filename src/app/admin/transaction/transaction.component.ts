import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Meta, Title } from '@angular/platform-browser';
import { WalletService } from 'src/app/services/wallet.service';
import { vndFormat } from 'src/app/shared/numberUtils';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit, AfterViewInit {
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [
    // 'select',
    'createdTime',
    //'name',
    'phone',
    'balance',
    'type',
    //'status',
    //'action',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  WalletList: any;
  WalletSystemList: any;
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
    this.getWalletSystemList();
  }

  ngOnInit(): void {
    this.title.setTitle('Danh sách ví giao dịch | ' + environment.siteName);
    this.meta.addTag({
      name: 'description',
      content: 'Danh sách ví giao dịch - ' + environment.siteName,
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  getWalletList() {
    let apiPageNumber = this.pageNumber + 1;
    this.service
      .getListWalletTransactions(apiPageNumber, this.pageSize)
      .subscribe((list) => {
        this.WalletList = list.data;
        this.dataSource = new MatTableDataSource(list.data);
        this.totalItems = list.totalCount;
      });
  }
  getWalletSystemList() {
    this.service
      .getListWalletsSystem()
      .subscribe((list: any) => {
        this.WalletSystemList = list;
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

  getWalletType(type: 'CANCEL_FEE' | 'BOOKING_PAID' | 'TRIP_PAID' | 'BOOKING_REFUND' | 'CANCEL_REFUND' | 'TRIP_PICK' | 'TRIP_PICK_REFUND') {
    switch (type) {
      case 'CANCEL_FEE':
        return 'Phí hủy chuyến';
      case 'BOOKING_PAID':
        return 'Phí trả trước';
      case 'TRIP_PAID':
        return 'Thanh toán chuyến đi cho tài xế';
      case 'BOOKING_REFUND':
        return 'Hoàn phí hành trình';
      case 'CANCEL_REFUND':
        return 'Hoàn phí hủy chuyến';
      case 'TRIP_PICK':
        return 'Phí chọn chuyến đi';
      case 'TRIP_PICK_REFUND':
        return 'Hoàn phí chọn chuyến đi';
    }
  }

  getWalletStatus(status: 'SUCCESSFULL' | 'FAILED') {
    switch (status) {
      case 'SUCCESSFULL':
        return 'Thành công';
      case 'FAILED':
        return 'Không thành công';
    }
  }
}
