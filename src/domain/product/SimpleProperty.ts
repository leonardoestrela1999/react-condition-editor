class SimpleProperty {
    public id: string;
    public value: string | number;

    public constructor(property_id: string, value: string | number){
        this.id = property_id;
        this.value = value;
    }
}

export default SimpleProperty