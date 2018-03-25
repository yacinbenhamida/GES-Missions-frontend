import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {
  controlleur: boolean;
  payeur: boolean;
  ordonnateur: boolean;
  ordonnateurministere : boolean;
  admin:boolean;
  constructor() {
    this.controlleur = false;
    this.payeur = false;
    this.ordonnateur = false;
    this.ordonnateurministere = false;
    this.admin = false;
  }

  knowUser(u:string){
    switch(u){
      case 'O': this.ordonnateur = true;break;
      case 'P' : this.payeur = true;break;
      case 'C' : this.controlleur = true;break;
      case 'OM' : this.ordonnateurministere = true;break;
      case 'A' : this.admin = true;break;
    }
  }

}