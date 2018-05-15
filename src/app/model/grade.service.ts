import { Grade } from "./grade";
import { Injectable } from "@angular/core";
import { Http,Headers,Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
@Injectable()
export class GradeService{
    constructor(public http:Http){}
    private headers = new Headers({'Content-type':'application/json'});
    private gradeUrl = '/api/grades';

    private extractData(res:Response) {
        let body = res.json();
        return body || [];
    }
    getAllGrades():Observable<Grade[]>{
        return this.http.get(this.gradeUrl+"/allGrades",{headers : this.headers}).map(this.extractData).catch(this.handleError);
    }
    getGrade(id:number):Observable<Grade>{
        const url = `${this.gradeUrl}/findGrade/${id}`;
        return this.http.get(url,{headers : this.headers}).map(this.extractData).catch(this.handleError);
    }

    insertGrade(d:Grade):Promise<Grade>{
        return this.http.post(this.gradeUrl+"/insertGrade",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(res=>res.json() as Grade).catch(this.handleError);  
    }
    deleteGrade(d:Grade):Promise<void>{
        const url = `${this.gradeUrl}/deleteGrade/${d.idgrade}`;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError); 
    }
    updateGrade(d:Grade):Promise<Grade>{
        return this.http.post(this.gradeUrl + "/updateGrade",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(()=>null).catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('Une erreur a eu lieu dans le service Grade', error);
        return Promise.reject(error.message || error);
      }
}