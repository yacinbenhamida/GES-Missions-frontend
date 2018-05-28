import { Departement } from "./departement";
import { Theme } from "./theme";
import { OrdreMission } from "./ordremission";

export class Mission{
    public idMission:number;
    public departement:Departement;
    public dateArriveP:Date;
    public dateDepartP:Date;
    public theme:Theme;
    public numMission:number;
    public objectifMissionAr:string;
    public objectifMissionFr:string;
    public ordresMission:OrdreMission[];
    constructor(){
        this.departement = new Departement();
        this.ordresMission = [];
        this.theme = new Theme();
    }
}