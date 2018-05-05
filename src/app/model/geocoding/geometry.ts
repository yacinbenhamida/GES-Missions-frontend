import { Location } from "../location";

export class Geometry{
 
    bounds:Bounds;
    location:Location;
    location_type:string;
    viewport:Viewport;
    constructor(){
        this.bounds = new Bounds();
        this.location = new Location();
        this.viewport = new Viewport();
    }
}
class Bounds{
    northeast:Northeast;
    southwest:Southwest;
    constructor(){
        this.northeast = new Northeast();
        this.southwest = new Southwest();
    }
}

class Viewport{
    northeast:Northeast;
    southwest:Southwest;
    constructor(){
        this.northeast = new Northeast();
        this.southwest = new Southwest();
    }
}
class Northeast{
    lat:number;
    lng:number;
}
class Southwest{
    lat:number;
    lng:number;
}