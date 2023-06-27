class SimpleProperty {
    public property_id: number;
    public value: string | number;

    public constructor(property_id: number, value: string | number){
        this.property_id = property_id;
        this.value = value;
    }
}

export default SimpleProperty