import { Zonepays } from "./zonepays";
import { Injectable } from "@angular/core";
import { Http,Headers,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
@Injectable()
@Injectable()
export class ZonePaysService{
    constructor(private http:Http){}
    private headers = new Headers({'Content-type':'application/json'});
    private zonesUrl = '/api/zones';

    private extractData(res:Response) {
        let body = res.json();
        return body || [];
    }
    getAllZones():Observable<Zonepays[]>{
        return this.http.get(this.zonesUrl+"/allZones").map(this.extractData).catch(this.handleError);
    }
    getZone(id:number):Observable<Zonepays>{
        const url = `${this.zonesUrl}/findzone/${id}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }

    insertZone(d:Zonepays):Promise<Zonepays>{
        return this.http.post(this.zonesUrl+"/insertZone",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(res=>res.json() as Zonepays).catch(this.handleError);  
    }
    deleteZone(d:Zonepays):Promise<void>{
        const url = `${this.zonesUrl}/deleteZone/${d.idZone}`;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError); 
    }
    updateZone(d:Zonepays):Promise<Zonepays>{
        return this.http.post(this.zonesUrl + "/updateZone",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(()=>null).catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('Une erreur a eu lieu dans le service Zone', error);
        return Promise.reject(error.message || error);
      }
}