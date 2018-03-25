import {Departement} from './departement';
import { UserStructs } from './userstructs';
export class Utilisateur{
    codeUtilisateur : number;
    codeProfile : string;
    nomAr : string;
    nomFr : string;
    prenomAr : string;
    prenomFr : string;
    motDePasse : string;
    login:number;
    userStructs:UserStructs[];
    constructor(){
        this.userStructs = [];
    }
}