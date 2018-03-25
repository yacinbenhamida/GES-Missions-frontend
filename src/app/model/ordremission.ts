import { Mission } from "./mission";
import { Missionaire } from "./missionaire";
import { Concerne } from "./concerne";

export class OrdreMission{
    public idOrdre:number;
    public avance:number;
    public dateArrP:Date;
    public dateArrR:Date;
    public dateDepP:Date;
    public dateDepR:Date;
    public numOrdre:number;
    public timbre:number;
    public etat:string;
    public mission:Mission;
    public missionaire:Missionaire;
    public concerne:Concerne [];
    constructor(){
        this.mission = new Mission();
        this.missionaire = new Missionaire();
        this.dateArrP = new Date();
        this.dateDepP = new Date();
        this.dateDepR = new Date();
        this.dateArrR = new Date();
        this.concerne = [];
    }
}