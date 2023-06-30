import { Input, Select } from '@chakra-ui/react'
import Property from '../domain/property/Property';
import Operator, { needsValue } from '../domain/operator/Operator';
import { useState } from 'react';
import { getListOfOperatorsByType, OPERATORS_WITH_VALUE, PropertyType } from '../constants';
import { filter } from '../services/FilteringService';
import Product from '../domain/product/Product';
import { MultiSelect } from 'chakra-multiselect';
import { datastore } from '../mocks/data';

interface StoreFiltersProps {
    properties: Property[],
    operators: Operator[],
    setProducts: (products: Product[]) => void,
    setCurrentProperty: (property: Property) => void,
    setCurrentOperator: (operator: Operator) => void,
    setCurrentValue: (value: PropertyType) => void,
    currentProperty?: Property,
    currentOperator?: Operator,
    currentValue?: PropertyType
}

function StoreFilters({
    properties,
    operators,
    setProducts,
    setCurrentProperty,
    setCurrentOperator,
    setCurrentValue,
    currentProperty,
    currentOperator
}: StoreFiltersProps) {
    
    const [operatorsByProperty, setOperatorsByProperty] = useState<Operator[]>([]);
    const [unfilteredProducts] = useState<Product[]>(datastore.getProducts());

    const handleSetProperty = (property: Property) => {
        const auxOperators = getListOfOperatorsByType(property.type);
        const actualOperators = operators.filter(operator => auxOperators.includes(operator.id));
        setOperatorsByProperty(actualOperators);
        setCurrentProperty(property)
    }

    const handleSetOperator = (operator: Operator) => {
        setCurrentOperator(operator)
        if(!operator.hasValue){
            const filteredProducts = filter(unfilteredProducts, currentProperty!, operator);
            setProducts(filteredProducts);
        }
    }

    const handleSetValue = (value: PropertyType) => {
        setCurrentValue(value);
        const filteredProducts = filter(unfilteredProducts, currentProperty!, currentOperator!, value);
        setProducts(filteredProducts);
    }

    const getValueComponent = () => {
        if(currentOperator && needsValue(currentOperator?.id)){
            if(currentProperty?.type === 'enumerated'){
                const options = currentProperty.values!.map((label) => ({ label, value: label.toLowerCase() }))
                return(
                    <MultiSelect
                        options={options}
                        label='Choose an item'
                        onChange={(aux) => handleSetValue(aux)}
                    />
                );
            }else {
                return( <Input placeholder='Insert a value...' onChange={(e) => handleSetValue(e.target.value)}/> );
            }
        }else {
            return null;
        }
    }

    return(
        <div>
            <Select placeholder='Select a Property'>
                {properties.map(property =>
                    <option onClick={() => handleSetProperty(property)} >{property.name}</option>
                )}
            </Select>
            {currentProperty && <Select placeholder='Select an Operator'>
                {operatorsByProperty.map(operator =>
                    <option onClick={() => handleSetOperator(operator)}>{operator.text}</option>
                )}
            </Select>}
            {getValueComponent()}
        </div>
    );
}

export default StoreFilters;