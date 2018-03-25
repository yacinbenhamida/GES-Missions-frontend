import { Injectable } from '@angular/core';
import { NavbarService } from './navbar/navbar.service';
@Injectable()
export class AppService {
navigation : boolean;
footer:boolean;
user :string;

  constructor(public nav : NavbarService) {
    this.navigation = false;
    this.footer = false;
}
setUser(u:string){
this.user = u;
}
showNavbar(){
    this.navigation =  true;
}
showFooter(){
    this.footer = true;
}
hideNavbar(){
    this.navigation = false;
}
hideFooter(){
    this.footer = false;
}

}
