import { PropertyType } from "./PropertyType";

class Property {
    public id: string;
    public name: string;
    public type: PropertyType;
    public values?: string[]

    public constructor(property_id: string, name: string, type: string, values?: string[]) {
        this.id = property_id;
        this.name = name;
        this.type = PropertyType[type as keyof typeof PropertyType];
        this.values = values;
    }
}

export default Property;