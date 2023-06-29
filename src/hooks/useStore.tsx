import { useEffect, useState } from "react";
import Product from "../domain/product/Product";
import Property from "../domain/property/Property";
import Operator from "../domain/operator/Operator";
import { datastore } from "../mocks/data";


function useStore() {
    // The data extracted from data.js
    const [products, setProducts] = useState<Product[]>(datastore.getProducts());
    const [properties, setProperties] = useState<Property[]>(datastore.getProperties());
    const [operators, setOperators] = useState<Operator[]>(datastore.getOperators());


    return {
        products,
        properties,
        operators,
    }

}

export default useStore;