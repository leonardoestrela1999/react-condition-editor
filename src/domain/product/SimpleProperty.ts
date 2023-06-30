class SimpleProperty {
    public property_id: number;
    public value: string | number | string[];

    public constructor(property_id: number, value: string | number | string[]){
        this.property_id = property_id;
        this.value = value;
    }
}

export default SimpleProperty