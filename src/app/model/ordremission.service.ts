import { OrdreMission } from "./ordremission";
import { Injectable } from "@angular/core";
import { Http,Headers,Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
@Injectable()
export class OrdreMissionService{
    constructor(private http:Http){}
    private headers = new Headers({'Content-type':'application/json'});
    private missUrl = '/api/ordremissions';

    private extractData(res:Response) {
        let body = res.json();
        return body || [];
    }

    getOrdresValides(codeDep:string):Observable<OrdreMission[]>{
        const url = `${this.missUrl}/getOrdresvalides/${codeDep}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }
    getLatestORDMISS(nummis:number):Observable<string>{
        const url = `${this.missUrl}/latestOrdMiss/${nummis}`;
        return this.http.get(url).map((res:Response)=>{
            return res.text() as string;}).catch(this.handleError);
    }
    getAllOrdMissionsOfMiss(id:number,codeDep:string):Observable<OrdreMission[]>{
        const url = `${this.missUrl}/allOrdresMissionsOfMiss/${id}/${codeDep}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }
    getAllOrdMissionsOfDep(id:string):Observable<OrdreMission[]>{
        const url = `${this.missUrl}/allOrdresMissionsOfDep/${id}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }
    // les ordres elligibles a une validation (ayant un frais et une destination au moins )
    getAllOrdMissionsOfDepElligibles(id:string):Observable<OrdreMission[]>{
        const url = `${this.missUrl}/allOrdresMissionsOfDepAyantFrais/${id}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }
    getOrdMission(idord:number,nummis:number):Observable<OrdreMission>{
        const url = `${this.missUrl}/findOrdreMiss/${idord}/${nummis}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }

    insertOrdMission(d:OrdreMission):Promise<OrdreMission>{
        return this.http.post(this.missUrl+"/insertOrdreMission",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(res=>res.json() as OrdreMission).catch(this.handleError);  
    }
    deleteOrdMission(d:OrdreMission):Promise<void>{
        const url = `${this.missUrl}/deleteOrdMission/${d.idOrdre}`;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError); 
    }
    updateOrdMission(d:OrdreMission):Observable<OrdreMission>{
        return this.http.post(this.missUrl + "/updateOrdMission",JSON.stringify(d),{headers : this.headers})
        .map(res=>res.json() as OrdreMission).catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
        console.error('Une erreur a eu lieu dans le service Fonction', error);
        return Promise.reject(error.message || error);
      }
}