import { Component } from '@angular/core';
import { AnalysisService } from 'src/app/services/analysis.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public dataBooking: any;
  public dataBookingDetail: any;
  constructor(
    private service: AnalysisService,

  ) {
    this.getBookingAnalysis()
    this.getBookingDetailAnalysis()
  }

  getBookingAnalysis() {
    this.service.getBookingsAnalysis().subscribe((result) => {
      this.dataBooking = result
    })
  }
  getBookingDetailAnalysis() {
    this.service.getBookingsDetailAnalysis().subscribe((result) => {
      this.dataBookingDetail = result
    })
  }
}
