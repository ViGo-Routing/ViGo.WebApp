import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AnalysisService } from 'src/app/services/analysis.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public dataBooking: any;
  public dataBookingDetail: any;
  constructor(
    private service: AnalysisService,
    private title: Title,
    private meta: Meta
  ) {
    this.getBookingAnalysis();
    this.getBookingDetailAnalysis();
  }

  ngOnInit(): void {
    this.title.setTitle('Bảng điều khiển | ' + environment.siteName);
    this.meta.addTag({
      name: 'description',
      content: 'Bảng điều khiển - ' + environment.siteName,
    });
  }
  getBookingAnalysis() {
    this.service.getBookingsAnalysis().subscribe((result) => {
      this.dataBooking = result;
    });
  }
  getBookingDetailAnalysis() {
    this.service.getBookingsDetailAnalysis().subscribe((result) => {
      this.dataBookingDetail = result;
    });
  }
}
