import { Groupe } from "./groupe";

export class Taux{
    public idTaux:number;
    public codeTaux:number;
    public valTaux:number;
    public groupes:Groupe[];
    constructor(){
        this.groupes = [];
    }
}