import { Projet } from "./projets";
import { MajBudgProg } from "./MajBudgProg";

export class AvoirBudgProg{
    idbudgProg:number;
    anneeAttr:number;
    dateBudg:Date;
    montantBudg:number;
    refBudgProg:number;
    projet:Projet;
    totalBudget:number;
    majBudgProgs:MajBudgProg[];
    constructor(){
        this.projet = new Projet();
        this.majBudgProgs = [];
    }
}