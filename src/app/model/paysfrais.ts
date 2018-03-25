import { AvoirFrais } from "./avoirfrais";
import { Pays } from "./pays";

export class PaysFrais{
    idPaysFrais:number;
    avoirfrais:AvoirFrais;
    pays:Pays;
    constructor(){
        this.avoirfrais = new AvoirFrais();
        this.pays = new Pays();
    }
}