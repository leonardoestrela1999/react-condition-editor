import { Select } from '@chakra-ui/react'
import useStore from '../hooks/useStore';
import Property from '../domain/property/Property';
import Operator from '../domain/operator/Operator';

function StoreFilters() {
    const {
        properties,
        operators,
        currentProperty,
        currentOperator,
        currentValue,
        setCurrentProperty,
        setCurrentOperator,
        setCurrentValue
    } = useStore();

    const handleSetProperty = (property: Property) => {
        setCurrentProperty(property)
    }

    const handleSetOperator = (operator: Operator) => {
        setCurrentOperator(operator)
    }

    const handleSetValue = (value: string[]) => {
        setCurrentValue(value);
    }

    return(
        <div>
            <Select placeholder='Select a Property'>
                {properties.map(property =>
                    <option onClick={() => handleSetProperty(property)} >{property.name}</option>
                )}
            </Select>
            {currentProperty && <Select placeholder='Select an Operator'>
                {operators.map(operator =>
                    <option>{operator.text}</option>
                )}
            </Select>}
            {/* <Select placeholder='Select a Value'>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
            </Select> */}
        </div>
    );
}

export default StoreFilters;