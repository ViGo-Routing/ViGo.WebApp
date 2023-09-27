import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Meta, Title } from '@angular/platform-browser';
import { FareService } from 'src/app/services/fare.service';
import { environment } from 'src/environments/environment';
import { DetailFareComponent } from './detail-fare/detail-fare.component';
import { UpdateFareComponent } from './update-fare/update-fare.component';

@Component({
  selector: 'app-fare',
  templateUrl: './fare.component.html',
  styleUrls: ['./fare.component.scss'],
})
export class FareComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['createdTime', 'vehicleType', 'action'];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageNumber: number = 0;
  pageSize: number = 10;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  totalItems: number;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fareService: FareService,
    public matDialog: MatDialog,
    // private snackBar: MatSnackBar,
    private title: Title,
    private meta: Meta
  ) {
    this.getFareList();
  }

  ngOnInit(): void {
    this.title.setTitle('Danh sách biểu phí | ' + environment.siteName);
    this.meta.addTag({
      name: 'description',
      content: 'Danh sách biểu phí - ' + environment.siteName,
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  getFareList() {
    this.fareService.getFares().subscribe((list) => {
      this.dataSource = new MatTableDataSource(list);
      this.totalItems = list.length;
    });
  }

  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  detailFare(fare: any) {
    this.fareService.getFarePolicies(fare.id).subscribe((farePolicies) => {
      fare.farePolicies = farePolicies;
      this.matDialog
        .open(DetailFareComponent, {
          disableClose: true,
          data: fare,
          maxHeight: 'calc(100vh - 30vh)',
          height: 'auto',
          width: '500px',
          position: { top: '3%' },
        })
        .afterClosed()
        .subscribe(() => {
          this.getFareList();
        });
    });
  }

  updateFare(fare: any) {
    this.fareService.getFarePolicies(fare.id).subscribe((farePolicies) => {
      fare.farePolicies = farePolicies;
      this.matDialog
        .open(UpdateFareComponent, {
          disableClose: true,
          data: fare,
          maxHeight: 'calc(100vh - 30vh)',
          height: 'auto',
          width: '1200px',
          position: { top: '3%' },
        })
        .afterClosed()
        .subscribe(() => {
          this.getFareList();
        });
    });
  }

  // editSetting(setting: any) {
  //   this.matDialog
  //     .open(EditSettingComponent, {
  //       disableClose: true,
  //       data: setting,
  //       maxHeight: 'calc(100vh - 50px)',
  //       height: 'auto',
  //       width: '500px',
  //       position: { top: '3%' },
  //     })
  //     .afterClosed()
  //     .subscribe(() => {
  //       this.getSettingList();
  //     });
  // }
}
