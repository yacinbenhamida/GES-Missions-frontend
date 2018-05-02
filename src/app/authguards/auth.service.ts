import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class AuthService {
    constructor() {}
    public isAuthenticated(): boolean {
        const dep = localStorage.getItem('org');
        const type = localStorage.getItem('Array');
        return  type!=undefined;
      }
}