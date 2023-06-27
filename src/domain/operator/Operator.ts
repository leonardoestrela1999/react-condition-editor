import { operatorsWithValue } from "../../constants";

class Operator {
    public id: string;
    public text: string;
    public hasValue?: boolean;


    public constructor(id: string, text: string){
        this.id = id;
        this.text = text;
        this.hasValue = needsValue(id);
    }
    
}

function needsValue(id: string): boolean{
    return operatorsWithValue.includes(id);
}

export default Operator