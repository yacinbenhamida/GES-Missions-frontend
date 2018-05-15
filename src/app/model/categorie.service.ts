import { Categorie } from "./categorie";
import { Injectable } from "@angular/core";
import { Http,Headers,Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
@Injectable()
export class CategorieService{
    constructor(public http:Http){}
    private headers = new Headers({'Content-type':'application/json'});
    private catUrl = '/api/categories';

    private extractData(res:Response) {
        let body = res.json();
        return body || [];
    }
    getAllCats():Observable<Categorie[]>{
        return this.http.get(this.catUrl+"/allCategories",{headers:this.headers}).map(this.extractData).catch(this.handleError);
    }
    getCat(id:number):Observable<Categorie>{
        const url = `${this.catUrl}/findcat/${id}`;
        return this.http.get(url,{headers:this.headers}).map(this.extractData).catch(this.handleError);
    }

    insertCat(d:Categorie):Promise<Categorie>{
        return this.http.post(this.catUrl+"/insertCat",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(res=>res.json() as Categorie).catch(this.handleError);  
    }
    deleteCat(d:Categorie):Promise<void>{
        const url = `${this.catUrl}/deleteCat/${d.idcat}`;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError); 
    }
    updateCat(d:Categorie):Promise<Categorie>{
        return this.http.post(this.catUrl + "/updateCat",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(()=>null).catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('Une erreur a eu lieu dans le service categories', error);
        return Promise.reject(error.message || error);
      }
}