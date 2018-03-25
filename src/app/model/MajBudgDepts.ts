import { AvoirBudgDep } from "./AvoirBudgDep";

export class MajBudgDep{
    public idMajBdugDep:number;
    public dateMaj:Date;
   public  refBudgMission:string;
    public refBudgTransport:string;
    public valeurBudgMission:number;
    public valeurBudgTransport:number;
    public budget:AvoirBudgDep;
    public etat:string;
    constructor(){
        this.budget = new AvoirBudgDep();
    }
}