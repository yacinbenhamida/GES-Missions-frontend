import {Pays} from './pays';
import { Injectable } from '@angular/core';
import { Http,Headers,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
@Injectable()
export class PaysService{
    constructor(private http:Http){}
    private headers = new Headers({'Content-type':'application/json'});
    private paysUrl = '/api/pays';

    private extractData(res:Response) {
        let body = res.json();
        return body || [];
    }
    getAllPays():Observable<Pays[]>{
        return this.http.get(this.paysUrl+"/allPays").map(this.extractData).catch(this.handleError);
    }
    getPays(id:number):Observable<Pays>{
        const url = `${this.paysUrl}/findPays/${id}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }

    insertPays(d:Pays):Promise<Pays>{
        return this.http.post(this.paysUrl+"/insertPays",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(res=>res.json() as Pays).catch(this.handleError);  
    }
    deletePays(d:Pays):Promise<void>{
        const url = `${this.paysUrl}/deletePays/${d.idpays}`;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError); 
    }
    updatePays(d:Pays):Promise<Pays>{
        return this.http.post(this.paysUrl + "/updatePays",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(()=>null).catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('Une erreur a eu lieu dans le service Grade', error);
        return Promise.reject(error.message || error);
      }
}