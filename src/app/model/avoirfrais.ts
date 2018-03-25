import { TypeFrais } from "./typefrais";
import { PaysFrais } from "./paysfrais";

export class AvoirFrais{
    idAvoirfrais:number;
    codeProg:number;
    codeSupport:number;
    observation:string;
    support:string;
    valeurPrevue:number;
    valeurReel:number;
    typeFrai:TypeFrais;
    paysfrai:PaysFrais[];
    constructor(){
        this.paysfrai = [];
        this.typeFrai = new TypeFrais();
    }
}