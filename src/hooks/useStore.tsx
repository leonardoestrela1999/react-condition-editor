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

    // The values selected by the user
    const [currentProperty, setCurrentProperty] = useState<Property>();
    const [currentOperator, setCurrentOperator] = useState<Operator>();
    const [currentValue, setCurrentValue] = useState<string | string[]>();

    useEffect(() => {
        /* if(){

        } */
    }, [currentOperator, currentValue]);


    return {
        products,
        properties,
        operators,
        currentProperty,
        currentOperator,
        currentValue,
        setCurrentProperty,
        setCurrentOperator,
        setCurrentValue
    }

}

export default useStore;