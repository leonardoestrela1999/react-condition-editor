import { Box, Button, Container, Input, Select } from '@chakra-ui/react'
import Property from '../domain/property/Property';
import Operator, { needsValue } from '../domain/operator/Operator';
import { useEffect, useRef, useState } from 'react';
import { getListOfOperatorsByType, OPERATORS_WITH_VALUE, PropertyType } from '../constants';
import { filter } from '../services/FilteringService';
import Product from '../domain/product/Product';
import { MultiSelect } from 'chakra-multiselect';

type StoreFiltersProps = {
    filtersProps: {
        products: Product[],
        properties: Property[],
        operators: Operator[],
        setProducts: (products: Product[]) => void,
        setCurrentProperty: (property: Property | undefined) => void,
        setCurrentOperator: (operator: Operator | undefined) => void,
        setCurrentValue: (value: PropertyType | undefined) => void,
        currentProperty?: Property | undefined,
        currentOperator?: Operator | undefined,
        currentValue?: PropertyType | undefined
    }
}

function Filters({filtersProps}: StoreFiltersProps) {
    
    const {
        products,
        properties,
        operators,
        setProducts,
        setCurrentProperty,
        setCurrentOperator,
        setCurrentValue,
        currentProperty,
        currentOperator,
        currentValue
    } = filtersProps;

    const [operatorsByProperty, setOperatorsByProperty] = useState<Operator[]>([]);
    const [unfilteredProducts] = useState<Product[]>(products);

    useEffect(() => {
        console.log("doing something")
    }, [currentProperty, currentOperator, currentValue]);

    const handleSetProperty = (property: Property | undefined) => {
        setCurrentProperty(property)
        if(currentOperator){
            setCurrentOperator(undefined);
            setProducts(unfilteredProducts);
        }
        if(property){
            const auxOperators = getListOfOperatorsByType(property.type);
            const actualOperators = operators.filter(operator => auxOperators.includes(operator.id));
            setOperatorsByProperty(actualOperators);
        }else{
            setProducts(unfilteredProducts);
        }
    }

    const handleSetOperator = (operator: Operator) => {
        setCurrentValue(undefined);
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

    const handleSetValueMultiSelect = (value: PropertyType) => {
        const actualValue = value as [];
        setCurrentValue(actualValue);
        if(actualValue.length === 0){
            setProducts(unfilteredProducts);
        }else {
            const filteredProducts = filter(unfilteredProducts, currentProperty!, currentOperator!, value);
            setProducts(filteredProducts);
        }
    }

    const getValueComponent = () => {
        if(currentOperator && needsValue(currentOperator?.id)){
            if(currentProperty?.type === 'enumerated'){
                const options = currentProperty.values!.map((label) => ({ label, value: label.toLowerCase() }))
                return(
                    <MultiSelect data-testid="multiselect-value"
                        options={options}
                        value={currentValue}
                        onChange={(aux) => handleSetValueMultiSelect(aux)}
                    />
                );
            }else {
                return( <Input data-testid="input-value" placeholder='Insert a value...' onChange={(e) => handleSetValue(e.target.value)}/> );
            }
        }else {
            return null;
        }
    }

    const clearFilters = () => {
        setCurrentValue(undefined);
        setCurrentOperator(undefined)
        setCurrentProperty(undefined);
        setProducts(unfilteredProducts);
    }


    return(
    <Container maxW='1000px' data-testid="filters" >
        <Box style={{display: "flex", flexDirection: "row"}} w='100%' p={4} >
            <Select data-testid="select-property" value={currentProperty?.id || currentProperty?.id === 0 ? currentProperty?.id : -1}>
                <option value={-1} onClick={() => handleSetProperty(undefined)}>Select a Property</option>
                {properties.map(property =>
                    <option data-testid={'option-property-' + property.id} value={property?.id} onClick={() => handleSetProperty(property)} >{property.name}</option>
                )}
            </Select>
            {currentProperty && <Select data-testid="select-operator" value={currentOperator?.id ? currentOperator.id : ''} placeholder='Select an Operator'>
                {operatorsByProperty.map(operator =>
                    <option data-testid={'option-operator-' + operator.id} value={operator.id} onClick={() => handleSetOperator(operator)}>{operator.text}</option>
                )}
            </Select>}
            {getValueComponent()}
        </Box>
        <Button data-testid="button-clear" colorScheme='blue' onClick={() => clearFilters()}>Clear</Button>
        </Container>
    );
}

export default Filters;