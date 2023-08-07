import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Injectable()
export class CustomPaginationIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel: string = 'Trang đầu';
  itemsPerPageLabel: string = 'Mỗi trang';
  lastPageLabel: string = 'Trang cuối';
  nextPageLabel: string = 'Trang sau';
  previousPageLabel: string = 'Trang trước';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return 'Trang 1 trong 1';
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Trang ${page + 1} trong ${amountPages}`;
  }
}
