import { Fonction } from "./fonction";
import { Grade } from "./grade";
import { Categorie } from "./categorie";
import { Classe } from "./classe";
import { AffectMissDep } from "./affectmission";
import { Groupe } from "./groupe";

export class Missionaire{
idMissionaire:number;
cin:number;
dateCin:Date;
nomAr:string;
nomFr:string;
prenomAr:string;
prenomFr:string;
matricule:string;
nationaliteAr :string;
nationaliteFr :string;
dateNaissance:Date;
lieuNaissanceAr:string;
lieuNaissanceFr:string;
fonction:Fonction;
grade:Grade;
categorie:Categorie;
classe:Classe;
groupe:Groupe;
affectMissDeps:AffectMissDep[];
constructor(){
    this.fonction = new Fonction();
    this.categorie = new Categorie();
    this.classe = new Classe();
    this.grade = new Grade();
    this.groupe = new Groupe();
    this.affectMissDeps = [];
}
}