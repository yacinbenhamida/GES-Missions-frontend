import { Injectable } from "@angular/core";
import { Http,Headers,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Mission } from "./mission";
import { Pays } from "./pays";
import { OrdreMission } from "./ordremission";
@Injectable()
export class ReportService{
    constructor(private http:Http){}
    private headers = new Headers({'Content-type':'application/json'});
    private projetUrl = '/api/reports';

    private extractData(res:Response) {
        let body = res.json();
        return body || [];
    }
    getMissionsBTDAC(p:Pays,deb:Date,fin:Date,dep:string):Observable<OrdreMission[]>{
        const url = `${this.projetUrl}/getMissionsBTDAC/${p.idpays}/${deb}/${fin}/${dep}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }
    getMissionsBTDA(deb:Date,fin:Date,dep:string):Observable<OrdreMission[]>{
        const url = `${this.projetUrl}/getMissionsBTDA/${deb}/${fin}/${dep}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('Une erreur a eu lieu dans le service reporting', error);
        return Promise.reject(error.message || error);
    }
}
