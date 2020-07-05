import { Injectable } from '@angular/core';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService extends AuthGuardService {

  constructor(authService: AuthService) { 
    super(authService);
  }

 /* canActivate(){
    var isAuthenticated = super.canActivate();
    return isAuthenticated ? this.authService.isInRole('Admin') : false;
  }*/
}
