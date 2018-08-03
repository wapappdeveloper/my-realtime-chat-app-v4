import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { InteractService } from './services/interact.service';

@Injectable()
export class PageAuthorizationGuard implements CanActivate {
  isLoggedIn: boolean = false;
  redirectURL: string = '';

  constructor(private interactService:InteractService){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.checkLogin();
  }
  checkLogin(){
    console.log(this.interactService.data.validUser);
    if(this.interactService.data.validUser){
      return true;
    }else{
      return false;
    }
    
  }
}
