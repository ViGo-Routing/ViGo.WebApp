import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-detail-route',
  templateUrl: './detail-route.component.html',
  styleUrls: ['./detail-route.component.scss']
})
export class DetailRouteComponent {
  route: any;
  constructor(
    public dialogRef: MatDialogRef<DetailRouteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: RouteService
  ) { console.log(data); this.getRouteByID(data) }

  getRouteByID(id: string) {
    this.service.getRoutesById(id).subscribe((result) => {
      this.route = result
    })
  }
  cancel() {
    this.dialogRef.close();
  }

}
