import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-detail-promotion',
  templateUrl: './detail-promotion.component.html',
  styleUrls: ['./detail-promotion.component.scss']
})
export class DetailPromotionComponent {
  promotion: any;
  constructor(
    public dialogRef: MatDialogRef<DetailPromotionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: PromotionService
  ) { console.log(data); this.getPromotionByID(data) }

  getPromotionByID(id: string) {
    this.service.getPromotionsById(id).subscribe((result) => {
      this.promotion = result
    })
  }
  cancel() {
    this.dialogRef.close();
  }
}
