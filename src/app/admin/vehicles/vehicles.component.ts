import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, interval } from 'rxjs';
import { VehicleService } from 'src/app/services/vehicle.service';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';




@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent {
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
    'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  vehicleList: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  length = 500;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  constructor(
    private service: VehicleService,
    public matdialog: MatDialog,
    //private dataService: DataService,
    // public isLoading: LoaderService,
  ) {
    this.getVehiclePage(this.pageIndex, this.pageSize);
    this.getVehicleList()
  }


  getVehicleList() {
    this.service.getListVehicles().subscribe((list) => {
      this.vehicleList = list.data;
      this.dataSource = new MatTableDataSource(list.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  getVehiclePage(pageIndex: number, pageSize: number,) {
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
  addVehicle() {

  }
  editVehicle(dev: any) {
  }

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
    const numRows =
      !!this.vehicleList && this.vehicleList.length;
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1
      }`;
  }
}
