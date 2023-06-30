import { OPERATORS_WITH_VALUE } from "../../constants";

class Operator {
    public id: string;
    public text: string;
    public hasValue?: boolean;

    public constructor(id: string, text: string){
        this.id = id;
        this.text = text;
        this.hasValue = needsValue(this.id);
    }
    
}

export function needsValue(id: string){
    return OPERATORS_WITH_VALUE.includes(id);
}

export default Operator