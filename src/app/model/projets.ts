import { Departement } from "./departement";
import { AvoirBudgProg } from "./AvoirBudgProg";

export class Projet{
    idprojet:number;
    departement:Departement;
    codeProjet:string;
    libProjAr:string;
    libProjFr:string;
    avoirBudgProg:AvoirBudgProg[];
    constructor(){
        this.avoirBudgProg = [];
        this.departement = new Departement();
    }  
}