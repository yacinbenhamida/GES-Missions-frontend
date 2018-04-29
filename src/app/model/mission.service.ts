import { Mission } from "./mission";
import { Injectable } from "@angular/core";
import { Http,Headers,Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
@Injectable()
export class MissionService{
    constructor(private http:Http){}
    private headers = new Headers({'Content-type':'application/json'});
    private missUrl = '/api/missions';

    private extractData(res:Response) {
        let body = res.json();
        return body || [];
    }
    getAllMissionsOfDep(id:string):Observable<Mission[]>{
        const url = `${this.missUrl}/allMissionsOfDep/${id}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }
    getMission(id:number):Observable<Mission>{
        const url = `${this.missUrl}/findMission/${id}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }
    findMissionByNum(num:number,codeDep:string):Observable<Mission>{
        const url = `${this.missUrl}/findMissionByNum/${num}/${codeDep}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }
    insertMission(d:Mission):Observable<Mission>{
        return this.http.post(this.missUrl+"/insertMission",JSON.stringify(d),{headers : this.headers})
        .map(this.extractData).catch(this.handleError);  
    }
    deleteMission(d:Mission):Promise<void>{
        const url = `${this.missUrl}/deleteFonct/${d.idMission}`;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError); 
    }
    updateMission(d:Mission):Promise<Mission>{
        return this.http.post(this.missUrl + "/updateMission",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(()=>null).catch(this.handleError);
    }
    getLatestMissionCode(codeDep:string):Observable<string>{
        const url = `${this.missUrl}/LatestMissionOfdep/${codeDep}`;
        return this.http.get(url).map((res:Response)=>{
            return res.text() as string;}).catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('Une erreur a eu lieu dans le service Missions', error);
        return Promise.reject(error.message || error);
      }
}