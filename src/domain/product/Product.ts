import SimpleProperty from "./SimpleProperty";

class Product {
    public id: string;
    public properties: SimpleProperty[];
    
    public constructor(id: string, properties: SimpleProperty[]){
        this.id = id;
        this.properties = properties;
    }
}

export default Product;