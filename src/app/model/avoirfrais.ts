import { TypeFrai } from "./typefrais";
import { OrdreMission } from "./ordremission";
import { Support } from "./support";
import { Projet } from "./projets";

export class AvoirFrais{
    idAvoirfrais:number;
    projet:Projet;
    codeSupport:string;
    observation:string;
    support:Support;
    valeurPrevue:number;
    valeurReel:number;
    typeFrai:TypeFrai;
    ordreMission:OrdreMission;
    nomOrgFr:string;
    nomOrgAr:string;
    constructor(){
        this.typeFrai = new TypeFrai();
        this.ordreMission = new OrdreMission();
        this.support = new Support();
        this.projet = new Projet();
    }
}