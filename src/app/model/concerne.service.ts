import { Fonction } from "./fonction";
import { Injectable } from "@angular/core";
import { Http,Headers,Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Concerne } from "./concerne";
@Injectable()
export class ConcerneServices{
    constructor(private http:Http){}
    private headers = new Headers({'Content-type':'application/json'});
    private Url = '/api/concerne';

    private extractData(res:Response) {
        let body = res.json();
        return body || [];
    }
    getAllConcerne():Observable<Concerne[]>{
        return this.http.get(this.Url+"/allConcernes").map(this.extractData).catch(this.handleError);
    }
    getAllConcerneOfORDRE(idordre:number,codeDep:string):Observable<Concerne[]>{
        const url = `${this.Url}/allConcernesOfOrdre/${idordre}/${codeDep}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }
    getConcerne(id:number):Observable<Concerne>{
        const url = `${this.Url}/findConcerne/${id}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }

    insertConcerne(d:Concerne):Promise<Concerne>{
        return this.http.post(this.Url+"/insertConcerne",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(res=>res.json() as Concerne).catch(this.handleError);  
    }
    deleteConcerne(d:Concerne):Promise<void>{
        const url = `${this.Url}/deleteConcerne/${d.idconcerne}`;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError); 
    }
    updateConcerne(d:Concerne):Promise<Concerne>{
        return this.http.post(this.Url + "/updateConcerne",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(()=>null).catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
        console.error('Une erreur a eu lieu dans le service concerne', error);
        return Promise.reject(error.message || error);
      }
}