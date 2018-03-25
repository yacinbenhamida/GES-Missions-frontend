import { Fonction } from "./fonction";
import { Injectable } from "@angular/core";
import { Http,Headers,Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
@Injectable()
export class FonctionService{
    constructor(private http:Http){}
    private headers = new Headers({'Content-type':'application/json'});
    private fonctUrl = '/api/fonctions';

    private extractData(res:Response) {
        let body = res.json();
        return body || [];
    }
    getAlloncts():Observable<Fonction[]>{
        return this.http.get(this.fonctUrl+"/allFonctions").map(this.extractData).catch(this.handleError);
    }
    getFonct(id:number):Observable<Fonction>{
        const url = `${this.fonctUrl}/findFonction/${id}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }

    insertFonct(d:Fonction):Promise<Fonction>{
        return this.http.post(this.fonctUrl+"/insertFonction",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(res=>res.json() as Fonction).catch(this.handleError);  
    }
    deleteFonct(d:Fonction):Promise<void>{
        const url = `${this.fonctUrl}/deleteFonct/${d.idfct}`;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError); 
    }
    updateFonct(d:Fonction):Promise<Fonction>{
        return this.http.post(this.fonctUrl + "/updateFonct",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(()=>null).catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
        console.error('Une erreur a eu lieu dans le service Fonction', error);
        return Promise.reject(error.message || error);
      }
}