import { Injectable } from "@angular/core";
import { Http,Headers,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Mission } from "./mission";
import { Pays } from "./pays";
import { OrdreMission } from "./ordremission";
import { Results } from "./Results";
import { Location } from "./location";
import { Geometry } from "./geocoding/geometry";
@Injectable()
export class ReportService{
    constructor(public http:Http){}
    private headers = new Headers({'Content-type':'application/json'});
    private projetUrl = '/api/reports';

    private extractData(res:Response) {
        let body = res.json();
        return body || [];
    }
    getMissionsBTDAC(p:Pays,deb:Date,fin:Date,dep:string):Observable<OrdreMission[]>{
        const url = `${this.projetUrl}/getMissionsBTDAC/${p.idpays}/${deb}/${fin}/${dep}`;
        return this.http.get(url,{headers:this.headers}).map(this.extractData).catch(this.handleError);
    }
    getMissionsBTDA(deb:Date,fin:Date,dep:string):Observable<OrdreMission[]>{
        const url = `${this.projetUrl}/getMissionsBTDA/${deb}/${fin}/${dep}`;
        return this.http.get(url,{headers:this.headers}).map(this.extractData).catch(this.handleError);
    }
    getYears(codeDep:string):Observable<number[]>{
        const url = `${this.projetUrl}/getAllyears/${codeDep}`;
        return this.http.get(url,{headers:this.headers}).map(this.extractData).catch(this.handleError);
    }
    getCountPaysMissions(codeDep:string,year:number):Observable<Results[]>{
        const url = `${this.projetUrl}/getPaysStats/${codeDep}/${year}`;
        return this.http.get(url,{headers:this.headers}).map(this.extractData).catch(this.handleError);
    }
    getGeocoding(countryName:string):Promise<any>{
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${countryName}&key=AIzaSyDPBMTBJoxcLGULqtT-9Y-Ev8H-Ilu0ShM`;
        return this.http.get(url).toPromise()
        .then((response) => Promise.resolve(response.json()))
        .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('Une erreur a eu lieu dans le service reporting', error);
        return Promise.reject(error.message || error);
    }
}
