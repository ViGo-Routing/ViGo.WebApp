import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FareService } from 'src/app/services/fare.service';
import { vndFormat } from 'src/app/shared/numberUtils';

@Component({
  selector: 'app-detail-fare',
  templateUrl: './detail-fare.component.html',
  styleUrls: ['./detail-fare.component.scss'],
})
export class DetailFareComponent implements OnInit {
  vndFormat = vndFormat;

  constructor(
    public dialogRef: MatDialogRef<DetailFareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fareService: FareService
  ) {}

  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close();
  }
}
