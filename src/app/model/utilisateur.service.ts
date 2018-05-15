import { Utilisateur } from './utilisateur';
import { Departement}  from './departement';
import { Http,Headers,Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { UserStructs } from './userstructs';
import { DepartementJS } from './departementjson';
@Injectable()
export class UtilisateurService{
    constructor(public http:Http){}
    private headers = new Headers({'Content-type':'application/json'});
//private headers = new Headers({'Content-type':'application/json'});

private usersUrl = '/api/users';

private extractData(res:Response) {
    let body = res.json();
    return body || [];
}
updateUsers(u:Utilisateur):Promise<Utilisateur[]>{
    return this.http.post(this.usersUrl+"/updateUsers",JSON.stringify(u),{headers : this.headers})
    .toPromise().then(()=>null).catch(this.handleError); 
}
getUsers():Observable<Utilisateur[]>{
    return this.http.get(this.usersUrl+"/allUsers", {headers: this.headers}).map(this.extractData).catch(this.handleError);
}
getLoginCredentials(cin:number,password:string):Observable<Utilisateur>{
    const url = `${this.usersUrl}/verifLoginUser/${cin}/${password}`;
    return this.http.get(url).map(this.extractData, {headers: this.headers}).catch(this.handleError);
}

getUser(id:number):Promise<Utilisateur>{
    const url = `${this.usersUrl}/findUser/${id}`;
    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Utilisateur)
      .catch(this.handleError);
}
getDepOfUser(id:number):Observable<Departement>{
    const url = `${this.usersUrl}/findDepOfUser/${id}`;
    return this.http.get(url, {headers: this.headers}).map(
        (res:Response)=>{
        return res.json() as Departement;}).catch(this.handleError);
}   
insertUser(u:UserStructs){
    return this.http.post(this.usersUrl+"/userStruct",JSON.stringify(u),{headers : this.headers})
        .toPromise().then(()=>null).catch(this.handleError);   
}
updateUser(u:UserStructs):Promise<UserStructs>{
    return this.http.post(this.usersUrl + "/updateUser",JSON.stringify(u),{headers : this.headers})
        .toPromise().then(()=>null).catch(this.handleError);
}
deleteUser(u:Utilisateur):Promise<void>{
    const url = `${this.usersUrl}/deleteUser/${u.codeUtilisateur}`;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);  
}
getAllUserStructs(u:Utilisateur):Observable<UserStructs[]>{
    const url = `${this.usersUrl}/AllUserStructs/${u.codeUtilisateur}`;
    return this.http.get(url).map(this.extractData).catch(this.handleError);
}
affectController(us:UserStructs):Observable<UserStructs>{
    return this.http.post(this.usersUrl+"/affectuser",JSON.stringify(us),{headers : this.headers}).map(this.extractData).catch(this.handleError);   
}
deleteUserStruct(id:number){
    const url = `${this.usersUrl}/deleteUserStruct/${id}`;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);  
}
private handleError(error: any): Promise<any> {
    console.error('Une erreur a eu lieu dans le service utilisateurs', error);
    return Promise.reject(error.message || error);
  }
}