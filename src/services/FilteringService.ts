import { PropertyType } from "../constants"
import Operator from "../domain/operator/Operator"
import Product from "../domain/product/Product"
import Property from "../domain/property/Property"

export const filter = (list: Product[], property: Property, operator: Operator, value?: PropertyType) => {
    switch(operator.id) { 
        case "equals": {
           if(value){
                const resultList = list.filter(product => product.property_values.find(prop => prop.property_id === property.id && prop.value == value));
                return resultList;
           }
           return list;
        } 
        case "any": {
            const resultList = list.filter(product => product.property_values.find(prop => prop.property_id === property.id && prop.value));
            return resultList;
        }
        case "none": {
            const resultList = list.filter(product => !product.property_values.find(prop => prop.property_id === property.id));
            return resultList;
        }
        case "greater_than": {
            if(value && Number(value)){
                 const resultList = list.filter(product => product.property_values.find(prop => prop.property_id === property.id && prop.value > value));
                 return resultList;
            }
            return list;
        }
        case "less_than": {
            if(value && Number(value)){
                 const resultList = list.filter(product => product.property_values.find(prop => prop.property_id === property.id && prop.value < value));
                 return resultList;
            }
            return list;
        }
        case "in": {
            if(value){
                
                const resultList = list.filter(product => product.property_values.find(prop => prop.property_id === property.id && (value as (string|number)[]).includes(prop.value as string|number)));
                return resultList;
            }
            return list;
        }
        case "contains": {
            if(value){
                 const resultList = list.filter(product => product.property_values.find(prop => prop.property_id === property.id && (prop.value as string).includes(value as string)));
                 return resultList;
            }
            return list;
        }
        default: { 
           return list;  
        } 
     } 
}