import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SettingService } from 'src/app/services/setting.service';
import { EditSettingComponent } from './edit-setting/edit-setting.component';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  displayedColumns: string[] = [
    'setting-description',
    'value',
    'type',
    'data-type',
    'data-unit',
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

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private settingService: SettingService,
    public matDialog: MatDialog,
    // private snackBar: MatSnackBar,
    private title: Title,
    private meta: Meta
  ) {
    this.getSettingList();
  }

  ngOnInit(): void {
    this.title.setTitle('Danh sách cấu hình | ' + environment.siteName);
    this.meta.addTag({
      name: 'description',
      content: 'Danh sách cấu hình - ' + environment.siteName,
    });
  }

  getSettingList() {
    this.settingService.getSettings().subscribe((list) => {
      this.dataSource = new MatTableDataSource(list);
      this.totalItems = list.length;
    });
  }

  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  editSetting(setting: any) {
    this.matDialog
      .open(EditSettingComponent, {
        disableClose: true,
        data: setting,
        maxHeight: 'calc(100vh - 50px)',
        height: 'auto',
        width: '500px',
        position: { top: '3%' },
      })
      .afterClosed()
      .subscribe(() => {
        this.getSettingList();
      });
  }
}
