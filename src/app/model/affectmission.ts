import { Departement } from "./departement";
import { Missionaire } from "./missionaire";

export class AffectMissDep{
    idAffectation:number;
    dateAffectation:Date;
    departement:Departement;
    missionaire:Missionaire;
    constructor(){
        this.departement = new Departement();
        this.missionaire = new Missionaire();
    }
}