import { Departement } from "./departement";
import { AvoirBudgProg } from "./AvoirBudgProg";
import { AvoirFrais } from "./avoirfrais";

export class Projet{
    idprojet:number;
    departement:Departement;
    codeProjet:string;
    libProjAr:string;
    libProjFr:string;
    avoirBudgProg:AvoirBudgProg[];
    frais:AvoirFrais[];
    constructor(){
        this.frais = [];
        this.avoirBudgProg = [];
        this.departement = new Departement();
    }  
}