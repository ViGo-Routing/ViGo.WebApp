import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PromotionService } from 'src/app/services/promotion.service';
import { DetailPromotionComponent } from './detail-promotion/detail-promotion.component';
import { EditPromotionComponent } from './edit-promotion/edit-promotion.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CreatePromotionComponent } from './create-promotion/create-promotion.component';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent {

  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [
    'select',
    'createdTime',
    'name',
    'description',
    'discountAmount',
    'maxDecrease',
    'startTime',
    'expireTime',
    'maxTotalUsage',
    'totalUsage',
    'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  promotionList: any;
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
    private service: PromotionService,
    public matdialog: MatDialog,
    //private dataService: DataService,
    // public isLoading: LoaderService,
    private snackBar: MatSnackBar
  ) {

    this.getPromotionList()
  }


  getPromotionList() {
    let apiPageNumber = this.pageNumber + 1
    this.service.getListPromotions(apiPageNumber, this.pageSize).subscribe((list) => {
      this.promotionList = list.data
      this.dataSource = new MatTableDataSource(list.data);
      this.totalItems = list.totalCount;
    })
  }
  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getPromotionList();
  }
  getPromotionPage(pageIndex: number, pageSize: number,) {
    // this.service.getListPromotionPage(pageIndex, pageSize).subscribe((list) => {

    //   this.dataSource = new MatTableDataSource(list.result.result.doc);
    //   console.log(this.dataSource,'lít')
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;

    // })
  }
  getPromotionById(id: string) {
    // this.service.findPromotionById(id).subscribe((s) => {
    //   this.promotion = s.result;
    // });

    // return this.promotion;
  }
  addPromotion() {
    this.matdialog
      .open(CreatePromotionComponent, {
        disableClose: true,
        maxHeight: 'calc(100vh - 50px)',
        height: 'auto',
        width: '1500px',
        position: { top: '3%' },
      })
      .afterClosed()
      .subscribe(() => {
        this.getPromotionList();
      });
  }
  editPromotion(promotion: any) {
    this.matdialog
      .open(EditPromotionComponent, {
        disableClose: true,
        data: promotion,
        maxHeight: 'calc(100vh - 50px)',
        height: 'auto',
        width: '1500px',
        position: { top: '3%' },
      })
      .afterClosed()
      .subscribe(() => {
        this.getPromotionList();
      });
  }

  detailPromotion(promotion: any) {
    this.matdialog
      .open(DetailPromotionComponent, {
        disableClose: true,
        data: promotion,
        maxHeight: 'calc(100vh - 30vh)',
        height: 'auto',
        width: '1000px',
        position: { top: '3%' },
      })
      .afterClosed()
      .subscribe(() => {
        this.getPromotionList();
      });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = !!this.promotionList && this.promotionList.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.promotionList.forEach((r: any) => this.selection.select(r));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1
      }`;
  }
  deleteAll() {
    const listname: any[] = this.selection.selected.map(x => x.device);
    listname.forEach(item => {
      this.service.deletePromotionById(item.id).subscribe(s => {
        this.snackBar.open(`Xóa ${item.name} thành công`, "Đóng", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 1000
        });
      })
    })
  }

}
