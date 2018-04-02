import { Categorie } from "./categorie";
import { Injectable } from "@angular/core";
import { Http,Headers,Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { AvoirFrais } from "./avoirfrais";
@Injectable()
export class AvoirFraisService{
    constructor(private http:Http){}
    private headers = new Headers({'Content-type':'application/json'});
    private frUrl = '/api/avoirfrais';

    private extractData(res:Response) {
        let body = res.json();
        return body || [];
    }
    getAllFrais():Observable<AvoirFrais[]>{
        return this.http.get(this.frUrl+"/allFrais").map(this.extractData).catch(this.handleError);
    }
    // to do 
    getAllFraisOfOrdre(id:number):Observable<AvoirFrais[]>{
        const url = `${this.frUrl}/allFraisoford/${id}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }
    getAllFraisDiversOfOrdre(id:number):Observable<AvoirFrais[]>{
        const url = `${this.frUrl}/allFraisDiversoford/${id}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }
    getFraisMissionOfConcerne(idconcerne:number):Observable<AvoirFrais>{
        const url = `${this.frUrl}/allFraisMissionofConcerne/${idconcerne}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }
    getFrais(id:number):Observable<AvoirFrais>{
        const url = `${this.frUrl}/findFrais/${id}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }

    insertFrais(d:AvoirFrais):Promise<AvoirFrais>{
        return this.http.post(this.frUrl+"/insertAvoirFrai",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(res=>res.json() as Categorie).catch(this.handleError);  
    }
    deleteFrais(d:AvoirFrais):Promise<void>{
        const url = `${this.frUrl}/deleteAvoirFrai/${d.idAvoirfrais}`;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError); 
    }
    updateFrais(d:AvoirFrais):Promise<AvoirFrais>{
        return this.http.post(this.frUrl + "/updateAvoirFrai",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(()=>null).catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('Une erreur a eu lieu dans le service avoirfrais', error);
        return Promise.reject(error.message || error);
      }
}