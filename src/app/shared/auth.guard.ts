import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private service: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    if (route.data['page']) {
      if (route.data['page'] == 'login') {
        if (!this.service.IsLoggedIn()) {
          return true;
        }
        this.router.navigate(['/admin/dashboard']);
        return false;
      }
    }

    if (this.service.IsLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
