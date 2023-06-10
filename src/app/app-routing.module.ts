import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './authentication/login-page/login-page.component';
import { RegisterComponent } from './authentication/register/register.component';
import { FullContainComponent } from './layout/full-contain/full-contain.component';
import { RouteComponent } from './admin/route/route.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: '',
    component: FullContainComponent,
    children: [
      {
        path: 'route',
        component: RouteComponent,
      },

    ],
  },
  {
    path: 'admin',
    component: FullContainComponent,
    loadChildren: () =>
      import('./admin/admin.module').then(
        (m) => m.AdminModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
