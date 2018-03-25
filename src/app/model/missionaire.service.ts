import { Injectable } from "@angular/core";
import { Http,Headers,Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { Missionaire } from "./missionaire";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { AffectMissDep } from "./affectmission";
@Injectable()
export class MissionaireServices{
    constructor(private http:Http){}
    private headers = new Headers({'Content-type':'application/json'});
    private missUrl = '/api/missionaires';

    private extractData(res:Response) {
        let body = res.json();
        return body || [];
    }


    getAllMissionaire(id:string):Observable<Missionaire[]>{
        const url = `${this.missUrl}/getallMissionairesOfDEP/${id}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }
    getMissionaireByCin(cin:number):Observable<Missionaire>{
        const url = `${this.missUrl}/findMissionaireByCIN/${cin}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }
    getMissionaire(id:number):Observable<Missionaire>{
        const url = `${this.missUrl}/findMissionaire/${id}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }
    getAllMissOfDep(codeDep:string):Observable<AffectMissDep[]>{
        const url = `${this.missUrl}/allMissionairesOfDEP/${codeDep}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }
    insertMissionaire(affect:AffectMissDep) : Observable<Missionaire>{
        return this.http.post(this.missUrl+"/insertMissionaire",JSON.stringify(affect),{headers : this.headers})
        .map(res=>res.json() as AffectMissDep).catch(this.handleError);  
    }
    updateAffectMissionaire(affect:AffectMissDep){
        return this.http.post(this.missUrl+"/updateAffectMissionaire",JSON.stringify(affect),{headers : this.headers})
        .map(res=>res.json() as AffectMissDep).catch(this.handleError);  
    }
    // updateMissionaire
    updateMissionaire(m:Missionaire){
        return this.http.post(this.missUrl+"/updateMissionaire",JSON.stringify(m),{headers : this.headers})
        .map(res=>res.json() as AffectMissDep).catch(this.handleError);  
    }

    deleteMissionaire(id:number,codeAff:number){
        const url = `${this.missUrl}/deleteMissionaire/${id}/${codeAff}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('Une erreur a eu lieu dans le service Grade', error);
        return Promise.reject(error.message || error);
      }
}