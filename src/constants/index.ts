export const POSSIBLE_TYPE_VALUES = ['number', 'string', 'enumerated'];

export const OPERATORS_WITH_VALUE = ["equals", "greater_than", "less_than", "in", "contains"];

export const OPERATORS_FOR_STRINGS = ["equals", "any", "none", "in", "contains"];
export const OPERATORS_FOR_NUMBERS = ["equals", "greater_than","less_than", "any", "none", "in"];
export const OPERATORS_FOR_ENUMERATORS = ["equals", "any", "none", "in", "contains"];

export const getListOfOperatorsByType = (type: string) => {
    switch(type) { 
        case "string": { 
           return OPERATORS_FOR_STRINGS;
        } 
        case "number": { 
           return OPERATORS_FOR_NUMBERS;
        } 
        case "enumerated": {
           return OPERATORS_FOR_ENUMERATORS; 
        }
        default: { 
           throw new Error("Invalid type.");  
        } 
     } 
}