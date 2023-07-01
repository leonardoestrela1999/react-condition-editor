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

    // By deconstructing the filtersProps object, the access to its properties becomes 
    // much more clean and readable throughout the code
    // Eg: 'setProducts(products)' instead of "filtersProps.setProducts(products)"
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

    // The valid Operators for the current selected Property
    const [operatorsByProperty, setOperatorsByProperty] = useState<Operator[]>([]);
    // The original Products list, unfiltered, to 'reset' the table when necessary
    const [unfilteredProducts] = useState<Product[]>(products);

    // Handles a new Property value. 
    const handleSetProperty = (property: Property | undefined) => {
        setCurrentProperty(property)
        if(currentOperator){
            //If the Property changes after selecting an Operator, this must be reset
            setCurrentOperator(undefined);
            //Same thing for the products
            setProducts(unfilteredProducts);
        }
        if(property){
            //Fetches the valid Operators for this Property 
            const auxOperators = getListOfOperatorsByType(property.type);
            const actualOperators = operators.filter(operator => auxOperators.includes(operator.id));
            setOperatorsByProperty(actualOperators);
        }else{
            //In the case that the selected Property is the default "Select a Property"
            //In this case, all values should be reset
            clearFilters();
        }
    }

    // Handles a new Operator value. 
    const handleSetOperator = (operator: Operator) => {
        //Resets the Value
        setCurrentValue(undefined);
        setCurrentOperator(operator);
        //If the Operator does not need a value, Products can be filtered right away
        if(!needsValue(operator.id)){
            const filteredProducts = filter(unfilteredProducts, currentProperty!, operator);
            setProducts(filteredProducts);
        }
    }

    // Handles a new simple Value. 
    const handleSetValue = (value: PropertyType) => {
        setCurrentValue(value);
        const filteredProducts = filter(unfilteredProducts, currentProperty!, currentOperator!, value);
        setProducts(filteredProducts);
    }

    // Handles a new MultiSelect Value. 
    const handleSetValueMultiSelect = (value: PropertyType) => {
        //Value is always an array, in this case
        const actualValue = value as [];
        setCurrentValue(actualValue);
        if(actualValue.length === 0){
            //If all options are unselected
            setProducts(unfilteredProducts);
        }else {
            const filteredProducts = filter(unfilteredProducts, currentProperty!, currentOperator!, value);
            setProducts(filteredProducts);
        }
    }

    // Returns the correct Value component (either Input or Multiselect)
    const getValueComponent = () => {
        if(currentOperator && needsValue(currentOperator?.id)){
            if(currentProperty?.type === 'enumerated'){
                //Multiselect Option
                const options = currentProperty.values!.map((label) => ({ label, value: label.toLowerCase() }))
                return(
                    <MultiSelect data-testid="multiselect-value"
                        options={options}
                        value={currentValue}
                        onChange={(aux) => handleSetValueMultiSelect(aux)}
                    />
                );
            }else {
                //Input Option
                return( <Input data-testid="input-value" placeholder='Insert a value...' onChange={(e) => handleSetValue(e.target.value)}/> );
            }
        }else {
            //If the current Operator does not exist or need a Value, nothing needs to be rendered
            return null;
        }
    }

    // Clears all filters
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