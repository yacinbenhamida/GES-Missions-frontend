import { Classe } from "./classe";
import { Injectable } from "@angular/core";
import { Http,Headers,Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
@Injectable()
export class ClasseService{
    constructor(public http:Http){}
    private headers = new Headers({'Content-type':'application/json'});
    private classUrl = '/api/classes';

    private extractData(res:Response) {
        let body = res.json();
        return body || [];
    }
    getAllClasses():Observable<Classe[]>{
        return this.http.get(this.classUrl+"/allClasses",{headers : this.headers}).map(this.extractData).catch(this.handleError);
    }
    getClasse(id:number):Observable<Classe>{
        const url = `${this.classUrl}/findClasse/${id}`;
        return this.http.get(url,{headers : this.headers}).map(this.extractData).catch(this.handleError);
    }

    insertClasse(d:Classe):Promise<Classe>{
        return this.http.post(this.classUrl+"/insertClasse",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(res=>res.json() as Classe).catch(this.handleError);  
    }
    deleteClasse(d:Classe):Promise<void>{
        const url = `${this.classUrl}/deleteClasse/${d.idclasse}`;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError); 
    }
    updateClasse(d:Classe):Promise<Classe>{
        return this.http.post(this.classUrl + "/updateClasse",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(()=>null).catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('Une erreur a eu lieu dans le service classes', error);
        return Promise.reject(error.message || error);
      }
}