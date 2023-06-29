import { POSSIBLE_TYPE_VALUES } from "../../constants";

class Property {
    public id: number;
    public name: string;
    public type: string;
    public values?: string[]

    public constructor(id: number, name: string, type: string, values?: string[]) {
        this.id = id;
        this.name = name;
        this.type = validateType(type);
        this.values = values;
    }
}

function validateType(type: string){
    if(POSSIBLE_TYPE_VALUES.includes(type)){
        return type;
    }else {
        throw new Error("Invalid type");
    }
}

export default Property;