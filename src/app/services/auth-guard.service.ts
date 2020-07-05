import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(protected authService: AuthService) { }

  canActivate(){
    //check to see if user is login
    if(this.authService.isAuthenticated$)
    return true;

    //else navigate to login page(external url)
    window.location.href = 'external url';
    return false
  }
}
