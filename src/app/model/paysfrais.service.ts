import { Fonction } from "./fonction";
import { Injectable } from "@angular/core";
import { Http,Headers,Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Concerne } from "./concerne";
import { PaysFrais } from "./paysfrais";
@Injectable()
export class PaysFraisServices{
    constructor(private http:Http){}
    private headers = new Headers({'Content-type':'application/json'});
    private Url = '/api/fraisordremission';

    private extractData(res:Response) {
        let body = res.json();
        return body || [];
    }
    getAllPaysFrais():Observable<PaysFrais[]>{
        return this.http.get(this.Url+"/allFraispays").map(this.extractData).catch(this.handleError);
    }
    getPaysFrais(id:number):Observable<PaysFrais>{
        const url = `${this.Url}/findFraispays/${id}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }

    insertPaysFrais(d:PaysFrais):Promise<PaysFrais>{
        return this.http.post(this.Url+"/insertPaysFrais",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(res=>res.json() as PaysFrais).catch(this.handleError);  
    }
    deletePaysFrais(d:PaysFrais):Promise<void>{
        const url = `${this.Url}/updatePaysFrais/${d.idPaysFrais}`;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError); 
    }
    updateFonct(d:PaysFrais):Promise<PaysFrais>{
        return this.http.post(this.Url + "/deletePaysFrais",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(()=>null).catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
        console.error('Une erreur a eu lieu dans le service concerne', error);
        return Promise.reject(error.message || error);
      }
}