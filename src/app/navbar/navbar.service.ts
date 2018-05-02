import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {
  payeur: boolean = false;
  ordonnateur: boolean = false;
  ordonnateurministere : boolean = false;
  admin:boolean= false;
  constructor() {
    this.payeur = false;
    this.ordonnateur = false;
    this.ordonnateurministere = false;
    this.admin = false;
  }

  knowUser(u:string){
    switch(u){
      case 'O': this.ordonnateur = true;break;
      case 'P' : this.payeur = true;break;
      case 'OM' : this.ordonnateurministere = true;break;
      case 'A' : this.admin = true;break;
    }
  }

}