import { Injectable } from '@angular/core';
import { Router,CanActivate,ActivatedRouteSnapshot} from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class RoleGuardService implements CanActivate {

    constructor(public auth: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
      let roles = route.data["roles"] as Array<string>;
      const role = localStorage.getItem("Array");
      const val:string = JSON.parse(role);
      const array :string [] = ['O','OM','A','P'];// array of expected roles, les roles attendus
      /*
      O = ordonnateur
      OM = ordonnateur du ministére
      P = payeur 
      A= ADMIN
      */
      if((this.auth.isAuthenticated() && roles != null && roles.indexOf(val) !=-1 
      && roles != undefined && val !=undefined && val!=null && array.indexOf(val)!=-1)){
        return true;
      }
      else{
        localStorage.clear();
        window.location.reload();
        this.router.navigate(['login']);
        return false;
      } 
  }
}