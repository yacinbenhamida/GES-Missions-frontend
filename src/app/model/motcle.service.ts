import  { MotCle } from "./motcle";
import { Http,Headers,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Injectable } from "@angular/core";
@Injectable ()
export class MotCleService{
    constructor(private http:Http){}
    private headers = new Headers({'Content-type':'application/json'});
    private motclesUrl = '/api/motcles';

    private extractData(res:Response) {
        let body = res.json();
        return body || [];
    }
    getAllMC():Observable<MotCle[]>{
        return this.http.get(this.motclesUrl+"/allMotcles").map(this.extractData).catch(this.handleError);
    }
    getAllMCOftheme(idth:number):Observable<MotCle[]>{
        const url = `${this.motclesUrl}/allMotclesOfTheme/${idth}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }
    getMC(id:number):Observable<MotCle>{
        const url = `${this.motclesUrl}/findMotcle/${id}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }

    insertMC(d:MotCle):Promise<MotCle>{
        return this.http.post(this.motclesUrl+"/insertMotcle",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(res=>res.json() as MotCle).catch(this.handleError);  
    }
    deleteMC(d:MotCle):Promise<void>{
        const url = `${this.motclesUrl}/deleteMotcle/${d.idmotCle}`;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError); 
    }
    updateMC(d:MotCle):Promise<MotCle>{
        return this.http.post(this.motclesUrl + "/updateMotCle",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(()=>null).catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('Une erreur a eu lieu dans le service Mot cle', error);
        return Promise.reject(error.message || error);
      }
}
