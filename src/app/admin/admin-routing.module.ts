import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteComponent } from './route/route.component';
import { BookingComponent } from './booking/booking.component';
import { UserComponent } from './user/user.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { AuthGuard } from '../shared/auth.guard';
import { PromotionComponent } from './promotion/promotion.component';


const routes: Routes = [
  { path: 'route', component: RouteComponent, canActivate: [AuthGuard] },
  { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'vehicle', component: VehiclesComponent, canActivate: [AuthGuard] },
  { path: 'promotion', component: PromotionComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
