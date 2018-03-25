import { OrdreMission } from "./ordremission";
import { Pays } from "./pays";

export class Concerne{
    public idconcerne:number;
    public fraisDivers:number;
    public fraisMission:number;
    public fraisTransport:number;
    public moyTransport:string;
    public nbJoursP:number;
    public nbJoursR:number;
    public ville:string;
    public ordre:OrdreMission;
    public pays:Pays;

    constructor(){
        this.ordre = new OrdreMission();
        this.pays = new Pays();
    }
}