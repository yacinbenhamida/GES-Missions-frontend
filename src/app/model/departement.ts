import {UserStructs} from "./userstructs";
import { Projet } from "./projets";
import { TypeDep } from "./typeDep";
import { AffectMissDep } from "./affectmission";
export class Departement{
    public codeDep:string;
    public libDepAr:string;
    public libDepFr:string;
    public compteurMissions:number;
    public typedep:TypeDep;
    public userStructs:UserStructs[];
    public projets:Projet[];
    affectMissDeps:AffectMissDep[];
    constructor(){
        this.userStructs = [];
        this.projets = [];
        this.affectMissDeps = [];
        this.typedep = new TypeDep();
    }
}