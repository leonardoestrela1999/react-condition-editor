import { Select } from '@chakra-ui/react'
import useStore from '../hooks/useStore';
import Property from '../domain/property/Property';
import Operator from '../domain/operator/Operator';
import { useState } from 'react';
import { getListOfOperatorsByType, OPERATORS_WITH_VALUE } from '../constants';

interface StoreFiltersProps {
    setCurrentProperty: (property: Property) => void,
    setCurrentOperator: (operator: Operator) => void,
    setCurrentValue: (value: string[]) => void,
    currentProperty?: Property,
    currentOperator?: Operator,
    currentValue?: string | string[]
}

function StoreFilters({
    setCurrentProperty,
    setCurrentOperator,
    setCurrentValue,
    currentProperty,
    currentOperator,
    currentValue
}: StoreFiltersProps) {
    
    const {
        properties,
        operators,
    } = useStore();

    const [operatorsByProperty, setOperatorsByProperty] = useState<Operator[]>([]);

    const handleSetProperty = (property: Property) => {
        const auxOperators = getListOfOperatorsByType(property.type);
        const actualOperators = operators.filter(operator => auxOperators.includes(operator.id));
        setOperatorsByProperty(actualOperators);
        setCurrentProperty(property)
    }

    const handleSetOperator = (operator: Operator) => {
        setCurrentOperator(operator)
    }

    const handleSetValue = (value: string[]) => {
        setCurrentValue(value);
    }

    const getValueComponent = () => {
        if(currentOperator?.hasValue){
            return(
                <Select placeholder='Select a Value'>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                </Select>
            );
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
                    <option>{operator.text}</option>
                )}
            </Select>}
            {getValueComponent()}
        </div>
    );
}

export default StoreFilters;