import { Missionaire } from "./missionaire";
import { Taux } from "./taux";

export class Groupe{
    public idGroupe:number;
    public codeGroupe:string;
    public libGroupeAr:string;
    public libGroupeFr:string;
    public taux:Taux;
    public missionaires:Missionaire[];
    constructor(){
        this.missionaires = [];
        this.taux = new Taux();
    }
}