import  { Zonepays } from "./zonepays";
import { Concerne } from "./concerne";
export class Pays{
    idpays:number;
    codepays:number;
    langue:string;
    libPaysAr:string;
    libPaysFr:string;
    zonepays:Zonepays;
    concerne:Concerne[];
    
    constructor(){
        this.zonepays = new Zonepays();
        this.concerne = [];
        }
}