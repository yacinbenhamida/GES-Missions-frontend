import { Departement}  from './departement';
import { Http,Headers,Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Injectable,Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TypeDep } from './typeDep';
@Injectable()
export class DepartementService{

    constructor(private http:Http){}
    private headers = new Headers({'Content-type':'application/json'});
    private depUrl = '/api/departement';

    private extractData(res:Response) {
        let body = res.json();
        return body || [];
    }
    getAllDeps():Observable<Departement[]>{
        return this.http.get(this.depUrl+"/allDeparts").map(this.extractData).catch(this.handleError);
    }
    getDepartement(id:String):Observable<Departement>{
        const url = `${this.depUrl}/findDepart/${id}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }

    insertDep(d:Departement):Promise<Departement>{
        return this.http.post(this.depUrl+"/insertDepart",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(res=>res.json() as Departement).catch(this.handleError);  
    }
    deleteDep(d:Departement):Promise<void>{
        const url = `${this.depUrl}/deleteDepart/${d.codeDep}`;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError); 
    }
    updateDep(d:Departement):Promise<Departement>{
        return this.http.post(this.depUrl + "/updateDepart",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(()=>null).catch(this.handleError);
    }
    getAllTypeDeps():Observable<TypeDep[]>{
        return this.http.get(this.depUrl + '/allTypeDeps').map(this.extractData).catch(this.handleError);
    }
    getAllDepsOfCurrentType(idtype:number):Observable<Departement[]>{
        const url = `${this.depUrl}/allDepartsOftype/${idtype}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }
    getAllOrgsFromOfcurrentm(idminist:string):Observable<Departement[]>{
        const url = `${this.depUrl}/allDepartsOfMinis/${idminist}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }
    getLatestDepCode(idminist:string,typedep:string) : Observable<string>{
        const url = `${this.depUrl}/findLatestDepart/${idminist}/${typedep}`;
       return this.http.get(url).map((res:Response)=>{
            return res.text() as string;}).catch(this.handleError);
          //  return this.http.get(url).map(this.extractData).catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('Une erreur a eu lieu dans le service departement', error);
        return Promise.reject(error.message || error);
      }

}