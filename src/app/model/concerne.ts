import { OrdreMission } from "./ordremission";
import { Pays } from "./pays";

export class Concerne{
    public idconcerne:number;
    public fraisMission:number;
    public moyTransport:string;
    public nbJoursP:number;
    public ville:string;
    public ordre:OrdreMission;
    public pays:Pays;
    public ordre_dest:number;
    public nbJoursPecDep:number;
    public nbJoursPecOrget:number;
    public nbJoursPecProj:number;
    constructor(){
        this.ordre = new OrdreMission();
        this.pays = new Pays();
    }
}