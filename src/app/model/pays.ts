import  { Zonepays } from "./zonepays";
import { PaysFrais } from "./paysfrais";
import { Concerne } from "./concerne";
export class Pays{
    idpays:number;
    codepays:number;
    langue:string;
    libPaysAr:string;
    libPaysFr:string;
    zonepays:Zonepays;
    paysfrai:PaysFrais[];
    concerne:Concerne[];
    constructor(){
        this.zonepays = new Zonepays();
        this.paysfrai = [];
        this.concerne = [];
        }
}