import { Projet } from "./projets";
import { Injectable } from "@angular/core";
import { Http,Headers,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
@Injectable()
export class ProjetService{
    constructor(public http:Http){}
    private headers = new Headers({'Content-type':'application/json'});
    private projetUrl = '/api/projets';

    private extractData(res:Response) {
        let body = res.json();
        return body || [];
    }
    getAllProjets():Observable<Projet[]>{
        return this.http.get(this.projetUrl+"/allProjets",{headers:this.headers}).map(this.extractData).catch(this.handleError);
    }
    getProjet(id:number):Observable<Projet>{
        const url = `${this.projetUrl}/findProjet/${id}`;
        return this.http.get(url,{headers:this.headers}).map(this.extractData).catch(this.handleError);
    }

    insertProjet(d:Projet):Promise<Projet>{
        return this.http.post(this.projetUrl+"/insertProjet",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(res=>res.json() as Projet).catch(this.handleError);  
    }
    deleteProjet(d:Projet):Promise<void>{
        const url = `${this.projetUrl}/deleteProjet/${d.idprojet}`;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError); 
    }
    updateProjet(d:Projet):Promise<Projet>{
        return this.http.post(this.projetUrl + "/updateProjet",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(()=>null).catch(this.handleError);
    }
    getProjectsOfDepartment(code:string):Observable<Projet[]>{
        const url = `${this.projetUrl}/allProjetsOfDep/${code}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('Une erreur a eu lieu dans le service Grade', error);
        return Promise.reject(error.message || error);
    }
}
