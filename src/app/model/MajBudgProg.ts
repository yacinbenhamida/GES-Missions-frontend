import { Projet } from "./projets";
import { AvoirBudgProg } from "./AvoirBudgProg";

export class MajBudgProg{
    idmajBudgPrg:number;
    dateMajBudgProg:Date;
    refBudget:number;
    valeurMajBudgProg:number;
    budgetprojet:AvoirBudgProg;
    public etat:string;
    constructor(){
        this.budgetprojet = new AvoirBudgProg();
    }
}