import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, interval } from 'rxjs';
import { VehicleService } from 'src/app/services/vehicle.service';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
})
export class VehiclesComponent implements OnInit {
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [
    'select',
    'vehicleName',
    'vehicleLicensePlate',
    'userName',
    'emailUser',
    'phoneUser',
    'gender',
    'status',
    'action',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  vehicleList: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageNumber: number = 0;
  pageSize: number = 10;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  totalItems: number;
  constructor(
    private service: VehicleService,
    public matdialog: MatDialog,
    //private dataService: DataService,
    // public isLoading: LoaderService,
    private title: Title,
    private meta: Meta
  ) {
    this.getVehicleList();
  }

  ngOnInit(): void {
    this.title.setTitle('Danh sách phương tiện | ' + environment.siteName);
    this.meta.addTag({
      name: 'description',
      content: 'Danh sách phương tiện - ' + environment.siteName,
    });
  }

  getVehicleList() {
    let apiPageNumber = this.pageNumber + 1;
    this.service
      .getListVehicles(apiPageNumber, this.pageSize)
      .subscribe((list) => {
        this.vehicleList = list.data;
        this.dataSource = new MatTableDataSource(list.data);
        this.totalItems = list.totalCount;
      });
  }
  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getVehicleList();
  }
  getVehiclePage(pageIndex: number, pageSize: number) {
    // this.service.getListVehiclePage(pageIndex, pageSize).subscribe((list) => {
    //   this.dataSource = new MatTableDataSource(list.result.result.doc);
    //   console.log(this.dataSource,'lít')
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // })
  }
  getVehicleById(id: string) {
    // this.service.findVehicleById(id).subscribe((s) => {
    //   this.vehicle = s.result;
    // });
    // return this.vehicle;
  }
  addVehicle() {}
  editVehicle(dev: any) {}

  detailVehicle(vehicle: any) {
    // this.matdialog
    //   .open(DetailVehicleComponent, {
    //     disableClose: true,
    //     data: vehicle,
    //     maxHeight: 'calc(100vh - 30vh)',
    //     height: 'auto',
    //     width: '1500px',
    //     position: { top: '3%' },
    //   })
    //   .afterClosed()
    //   .subscribe(() => {
    //     this.getVehicleList();
    //   });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = !!this.vehicleList && this.vehicleList.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.vehicleList.forEach((r: any) => this.selection.select(r));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.name + 1
    }`;
  }
}
