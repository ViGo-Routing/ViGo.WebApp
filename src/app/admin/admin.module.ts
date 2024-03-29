import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteComponent } from './route/route.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { UserComponent } from './user/user.component';
import { BookingComponent } from './booking/booking.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DetailRouteComponent } from './route/detail-route/detail-route.component';
import { DetailBookingComponent } from './booking/detail-booking/detail-booking.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserModule } from '@angular/platform-browser';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { RoutineComponent } from './route/routine/routine.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EditRoutineComponent } from './route/routine/edit-routine/edit-routine.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MatMomentDateModule,
} from '@angular/material-moment-adapter';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { PromotionComponent } from './promotion/promotion.component';
import { DetailPromotionComponent } from './promotion/detail-promotion/detail-promotion.component';
import { EditPromotionComponent } from './promotion/edit-promotion/edit-promotion.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CreatePromotionComponent } from './promotion/create-promotion/create-promotion.component';
import { ReportComponent } from './report/report.component';
import { CreateReportComponent } from './report/create-report/create-report.component';
import { EditReportComponent } from './report/edit-report/edit-report.component';
import { DetailReportComponent } from './report/detail-report/detail-report.component';
import { WalletComponent } from './wallet/wallet.component';
import { EditWalletComponent } from './wallet/edit-wallet/edit-wallet.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserLicenseComponent } from './user-license/user-license.component';
import { CreateUserLicenseComponent } from './user-license/create-user-license/create-user-license.component';
import { StorageModule } from '@angular/fire/storage';
import { SharedFireModule } from '../shared/shared-fired.module';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingComponent } from './setting/setting.component';
import { EditSettingComponent } from './setting/edit-setting/edit-setting.component';
import { CustomPaginationIntl } from '../shared/CustomPaginatorIntl';
import { FareComponent } from './fare/fare.component';
import { DetailFareComponent } from './fare/detail-fare/detail-fare.component';
import { MatListModule } from '@angular/material/list';
import { UpdateFareComponent } from './fare/update-fare/update-fare.component';
import { MatIconModule } from '@angular/material/icon';
import { BookingSchedulesComponent } from './booking/booking-schedules/booking-schedules.component';
import { BookingScheduleDetailComponent } from './booking/booking-schedules/booking-schedule-detail/booking-schedule-detail.component';
import { AssignDriverComponent } from './booking/booking-schedules/booking-schedule-detail/assign-driver/assign-driver.component';
import { TransactionComponent } from './transaction/transaction.component';
@NgModule({
  declarations: [
    RouteComponent,
    UserComponent,
    BookingComponent,
    EditUserComponent,
    DetailRouteComponent,
    DetailBookingComponent,
    VehiclesComponent,
    RoutineComponent,
    EditRoutineComponent,
    PromotionComponent,
    DetailPromotionComponent,
    EditPromotionComponent,
    CreatePromotionComponent,
    ReportComponent,
    CreateReportComponent,
    EditReportComponent,
    DetailReportComponent,
    WalletComponent,
    EditWalletComponent,
    UserLicenseComponent,
    CreateUserLicenseComponent,
    DashboardComponent,
    SettingComponent,
    EditSettingComponent,
    FareComponent,
    DetailFareComponent,
    UpdateFareComponent,
    BookingSchedulesComponent,
    BookingScheduleDetailComponent,
    AssignDriverComponent,
    TransactionComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTooltipModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatSelectModule,
    MatSlideToggleModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatSnackBarModule,
    SharedFireModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: '	en-US' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MatPaginatorIntl, useClass: CustomPaginationIntl },
  ],
})
export class AdminModule {}
