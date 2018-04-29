import { Taux } from "./taux";
import { Groupe } from "./groupe";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Http,Headers,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TauxGroupeServices{
    constructor(private http:Http){}
    private headers = new Headers({'Content-type':'application/json'});
    private Url = '/api/tauxgroupe';

    private extractData(res:Response) {
        let body = res.json();
        return body || [];
    }
    // groupes
    getAllGroupes():Observable<Groupe[]>{
        return this.http.get(this.Url+"/allGroupes").map(this.extractData).catch(this.handleError);
    }
    getGroupe(id:number):Observable<Groupe>{
        const url = `${this.Url}/findGroupe/${id}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }

    insertGroupe(d:Groupe):Promise<Groupe>{
        return this.http.post(this.Url+"/insertGroupe",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(res=>res.json() as Groupe).catch(this.handleError);  
    }
    deleteGroupe(d:Groupe):Promise<void>{
        const url = `${this.Url}/deleteTheme/${d.idGroupe}`;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError); 
    }
    updateGroupe(d:Groupe):Promise<Groupe>{
        return this.http.post(this.Url + "/updateGroupe",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(()=>null).catch(this.handleError);
    }

    // taux

    getAllTaux():Observable<Taux[]>{
        return this.http.get(this.Url+"/allTaux").map(this.extractData).catch(this.handleError);
    }
    getTaux(id:number):Observable<Taux>{
        const url = `${this.Url}/findTaux/${id}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }

    insertTaux(d:Taux):Promise<Taux>{
        return this.http.post(this.Url+"/insertTaux",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(res=>res.json() as Taux).catch(this.handleError);  
    }
    deleteTaux(d:Taux):Promise<void>{
        const url = `${this.Url}/deleteTheme/${d.idTaux}`;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError); 
    }
    updateTaux(d:Taux):Promise<Taux>{
        return this.http.post(this.Url + "/updateTaux",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(()=>null).catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('Une erreur a eu lieu dans le service Mot cle', error);
        return Promise.reject(error.message || error);
      }
}