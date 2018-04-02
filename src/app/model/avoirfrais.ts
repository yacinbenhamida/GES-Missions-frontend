import { TypeFrai } from "./typefrais";
import { OrdreMission } from "./ordremission";

export class AvoirFrais{
    idAvoirfrais:number;
    codeProg:number;
    codeSupport:string;
    observation:string;
    support:string;
    valeurPrevue:number;
    valeurReel:number;
    typeFrai:TypeFrai;
    ordreMission:OrdreMission;
    nomOrgFr:string;
    nomOrgAr:string;
    constructor(){
        this.typeFrai = new TypeFrai();
        this.ordreMission = new OrdreMission();
    }
}