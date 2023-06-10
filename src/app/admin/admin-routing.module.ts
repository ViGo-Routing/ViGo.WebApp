import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteComponent } from './route/route.component';
import { BookingComponent } from './booking/booking.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'route', component: RouteComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'user', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
