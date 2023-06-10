import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteComponent } from './route/route.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UserComponent } from './user/user.component';
import { BookingComponent } from './booking/booking.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { MatInputModule } from '@angular/material/input';
import { DetailRouteComponent } from './route/detail-route/detail-route.component';
import { DetailBookingComponent } from './booking/detail-booking/detail-booking.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  declarations: [
    RouteComponent,
    UserComponent,
    BookingComponent,
    EditUserComponent,
    SearchComponent,
    DetailRouteComponent,
    DetailBookingComponent
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
    MatCheckboxModule
  ]
})
export class AdminModule { }
