import { Departement } from "./departement";

export class TypeDep{
    idtypedep:number;
    libTypeDepAr:string;
    libTypeDepFr:string;
    departements:Departement[];
    constructor(){
        this.departements = [];
    }
}