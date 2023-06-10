import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, interval } from 'rxjs';
import { RouteService } from 'src/app/services/route.service';
import { DetailRouteComponent } from './detail-route/detail-route.component';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';

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


  length = 500;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  constructor(
    private service: RouteService,
    public matdialog: MatDialog,
    //private dataService: DataService,
    // public isLoading: LoaderService,
  ) {
    this.getRoutePage(this.pageIndex, this.pageSize);
    this.getRouteList()
  }


  getRouteList() {
    this.service.getListRoutes().subscribe((list) => {
      this.routeList = list;
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
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
  editRoute(dev: any) {
  }

  detailRoute(route: any) {
    this.matdialog
      .open(DetailRouteComponent, {
        disableClose: true,
        data: route,
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
}
