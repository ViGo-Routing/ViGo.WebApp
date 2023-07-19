import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, interval } from 'rxjs';
import { RouteService } from 'src/app/services/route.service';
import { DetailRouteComponent } from './detail-route/detail-route.component';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { RoutineComponent } from './routine/routine.component';

interface counterCards {
  icon: string;
  value: number;
  title: string;
}
@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent {
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = ['select', 'userName', 'routeName', 'startStationName', 'endStationName', 'emailUser', 'phoneUser', 'gender', 'status', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  routeList: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageNumber: number = 0;
  pageSize: number = 10;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  totalItems: number;


  constructor(
    private service: RouteService,
    public matdialog: MatDialog,
    //private dataService: DataService,
    // public isLoading: LoaderService,
  ) {
    this.getRouteList()
  }


  getRouteList() {
    let apiPageNumber = this.pageNumber + 1
    this.service.getListRoutes(apiPageNumber, this.pageSize).subscribe((list) => {
      this.routeList = list.data;
      this.dataSource = new MatTableDataSource(list.data);
      this.totalItems = list.totalCount;
    })
  }
  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getRouteList();
  }
  getRoutePage(pageIndex: number, pageSize: number,) {
    // this.service.getListRoutePage(pageIndex, pageSize).subscribe((list) => {

    //   this.dataSource = new MatTableDataSource(list.result.result.doc);
    //   console.log(this.dataSource,'lít')
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;

    // })
  }
  getRouteById(id: string) {
    // this.service.findRouteById(id).subscribe((s) => {
    //   this.route = s.result;
    // });

    // return this.route;
  }
  addRoute() {

  }
  openRoutine(routeId: any) {
    this.matdialog
      .open(RoutineComponent, {
        disableClose: true,
        data: routeId,
        maxHeight: 'calc(100vh - 30vh)',
        height: 'auto',
        width: '1500px',

        position: { top: '3%' },
      })
      .afterClosed()
      .subscribe(() => {
        this.getRouteList();
      });
  }

  detailRoute(routeId: any) {
    this.matdialog
      .open(DetailRouteComponent, {
        disableClose: true,
        data: routeId,
        maxHeight: 'calc(100vh - 30vh)',
        height: 'auto',
        width: '1500px',
        position: { top: '3%' },
      })
      .afterClosed()
      .subscribe(() => {
        this.getRouteList();
      });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows =
      !!this.routeList && this.routeList.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.routeList.forEach((r: any) => this.selection.select(r));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1
      }`;
  }
  deleteALl() {
    const listId: string[] = this.selection.selected.map((x) => x.id);
    listId.forEach(item => {
      this.service.deleteRouteByID(item).subscribe(() => {
        this.selection.clear()
      });
    })
  }
}
