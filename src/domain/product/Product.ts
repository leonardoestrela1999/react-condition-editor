import SimpleProperty from "./SimpleProperty";

class Product {
    public id: number;
    public property_values: SimpleProperty[];
    
    public constructor(id: number, property_values: SimpleProperty[]){
        this.id = id;
        this.property_values = property_values;
    }
}

export default Product;