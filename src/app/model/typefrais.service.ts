import { Fonction } from "./fonction";
import { Injectable } from "@angular/core";
import { Http,Headers,Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Concerne } from "./concerne";
import {  TypeFrai } from "./typefrais";
@Injectable()
export class TypeFraisServices{
    constructor(public http:Http){}
    private headers = new Headers({'Content-type':'application/json'});
    private Url = '/api/typefrais';

    private extractData(res:Response) {
        let body = res.json();
        return body || [];
    }
    getAllTypeFrais():Observable<TypeFrai[]>{
        return this.http.get(this.Url+"/allTypes").map(this.extractData).catch(this.handleError);
    }
    getTypeFrais(id:string):Observable<TypeFrai>{
        const url = `${this.Url}/findType/${id}`;
        return this.http.get(url,{headers : this.headers}).map(this.extractData).catch(this.handleError);
    }

    insertTypeFrais(d:TypeFrai):Promise<TypeFrai>{
        return this.http.post(this.Url+"/insertType",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(res=>res.json() as TypeFrai).catch(this.handleError);  
    }
    deleteTypeFrais(d:TypeFrai):Promise<void>{
        const url = `${this.Url}/updateType/${d.idtypefrais}`;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError); 
    }
    updateTypeFrais(d:TypeFrai):Promise<TypeFrai>{
        return this.http.post(this.Url + "/deleteType",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(()=>null).catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
        console.error('Une erreur a eu lieu dans le service concerne', error);
        return Promise.reject(error.message || error);
      }
}