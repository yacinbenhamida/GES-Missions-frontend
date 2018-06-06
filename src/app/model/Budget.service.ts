import { AvoirBudgProg } from "./AvoirBudgProg";
import { Http,Headers,Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { MajBudgProg } from "./MajBudgProg";
import { Injectable } from "@angular/core";
import { Projet } from "./projets";
import { AvoirBudgDep } from "./AvoirBudgDep";
import { MajBudgDep } from "./MajBudgDepts";
@Injectable()
export class BudgetService{
    constructor(public http:Http){}
    private headers = new Headers({'Content-type':'application/json'});
    private projUrl = '/api/budgets';

    private extractData(res:Response) {
        let body = res.json();
        return body || [];
    }
    getAllBudgetsProg():Observable<AvoirBudgProg[]>{
        return this.http.get(this.projUrl+"/allProjBudgets",{headers:this.headers}).map(this.extractData).catch(this.handleError);
    }
    getBudgProg(ref:number):Observable<AvoirBudgProg>{
        const url = `${this.projUrl}/getBudgetProjet/${ref}`;
        return this.http.get(url,{headers:this.headers}).map(this.extractData).catch(this.handleError);
    }
    allBudgProgOfDEP(codeDep:string,year:number):Observable<AvoirBudgProg[]>{
        const url = `${this.projUrl}/getAllBudgetsProjets/${codeDep}/${year}`;
        return this.http.get(url,{headers:this.headers}).map(this.extractData).catch(this.handleError);
    }
    getBudgOfProg(codeproj:number) : Observable<AvoirBudgProg>{
        const url = `${this.projUrl}/getBudgetOfprojet/${codeproj}`;
        return this.http.get(url,{headers:this.headers}).map( (x:Response)=>{return x.text() ? x.json() : {};}).catch(this.handleError);
    }

    getSommeBudgetPECprojet(codedep:string,year:number,idproj:number):Observable<number>{
        const url = `${this.projUrl}/getToalFraisPECProjetPromis/${codedep}/${year}/${idproj}`;
        return this.http.get(url,{headers:this.headers}).map(this.extractData).catch(this.handleError);
    }
    insertBudgProg(d:AvoirBudgProg){
        return this.http.post(this.projUrl+"/insertBudgetProjet",JSON.stringify(d),
        {headers : this.headers}).map(()=>null).catch(this.handleError);
    }
    deleteBudgProg(d:AvoirBudgProg):Promise<void>{
        const url = `${this.projUrl}/deleteBudgprojet/${d.idbudgProg}`;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError); 
    }
    updateBudgProg(d:AvoirBudgProg):Promise<MajBudgProg>{
        return this.http.post(this.projUrl + "/updateBudgetProj",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(this.extractData).catch(this.handleError);
    }
    // toutes les maj du projet du ministere
    getAllBudgetProgUpdatesOfdep(iddep:string):Observable<MajBudgProg[]>{
        const url = `${this.projUrl}/allMajProgBudgetsOfMinistere/${iddep}`;
        return this.http.get(url,{headers:this.headers}).map(this.extractData).catch(this.handleError);
    }

    getAllBudgProgMajOfUser(idUser:number,codedep:string) : Observable<MajBudgProg[]>{
        const url = `${this.projUrl}/allMajsBudgProgOfUser/${codedep}/${idUser}`;
        return this.http.get(url,{headers:this.headers}).map(this.extractData).catch(this.handleError);    
    }
    saveBudgProgMaj(idmaj:number){
        const url = `${this.projUrl}/saveMajBudgPROG/${idmaj}`;
        return this.http.get(url,{headers:this.headers}).map(this.extractData).catch(this.handleError);
    }
    cancelBudgProgMaj(idmaj:number){
        const url = `${this.projUrl}/deleteMajBudgProgOfUser/${idmaj}`;
        return this.http.get(url,{headers:this.headers}).map(this.extractData).catch(this.handleError);
    }
    // accept maj budget projet by OM 
    acceptBudgProgMaj(idmaj:number){
        const url = `${this.projUrl}/acceptMajBudgPROGM/${idmaj}`;
        return this.http.get(url,{headers:this.headers}).map(this.extractData).catch(this.handleError);
    }
    // decline maj budg prog by OM 
    declineBudgProgMaj(idmaj:number){
        const url = `${this.projUrl}/declineMajBudgPROGM/${idmaj}`;
        return this.http.get(url,{headers:this.headers}).map(this.extractData).catch(this.handleError);
    }
    
    verifyIfThereisnoBudgets(codeDep:string,codeprj:number):Observable<MajBudgProg[]>{
        const url = `${this.projUrl}/allMajsBudgProgOfprojet/${codeDep}/${codeprj}`;
        return this.http.get(url,{headers:this.headers}).map( (x:Response)=>{return x.text() ? x.json() : {};}).catch(this.handleError);
    }

    updateInitialDdeNBudgProg(a:AvoirBudgProg):Promise<MajBudgProg>{
        return this.http.post(this.projUrl + "/updateInitialBudgProg",JSON.stringify(a),{headers : this.headers})
        .toPromise().then(()=>null).catch(this.handleError);
    }
    

    // departements budgets 

    getSommeBudgMissionObtenus(codedep:string,year:number):Observable<number>{
        const url = `${this.projUrl}/getSommeBudgetsMission/${codedep}/${year}`;
        return this.http.get(url,{headers:this.headers}).map((response: Response) => {return response.json() as number}).catch(this.handleError);
    }
    getSommeBudgTransportObtenus(codedep:string,year:number):Observable<number>{
        const url = `${this.projUrl}/getSommeBudgetsTransport/${codedep}/${year}`;
        return this.http.get(url,{headers:this.headers}).map((response: Response) => {return response.json() as number}).catch(this.handleError);
    }
    getAllBudgetsOfDep():Observable<AvoirBudgDep[]>{
        return this.http.get(this.projUrl+"/allDepBudgets").map(this.extractData).catch(this.handleError);
    }
    getBudgDep(ref:string,year:number):Observable<AvoirBudgDep>{
        const url = `${this.projUrl}/getBudgetDep/${ref}/${year}`;
        return this.http.get(url,{headers:this.headers}).map(
            (x:Response)=>{return x.text() ? x.json() : {};}).catch(error=>Promise.reject(error.message || error));
    }

    insertBudgDep(d:AvoirBudgDep){
        return this.http.post(this.projUrl+"/insertBudgetDep",JSON.stringify(d),
        {headers : this.headers}).map(()=>null).catch(this.handleError);
    }
    deleteBudgDep(d:AvoirBudgDep):Promise<void>{
        const url = `${this.projUrl}/deleteBudgdep/${d.idBudgDep}`;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError); 
    }
    updateBudgDep(d:AvoirBudgDep):Promise<MajBudgDep>{
        return this.http.post(this.projUrl + "/updateBudgetDep",JSON.stringify(d),{headers : this.headers})
        .toPromise().then(this.extractData).catch(this.handleError);
    }
    getAllBudgetDepUpdates():Observable<MajBudgDep[]>{
        return this.http.get(this.projUrl+"/allMajDepBudgets",{headers:this.headers}).map(this.extractData).catch(this.handleError);
    }

    getAllBudgDepMajOfDep(codedep:string):Observable<MajBudgDep[]>{
        const url = `${this.projUrl}/allMajsBudgDep/${codedep}`;
        return this.http.get(url,{headers:this.headers}).map(this.extractData).catch(this.handleError);       
    }
    getAllBudgDepMajOfUser(idUser:number,codedep:string) : Observable<MajBudgDep[]>{
        const url = `${this.projUrl}/allMajsBudgDepOfUser/${codedep}/${idUser}`;
        return this.http.get(url,{headers:this.headers}).map(this.extractData).catch(this.handleError);    
    }

    verifyIfThereisnoBudgetsDep(codeDep:string):Observable<MajBudgDep[]>{
        const url = `${this.projUrl}/allMajsBudgProgOfdep/${codeDep}`;
        return this.http.get(url,{headers:this.headers}).map(this.extractData).catch(this.handleError);
    }
    // save & cancel by Ordonnateur normal
    saveBudgDepMaj(idmaj:number){
        const url = `${this.projUrl}/saveMajBudgDEP/${idmaj}`;
        return this.http.get(url,{headers:this.headers}).map(this.extractData).catch(this.handleError);
    }
    cancelBudgDepMaj(idmaj:number){
        const url = `${this.projUrl}/deleteMajBudgDepOfUser/${idmaj}`;
        return this.http.get(url,{headers:this.headers}).map(this.extractData).catch(this.handleError);
    }
   // end save & cancel
    // accept maj budget dep by OM 
    acceptBudgProgDep(idmaj:number){
        const url = `${this.projUrl}/acceptMajDEPM/${idmaj}`;
        return this.http.get(url,{headers:this.headers}).map(this.extractData).catch(this.handleError);
    }
    // decline maj budg dep by OM 
    declineBudgDepMaj(idmaj:number){
        const url = `${this.projUrl}/declineMajBudgDEPM/${idmaj}`;
        return this.http.get(url,{headers:this.headers}).map(this.extractData).catch(this.handleError);
    }

    updateInitialDdeNBudgDep(a:AvoirBudgDep):Promise<MajBudgDep>{
        return this.http.post(this.projUrl + "/updateInitialBudgDep",JSON.stringify(a),{headers : this.headers})
        .toPromise().then(()=>null).catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Une erreur a eu lieu dans le service Budget', error);
        return Promise.reject(error.message || error);
      }

}