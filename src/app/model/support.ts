import { AvoirFrais } from "./avoirfrais";

export class Support{
    public codeSupport:string;
    public signification:string;
    frais:AvoirFrais [];
    constructor(){
        this.frais  = [];
    }
}