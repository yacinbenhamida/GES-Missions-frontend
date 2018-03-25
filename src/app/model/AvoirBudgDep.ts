import { Departement } from "./departement";
import { MajBudgProg } from "./MajBudgProg";
import { MajBudgDep } from "./MajBudgDepts";

export class AvoirBudgDep{
    public idBudgDep:number;
    public anneeAttr:number;
    public dateBudg:Date;
    public montantBudgMission:number;
    public montantBudgTransport:number;
    public refBudgMission:string;
    public refBudgTransport:string;
    public departement:Departement;
    public totalMission:number;
    public totalTransport:number;
    public majBudgDeps:MajBudgDep[];
    constructor(){
        this.majBudgDeps = [];
        this.departement = new Departement();
    }
}