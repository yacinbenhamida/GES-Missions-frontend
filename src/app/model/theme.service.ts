import { Theme } from "./theme";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Http,Headers,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ThemeService{
    constructor(private http:Http){}
    private headers = new Headers({'Content-type':'application/json'});
    private themesUrl = '/api/themes';

    private extractData(res:Response) {
        let body = res.json();
        return body || [];
    }
    getAllThemes():Observable<Theme[]>{
        return this.http.get(this.themesUrl+"/allThemes").map(this.extractData).catch(this.handleError);
    }
    getTheme(id:number):Observable<Theme>{
        const url = `${this.themesUrl}/findtheme/${id}`;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }

    insertTheme(d:Theme):Promise<Theme>{
        return this.http.post(this.themesUrl+"/insertTheme",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(res=>res.json() as Theme).catch(this.handleError);  
    }
    deleteTheme(d:Theme):Promise<void>{
        const url = `${this.themesUrl}/deleteTheme/${d.idtheme}`;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError); 
    }
    updateTheme(d:Theme):Promise<Theme>{
        return this.http.post(this.themesUrl + "/updateTheme",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(()=>null).catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('Une erreur a eu lieu dans le service Mot cle', error);
        return Promise.reject(error.message || error);
      }
}