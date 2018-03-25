import { Departement } from "./departement";
import { Utilisateur} from  "./utilisateur";
export class UserStructs{
    public idUserStruct:number;
    public dateAffectation:Date;
    public utilisateur:Utilisateur;
    public departement:Departement;
    constructor(){
        this.utilisateur = new Utilisateur();
        this.departement = new Departement();
    }
}

