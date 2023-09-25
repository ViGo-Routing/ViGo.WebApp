import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteComponent } from './route/route.component';
import { BookingComponent } from './booking/booking.component';
import { UserComponent } from './user/user.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { AuthGuard } from '../shared/auth.guard';
import { ReportComponent } from './report/report.component';

import { PromotionComponent } from './promotion/promotion.component';
import { UserLicenseComponent } from './user-license/user-license.component';
import { WalletComponent } from './wallet/wallet.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingComponent } from './setting/setting.component';
import { FareComponent } from './fare/fare.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'route', component: RouteComponent, canActivate: [AuthGuard] },
  { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'vehicle', component: VehiclesComponent, canActivate: [AuthGuard] },
  { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },
  {
    path: 'user-license',
    component: UserLicenseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'promotion',
    component: PromotionComponent,
    canActivate: [AuthGuard],
  },
  { path: 'wallet', component: WalletComponent, canActivate: [AuthGuard] },
  { path: 'setting', component: SettingComponent, canActivate: [AuthGuard] },
  { path: 'fare', component: FareComponent, canActivate: [AuthGuard] },
  { path: 'wallet-transaction', component: TransactionComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
